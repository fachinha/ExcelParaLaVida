import React, { useState } from "react";
import { curriculumModules, type CurriculumModule } from "../../data/curriculum";
import { CheckCircle2, ChevronRight, Code2, Target } from "lucide-react";

export const Curriculum: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(curriculumModules[0].id);

  const activeModule: CurriculumModule =
    curriculumModules.find((m) => m.id === selectedModuleId) || curriculumModules[0];

  return (
    <section id="temario" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#217346] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Ruta de Aprendizaje
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Qué vas a aprender en nuestros talleres?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Un recorrido progresivo diseñado para que adquieras seguridad con las funciones indispensables que todo estudiante y profesional necesita dominar.
          </p>
        </div>

        {/* Layout Interactivo de Módulos: Selector Izquierdo + Detalle Derecho */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navegador de Módulos (Izquierda) */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 block mb-2">
              Seleccioná un bloque para ver el detalle:
            </span>
            {curriculumModules.map((module) => {
              const isSelected = module.id === selectedModuleId;
              return (
                <button
                  key={module.id}
                  onClick={() => setSelectedModuleId(module.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 border flex items-center justify-between group ${
                    isSelected
                      ? "bg-[#1C451D] text-white border-[#1C451D] shadow-md"
                      : "bg-[#F8FAF8] hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-1 rounded-md ${
                        isSelected
                          ? "bg-emerald-800 text-emerald-200"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      MÓDULO {module.number}
                    </span>
                    <div>
                      <h4
                        className={`text-sm font-bold leading-tight ${
                          isSelected ? "text-white" : "text-slate-900 group-hover:text-[#1C451D]"
                        }`}
                      >
                        {module.title}
                      </h4>
                      <p
                        className={`text-xs mt-0.5 line-clamp-1 ${
                          isSelected ? "text-emerald-200" : "text-slate-500"
                        }`}
                      >
                        {module.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      isSelected
                        ? "text-[#22C55E] translate-x-1"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Panel de Contenido del Módulo Seleccionado (Derecha) */}
          <div className="lg:col-span-7 bg-[#F8FAF8] rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-[#217346] bg-emerald-100/70 px-2 py-0.5 rounded">
                    MÓDULO {activeModule.number}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Eje Temático
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {activeModule.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {activeModule.subtitle}
                </p>
              </div>
            </div>

            {/* Lista de temas del módulo */}
            <div className="space-y-4 mb-8">
              {activeModule.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#217346] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        {topic.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {topic.description}
                      </p>

                      {/* Formula preview tag si existe */}
                      {topic.formulaPreview && (
                        <div className="mt-2.5 inline-flex items-center gap-1.5 bg-emerald-50 text-[#1C451D] px-2.5 py-1 rounded-md text-xs font-mono border border-emerald-200">
                          <Code2 className="w-3.5 h-3.5 text-[#217346]" />
                          <span>Fórmula: {topic.formulaPreview}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Conclusión práctica / Lo que te llevás */}
            <div className="bg-emerald-100/60 rounded-xl p-4 border border-emerald-300/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1C451D] text-white flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-[#1C451D] block">
                  Al finalizar este bloque:
                </span>
                <span className="text-slate-800">
                  {activeModule.practicalTakeaway}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
