import { ClipboardList, Layout, Code, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    icon: ClipboardList,
    title: "1. Briefing",
    description: "Entendemos seus objetivos, público-alvo e referências para criar algo único.",
  },
  {
    icon: Layout,
    title: "2. Design",
    description: "Criamos um layout moderno e focado em experiência do usuário (UX).",
  },
  {
    icon: Code,
    title: "3. Desenvolvimento",
    description: "Transformamos o design em um site real, rápido e otimizado.",
  },
  {
    icon: Rocket,
    title: "4. Lançamento",
    description: "Seu site vai ao ar e começamos a atrair novos clientes para você.",
  },
];

const ProcessSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="processo" className="py-24 md:py-32">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className={`font-heading text-3xl md:text-4xl font-bold tracking-tight transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`}>
            Como trabalhamos
          </h2>
          <p className={`mt-4 text-muted-foreground text-lg transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
            Um processo claro e eficiente para garantir o melhor resultado.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
          
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative z-10 flex flex-col items-center text-center transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${200 + i * 150}ms` }}
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/20 border-4 border-background">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
