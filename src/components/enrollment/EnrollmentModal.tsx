import React, { useState, useEffect } from "react";
import { X, CheckCircle2, AlertCircle, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import { coursesData } from "../../data/courses";
import { PrivacyModal } from "./PrivacyModal";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourseId?: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  preselectedCourseId
}) => {
  const [courseId, setCourseId] = useState(preselectedCourseId || coursesData[0].id);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // Anti-spam

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ courseName: string; firstName: string } | null>(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  useEffect(() => {
    if (preselectedCourseId) {
      setCourseId(preselectedCourseId);
    }
  }, [preselectedCourseId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !showPrivacyPolicy) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, showPrivacyPolicy]);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setComments("");
    setPrivacyAccepted(false);
    setHoneypot("");
    setErrorMessage(null);
    setSuccessData(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validaciones del cliente
    if (!firstName.trim() || firstName.trim().length < 2) {
      setErrorMessage("Por favor ingresá tu nombre completo.");
      return;
    }

    if (!lastName.trim() || lastName.trim().length < 2) {
      setErrorMessage("Por favor ingresá tu apellido.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Por favor ingresá un correo electrónico válido.");
      return;
    }

    const cleanedPhone = phone.replace(/[\s\-()]/g, "");
    if (cleanedPhone.length < 8) {
      setErrorMessage("Por favor ingresá un número de teléfono o WhatsApp válido.");
      return;
    }

    if (!privacyAccepted) {
      setErrorMessage("Debes aceptar el aviso de privacidad para continuar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          courseId,
          comments: comments.trim(),
          privacyAccepted,
          _hp_company: honeypot
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error al procesar la inscripción.");
      }

      setSuccessData({
        courseName: data.courseName || "Taller seleccionado",
        firstName: firstName.trim()
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "No se pudo conectar con el servidor.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enrollment-modal-title"
      >
        <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#1C451D] px-6 py-4 text-white flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#217346] flex items-center justify-center font-bold text-xs text-white">
                X
              </div>
              <div>
                <h3 id="enrollment-modal-title" className="text-base font-extrabold tracking-tight">
                  Inscripción a Talleres
                </h3>
                <span className="text-[11px] text-emerald-200">
                  Excel Para La Vida
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Cerrar modal de inscripción"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cuerpo */}
          <div className="p-6 overflow-y-auto">
            {successData ? (
              /* Pantalla de Confirmación Exitosa */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1C451D] flex items-center justify-center mx-auto mb-2 shadow-inner">
                  <CheckCircle2 className="w-10 h-10 text-[#22C55E]" />
                </div>

                <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  ¡Inscripción recibida, {successData.firstName}!
                </h4>

                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-left space-y-2 text-xs sm:text-sm text-slate-700">
                  <p className="font-semibold text-[#1C451D]">
                    📚 Taller seleccionado: <span className="font-bold">{successData.courseName}</span>
                  </p>
                  <p>
                    Registramos tus datos con éxito en nuestro sistema. Uno de los cuatro docentes del equipo se pondrá en contacto con vos a la brevedad por WhatsApp o correo para informarte las próximas fechas, horarios de cohorte y cómo asegurar tu lugar.
                  </p>
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-emerald-200/60">
                    💡 Recordá que la vacante se confirma una vez coordinada la cohorte con el equipo.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="w-full bg-[#1C451D] hover:bg-[#217346] text-white py-3 px-6 rounded-xl font-bold text-sm shadow-md transition-all"
                  >
                    Volver al sitio
                  </button>
                </div>
              </div>
            ) : (
              /* Formulario Público */
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                {errorMessage && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-800">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Honeypot invisible contra bots */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="_hp_company">Empresa</label>
                  <input
                    type="text"
                    id="_hp_company"
                    name="_hp_company"
                    tabIndex={-1}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {/* Selector de Curso */}
                <div>
                  <label htmlFor="course-select" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Taller al que te inscribís *
                  </label>
                  <select
                    id="course-select"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#217346] focus:bg-white"
                  >
                    {coursesData.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name} ({course.badge})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nombre y Apellido */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="first-name" className="block text-xs font-bold text-slate-700 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      required
                      placeholder="Ej: Martina"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#217346] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="last-name" className="block text-xs font-bold text-slate-700 mb-1">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      required
                      placeholder="Ej: Gonzalez"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#217346] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Teléfono y Correo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp / Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="Ej: 2944123456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#217346] focus:bg-white"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Para avisarte de la convocatoria
                    </span>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="nombre@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#217346] focus:bg-white"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Para enviarte el material de clase
                    </span>
                  </div>
                </div>

                {/* Comentarios o Dudas */}
                <div>
                  <label htmlFor="comments" className="block text-xs font-bold text-slate-700 mb-1">
                    Comentarios, disponibilidad o dudas (Opcional)
                  </label>
                  <textarea
                    id="comments"
                    rows={2}
                    placeholder="Ej: Estudio Economía en UNRN / No tengo notebook propia / Prefiero turno tarde..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#217346] focus:bg-white resize-none"
                  />
                </div>

                {/* Consentimiento de Privacidad */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-[#217346] border-slate-300 focus:ring-[#217346]"
                    />
                    <span className="text-xs text-slate-600 leading-tight">
                      Acepto el{" "}
                      <button
                        type="button"
                        onClick={() => setShowPrivacyPolicy(true)}
                        className="text-[#1C451D] font-bold underline hover:text-[#217346]"
                      >
                        Aviso de Privacidad
                      </button>{" "}
                      y autorizo al equipo docente de Excel Para La Vida a contactarme para gestionar mi inscripción.
                    </span>
                  </label>
                </div>

                {/* Botón de Envío */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-[#217346]" />
                    <span>Tus datos están protegidos</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 bg-[#1C451D] hover:bg-[#217346] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#22C55E]" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#22C55E]" />
                        <span>Confirmar Inscripción</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>

      {/* Modal Secundario de Política de Privacidad */}
      <PrivacyModal
        isOpen={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
      />
    </>
  );
};
