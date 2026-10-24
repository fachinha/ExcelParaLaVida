export interface SiteConfig {
  name: string;
  tagline: string;
  subtagline: string;
  institution: string;
  location: string;
  city: string;
  province: string;
  country: string;
  instagram: {
    handle: string;
    url: string;
    dmUrl: string;
    followersApprox: number;
    postsCount: number;
  };
  contact: {
    // Si el equipo cuenta con número de WhatsApp específico, se coloca aquí (ej: '5492944123456')
    // Por defecto se genera enlace para abrir WhatsApp Web / App
    whatsappNumber: string; // editable
    whatsappDefaultMessage: string;
    email: string;
  };
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Excel Para La Vida",
  tagline: "Aprendé Excel para la facultad, el trabajo y la vida.",
  subtagline: "De no saber por dónde empezar a dominar tus planillas. Talleres prácticos, dinámicos y sin vueltas dictados por docentes universitarios jóvenes.",
  institution: "UNRN | Sede Andina",
  location: "Universidad Nacional de Río Negro · Sede Andina",
  city: "San Carlos de Bariloche",
  province: "Río Negro",
  country: "Argentina",
  instagram: {
    handle: "@excel.paralavida",
    url: "https://www.instagram.com/excel.paralavida/",
    dmUrl: "https://ig.me/m/excel.paralavida",
    followersApprox: 200,
    postsCount: 16
  },
  contact: {
    // NOTA PARA EL EQUIPO: Reemplazar por el número de WhatsApp oficial con código de país y área sin espacios ni signos:
    whatsappNumber: "", // Ej: "5492944xxxxxx"
    whatsappDefaultMessage: "¡Hola! Vi la web de Excel Para La Vida y me gustaría consultar información sobre los próximos talleres.",
    email: "excel.paralavida@gmail.com" // Editable por el equipo
  },
  stats: [
    {
      value: "4+",
      label: "Ediciones realizadas",
      description: "Talleres completados con estudiantes universitarios y comunidad"
    },
    {
      value: "100%",
      label: "Práctica en vivo",
      description: "Ejercicios reales desde el minuto cero en cada clase"
    },
    {
      value: "4",
      label: "Profes en el aula",
      description: "Acompañamiento personalizado para que nadie se quede con dudas"
    },
    {
      value: "Excel + Sheets",
      label: "Herramientas",
      description: "Trucos aplicables tanto a Microsoft Excel como a Google Sheets"
    }
  ]
};

/**
 * Genera el enlace directo a WhatsApp con mensaje predeterminado para cada curso
 */
export function getWhatsAppLink(customMessage?: string): string {
  const message = encodeURIComponent(customMessage || siteConfig.contact.whatsappDefaultMessage);
  if (siteConfig.contact.whatsappNumber) {
    return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${message}`;
  }
  // Enlace de consulta directa en caso de no estar cargado el teléfono específico:
  return `https://api.whatsapp.com/send?text=${message}`;
}
