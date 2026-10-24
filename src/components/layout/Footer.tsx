import React from "react";
import { siteConfig, getWhatsAppLink } from "../../data/siteConfig";
import { MessageCircle, MapPin, ArrowUp } from "lucide-react";
import { InstagramIcon } from "../ui/Icons";

const currentYear = new Date().getFullYear();

interface FooterProps {
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 sm:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Columna Marca y Resumen */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/30 flex-shrink-0">
                <img
                  src="/logo.jpg"
                  alt="Logo Excel Para La Vida"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base text-white tracking-tight">
                  EXCEL PARA LA VIDA
                </span>
                <span className="text-[11px] font-semibold text-emerald-400">
                  {siteConfig.institution}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Iniciativa educativa universitaria enfocada en enseñar Microsoft Excel y Google Sheets de manera accesible, práctica y dinámica en San Carlos de Bariloche.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
              <span>{siteConfig.location} · {siteConfig.city}</span>
            </div>
          </div>

          {/* Columna Navegación Rápida */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
              Navegación
            </span>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#propuesta" className="hover:text-white transition-colors">
                  Nuestra Propuesta
                </a>
              </li>
              <li>
                <a href="#cursos" className="hover:text-white transition-colors">
                  Talleres y Cursos
                </a>
              </li>
              <li>
                <a href="#temario" className="hover:text-white transition-colors">
                  Qué vas a aprender
                </a>
              </li>
              <li>
                <a href="#equipo" className="hover:text-white transition-colors">
                  Equipo Docente (4 Profes)
                </a>
              </li>
              <li>
                <a href="#clases" className="hover:text-white transition-colors">
                  Dinámica de Clases
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Columna Contacto Oficial */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
              Canales Oficiales
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Comunicate directamente con el equipo docente para conocer fechas de inicio o coordinar talleres grupales.
            </p>
            
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3.5 py-2 rounded-lg border border-slate-800 transition-colors w-fit"
              >
                <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                <span>Instagram: {siteConfig.instagram.handle}</span>
              </a>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3.5 py-2 rounded-lg border border-slate-800 transition-colors w-fit"
              >
                <MessageCircle className="w-4 h-4 text-[#22C55E]" />
                <span>Consultas por WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Barra de Copyright y Enlaces Legales */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <p>
              © {currentYear} Excel Para La Vida. Todos los derechos reservados.
            </p>
            <span className="hidden sm:inline">·</span>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-300 transition-colors underline cursor-pointer"
            >
              Aviso de Privacidad
            </button>
            <span className="hidden sm:inline">·</span>
            <a
              href="/admin"
              className="hover:text-emerald-400 transition-colors text-slate-600 hover:underline"
              title="Panel Administrativo Docente"
            >
              Acceso Docente
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Volver al inicio de la página"
          >
            <span>Subir al inicio</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
