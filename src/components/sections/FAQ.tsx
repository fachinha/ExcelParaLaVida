import React, { useState } from "react";
import { faqData } from "../../data/faq";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "../../data/siteConfig";

export const FAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([faqData[0].id, faqData[1].id]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#217346] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Dudas Frecuentes
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Todo lo que necesitás saber antes de empezar
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Respondemos con total claridad las preguntas habituales de nuestros estudiantes.
          </p>
        </div>

        {/* Acordeón Accesible */}
        <div className="space-y-3">
          {faqData.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#F8FAF8] border-emerald-300/80 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#217346] focus:ring-inset"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-[#1C451D] text-white rotate-180"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bloque de Contacto si persiste alguna duda */}
        <div className="mt-12 bg-emerald-50 rounded-2xl p-6 border border-emerald-200/80 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#1C451D] text-white flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5 text-[#22C55E]" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                ¿Tenés alguna consulta particular que no figure acá?
              </p>
              <p className="text-xs text-slate-600">
                Escribinos por WhatsApp y te orientamos con gusto.
              </p>
            </div>
          </div>

          <a
            href={getWhatsAppLink("¡Hola! Tengo una duda sobre los talleres de Excel Para La Vida y me gustaría consultarles.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1C451D] hover:bg-[#217346] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs whitespace-nowrap flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#22C55E]" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
