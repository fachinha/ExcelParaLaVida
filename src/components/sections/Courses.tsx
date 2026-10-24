import React from "react";
import { coursesData, type Course } from "../../data/courses";
import { getWhatsAppLink } from "../../data/siteConfig";
import { MessageCircle, Check, MapPin, Calendar, BookOpen, Award, ArrowUpRight, Sparkles } from "lucide-react";

interface CoursesProps {
  onOpenEnrollment?: (courseId: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onOpenEnrollment }) => {
  return (
    <section id="cursos" className="py-16 sm:py-24 bg-[#F8FAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#217346] bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300/60">
            Propuesta Académica
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Nuestros Talleres y Cursos
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Propuestas pensadas para cursar sin presiones y con práctica continua. Elegí el nivel que mejor se adapte a tu punto de partida.
          </p>
        </div>

        {/* Grilla de Cursos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {coursesData.map((course: Course) => {
            const isFeatured = course.isFeatured;
            return (
              <div
                key={course.id}
                className={`rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isFeatured
                    ? "bg-white border-2 border-[#217346] shadow-xl relative ring-4 ring-[#217346]/10"
                    : "bg-white border border-slate-200/90 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Banner Destacado Superior si corresponde */}
                {isFeatured && (
                  <div className="bg-[#1C451D] text-white text-xs font-bold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>TALLER INSIGNIA · MÁS POPULAR</span>
                  </div>
                )}

                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  
                  {/* Badge de Nivel y Estado */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                        isFeatured
                          ? "bg-emerald-100 text-[#1C451D]"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {course.badge}
                    </span>
                    <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {course.statusText}
                    </span>
                  </div>

                  {/* Nombre y Público */}
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2 leading-snug">
                    {course.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    🎯 {course.targetAudience}
                  </p>

                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Metadatos: Modalidad, Lugar, Horarios */}
                  <div className="space-y-2 py-4 border-y border-slate-100 text-xs text-slate-700 mb-6 font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#217346] flex-shrink-0" />
                      <span><strong>Lugar:</strong> {course.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#217346] flex-shrink-0" />
                      <span><strong>Modalidad:</strong> {course.modality}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#217346] flex-shrink-0" />
                      <span><strong>Fechas y horarios:</strong> {course.schedule}</span>
                    </div>
                  </div>

                  {/* Lo que vas a aprender */}
                  <div className="space-y-3 mb-6 flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                      Habilidades que te llevás:
                    </span>
                    <ul className="space-y-2">
                      {course.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#217346] flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Qué incluye */}
                  <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100/70 mb-6">
                    <span className="text-[11px] font-bold text-[#1C451D] flex items-center gap-1 mb-2">
                      <Award className="w-3.5 h-3.5 text-[#217346]" />
                      Incluye con tu inscripción:
                    </span>
                    <ul className="grid grid-cols-1 gap-1 text-[11px] text-slate-700">
                      {course.includes.map((inc, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#217346]"></span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Pie de Tarjeta con Arancel y Botón CTA */}
                <div className="p-6 pt-0 bg-white">
                  <div className="mb-3 text-center">
                    <span className="text-xs font-semibold text-slate-500 block">
                      {course.priceNote}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenEnrollment ? onOpenEnrollment(course.id) : (window.location.href = getWhatsAppLink(course.whatsAppPrompt))}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                      isFeatured
                        ? "bg-[#1C451D] hover:bg-[#217346] text-white shadow-md hover:shadow-lg"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    <span>Inscribirme a este taller</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70" />
                  </button>

                  <div className="mt-2 text-center">
                    <a
                      href={getWhatsAppLink(course.whatsAppPrompt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-slate-500 hover:text-emerald-800 inline-flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3 text-[#22C55E]" />
                      <span>o consultar dudas por WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mensaje de Transparencia de Convocatorias */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto">
          💡 Las fechas exactas y aperturas de nuevas cohortes se coordinan periódicamente según el calendario universitario y la demanda de los estudiantes. Escribinos para reservar prioridad de cupo.
        </div>

      </div>
    </section>
  );
};
