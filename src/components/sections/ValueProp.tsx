import React from "react";
import { Users2, Laptop, Lightbulb, Zap, ShieldCheck } from "lucide-react";

export const ValueProp: React.FC = () => {
  const pillars = [
    {
      icon: Lightbulb,
      title: "Entender la lógica, no memorizar de memoria",
      badge: "Pedagogía Clara",
      description: "No te llenamos de fórmulas sueltas que olvidás al día siguiente. Te enseñamos a pensar la estructura de tus datos para que sepas qué función aplicar ante cualquier problema nuevo."
    },
    {
      icon: Users2,
      title: "Cuatro profes en el aula con vos",
      badge: "Acompañamiento Real",
      description: "Mientras un docente guía el tema en la pantalla central, los otros tres caminamos por las mesas. Nadie se queda trabado con un error de tipeo o una coma fuera de lugar."
    },
    {
      icon: Laptop,
      title: "Aprender haciendo sobre casos reales",
      badge: "100% Práctico",
      description: "Abrís tu propia computadora y trabajás desde el minuto uno sobre presupuestos, listas de alumnos, inventarios y finanzas personales que podés usar ese mismo día."
    },
    {
      icon: Zap,
      title: "Atajos y trucos que te ahorran horas",
      badge: "Productividad",
      description: "El verdadero poder de Excel está en saber moverse rápido. Aprendé combinaciones de teclas y atajos clave para hacer en 10 segundos lo que antes te llevaba media tarde."
    }
  ];

  return (
    <section id="propuesta" className="py-16 sm:py-24 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#217346] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Nuestra Metodología
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Por qué aprender Excel con nosotros?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Eliminamos el miedo a las planillas con un método pensado por y para estudiantes, graduados y trabajadores: práctico, sin tecnicismos innecesarios y con soporte constante.
          </p>
        </div>

        {/* Grilla de 4 Pilares */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAF8] rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-[#1C451D] flex items-center justify-center group-hover:bg-[#1C451D] group-hover:text-white transition-colors duration-200 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-white border border-emerald-200/70 px-2 py-0.5 rounded-md">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#1C451D] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fila de Transparencia y Honestidad */}
        <div className="mt-10 bg-emerald-50/60 rounded-xl p-4 sm:p-5 border border-emerald-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-full bg-[#1C451D] text-white flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Compromiso de honestidad educativa
              </p>
              <p className="text-xs text-slate-600">
                No prometemos fórmulas mágicas ni resultados irreales. Te garantizamos acompañamiento sincero, contenido ordenado y práctica constante para que ganes autonomía real.
              </p>
            </div>
          </div>
          <a
            href="#cursos"
            className="text-xs sm:text-sm font-bold text-[#1C451D] hover:text-[#217346] underline whitespace-nowrap flex-shrink-0"
          >
            Ver talleres disponibles →
          </a>
        </div>

      </div>
    </section>
  );
};
