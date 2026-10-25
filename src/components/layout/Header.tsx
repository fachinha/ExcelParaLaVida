import React, { useState, useEffect } from "react";
import { siteConfig, getWhatsAppLink } from "../../data/siteConfig";
import { Menu, X, MessageCircle } from "lucide-react";
import { InstagramIcon } from "../ui/Icons";

interface HeaderProps {
  onOpenEnrollment?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnrollment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Propuesta", href: "#propuesta" },
    { name: "Cursos", href: "#cursos" },
    { name: "Temario", href: "#temario" },
    { name: "El Equipo", href: "#equipo" },
    { name: "Cómo son las clases", href: "#clases" },
    { name: "Preguntas", href: "#faq" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-950/10 py-3"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-200/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo y Nombre */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#217346] rounded-lg p-1"
            aria-label="Excel Para La Vida - Inicio"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-emerald-900/20 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
              <img
                src="/logo.jpg"
                alt="Logo Excel Para La Vida"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#163A1A] leading-none group-hover:text-[#217346] transition-colors">
                EXCEL PARA LA VIDA
              </span>
            </div>
          </a>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#217346] transition-colors focus:outline-none focus:ring-2 focus:ring-[#217346] rounded-md px-1 py-0.5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Botones de acción Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-600 hover:text-[#E1306C] hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#217346]"
              aria-label="Instagram oficial @excel.paralavida"
              title="Visitar Instagram @excel.paralavida"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>

            <button
              onClick={() => onOpenEnrollment ? onOpenEnrollment() : (window.location.href = getWhatsAppLink())}
              className="inline-flex items-center gap-2 bg-[#1C451D] hover:bg-[#217346] text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#217346] focus:ring-offset-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#22C55E]" />
              <span>Inscribirme</span>
            </button>
          </div>

          {/* Botón Menú Móvil */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#217346]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-700 hover:text-[#217346] hover:bg-emerald-50/60 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenEnrollment) onOpenEnrollment();
                }}
                className="flex items-center justify-center gap-2 bg-[#1C451D] text-white px-4 py-3 rounded-xl font-bold shadow-sm"
              >
                <MessageCircle className="w-5 h-5 text-[#22C55E]" />
                <span>Inscribirme a un Taller</span>
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-slate-700 bg-slate-100 px-4 py-2.5 rounded-xl font-medium"
              >
                <span>Consultar por WhatsApp</span>
              </a>

              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-slate-700 bg-slate-100 px-4 py-2.5 rounded-xl font-medium"
              >
                <InstagramIcon className="w-5 h-5 text-[#E1306C]" />
                <span>Seguinos en @excel.paralavida</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
