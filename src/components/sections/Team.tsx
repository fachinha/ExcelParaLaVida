import React from "react";
import { teamData } from "../../data/team";
import { GraduationCap, Quote, HeartHandshake, CheckCircle } from "lucide-react";

export const Team: React.FC = () => {
  return (
    <section id="equipo" className="py-16 sm:py-24 bg-[#F8FAF8] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#217346] bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300/60">
            Docencia Universitaria Joven
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Conocé a los 4 docentes detrás del proyecto
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Creemos en la enseñanza cercana, de pares a pares. Somos un equipo de cuatro jóvenes que combinamos rigor técnico, pedagogía práctica y mucha paciencia para acompañar tu aprendizaje.
          </p>
        </div>

        {/* Historia Institucional Editorial */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#1C451D] flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {teamData.aboutStory.title}
              </h3>
              <p className="text-sm font-semibold text-[#1C451D] leading-relaxed">
                {teamData.aboutStory.lead}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3.5 text-sm text-slate-600 leading-relaxed border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-8">
              {teamData.aboutStory.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-[#1C451D]">
                <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5 text-[#217346]" />
                  <span>Dinámica 4 Profes en Clase</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#217346]" />
                  <span>Paciencia y Cercanía Total</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Fichas Editoriales de los 4 Integrantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamData.members.map((member, idx) => {
            return (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  
                  {/* Foto / Placeholder Editorial */}
                  <div className="relative w-full aspect-square rounded-xl bg-gradient-to-br from-emerald-900 to-[#1C451D] flex flex-col items-center justify-center text-white mb-5 overflow-hidden shadow-inner group">
                    <div className="w-16 h-16 rounded-full bg-emerald-800/80 border border-emerald-600/40 flex items-center justify-center text-emerald-100 font-bold text-lg mb-2">
                      0{idx + 1}
                    </div>
                    <span className="text-xs font-semibold tracking-wider text-emerald-200 uppercase">
                      Docente Equipo
                    </span>
                    <span className="text-[11px] text-emerald-300/80 mt-0.5">
                      Excel Para La Vida
                    </span>
                  </div>

                  {/* Rol y Área de Foco */}
                  <span className="text-[11px] font-bold text-[#217346] bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md inline-block mb-2">
                    {member.role}
                  </span>

                  <h4 className="text-base font-extrabold text-slate-900 mb-1">
                    {member.name}
                  </h4>

                  <p className="text-xs text-slate-500 mb-3 font-medium">
                    🎯 {member.focusArea}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {member.bio}
                  </p>

                </div>

                <div>
                  {/* Cita del Docente */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] italic text-slate-600 mb-4 relative">
                    <Quote className="w-3.5 h-3.5 text-emerald-600 inline mr-1 opacity-70" />
                    "{member.quote}"
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Nota Transparente para la integración final */}
        <div className="mt-10 bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-center max-w-2xl mx-auto">
          <p className="text-xs text-emerald-950 font-medium">
            📸 <strong>Nota para el equipo:</strong> La sección está lista para incorporar los nombres completos y fotografías de los cuatro docentes tan pronto como se suministren los archivos finales de alta resolución.
          </p>
        </div>

      </div>
    </section>
  );
};
