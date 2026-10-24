import React from "react";
import { Monitor, HelpCircle, FileSpreadsheet, Keyboard } from "lucide-react";

export const Experience: React.FC = () => {
  const experiences = [
    {
      step: "01",
      icon: Monitor,
      title: "Explicación en Proyector + Práctica en tu Notebook",
      description: "El docente presenta el problema en vivo y muestra cómo se construye la fórmula paso a paso. Vos lo vas replicando simultáneamente en tu propia máquina."
    },
    {
      step: "02",
      icon: HelpCircle,
      title: "Asistencia al Instante en tu Banco",
      description: "¿Te faltó cerrar un paréntesis o no te sale una función? Levantás la mano y uno de los 3 docentes que recorren las mesas se acerca a destrabarte sin perder el hilo."
    },
    {
      step: "03",
      icon: FileSpreadsheet,
      title: "Plantillas Reales para Descargar y Practicar",
      description: "No inventamos datos aburridos: trabajamos con listas de precios, balances estudiantiles, registros de asistencia y bases de datos que te sirven para tu día a día."
    },
    {
      step: "04",
      icon: Keyboard,
      title: "Atajos de Teclado Impresos y Digitales",
      description: "Te entregamos la guía rápida de combinaciones clave (Ctrl, Shift, F4, etc.) para que ganes velocidad y sientas que volás navegando tus planillas."
    }
  ];

  const keyboardShortcuts = [
    { keys: "Ctrl + Flechas", label: "Ir al final o inicio del rango al instante" },
    { keys: "Ctrl + Shift + L", label: "Activar o desactivar filtros automáticos" },
    { keys: "F4 (o Fn + F4)", label: "Fijar celdas con el signo $ para arrastrar fórmulas" },
    { keys: "Alt + = (Shift + Alt + =)", label: "Autosuma inmediata de la columna seleccionada" }
  ];

  return (
    <section id="clases" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#217346] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Dinámica del Taller
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Así se vive una clase en Excel Para La Vida
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Una experiencia pensada para que no sientas la presión de un examen, sino el entusiasmo de desbloquear herramientas que te facilitan los estudios y el trabajo.
          </p>
        </div>

        {/* 4 Pasos de la Dinámica */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {experiences.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAF8] rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-emerald-800/40">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 text-[#1C451D] flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Muestra interactiva de Atajos que enseñan */}
        <div className="bg-[#1C451D] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-800/70 border border-emerald-600/40 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 mb-4">
              <Keyboard className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Trucos que cambian tu velocidad de trabajo</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-3">
              Dejar de depender del mouse: el secreto de los profesionales
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6">
              En cada clase practicamos los atajos de teclado clave. Al terminar el taller, manejás la planilla el triple de rápido sin desviar las manos del teclado.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {keyboardShortcuts.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-900/60 border border-emerald-700/50 rounded-xl p-3 flex items-center gap-3 backdrop-blur-sm"
                >
                  <kbd className="bg-emerald-950 border border-emerald-600 text-[#22C55E] text-xs font-mono font-bold px-2 py-1 rounded shadow-xs whitespace-nowrap">
                    {item.keys}
                  </kbd>
                  <span className="text-xs text-emerald-100 font-medium leading-snug">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Decoración de fondo de celdas */}
          <div 
            className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" 
            aria-hidden="true" 
          />
        </div>

      </div>
    </section>
  );
};
