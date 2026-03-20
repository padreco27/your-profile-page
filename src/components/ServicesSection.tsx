import { Globe, Smartphone, Zap, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: Globe,
    title: "Sites Institucionais",
    description: "Presença online profissional que transmite credibilidade e autoridade para o seu negócio.",
  },
  {
    icon: Smartphone,
    title: "Design Responsivo",
    description: "Seu site perfeito em qualquer dispositivo — celular, tablet ou desktop.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Sites rápidos que carregam em segundos. Velocidade é essencial para converter.",
  },
  {
    icon: Palette,
    title: "Design Personalizado",
    description: "Cada projeto é único. Criamos layouts sob medida para a identidade do seu negócio.",
  },
];

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="servicos" className="py-24 md:py-32">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2
            className={`font-heading text-3xl md:text-4xl font-bold tracking-tight text-balance transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`}
          >
            O que fazemos
          </h2>
          <p
            className={`mt-4 text-muted-foreground text-lg transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "100ms" }}
          >
            Tudo que você precisa para ter uma presença online de verdade.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${visible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${150 + i * 80}ms` }}
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
