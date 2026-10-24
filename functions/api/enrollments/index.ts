import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env, CourseRecord } from "../../types";
import {
  jsonResponse,
  errorResponse,
  isValidEmail,
  isValidPhone,
  sanitizeText,
  hashIp
} from "../../utils/validation";

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.DB) {
    return errorResponse("La base de datos D1 no está vinculada correctamente.", 500);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Cuerpo de solicitud inválido.", 400);
  }

  // 1. Detección de bots mediante Honeypot
  if (body._hp_company && String(body._hp_company).trim().length > 0) {
    // Respuesta fingida exitosa para no alertar al bot
    return jsonResponse({ success: true, message: "Inscripción recibida." });
  }

  // 2. Extracción y saneamiento de campos
  const firstName = sanitizeText(body.firstName, 80);
  const lastName = sanitizeText(body.lastName, 80);
  const email = sanitizeText(body.email, 120).toLowerCase();
  const phone = sanitizeText(body.phone, 30);
  const courseId = sanitizeText(body.courseId, 60);
  const comments = sanitizeText(body.comments, 500);
  const privacyAccepted = Boolean(body.privacyAccepted);

  // 3. Validaciones obligatorias
  if (!firstName || firstName.length < 2) {
    return errorResponse("Por favor ingresá un nombre válido (mínimo 2 caracteres).", 422);
  }

  if (!lastName || lastName.length < 2) {
    return errorResponse("Por favor ingresá un apellido válido (mínimo 2 caracteres).", 422);
  }

  if (!isValidEmail(email)) {
    return errorResponse("El formato del correo electrónico es inválido.", 422);
  }

  if (!isValidPhone(phone)) {
    return errorResponse("El formato de teléfono o WhatsApp es inválido. Debe incluir entre 8 y 15 dígitos.", 422);
  }

  if (!courseId) {
    return errorResponse("Debes seleccionar un taller o curso.", 422);
  }

  if (!privacyAccepted) {
    return errorResponse("Debes aceptar el aviso de privacidad para completar la inscripción.", 422);
  }

  // 4. Verificación de existencia del curso en D1
  const course = await env.DB
    .prepare("SELECT id, name, is_active FROM courses WHERE id = ?")
    .bind(courseId)
    .first<CourseRecord>();

  if (!course) {
    return errorResponse("El curso seleccionado no existe.", 404);
  }

  if (course.is_active !== 1) {
    return errorResponse("El curso seleccionado no se encuentra disponible para nuevas inscripciones en este momento.", 400);
  }

  // 5. Hash de IP para control de abuso y auditoría
  const clientIp = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "127.0.0.1";
  const ipHash = await hashIp(clientIp);

  // 6. Generación de ID e Inserción en D1
  const enrollmentId = `enr_${crypto.randomUUID()}`;
  const nowIso = new Date().toISOString();

  try {
    await env.DB
      .prepare(
        `INSERT INTO enrollments (
          id, course_id, first_name, last_name, phone, email, comments,
          status, privacy_accepted_at, ip_hash, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?, ?, ?, ?)`
      )
      .bind(
        enrollmentId,
        course.id,
        firstName,
        lastName,
        phone,
        email,
        comments || null,
        nowIso,
        ipHash,
        nowIso,
        nowIso
      )
      .run();

    return jsonResponse({
      success: true,
      id: enrollmentId,
      courseName: course.name,
      firstName,
      message: `¡Inscripción registrada con éxito para ${course.name}!`
    }, 201);
  } catch {
    return errorResponse("Ocurrió un error al registrar la inscripción. Por favor intentá nuevamente o comunicate por WhatsApp.", 500);
  }
};
