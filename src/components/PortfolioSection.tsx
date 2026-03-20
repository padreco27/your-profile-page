import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import { useEffect, useRef, useState } from "react";

const projects = [
  { image: portfolio1, title: "Site Corporativo", category: "Institucional" },
  { image: portfolio2, title: "Loja Virtual", category: "E-commerce" },
  { image: portfolio3, title: "Site para Restaurante", category: "Gastronomia" },
];

const PortfolioSection = () => {
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
    <section ref={ref} id="portfolio" className="py-24 md:py-32 bg-secondary/40">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2
            className={`font-heading text-3xl md:text-4xl font-bold tracking-tight text-balance ${visible ? "animate-fade-up" : "opacity-0"}`}
          >
            Nossos projetos
          </h2>
          <p
            className={`mt-4 text-muted-foreground text-lg ${visible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "100ms" }}
          >
            Veja alguns dos sites que já criamos para nossos clientes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group relative overflow-hidden rounded-xl border border-border ${visible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${150 + i * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{project.category}</span>
                  <h3 className="font-heading text-lg font-semibold mt-1">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
