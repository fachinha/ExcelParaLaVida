import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env, AdminUser } from "../../types";
import { jsonResponse, errorResponse } from "../../utils/validation";
import { getSessionUser } from "../../utils/auth";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.DB) {
    return errorResponse("Base de datos no disponible.", 500);
  }

  const currentUser = await getSessionUser(request, env.DB);
  if (!currentUser) {
    return errorResponse("Acceso no autorizado.", 401);
  }

  const users = await env.DB
    .prepare("SELECT id, name, email, role, is_active FROM admin_users WHERE is_active = 1 ORDER BY name ASC")
    .all<AdminUser>();

  return jsonResponse({
    success: true,
    users: users.results || []
  });
};
