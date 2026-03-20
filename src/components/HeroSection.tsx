import heroMockup from "@/assets/hero-mockup.jpg";
import { Instagram, MessageCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroMockup}
          alt="Mockup de sites profissionais"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      </div>

      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-2xl space-y-8">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary animate-fade-up"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Agência de criação de sites
          </div>

          <h1
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-balance animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            Levamos seu negócio para o{" "}
            <span className="text-primary">próximo nível</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            Criamos sites profissionais do zero. Simples, rápido e com design
            que converte visitantes em clientes.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 font-heading font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.97] shadow-lg shadow-primary/20"
            >
              <MessageCircle className="h-5 w-5" />
              Fale conosco
            </a>
            <a
              href="https://www.instagram.com/presenca__pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-8 py-4 font-heading font-semibold text-secondary-foreground transition-all duration-200 hover:bg-muted active:scale-[0.97]"
            >
              <Instagram className="h-5 w-5" />
              @presenca__pro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
