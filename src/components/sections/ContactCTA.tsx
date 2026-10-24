import React from "react";
import { siteConfig, getWhatsAppLink } from "../../data/siteConfig";
import { MessageCircle, Sparkles, MapPin, CheckCircle } from "lucide-react";

interface ContactCTAProps {
  onOpenEnrollment?: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onOpenEnrollment }) => {
  return (
    <section id="contacto" className="py-16 sm:py-24 bg-[#1C451D] text-white relative overflow-hidden bg-excel-grid-dark">
      
      {/* Glow ambiental */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-600/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>Próximas cohortes en Bariloche y formato virtual</span>
        </div>

        {/* Titular */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
          Dejá de pelear con las planillas. <br />
          <span className="text-[#22C55E]">Aprendé a dominarlas con nosotros.</span>
        </h2>

        {/* Descripción */}
        <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
          Sumate a los talleres de Excel Para La Vida. Cuatro docentes en el aula, grupos reducidos, ejercitación práctica desde el primer día y un ambiente universitario relajado.
        </p>

        {/* Garantías de cursada */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-emerald-200">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#22C55E]" />
            <span>Cupos limitados por aula</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#22C55E]" />
            <span>Aranceles accesibles universitarios</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#22C55E]" />
            <span>Materiales y plantillas incluidas</span>
          </div>
        </div>

        {/* Botones de Conversión */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenEnrollment ? onOpenEnrollment() : (window.location.href = getWhatsAppLink())}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#22C55E] hover:bg-[#16a34a] text-slate-950 px-8 py-4 rounded-xl text-base font-extrabold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Completar Formulario de Inscripción</span>
          </button>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-950/80 hover:bg-emerald-900 text-white border border-emerald-600/60 px-6 py-4 rounded-xl text-base font-bold transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5 text-[#22C55E]" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

        {/* Detalle de Sede */}
        <div className="pt-4 text-xs text-emerald-300/80 flex items-center justify-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>{siteConfig.location} · {siteConfig.city}, {siteConfig.province}</span>
        </div>

      </div>
    </section>
  );
};
