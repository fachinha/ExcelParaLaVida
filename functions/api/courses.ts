import type { PagesFunction } from "@cloudflare/workers-types";
import type { Env, CourseRecord } from "../types";
import { jsonResponse } from "../utils/validation";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  if (env.DB) {
    try {
      const rows = await env.DB
        .prepare("SELECT id, name, description, badge, modality, is_active FROM courses WHERE is_active = 1 ORDER BY created_at ASC")
        .all<CourseRecord>();

      if (rows.results && rows.results.length > 0) {
        return jsonResponse({
          success: true,
          courses: rows.results
        });
      }
    } catch {
      // Fallback a los datos estáticos si la tabla aún no fue creada
    }
  }

  // Fallback con los 3 cursos iniciales
  return jsonResponse({
    success: true,
    courses: [
      {
        id: "principiantes",
        name: "Taller de Excel para Principiantes",
        badge: "Taller Insignia",
        modality: "Presencial UNRN Bariloche",
        is_active: 1
      },
      {
        id: "intermedio-avanzado",
        name: "Taller de Excel Intermedio: Fórmulas y Datos",
        badge: "Nivel Intermedio",
        modality: "Presencial UNRN Bariloche / Híbrido",
        is_active: 1
      },
      {
        id: "talleres-a-medida",
        name: "Capacitaciones Especiales y a Medida",
        badge: "Institucional / Grupal",
        modality: "Presencial o Virtual",
        is_active: 1
      }
    ]
  });
};
