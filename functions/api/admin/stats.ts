import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env } from "../../types";
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

  // 1. Estadísticas generales por estado
  const statsQuery = `
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as total_new,
      SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) as total_contacted,
      SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as total_confirmed,
      SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as total_rejected,
      SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as total_cancelled
    FROM enrollments
  `;
  const statsResult = await env.DB.prepare(statsQuery).first<{
    total: number;
    total_new: number;
    total_contacted: number;
    total_confirmed: number;
    total_rejected: number;
    total_cancelled: number;
  }>();

  // 2. Distribución por curso
  const courseDistributionQuery = `
    SELECT 
      c.id, c.name,
      COUNT(e.id) as count
    FROM courses c
    LEFT JOIN enrollments e ON c.id = e.course_id
    GROUP BY c.id, c.name
    ORDER BY count DESC
  `;
  const courseRows = await env.DB.prepare(courseDistributionQuery).all<{
    id: string;
    name: string;
    count: number;
  }>();

  return jsonResponse({
    success: true,
    stats: {
      total: statsResult?.total || 0,
      new: statsResult?.total_new || 0,
      contacted: statsResult?.total_contacted || 0,
      confirmed: statsResult?.total_confirmed || 0,
      rejected: statsResult?.total_rejected || 0,
      cancelled: statsResult?.total_cancelled || 0,
      byCourse: courseRows.results || []
    }
  });
};
