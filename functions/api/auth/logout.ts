import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../types";
import { jsonResponse } from "../../utils/validation";
import { getSessionTokenFromRequest, revokeSession, createClearCookie } from "../../utils/auth";

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const token = getSessionTokenFromRequest(request);
  if (token && env.DB) {
    await revokeSession(env.DB, token);
  }

  const isProd = new URL(request.url).protocol === "https:";
  const clearCookieHeader = createClearCookie(isProd);

  return jsonResponse(
    { success: true, message: "Sesión cerrada correctamente." },
    200,
    { "Set-Cookie": clearCookieHeader }
  );
};
