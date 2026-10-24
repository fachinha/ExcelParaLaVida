import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../types";
import { jsonResponse, errorResponse } from "../../utils/validation";
import { getSessionUser } from "../../utils/auth";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.DB) {
    return errorResponse("Base de datos no disponible.", 500);
  }

  const user = await getSessionUser(request, env.DB);
  if (!user) {
    return errorResponse("No autenticado.", 401);
  }

  return jsonResponse({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};
