import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env, EnrollmentRecord } from "../../../types";
import { jsonResponse, errorResponse } from "../../../utils/validation";
import { getSessionUser } from "../../../utils/auth";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.DB) {
    return errorResponse("Base de datos no configurada.", 500);
  }

  const currentUser = await getSessionUser(request, env.DB);
  if (!currentUser) {
    return errorResponse("Acceso no autorizado.", 401);
  }

  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim() || "";
  const courseId = url.searchParams.get("course_id")?.trim() || "";
  const status = url.searchParams.get("status")?.trim() || "";
  
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10)));
  const offset = (page - 1) * limit;

  // Construcción dinámica de consulta con parámetros seguros
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (search) {
    conditions.push("(e.first_name LIKE ? OR e.last_name LIKE ? OR e.email LIKE ? OR e.phone LIKE ?)");
    const searchWildcard = `%${search}%`;
    params.push(searchWildcard, searchWildcard, searchWildcard, searchWildcard);
  }

  if (courseId) {
    conditions.push("e.course_id = ?");
    params.push(courseId);
  }

  if (status) {
    conditions.push("e.status = ?");
    params.push(status);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  // 1. Conteo total de registros para paginación
  const countSql = `SELECT COUNT(*) as count FROM enrollments e ${whereClause}`;
  const countStmt = env.DB.prepare(countSql);
  const countResult = await (params.length > 0 ? countStmt.bind(...params) : countStmt).first<{ count: number }>();
  const total = countResult?.count || 0;

  // 2. Obtención de inscripciones con nombre de curso y responsable
  const dataSql = `
    SELECT 
      e.id, e.course_id, c.name as course_name,
      e.first_name, e.last_name, e.phone, e.email, e.comments,
      e.status, e.assigned_to, u.name as assigned_name,
      e.privacy_accepted_at, e.created_at, e.updated_at
    FROM enrollments e
    LEFT JOIN courses c ON e.course_id = c.id
    LEFT JOIN admin_users u ON e.assigned_to = u.id
    ${whereClause}
    ORDER BY e.created_at DESC
    LIMIT ? OFFSET ?
  `;

  const queryParams = [...params, limit, offset];
  const listStmt = env.DB.prepare(dataSql).bind(...queryParams);
  const rows = await listStmt.all<EnrollmentRecord>();

  return jsonResponse({
    success: true,
    enrollments: rows.results || [],
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  });
};
