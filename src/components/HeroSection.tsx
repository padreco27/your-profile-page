import heroMockup from "@/assets/hero-mockup.jpg";
import { memo } from "react";
import { Instagram, MessageCircle } from "lucide-react";


const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroMockup} alt="Mockup de sites profissionais" className="w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/10 dark:from-background dark:via-background/90 dark:to-background/60" />
    </div>
    <div className="container relative z-10 py-24 md:py-32">
      <div className="max-w-2xl space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Agência de criação de sites
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-balance animate-fade-up" style={{ animationDelay: "100ms" }}>
          Transforme sua <span className="text-primary italic">presença digital</span> em resultados reais
        </h1>
        <p className="text-lg md:text-xl text-foreground max-w-lg leading-relaxed animate-fade-up" style={{ animationDelay: "200ms" }}>
          Criamos sites profissionais e landing pages de alta performance que convertem visitantes em clientes fiéis para o seu negócio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
          <a href="#contato" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 font-heading font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.97] shadow-lg shadow-primary/20">
            <MessageCircle className="h-5 w-5" />
            Solicitar Orçamento
          </a>
          <a href="#portfolio" className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-8 py-4 font-heading font-semibold text-secondary-foreground transition-all duration-200 hover:bg-muted active:scale-[0.97]">
            Ver Projetos
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default memo(HeroSection);
