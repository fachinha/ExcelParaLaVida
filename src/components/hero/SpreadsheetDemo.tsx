import React, { useState } from "react";
import { CheckCircle2, Play, Sparkles, Table } from "lucide-react";

interface SheetTab {
  id: string;
  name: string;
  formula: string;
  activeCell: string;
  columns: string[];
  rows: { [key: string]: string | number }[];
  highlightRowIndex?: number;
  calculationExplanation: string;
}

export const SpreadsheetDemo: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState("alumnos");
  const [isCalculated, setIsCalculated] = useState(true);

  const tabs: SheetTab[] = [
    {
      id: "alumnos",
      name: "🎓 Cursada UNRN",
      activeCell: "D4",
      formula: '=SI(PROMEDIO(B4:C4)>=6; "Aprobado"; "Recupera")',
      calculationExplanation: "Función SI + PROMEDIO: evalúa automáticamente la condición académica del estudiante",
      columns: ["A: Estudiante", "B: Parcial 1", "C: Parcial 2", "D: Estado"],
      rows: [
        { col0: "Martina V.", col1: 8, col2: 9, col3: "Aprobado" },
        { col0: "Joaquín B.", col1: 7, col2: 6, col3: "Aprobado" },
        { col0: "Camila R.", col1: 4, col2: 8, col3: "Aprobado" },
        { col0: "Santiago M.", col1: 5, col2: 4, col3: "Recupera" },
      ]
    },
    {
      id: "presupuesto",
      name: "💰 Finanzas & Vida",
      activeCell: "C5",
      formula: "=SUMA(C2:C4)",
      calculationExplanation: "Fórmula de SUMA rápida: calculá gastos fijos y balance mensual en un segundo",
      columns: ["A: Concepto", "B: Categoría", "C: Importe ($)", "D: Estado"],
      rows: [
        { col0: "Alquiler dpto", col1: "Fijo", col2: 120000, col3: "Pagado" },
        { col0: "Supermercado", col1: "Variable", col2: 65000, col3: "Pagado" },
        { col0: "Apuntes y libros", col1: "Estudio", col2: 18000, col3: "Pendiente" },
        { col0: "TOTAL MENSUAL", col1: "Resumen", col2: 203000, col3: "Balance OK" },
      ]
    },
    {
      id: "laboral",
      name: "💼 Cruce con BUSCARX",
      activeCell: "D2",
      formula: '=BUSCARX(B2; Legajos!A:A; Legajos!C:C; "No hallado")',
      calculationExplanation: "BUSCARX moderna: cruzá dos tablas automáticamente sin errores ni complicaciones",
      columns: ["A: Legajo", "B: Empleado", "C: Sector", "D: Turno"],
      rows: [
        { col0: "LEG-104", col1: "Valeria Gomez", col2: "Administración", col3: "Mañana" },
        { col0: "LEG-105", col1: "Lucas Morales", col2: "Logística", col3: "Tarde" },
        { col0: "LEG-106", col1: "Elena Soria", col2: "Finanzas", col3: "Mañana" },
        { col0: "LEG-107", col1: "Pablo Diaz", col2: "Atención", col3: "Tarde" },
      ]
    }
  ];

  const currentTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const toggleCalculate = () => {
    setIsCalculated(false);
    setTimeout(() => {
      setIsCalculated(true);
    }, 300);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden flex flex-col transition-all duration-300">
      
      {/* Barra superior estilo Excel */}
      <div className="bg-[#1C451D] px-4 py-2.5 flex items-center justify-between text-white border-b border-emerald-950/20">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#217346] flex items-center justify-center font-bold text-xs shadow-inner">
            X
          </div>
          <span className="font-semibold text-xs tracking-wide text-emerald-100 flex items-center gap-1.5">
            Excel_Para_La_Vida_Clase01.xlsx
            <span className="text-[10px] bg-emerald-700/60 px-1.5 py-0.5 rounded text-emerald-200">
              Práctica en Vivo
            </span>
          </span>
        </div>
        
        <div className="flex items-center gap-1 text-[11px] text-emerald-200">
          <span className="hidden sm:inline">Modo Interactivo</span>
          <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
        </div>
      </div>

      {/* Pestañas de Hojas */}
      <div className="bg-slate-100/90 px-3 pt-2 flex gap-1 border-b border-slate-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTabId(tab.id);
              setIsCalculated(true);
            }}
            className={`px-3.5 py-1.5 rounded-t-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTabId === tab.id
                ? "bg-white text-[#1C451D] font-bold shadow-xs border-t-2 border-t-[#217346] border-x border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <Table className="w-3 h-3 text-[#217346]" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Barra de Fórmulas (fx) */}
      <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex items-center gap-2 text-xs font-mono">
        <div className="bg-white border border-slate-300 rounded px-2 py-1 font-bold text-[#1C451D] min-w-[3rem] text-center shadow-xs">
          {currentTab.activeCell}
        </div>
        <div className="text-slate-400 font-bold px-1 select-none">
          fx
        </div>
        <div className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-800 overflow-x-auto shadow-xs flex items-center justify-between">
          <span className="truncate">{currentTab.formula}</span>
          <button
            onClick={toggleCalculate}
            title="Evaluar fórmula"
            className="ml-2 flex items-center gap-1 text-[11px] bg-emerald-50 hover:bg-emerald-100 text-[#1C451D] font-sans font-semibold px-2 py-0.5 rounded border border-emerald-300 flex-shrink-0 transition-colors"
          >
            <Play className="w-2.5 h-2.5 fill-current text-[#22C55E]" />
            Probar
          </button>
        </div>
      </div>

      {/* Grid de Celdas */}
      <div className="p-3 sm:p-4 overflow-x-auto">
        <div className="min-w-[480px]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="w-8 py-2 px-1 text-center font-mono text-[10px] text-slate-500 border-r border-slate-200">
                  #
                </th>
                {currentTab.columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="py-2 px-3 font-semibold text-slate-700 border-r border-slate-200/80 last:border-r-0"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTab.rows.map((row, rIdx) => {
                const isTotalRow = String(row.col0).includes("TOTAL");
                return (
                  <tr
                    key={rIdx}
                    className={`border-b border-slate-100 transition-colors ${
                      isTotalRow
                        ? "bg-emerald-50/70 font-bold text-slate-900"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="py-2 px-1 text-center font-mono text-[10px] text-slate-400 bg-slate-50/50 border-r border-slate-200">
                      {rIdx + 1}
                    </td>
                    <td className="py-2 px-3 font-medium text-slate-800 border-r border-slate-100">
                      {row.col0}
                    </td>
                    <td className="py-2 px-3 text-slate-600 border-r border-slate-100 font-mono">
                      {row.col1}
                    </td>
                    <td className="py-2 px-3 text-slate-700 border-r border-slate-100 font-mono">
                      {typeof row.col2 === "number"
                        ? `$${row.col2.toLocaleString("es-AR")}`
                        : row.col2}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-100">
                      {isCalculated ? (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            row.col3 === "Aprobado" || row.col3 === "Pagado" || row.col3 === "Balance OK" || String(row.col3).includes("Mañana")
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {row.col3}
                        </span>
                      ) : (
                        <span className="text-slate-400 animate-pulse text-[11px]">
                          Calculando...
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explicación didáctica al pie */}
      <div className="bg-emerald-50/80 px-4 py-2.5 border-t border-emerald-100 text-xs text-emerald-900 flex items-center gap-2">
        <span className="font-bold text-[#1C451D] flex items-center gap-1 flex-shrink-0">
          💡 En clase:
        </span>
        <span className="text-slate-700">
          {currentTab.calculationExplanation}
        </span>
      </div>

    </div>
  );
};
