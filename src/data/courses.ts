export interface Course {
  id: string;
  name: string;
  badge: string;
  isFeatured?: boolean;
  targetAudience: string;
  description: string;
  modality: string;
  location: string;
  duration: string;
  schedule: string;
  statusText: string;
  priceNote: string;
  whatsAppPrompt: string;
  highlights: string[];
  includes: string[];
}

export const coursesData: Course[] = [
  {
    id: "principiantes",
    name: "Taller de Excel para Principiantes",
    badge: "Taller Insignia",
    isFeatured: true,
    targetAudience: "Para quienes nunca abrieron Excel o sienten que se pierden con las fórmulas básicas",
    description: "Aprendé a moverte en la planilla con soltura, organizar tablas sin esfuerzo, usar atajos de teclado clave y dominar las fórmulas cotidianas que te ahorran horas de trabajo.",
    modality: "Presencial con soporte digital",
    location: "Sede UNRN Bariloche",
    duration: "Encuentros intensivos prácticos",
    schedule: "Consultar próxima convocatoria",
    statusText: "Próxima edición en preparación",
    priceNote: "Arancel accesible universitario · Consultar por mensaje",
    whatsAppPrompt: "¡Hola! Quisiera consultar fechas, horarios y arancel para el Taller de Excel para Principiantes.",
    highlights: [
      "Navegación veloz y atajos de teclado esenciales",
      "Fórmulas matemáticas y estadísticas básicas (SUMA, PROMEDIO, CONTAR)",
      "Formato de celdas, filtros y ordenamiento rápido",
      "Compatibilidad total con Microsoft Excel y Google Sheets",
      "Resolución de ejercicios paso a paso en cada encuentro"
    ],
    includes: [
      "Cuaderno de ejercicios prácticos (.xlsx)",
      "Guía descargable de atajos de teclado",
      "Acompañamiento en clase de los 4 profes",
      "Canal de consultas post-taller"
    ]
  },
  {
    id: "intermedio-avanzado",
    name: "Taller de Excel Intermedio: Fórmulas y Datos",
    badge: "Nivel Intermedio",
    isFeatured: false,
    targetAudience: "Para estudiantes y personas que ya usan Excel y necesitan analizar datos o automatizar tareas",
    description: "Llevá tus planillas a otro nivel. Aprendé funciones lógicas avanzadas, búsquedas automáticas con BUSCARV / BUSCARX y el poder de las Tablas Dinámicas para reportes limpios.",
    modality: "Presencial / Modalidad Híbrida",
    location: "Sede UNRN Bariloche",
    duration: "Encuentros intensivos de aplicación",
    schedule: "Consultar calendario de cohortes",
    statusText: "Cupos limitados por edición",
    priceNote: "Arancel universitario · Consultar por mensaje",
    whatsAppPrompt: "¡Hola! Me interesa sumarme a la próxima edición del Taller de Excel Intermedio (Fórmulas y Datos).",
    highlights: [
      "Búsquedas automáticas: BUSCARV, BUSCARX y COINCIDIR",
      "Lógica condicional: SI, Y, O, SI.CONJUNTO y SI.ERROR",
      "Tablas Dinámicas y segmentación interactiva de datos",
      "Gráficos modernos y buenas prácticas de visualización",
      "Automatización de cálculos repetitivos de la vida diaria"
    ],
    includes: [
      "Plantillas modelo editables para la facultad y el trabajo",
      "Casos de estudio basados en escenarios reales",
      "Certificado de participación del taller",
      "Soporte personalizado durante la cursada"
    ]
  },
  {
    id: "talleres-a-medida",
    name: "Capacitaciones Especiales y a Medida",
    badge: "Institucional / Grupal",
    isFeatured: false,
    targetAudience: "Para grupos de estudio, cátedras, equipos de trabajo o áreas administrativas",
    description: "Diseñamos talleres adaptados a las necesidades reales de tu grupo o institución: desde la gestión de planillas administrativas hasta finanzas personales y proyectos.",
    modality: "Presencial (Bariloche) o Virtual en vivo",
    location: "A convenir con la institución",
    duration: "Módulos personalizados",
    schedule: "A coordinar según disponibilidad",
    statusText: "Abierto todo el año",
    priceNote: "Presupuesto adaptado según cantidad de participantes",
    whatsAppPrompt: "¡Hola! Nos gustaría coordinar una capacitación a medida de Excel con su equipo.",
    highlights: [
      "Diagnóstico previo del nivel del grupo",
      "Ejercicios aplicados directamente a las planillas que usan día a día",
      "Dinámica pedagógica interactiva orientada a resolver cuellos de botella",
      "Acompañamiento docente cercano en todo momento"
    ],
    includes: [
      "Temario 100% enfocado en sus objetivos",
      "Materiales y hojas de cálculo diseñadas a medida",
      "Grabación / resúmenes según modalidad"
    ]
  }
];
