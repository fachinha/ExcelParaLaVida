import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env, ActionType } from "../../types";
import { jsonResponse, errorResponse, sanitizeText } from "../../utils/validation";
import { getSessionUser } from "../../utils/auth";

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.DB) {
    return errorResponse("Base de datos no disponible.", 500);
  }

  const currentUser = await getSessionUser(request, env.DB);
  if (!currentUser) {
    return errorResponse("Acceso no autorizado.", 401);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Cuerpo de solicitud inválido.", 400);
  }

  const enrollmentId = sanitizeText(body.enrollmentId, 60);
  const actionType = sanitizeText(body.actionType, 30) as ActionType;
  const notes = sanitizeText(body.notes, 1000);

  if (!enrollmentId) {
    return errorResponse("Falta el identificador de la inscripción.", 400);
  }

  const allowedActions: ActionType[] = ["whatsapp", "email", "phone_call", "status_change", "note"];
  if (!allowedActions.includes(actionType)) {
    return errorResponse("Tipo de acción inválido.", 400);
  }

  if (!notes || notes.length < 2) {
    return errorResponse("La nota o detalle del contacto no puede estar vacía.", 400);
  }

  // Verificar que la inscripción exista
  const enrollment = await env.DB
    .prepare("SELECT id FROM enrollments WHERE id = ?")
    .bind(enrollmentId)
    .first();

  if (!enrollment) {
    return errorResponse("Inscripción no encontrada.", 404);
  }

  const logId = `log_${crypto.randomUUID()}`;
  const nowIso = new Date().toISOString();

  await env.DB
    .prepare(
      `INSERT INTO contact_logs (id, enrollment_id, user_id, action_type, notes, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .bind(logId, enrollmentId, currentUser.id, actionType, notes, nowIso)
    .run();

  return jsonResponse({
    success: true,
    log: {
      id: logId,
      enrollment_id: enrollmentId,
      user_id: currentUser.id,
      user_name: currentUser.name,
      action_type: actionType,
      notes,
      created_at: nowIso
    }
  }, 201);
};
