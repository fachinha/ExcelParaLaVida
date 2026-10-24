import React from "react";
import { siteConfig } from "../../data/siteConfig";
import { ExternalLink, Sparkles, Flame, Bookmark, MessageSquare } from "lucide-react";
import { InstagramIcon } from "../ui/Icons";

export const InstagramCommunity: React.FC = () => {
  const highlights = [
    {
      icon: Flame,
      tag: "Reels & Tips",
      title: "Atajos de teclado que te ahorran 1 hora de trabajo",
      snippet: "Publicamos trucos rápidos paso a paso para que apliques en 30 segundos mientras estás en la computadora."
    },
    {
      icon: Sparkles,
      tag: "Casos Reales",
      title: "Cómo usar BUSCARX sin enredarte con errores",
      snippet: "Explicaciones visuales y didácticas pensadas para estudiantes y profesionales que quieren dejar atrás el viejo BUSCARV."
    },
    {
      icon: Bookmark,
      tag: "Comunidad UNRN",
      title: "Historias y fechas de nuevas cohortes",
      snippet: "Anunciamos las aperturas de inscripción, recordatorios de inicio de clases y cupos disponibles en Bariloche."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F8FAF8] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Columna Izquierda: Identidad de Instagram */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-800/30 shadow-md flex-shrink-0">
                  <img
                    src="/logo.jpg"
                    alt="Logo oficial Excel Para La Vida"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                    {siteConfig.instagram.handle}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Cuenta Oficial en Instagram
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 text-xs text-slate-700 space-y-1.5 shadow-xs font-mono">
                <p>📊 Taller para principiantes</p>
                <p>📍 UNRN | Bariloche</p>
                <p>💡 Trucos, atajos y consejos útiles</p>
                <p>💻 Excel y Google Sheets</p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Seguinos en nuestra red social principal para ver tutoriales en video, avisos de nuevas fechas y consejos semanales para tus planillas.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#E1306C] hover:bg-[#C13584] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Ver perfil en Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href={siteConfig.instagram.dmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>Enviar Mensaje Directo</span>
                </a>
              </div>

            </div>

            {/* Columna Derecha: Tarjetas de Contenido de la Comunidad */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Lo que encontrás en nuestro perfil:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Icon className="w-4 h-4 text-[#217346]" />
                          <span className="text-[10px] font-bold bg-emerald-50 text-[#1C451D] px-2 py-0.5 rounded">
                            {item.tag}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mb-1 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {item.snippet}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Botón interactivo a publicaciones */}
              <div className="bg-emerald-100/60 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                <span>¿Tenés dudas rápidas? Te respondemos directamente por DM de Instagram.</span>
                <a
                  href={siteConfig.instagram.dmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#1C451D] hover:underline whitespace-nowrap ml-2"
                >
                  Abrir chat →
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
