import type { AdminUser } from "../types";

export const COOKIE_NAME = "excel_admin_session";
export const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60; // 7 días

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function generateRandomToken(bytesCount = 32): string {
  const bytes = new Uint8Array(bytesCount);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

/**
 * Deriva el hash PBKDF2-SHA256 de una contraseña utilizando WebCrypto nativo.
 */
export async function deriveHash(password: string, saltHex: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  // Usa la codificación UTF-8 del saltHex para coincidencia exacta con pbkdf2Sync
  const salt = enc.encode(saltHex);
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );
  return bytesToHex(new Uint8Array(derivedBits));
}

/**
 * Verifica si una contraseña coincide con el hash y salt almacenados.
 * Es compatible tanto con salt codificado en UTF-8 como en bytes binarios hex.
 */
export async function verifyPassword(password: string, storedHash: string, storedSalt: string): Promise<boolean> {
  try {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );

    // Intento 1: salt como cadena UTF-8 (compatibilidad exacta con crypto.pbkdf2Sync de Node)
    const bits1 = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: enc.encode(storedSalt),
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      256
    );
    const hash1 = bytesToHex(new Uint8Array(bits1));
    if (hash1 === storedHash) return true;

    // Intento 2: salt como bytes binarios hexadecimales
    const bits2 = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: hexToBytes(storedSalt),
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      256
    );
    const hash2 = bytesToHex(new Uint8Array(bits2));
    if (hash2 === storedHash) return true;

    return false;
  } catch {
    return false;
  }
}

/**
 * Extrae el token de sesión de la cabecera Cookie
 */
export function getSessionTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(`${COOKIE_NAME}=`)) {
      return cookie.substring(COOKIE_NAME.length + 1);
    }
  }
  return null;
}

/**
 * Valida la sesión activa en Cloudflare D1 y devuelve los datos del usuario.
 */
export async function getSessionUser(request: Request, db: D1Database): Promise<AdminUser | null> {
  const token = getSessionTokenFromRequest(request);
  if (!token || token.length < 32) return null;

  try {
    const nowIso = new Date().toISOString();
    const result = await db
      .prepare(
        `SELECT u.id, u.name, u.email, u.role, u.is_active, u.created_at
         FROM admin_sessions s
         JOIN admin_users u ON s.user_id = u.id
         WHERE s.id = ? AND s.expires_at > ? AND u.is_active = 1`
      )
      .bind(token, nowIso)
      .first<AdminUser>();

    return result || null;
  } catch {
    return null;
  }
}

/**
 * Crea una nueva sesión en Cloudflare D1
 */
export async function createSession(db: D1Database, userId: string): Promise<string> {
  const token = generateRandomToken(32);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_SECONDS * 1000).toISOString();

  await db
    .prepare("INSERT INTO admin_sessions (id, user_id, expires_at) VALUES (?, ?, ?)")
    .bind(token, userId, expiresAt)
    .run();

  return token;
}

/**
 * Revoca una sesión existente
 */
export async function revokeSession(db: D1Database, token: string): Promise<void> {
  await db.prepare("DELETE FROM admin_sessions WHERE id = ?").bind(token).run();
}

/**
 * Construye la directiva Set-Cookie para la sesión
 */
export function createSessionCookie(token: string, isProduction = true): string {
  const secureFlag = isProduction ? "Secure; " : "";
  return `${COOKIE_NAME}=${token}; Path=/; Max-Age=${SESSION_DURATION_SECONDS}; HttpOnly; ${secureFlag}SameSite=Lax`;
}

/**
 * Construye la directiva Set-Cookie para destruir la sesión
 */
export function createClearCookie(isProduction = true): string {
  const secureFlag = isProduction ? "Secure; " : "";
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; ${secureFlag}SameSite=Lax`;
}
