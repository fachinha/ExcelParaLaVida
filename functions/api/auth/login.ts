import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env, AdminUser } from "../../types";
import { jsonResponse, errorResponse, sanitizeText } from "../../utils/validation";
import { verifyPassword, createSession, createSessionCookie } from "../../utils/auth";

interface AdminUserRow extends AdminUser {
  password_hash: string;
  password_salt: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.DB) {
    return errorResponse("La base de datos D1 no está configurada.", 500);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Datos de acceso inválidos.", 400);
  }

  const email = sanitizeText(body.email, 120).toLowerCase();
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return errorResponse("Por favor ingresá tu correo y contraseña.", 400);
  }

  // 1. Búsqueda de usuario (mensaje neutro para no revelar si el correo existe)
  const user = await env.DB
    .prepare("SELECT * FROM admin_users WHERE email = ? AND is_active = 1")
    .bind(email)
    .first<AdminUserRow>();

  if (!user) {
    // Retardo sutil simulado para mitigar timing attacks
    await new Promise((r) => setTimeout(r, 100));
    return errorResponse("Correo o contraseña incorrectos.", 401);
  }

  // 2. Verificación de hash PBKDF2
  const isValid = await verifyPassword(password, user.password_hash, user.password_salt);
  if (!isValid) {
    return errorResponse("Correo o contraseña incorrectos.", 401);
  }

  // 3. Creación de sesión segura
  const token = await createSession(env.DB, user.id);
  const isProd = new URL(request.url).protocol === "https:";
  const cookieHeader = createSessionCookie(token, isProd);

  return jsonResponse(
    {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    },
    200,
    { "Set-Cookie": cookieHeader }
  );
};
