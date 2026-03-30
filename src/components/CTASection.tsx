
import { MessageCircle } from "lucide-react";
import { memo } from "react";
import { useInView } from "@/hooks/use-in-view";

const CTASection = () => {
  const { ref, inView: visible } = useInView({ threshold: 0.3 });
  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="container">
        <div className={`relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-12 md:p-20 text-center ${visible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance max-w-2xl mx-auto">
            Pronto para colocar seu negócio <span className="text-primary">na internet?</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-lg mx-auto">
            Entre em contato e receba um orçamento personalizado para o seu projeto. Sem compromisso.
          </p>
          <a
            href="https://wa.me/+553196851692"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-10 py-4 font-heading font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.97] shadow-lg shadow-primary/20"
          >
            <MessageCircle className="h-5 w-5" />
            Solicitar orçamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(CTASection);
