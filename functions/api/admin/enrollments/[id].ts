import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env, EnrollmentRecord, ContactLogRecord } from "../../../types";
import { jsonResponse, errorResponse, sanitizeText } from "../../../utils/validation";
import { getSessionUser } from "../../../utils/auth";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;

  if (!env.DB) {
    return errorResponse("Base de datos no disponible.", 500);
  }

  const currentUser = await getSessionUser(request, env.DB);
  if (!currentUser) {
    return errorResponse("Acceso no autorizado.", 401);
  }

  const enrollmentId = String(params.id);

  // 1. Obtener la inscripción
  const enrollment = await env.DB
    .prepare(
      `SELECT 
        e.id, e.course_id, c.name as course_name,
        e.first_name, e.last_name, e.phone, e.email, e.comments,
        e.status, e.assigned_to, u.name as assigned_name,
        e.privacy_accepted_at, e.created_at, e.updated_at
      FROM enrollments e
      LEFT JOIN courses c ON e.course_id = c.id
      LEFT JOIN admin_users u ON e.assigned_to = u.id
      WHERE e.id = ?`
    )
    .bind(enrollmentId)
    .first<EnrollmentRecord>();

  if (!enrollment) {
    return errorResponse("Inscripción no encontrada.", 404);
  }

  // 2. Obtener el historial de seguimientos y contactos
  const logsResult = await env.DB
    .prepare(
      `SELECT l.id, l.enrollment_id, l.user_id, u.name as user_name, l.action_type, l.notes, l.created_at
       FROM contact_logs l
       LEFT JOIN admin_users u ON l.user_id = u.id
       WHERE l.enrollment_id = ?
       ORDER BY l.created_at DESC`
    )
    .bind(enrollmentId)
    .all<ContactLogRecord>();

  return jsonResponse({
    success: true,
    enrollment,
    contactLogs: logsResult.results || []
  });
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;

  if (!env.DB) {
    return errorResponse("Base de datos no disponible.", 500);
  }

  const currentUser = await getSessionUser(request, env.DB);
  if (!currentUser) {
    return errorResponse("Acceso no autorizado.", 401);
  }

  const enrollmentId = String(params.id);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Cuerpo de solicitud inválido.", 400);
  }

  // Obtener inscripción actual para comparar
  const existing = await env.DB
    .prepare("SELECT * FROM enrollments WHERE id = ?")
    .bind(enrollmentId)
    .first<EnrollmentRecord>();

  if (!existing) {
    return errorResponse("Inscripción no encontrada.", 404);
  }

  const updates: string[] = [];
  const queryParams: unknown[] = [];
  const nowIso = new Date().toISOString();

  // Cambio de estado
  const allowedStatuses = ["new", "contacted", "confirmed", "rejected", "cancelled"];
  let statusChanged = false;
  let newStatus: string | null = null;

  if (body.status !== undefined) {
    const rawStatus = sanitizeText(body.status, 20);
    if (!allowedStatuses.includes(rawStatus)) {
      return errorResponse("Estado inválido.", 400);
    }
    if (rawStatus !== existing.status) {
      updates.push("status = ?");
      queryParams.push(rawStatus);
      statusChanged = true;
      newStatus = rawStatus;
    }
  }

  // Asignación de responsable
  let assignmentChanged = false;
  let newAssignedTo: string | null = null;

  if (body.assigned_to !== undefined) {
    const assignedTo = body.assigned_to ? sanitizeText(body.assigned_to, 60) : null;
    if (assignedTo !== existing.assigned_to) {
      if (assignedTo) {
        // Validar que el usuario exista
        const userExists = await env.DB
          .prepare("SELECT id FROM admin_users WHERE id = ?")
          .bind(assignedTo)
          .first();
        if (!userExists) {
          return errorResponse("El docente asignado no existe.", 400);
        }
      }
      updates.push("assigned_to = ?");
      queryParams.push(assignedTo);
      assignmentChanged = true;
      newAssignedTo = assignedTo;
    }
  }

  if (updates.length === 0) {
    return jsonResponse({ success: true, message: "No hubo cambios para actualizar." });
  }

  updates.push("updated_at = ?");
  queryParams.push(nowIso);
  queryParams.push(enrollmentId);

  // Ejecutar actualización
  await env.DB
    .prepare(`UPDATE enrollments SET ${updates.join(", ")} WHERE id = ?`)
    .bind(...queryParams)
    .run();

  // Registrar en el historial si cambió de estado
  if (statusChanged && newStatus) {
    const logId = `log_${crypto.randomUUID()}`;
    const statusNote = `Estado modificado de "${existing.status}" a "${newStatus}" por ${currentUser.name}.`;
    await env.DB
      .prepare(
        `INSERT INTO contact_logs (id, enrollment_id, user_id, action_type, notes, created_at)
         VALUES (?, ?, ?, 'status_change', ?, ?)`
      )
      .bind(logId, enrollmentId, currentUser.id, statusNote, nowIso)
      .run();
  }

  // Registrar en el historial si cambió de asignado
  if (assignmentChanged) {
    const logId = `log_${crypto.randomUUID()}`;
    const assignNote = newAssignedTo
      ? `Responsable reasignado por ${currentUser.name}.`
      : `Responsable desasignado por ${currentUser.name}.`;
    await env.DB
      .prepare(
        `INSERT INTO contact_logs (id, enrollment_id, user_id, action_type, notes, created_at)
         VALUES (?, ?, ?, 'note', ?, ?)`
      )
      .bind(logId, enrollmentId, currentUser.id, assignNote, nowIso)
      .run();
  }

  return jsonResponse({
    success: true,
    message: "Inscripción actualizada correctamente."
  });
};
