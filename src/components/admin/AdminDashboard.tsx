import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Download,
  LogOut,
  ExternalLink,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { EnrollmentDetailModal } from "./EnrollmentDetailModal";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminDashboardProps {
  currentUser: AdminUser;
  onLogout: () => void;
  onViewSite: () => void;
}

interface StatsData {
  total: number;
  new: number;
  contacted: number;
  confirmed: number;
  rejected: number;
  cancelled: number;
  byCourse: { id: string; name: string; count: number }[];
}

interface EnrollmentRow {
  id: string;
  course_id: string;
  course_name?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  status: string;
  assigned_to: string | null;
  assigned_name?: string | null;
  created_at: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onLogout,
  onViewSite
}) => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [enrollments, setEnrollments] = useState<EnrollmentRow[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filtros y paginación
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Modal de detalle
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const json = await res.json();
      if (res.ok) setStats(json.stats);
    } catch {
      // Ignora error puntual de stats
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users");
      const json = await res.json();
      if (res.ok) setAdminUsers(json.users || []);
    } catch {
      // Ignora error
    }
  }, []);

  const fetchEnrollments = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (courseFilter) params.set("course_id", courseFilter);
      if (statusFilter) params.set("status", statusFilter);
      params.set("page", String(page));
      params.set("limit", "15");

      const res = await fetch(`/api/admin/enrollments?${params.toString()}`);
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Error al cargar inscriptos.");

      setEnrollments(json.enrollments || []);
      setTotalPages(json.pagination?.totalPages || 1);
      setTotalRecords(json.pagination?.total || 0);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Error al cargar datos.");
    } finally {
      setIsLoading(false);
    }
  }, [search, courseFilter, statusFilter, page]);

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, [fetchStats, fetchUsers]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const handleRefresh = () => {
    fetchStats();
    fetchEnrollments();
  };

  // Exportación segura a archivo CSV en el navegador
  const exportToCSV = () => {
    if (enrollments.length === 0) {
      alert("No hay registros disponibles para exportar.");
      return;
    }

    const headers = ["ID", "Fecha", "Nombre", "Apellido", "Teléfono", "Email", "Curso", "Estado", "Responsable"];
    const rows = enrollments.map((e) => [
      e.id,
      new Date(e.created_at).toISOString(),
      `"${e.first_name.replace(/"/g, '""')}"`,
      `"${e.last_name.replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email}"`,
      `"${(e.course_name || e.course_id).replace(/"/g, '""')}"`,
      e.status,
      `"${(e.assigned_name || "Sin asignar").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inscriptos_excel_para_la_vida_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full text-[11px]">Nueva</span>;
      case "contacted":
        return <span className="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full text-[11px]">Contactado</span>;
      case "confirmed":
        return <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[11px]">Confirmado</span>;
      case "rejected":
        return <span className="bg-rose-100 text-rose-800 font-bold px-2.5 py-0.5 rounded-full text-[11px]">Rechazado</span>;
      case "cancelled":
        return <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-full text-[11px]">Cancelado</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-full text-[11px]">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-900 flex flex-col text-left">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-900/30 flex-shrink-0 shadow-xs">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-[#163A1A] leading-tight">
                EXCEL PARA LA VIDA
              </h1>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Panel Administrativo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            
            <button
              onClick={onViewSite}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1C451D] px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <span>Ver Web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Docente Logueado */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#1C451D] text-white flex items-center justify-center font-bold text-xs">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-slate-500">
                  {currentUser.role}
                </span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>

          </div>

        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Total Inscriptos
            </span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">
              {stats?.total ?? "..."}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Desde el lanzamiento
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs bg-amber-50/20">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
              Nuevas (Sin contactar)
            </span>
            <span className="text-3xl font-black text-amber-900 mt-1 block">
              {stats?.new ?? "..."}
            </span>
            <span className="text-[11px] text-amber-700/80 mt-1 block">
              Requieren primer mensaje
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-blue-200 shadow-xs bg-blue-50/20">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              En Diálogo
            </span>
            <span className="text-3xl font-black text-blue-900 mt-1 block">
              {stats?.contacted ?? "..."}
            </span>
            <span className="text-[11px] text-blue-700/80 mt-1 block">
              Esperando confirmación
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-xs bg-emerald-50/20">
            <span className="text-xs font-bold text-[#1C451D] uppercase tracking-wider block">
              Confirmadas
            </span>
            <span className="text-3xl font-black text-[#1C451D] mt-1 block">
              {stats?.confirmed ?? "..."}
            </span>
            <span className="text-[11px] text-emerald-800/80 mt-1 block">
              Vacantes aseguradas
            </span>
          </div>
        </div>

        {/* Distribución por Curso si hay datos */}
        {stats?.byCourse && stats.byCourse.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#217346]" />
              Distribución por Taller:
            </span>
            {stats.byCourse.map((c) => (
              <span
                key={c.id}
                className="bg-[#F8FAF8] border border-slate-200 px-3 py-1 rounded-xl font-medium text-slate-800"
              >
                {c.name}: <strong>{c.count}</strong>
              </span>
            ))}
          </div>
        )}

        {/* Tabla y Filtros */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Barra de Filtros */}
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Buscador */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre, email o teléfono..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#217346]"
              />
            </div>

            {/* Selectores de Filtro */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="bg-transparent focus:outline-none font-medium text-slate-800"
                >
                  <option value="">Todos los Estados</option>
                  <option value="new">Nuevas</option>
                  <option value="contacted">Contactadas</option>
                  <option value="confirmed">Confirmadas</option>
                  <option value="rejected">Rechazadas</option>
                  <option value="cancelled">Canceladas</option>
                </select>
              </div>

              <div className="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-700">
                <select
                  value={courseFilter}
                  onChange={(e) => {
                    setCourseFilter(e.target.value);
                    setPage(1);
                  }}
                  className="bg-transparent focus:outline-none font-medium text-slate-800"
                >
                  <option value="">Todos los Cursos</option>
                  <option value="principiantes">Principiantes</option>
                  <option value="intermedio-avanzado">Intermedio</option>
                  <option value="talleres-a-medida">A medida</option>
                </select>
              </div>

              <button
                onClick={handleRefresh}
                className="p-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-slate-600 transition-colors"
                title="Actualizar datos"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={exportToCSV}
                className="inline-flex items-center gap-1.5 bg-[#1C451D] hover:bg-[#217346] text-white px-3 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
                title="Exportar a CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exportar CSV</span>
              </button>
            </div>

          </div>

          {/* Tabla de Inscripciones */}
          {errorMessage && (
            <div className="p-4 bg-rose-50 text-rose-800 flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Alumno</th>
                  <th className="py-3 px-4">Taller</th>
                  <th className="py-3 px-4">Contacto</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Responsable</th>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      Cargando inscriptos...
                    </td>
                  </tr>
                ) : enrollments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No se encontraron inscripciones con los filtros actuales.
                    </td>
                  </tr>
                ) : (
                  enrollments.map((enr) => (
                    <tr key={enr.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {enr.first_name} {enr.last_name}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-xs font-medium bg-emerald-50 text-[#1C451D] px-2.5 py-1 rounded-md border border-emerald-200">
                          {enr.course_name || enr.course_id}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${enr.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200"
                            title="Abrir WhatsApp"
                          >
                            <MessageCircle className="w-3 h-3 text-[#22C55E]" />
                            <span>{enr.phone}</span>
                          </a>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {statusBadge(enr.status)}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600">
                        {enr.assigned_name ? (
                          <span className="font-semibold text-slate-800">
                            {enr.assigned_name}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Sin asignar</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                        {new Date(enr.created_at).toLocaleDateString("es-AR")}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedEnrollmentId(enr.id)}
                          className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                        >
                          Ver Ficha
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer de Paginación */}
          <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>
              Mostrando {enrollments.length} de {totalRecords} inscriptos
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="p-1.5 rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-slate-100"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-bold text-slate-700">
                Página {page} de {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="p-1.5 rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-slate-100"
                aria-label="Página siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* Modal de Detalle y Seguimiento */}
      <EnrollmentDetailModal
        enrollmentId={selectedEnrollmentId}
        onClose={() => setSelectedEnrollmentId(null)}
        onUpdated={handleRefresh}
        adminUsers={adminUsers}
      />

    </div>
  );
};
