export interface TeamMember {
  id: string;
  name: string;
  role: string;
  focusArea: string;
  bio: string;
  quote: string;
  avatarPlaceholderText: string;
  skills: string[];
  isPendingInfo?: boolean; // Para que el equipo complete sus nombres/fotos definitivas
}

export const teamData = {
  aboutStory: {
    title: "Cuatro jóvenes apasionados por desmitificar las planillas",
    lead: "Excel Para La Vida nació en las aulas universitarias de Bariloche al notar una realidad compartida: a casi todos nos exigen manejar planillas de cálculo, pero nadie nos enseña a usarlas de manera práctica, accesible y sin frustración.",
    paragraphs: [
      "Vimos a compañeros de facultad pasando horas calculando a mano, a trabajadores administrativos lidiando con formatos rotos y a personas con miedo de tocar una fórmula por miedo a desconfigurar el archivo.",
      "Decidimos unir nuestras fortalezas para crear talleres donde el aprendizaje sea cercano y en equipo: somos cuatro docentes jóvenes en el aula, lo que nos permite caminar entre las mesas, resolver dudas particulares al instante y asegurar que nadie se quede atrás.",
      "Creemos que cuando dominás Excel, dejás de perder tiempo en tareas repetitivas y ganás seguridad para tus estudios, tu empleo y la gestión de tu vida cotidiana."
    ]
  },
  members: [
    {
      id: "profe-1",
      name: "Docente / Coordinador Pedagógico",
      role: "Coordinación y Enfoque Práctico",
      focusArea: "Estructura de datos, dinámica de aula y resolución de problemas",
      bio: "Impulsa el diseño de las clases paso a paso, asegurando que cada concepto se aprenda resolviendo un caso concreto y útil para la vida diaria.",
      quote: "Excel no es difícil: solo te lo explicaron con fórmulas aburridas en vez de problemas reales.",
      avatarPlaceholderText: "Docente 1",
      skills: ["Pedagogía Práctica", "Estructuración de Tablas", "Atajos Clave"],
      isPendingInfo: true
    },
    {
      id: "profe-2",
      name: "Docente / Especialista en Fórmulas",
      role: "Automatización y Lógica",
      focusArea: "Funciones condicionales (SI, BUSCARX), cruce de bases y fórmulas avanzadas",
      bio: "Encargado de demostrar cómo una simple fórmula bien pensada te ahorra tres horas de trabajo manual repetitivo.",
      quote: "Si estás copiando y pegando lo mismo cinco veces, hay una función de Excel que lo hace en un segundo.",
      avatarPlaceholderText: "Docente 2",
      skills: ["BUSCARX & BUSCARV", "Lógica Condicional", "Validación de Datos"],
      isPendingInfo: true
    },
    {
      id: "profe-3",
      name: "Docente / Análisis y Reportes",
      role: "Tablas Dinámicas y Visualización",
      focusArea: "Tablas dinámicas, segmentadores y presentación de información para toma de decisiones",
      bio: "Especialista en transformar planillas pesadas y desordenadas en dashboards limpios y fáciles de interpretar para cualquiera.",
      quote: "Los datos tienen que contarte una historia clara, no marearte con números sin sentido.",
      avatarPlaceholderText: "Docente 3",
      skills: ["Tablas Dinámicas", "Dashboards", "Google Sheets"],
      isPendingInfo: true
    },
    {
      id: "profe-4",
      name: "Docente / Soporte y Tutoría",
      role: "Acompañamiento Personalizado",
      focusArea: "Atención individual en clase, ejercitación guiada y soporte en consultas",
      bio: "Garantiza que el ritmo de la clase sea amigable para todos. Si alguien se traba con una fórmula, ahí está para guiarlo mano a mano.",
      quote: "El mayor logro es ver la cara de alivio de alguien cuando le sale su primera fórmula por sí solo.",
      avatarPlaceholderText: "Docente 4",
      skills: ["Tutoría Mano a Mano", "Resolución de Errores", "Casos Universitarios"],
      isPendingInfo: true
    }
  ]
};
