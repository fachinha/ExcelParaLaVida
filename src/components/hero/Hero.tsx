import React from "react";
import { siteConfig, getWhatsAppLink } from "../../data/siteConfig";
import { SpreadsheetDemo } from "./SpreadsheetDemo";
import { MessageCircle, ArrowDown, MapPin, Sparkles, CheckCircle } from "lucide-react";

interface HeroProps {
  onOpenEnrollment?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnrollment }) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-[#F8FAF8] bg-excel-grid">
      
      {/* Glow ambiental verde sutil */}
      <div 
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Copywriting y Llamados a la Acción */}
          <div className="lg:col-span-7 flex flex-col text-left space-y-6">
            
            {/* Badge Institucional Bariloche / UNRN */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-[#163A1A] text-xs font-semibold w-fit shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#217346]" />
              <span>{siteConfig.location}</span>
              <span className="w-1 h-1 rounded-full bg-emerald-600"></span>
              <span className="text-emerald-800 font-bold">Talleres Prácticos</span>
            </div>

            {/* Titular Principal */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Aprendé <span className="text-[#1C451D] underline decoration-[#22C55E] decoration-4 underline-offset-4">Excel</span> para la facultad, el trabajo y la vida.
            </h1>

            {/* Subtítulo / Propuesta de Valor */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              De no saber por dónde empezar a dominar tus planillas. Un equipo de cuatro docentes universitarios jóvenes que te enseñan paso a paso, resolviendo casos reales y con asistencia directa en cada clase.
            </p>

            {/* Lista de beneficios breves */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm text-slate-800 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#217346] flex-shrink-0" />
                <span>Sin fórmulas abstractas ni rodeos teóricos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#217346] flex-shrink-0" />
                <span>4 profes en el aula para resolver tus dudas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#217346] flex-shrink-0" />
                <span>Válido para Microsoft Excel y Google Sheets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#217346] flex-shrink-0" />
                <span>Te llevás plantillas listas para usar</span>
              </div>
            </div>

            {/* Botones de Conversión */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onOpenEnrollment ? onOpenEnrollment() : (window.location.href = getWhatsAppLink())}
                className="inline-flex items-center justify-center gap-2.5 bg-[#1C451D] hover:bg-[#217346] text-white px-6 py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-[#22C55E]" />
                <span>Inscribirme a un Taller</span>
              </button>

              <a
                href="#cursos"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300/80 px-5 py-3.5 rounded-xl font-semibold text-sm shadow-xs hover:border-slate-400 transition-all"
              >
                <span>Conocer los talleres</span>
                <ArrowDown className="w-4 h-4 text-slate-500" />
              </a>
            </div>

            {/* Nota de cercanía */}
            <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Respuesta rápida y personalizada por WhatsApp e Instagram.</span>
            </p>

          </div>

          {/* Columna Derecha: Widget Interactivo de Excel */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Etiqueta flotante */}
              <div className="absolute -top-3 -right-3 z-10 bg-[#1C451D] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md border border-emerald-500/30 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping"></span>
                <span>Así aprendés en clase</span>
              </div>

              {/* Componente interactivo */}
              <SpreadsheetDemo />

            </div>
          </div>

        </div>

        {/* Ticker / Tarjetas de Métricas de Confianza */}
        <div className="mt-14 lg:mt-20 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {siteConfig.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col text-left">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#1C451D] tracking-tight">
                {stat.value}
              </span>
              <span className="font-bold text-sm text-slate-900 mt-0.5">
                {stat.label}
              </span>
              <span className="text-xs text-slate-600 mt-1 leading-snug">
                {stat.description}
              </span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
