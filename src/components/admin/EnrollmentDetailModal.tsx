import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  MessageCircle,
  Mail,
  Calendar,
  User,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface EnrollmentDetailModalProps {
  enrollmentId: string | null;
  onClose: () => void;
  onUpdated: () => void;
  adminUsers: AdminUserItem[];
}

interface EnrollmentDetail {
  id: string;
  course_id: string;
  course_name?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  comments: string | null;
  status: string;
  assigned_to: string | null;
  assigned_name?: string | null;
  privacy_accepted_at: string;
  created_at: string;
  updated_at: string;
}

interface ContactLogItem {
  id: string;
  enrollment_id: string;
  user_id: string;
  user_name?: string;
  action_type: string;
  notes: string;
  created_at: string;
}

export const EnrollmentDetailModal: React.FC<EnrollmentDetailModalProps> = ({
  enrollmentId,
  onClose,
  onUpdated,
  adminUsers
}) => {
  const [data, setData] = useState<{
    enrollment: EnrollmentDetail;
    contactLogs: ContactLogItem[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Formulario para registrar nuevo contacto
  const [actionType, setActionType] = useState<string>("whatsapp");
  const [notes, setNotes] = useState("");
  const [isSavingLog, setIsSavingLog] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const fetchDetail = useCallback(async () => {
    if (!enrollmentId) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`/api/admin/enrollments/${enrollmentId}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error al cargar ficha.");
      setData(json);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Error de conexión.");
    } finally {
      setIsLoading(false);
    }
  }, [enrollmentId]);

  useEffect(() => {
    if (enrollmentId) {
      fetchDetail();
    }
  }, [enrollmentId, fetchDetail]);

  const handleStatusChange = async (newStatus: string) => {
    if (!enrollmentId || !data) return;
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/enrollments/${enrollmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error("No se pudo actualizar el estado.");
      await fetchDetail();
      onUpdated();
    } catch (err) {
      alert("Error al actualizar el estado: " + String(err));
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleAssigneeChange = async (newAssigneeId: string) => {
    if (!enrollmentId || !data) return;
    try {
      const res = await fetch(`/api/admin/enrollments/${enrollmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assigned_to: newAssigneeId || null })
      });
      if (!res.ok) throw new Error("No se pudo reasignar responsable.");
      await fetchDetail();
      onUpdated();
    } catch (err) {
      alert("Error al reasignar: " + String(err));
    }
  };

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollmentId || !notes.trim()) return;

    setIsSavingLog(true);
    try {
      const res = await fetch("/api/admin/contact-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enrollmentId,
          actionType,
          notes: notes.trim()
        })
      });

      if (!res.ok) throw new Error("No se pudo guardar el registro.");

      setNotes("");
      await fetchDetail();
      onUpdated();
    } catch (err) {
      alert("Error al registrar contacto: " + String(err));
    } finally {
      setIsSavingLog(false);
    }
  };

  if (!enrollmentId) return null;

  const enr = data?.enrollment;

  // Formateador seguro de WhatsApp
  const openWhatsApp = () => {
    if (!enr) return;
    const cleanPhone = enr.phone.replace(/[^0-9]/g, "");
    // Si no incluye código internacional, se sugiere prefijo argentino 549
    const formattedPhone = cleanPhone.startsWith("54") ? cleanPhone : `549${cleanPhone}`;
    const text = encodeURIComponent(
      `¡Hola ${enr.first_name}! Te escribimos del equipo docente de Excel Para La Vida por tu consulta e inscripción para el ${enr.course_name || "Taller de Excel"}. ¿Cómo estás?`
    );

    const proceed = window.confirm(
      `¿Deseas abrir WhatsApp para escribir a ${enr.first_name} ${enr.last_name} (${formattedPhone})?`
    );
    if (proceed) {
      window.open(`https://wa.me/${formattedPhone}?text=${text}`, "_blank");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-left">
        
        {/* Header */}
        <div className="bg-[#1C451D] px-6 py-4 text-white flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-base font-bold">
              Ficha de Inscripto
            </h3>
            <span className="text-xs text-emerald-200">
              ID: {enrollmentId}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {isLoading ? (
            <div className="py-16 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-[#217346]" />
              <span>Cargando datos del alumno...</span>
            </div>
          ) : errorMessage || !enr ? (
            <div className="p-4 bg-rose-50 text-rose-800 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <span>{errorMessage || "No se pudo obtener la información."}</span>
            </div>
          ) : (
            <>
              {/* Tarjeta de Información Principal */}
              <div className="bg-[#F8FAF8] rounded-2xl p-5 border border-slate-200/80 space-y-4">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                  <div>
                    <h4 className="text-lg font-black text-slate-900">
                      {enr.first_name} {enr.last_name}
                    </h4>
                    <span className="text-xs font-semibold text-[#1C451D] bg-emerald-100 px-2 py-0.5 rounded-md mt-1 inline-block">
                      {enr.course_name}
                    </span>
                  </div>

                  {/* Acciones de Contacto Rápido */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={openWhatsApp}
                      className="inline-flex items-center gap-1.5 bg-[#22C55E] hover:bg-[#16a34a] text-slate-950 px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs transition-colors"
                      title="Abrir conversación de WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-slate-950" />
                      <span>WhatsApp</span>
                    </button>

                    <a
                      href={`mailto:${enr.email}?subject=Excel Para La Vida - Información sobre tu taller`}
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl font-semibold text-xs transition-colors"
                    >
                      <Mail className="w-4 h-4 text-slate-600" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>

                {/* Grilla de Datos de Contacto */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-500 block">Teléfono / WhatsApp:</span>
                    <span className="text-slate-900 font-mono text-sm">{enr.phone}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block">Correo Electrónico:</span>
                    <span className="text-slate-900 font-mono text-sm">{enr.email}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block">Fecha de Inscripción:</span>
                    <span className="text-slate-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(enr.created_at).toLocaleString("es-AR")}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block">Aviso de Privacidad:</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Aceptado ({new Date(enr.privacy_accepted_at).toLocaleDateString("es-AR")})
                    </span>
                  </div>
                </div>

                {enr.comments && (
                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="font-bold text-slate-500 block text-xs">Comentarios del Alumno:</span>
                    <p className="text-xs text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200 mt-1 italic">
                      "{enr.comments}"
                    </p>
                  </div>
                )}

              </div>

              {/* Gestión de Estado y Asignación de Docente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Estado de la Inscripción
                  </label>
                  <select
                    value={enr.status}
                    disabled={isUpdatingStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#217346]"
                  >
                    <option value="new">🟡 Nueva (sin contactar)</option>
                    <option value="contacted">🔵 Contactada (en diálogo)</option>
                    <option value="confirmed">🟢 Confirmada (vacante lista)</option>
                    <option value="rejected">🔴 Rechazada / No concretada</option>
                    <option value="cancelled">⚪ Cancelada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Docente Responsable Asignado
                  </label>
                  <select
                    value={enr.assigned_to || ""}
                    onChange={(e) => handleAssigneeChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-[#217346]"
                  >
                    <option value="">-- Sin asignar --</option>
                    {adminUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Formulario: Registrar nuevo contacto realizado */}
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#1C451D] mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#217346]" />
                  <span>Registrar nuevo contacto realizado</span>
                </h5>

                <form onSubmit={handleAddLog} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <select
                      value={actionType}
                      onChange={(e) => setActionType(e.target.value)}
                      className="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-800"
                    >
                      <option value="whatsapp">📱 Mensaje WhatsApp</option>
                      <option value="phone_call">📞 Llamada Telefónica</option>
                      <option value="email">✉️ Correo Electrónico</option>
                      <option value="note">📝 Nota Interna</option>
                    </select>

                    <input
                      type="text"
                      required
                      placeholder="Ej: Se envió temario y consultó por medios de pago..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="sm:col-span-2 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-[#217346]"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSavingLog || !notes.trim()}
                      className="inline-flex items-center gap-1.5 bg-[#1C451D] hover:bg-[#217346] text-white px-4 py-1.5 rounded-xl font-bold text-xs shadow-xs transition-colors disabled:opacity-50"
                    >
                      {isSavingLog ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>Guardar seguimiento</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Línea de tiempo de contactos */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Historial de Seguimiento ({data.contactLogs.length})
                </h5>

                {data.contactLogs.length === 0 ? (
                  <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-xl text-center">
                    Aún no se registraron contactos para esta inscripción.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {data.contactLogs.map((log) => (
                      <div
                        key={log.id}
                        className="bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-slate-500 text-[11px]">
                          <span className="font-bold text-slate-700 flex items-center gap-1">
                            <User className="w-3 h-3 text-[#217346]" />
                            {log.user_name || "Docente"}
                          </span>
                          <span>{new Date(log.created_at).toLocaleString("es-AR")}</span>
                        </div>
                        <p className="text-slate-800">{log.notes}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-5 py-2 rounded-xl text-xs font-bold transition-colors"
          >
            Cerrar Ficha
          </button>
        </div>

      </div>
    </div>
  );
};
