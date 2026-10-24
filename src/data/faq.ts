export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "cursada" | "inscripcion";
}

export const faqData: FAQItem[] = [
  {
    id: "conocimientos-previos",
    category: "general",
    question: "¿Necesito conocimientos previos para hacer el taller de principiantes?",
    answer: "No, en absoluto. El Taller para Principiantes parte desde cero total: cómo abrir el programa, cómo organizar una planilla limpia y cómo escribir tu primera fórmula paso a paso sin asumir ningún conocimiento previo."
  },
  {
    id: "cuatro-profes",
    category: "cursada",
    question: "¿Por qué son cuatro docentes en el aula?",
    answer: "Es el mayor valor de nuestro proyecto: mientras uno explica un ejercicio en la pantalla grande, los otros tres docentes caminamos por las mesas asistiendo en vivo. Si te trabás con una coma o no encontrás una tecla en tu teclado, no tenés que frenar la clase: te ayudamos al instante."
  },
  {
    id: "lugar-presencial",
    category: "cursada",
    question: "¿Dónde se dictan los talleres presenciales?",
    answer: "Nuestras ediciones presenciales se realizan en la sede de la Universidad Nacional de Río Negro (UNRN) en San Carlos de Bariloche. El aula específica, días y horarios se confirman al momento de publicar la convocatoria de cada edición."
  },
  {
    id: "notebook",
    category: "cursada",
    question: "¿Tengo que llevar mi propia computadora?",
    answer: "Recomendamos traer tu propia notebook para practicar directamente sobre la máquina y teclado que usás en tu día a día. Si no disponés de una, avisanos al momento de consultar para verificar la disponibilidad de equipos en la sede."
  },
  {
    id: "sheets-vs-excel",
    category: "general",
    question: "¿Sirve lo aprendido si uso Google Sheets o trabajo en Mac?",
    answer: "¡Sí, al 100%! La lógica de fórmulas, referencias y funciones de cálculo es idéntica en Excel y en Google Sheets. Durante la clase indicamos las pequeñas equivalencias de atajos tanto para Windows como para Mac."
  },
  {
    id: "materiales",
    category: "cursada",
    question: "¿Qué materiales están incluidos con el taller?",
    answer: "Recibís el cuaderno de ejercicios prácticos (.xlsx) con soluciones guiadas, una ficha descargable con atajos de teclado clave y acceso al canal de consultas para resolver dudas que te surjan después de clase."
  },
  {
    id: "como-inscribirme",
    category: "inscripcion",
    question: "¿Cómo es el proceso de inscripción y pago?",
    answer: "Hacés clic en 'Consultar o Inscribirme' para enviarnos un mensaje directo por WhatsApp o por Instagram DM (@excel.paralavida). Te informamos las fechas de la próxima cohorte, el arancel estudiantil accesible y los medios de pago (transferencia bancaria / Mercado Pago)."
  },
  {
    id: "certificado",
    category: "inscripcion",
    question: "¿Se entrega constancia o certificado de participación?",
    answer: "Sí, todos los participantes que completan las actividades del taller reciben su certificado de participación de Excel Para La Vida para respaldar las horas cursadas en su currículum o ámbito académico."
  }
];
