import React, { useEffect } from "react";
import { X, ShieldCheck, Mail, MapPin } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1C451D] px-6 py-4 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
            <h3 id="privacy-modal-title" className="text-base font-bold">
              Aviso de Privacidad y Protección de Datos
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Cerrar aviso de privacidad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium">
            En <strong>Excel Para La Vida</strong> valoramos y respetamos tu privacidad. Tus datos son recopilados únicamente para coordinar tu participación en los talleres y nunca serán vendidos ni transferidos a terceros.
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
              1. Responsable del Tratamiento
            </h4>
            <p>
              El equipo docente de <strong>Excel Para La Vida</strong>, con actividades presenciales en {siteConfig.location} ({siteConfig.city}, {siteConfig.province}, Argentina), es el responsable del resguardo y gestión de los datos proporcionados.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
              2. Datos que Solicitamos y Finalidad
            </h4>
            <p className="mb-2">
              Solicitamos exclusivamente la información indispensable para la gestión de las inscripciones:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Nombre y Apellido:</strong> para confeccionar las listas de clase y constancias de participación.</li>
              <li><strong>Teléfono / WhatsApp:</strong> para confirmar disponibilidad de vacante, avisarte de las próximas fechas e invitarte al canal de cursada.</li>
              <li><strong>Correo Electrónico:</strong> para remitir las planillas modelo (.xlsx), cuadernos de ejercitación y resúmenes.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
              3. Almacenamiento y Seguridad
            </h4>
            <p>
              La información se conserva en una base de datos segura cifrada (Cloudflare D1) bajo controles de acceso estrictos restringidos únicamente a los cuatro integrantes del equipo docente. No publicamos listados abiertos ni divulgamos tus datos.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
              4. Tus Derechos (Acceso, Rectificación y Cancelación)
            </h4>
            <p>
              Conforme a la Ley Nacional de Protección de Datos Personales N.º 25.326, tenés derecho a consultar qué información tenemos registrada, solicitar correcciones o pedir la eliminación definitiva de tus datos en cualquier momento.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#217346]" />
              <span>Contacto: {siteConfig.contact.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#217346]" />
              <span>{siteConfig.city}, {siteConfig.province}</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="bg-[#1C451D] hover:bg-[#217346] text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[#217346]"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
