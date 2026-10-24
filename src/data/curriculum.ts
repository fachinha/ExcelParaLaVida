export interface CurriculumModule {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  topics: {
    name: string;
    description: string;
    formulaPreview?: string;
  }[];
  practicalTakeaway: string;
}

export const curriculumModules: CurriculumModule[] = [
  {
    id: "fundamentos",
    number: "01",
    title: "Fundamentos, Estructura y Atajos",
    subtitle: "Para moverte con fluidez y dejar de usar el mouse para todo",
    topics: [
      {
        name: "Anatomía de la planilla y tipos de datos",
        description: "Diferenciar textos, números, fechas y valores lógicos para evitar errores de cálculo típicos."
      },
      {
        name: "Atajos de teclado indispensables",
        description: "Seleccionar rangos enteros (Ctrl+Shift+Flechas), copiar formatos y desplazarte en segundos."
      },
      {
        name: "Referencias relativas y absolutas ($)",
        description: "El secreto para arrastrar fórmulas sin que se rompan las celdas fijadas.",
        formulaPreview: "=$B$2 * C4"
      },
      {
        name: "Filtros y ordenamiento ágil",
        description: "Encontrar la información que necesitás al instante en listas de cientos de filas."
      }
    ],
    practicalTakeaway: "Armarás tu primera planilla estructurada sin perder tiempo en tareas repetitivas."
  },
  {
    id: "operaciones-esenciales",
    number: "02",
    title: "Fórmulas Matemáticas y Estadísticas",
    subtitle: "El corazón numérico de Excel aplicado a situaciones concretas",
    topics: [
      {
        name: "Operaciones aritméticas y porcentajes",
        description: "Cálculo de variaciones porcentuales, descuentos, aumentos e intereses simples.",
        formulaPreview: "=(B3 - B2) / B2"
      },
      {
        name: "SUMA, PROMEDIO, MIN y MAX",
        description: "Resumir volúmenes de datos con precisión en un solo paso.",
        formulaPreview: "=PROMEDIO(D2:D50)"
      },
      {
        name: "CONTAR, CONTARA y CONTAR.BLANCO",
        description: "Llevar inventarios, asistencias y registros de participantes con precisión."
      },
      {
        name: "SUMAR.SI y CONTAR.SI",
        description: "Sumar o contar únicamente aquellos elementos que cumplan una condición específica.",
        formulaPreview: '=SUMAR.SI(A2:A100; "Aprobado"; C2:C100)'
      }
    ],
    practicalTakeaway: "Podrás auditar y resumir cualquier balance, lista de notas o control de gastos."
  },
  {
    id: "logica-condicional",
    number: "03",
    title: "Lógica Condicional y Formato",
    subtitle: "Hacé que tu planilla tome decisiones y avise visualmente",
    topics: [
      {
        name: "Función SI (IF)",
        description: "Aprender a evaluar condiciones lógicas: si pasa X, hacé Y; si no, hacé Z.",
        formulaPreview: '=SI(C2>=6; "Aprobado"; "Desaprobado")'
      },
      {
        name: "Condiciones anidadas y SI.ERROR",
        description: "Evitar los antiestéticos carteles #N/D o #¡VALOR! dejando tus planillas impecables.",
        formulaPreview: '=SI.ERROR(A2/B2; 0)'
      },
      {
        name: "Formato Condicional con reglas",
        description: "Colorear automáticamente celdas con valores críticos, alertas de vencimiento o barras de datos."
      },
      {
        name: "Validación de datos y listas desplegables",
        description: "Bloquear errores de tipeo creando listas para que el usuario elija opciones predefinidas."
      }
    ],
    practicalTakeaway: "Tus tablas serán intuitivas, a prueba de equivocaciones y visualmente claras."
  },
  {
    id: "busqueda-cruce",
    number: "04",
    title: "Búsqueda y Cruce de Tablas",
    subtitle: "Conectá distintas bases de datos sin tener que buscar fila por fila",
    topics: [
      {
        name: "BUSCARV (VLOOKUP) paso a paso",
        description: "Entender cómo funciona la búsqueda vertical y por qué a veces falla (¡y cómo solucionarlo!).",
        formulaPreview: '=BUSCARV(F2; A2:D100; 3; FALSO)'
      },
      {
        name: "La evolución moderna: BUSCARX (XLOOKUP)",
        description: "La función definitiva de Excel: busca hacia la izquierda, maneja errores y no se descalibra.",
        formulaPreview: '=BUSCARX(E2; A2:A50; C2:C50; "No hallado")'
      },
      {
        name: "Funciones de texto útiles (CONCATENAR, DERECHA, IZQUIERDA)",
        description: "Limpiar apellidos, códigos de productos, números de legajo o correos electrónicos."
      },
      {
        name: "Detección de duplicados y conciliaciones",
        description: "Comparar dos listas de alumnos o clientes y detectar qué falta en segundos."
      }
    ],
    practicalTakeaway: "Ahorrarás horas comparando listados y armarás fichas dinámicas de consulta."
  },
  {
    id: "tablas-dinamicas",
    number: "05",
    title: "Tablas Dinámicas y Visualización",
    subtitle: "Transformá filas interminables en reportes ejecutivos limpios",
    topics: [
      {
        name: "Creación y estructura de Tablas Dinámicas",
        description: "Arrastrar campos a Filas, Columnas y Valores para analizar tendencias al instante."
      },
      {
        name: "Segmentación de datos (Slicers) interactiva",
        description: "Botones visuales para filtrar por mes, sucursal, docente o categoría con un solo clic."
      },
      {
        name: "Gráficos recomendados y diseño limpio",
        description: "Cuándo usar barras, líneas o circulares, evitando la sobrecarga visual."
      },
      {
        name: "Google Sheets vs. Excel",
        description: "Exportación, trabajo colaborativo en tiempo real y compatibilidad entre plataformas."
      }
    ],
    practicalTakeaway: "Presentarás información compleja con la claridad de un dashboard profesional."
  }
];
