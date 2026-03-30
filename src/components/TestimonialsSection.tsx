import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, User } from "lucide-react";
import { memo } from "react";
import { useInView } from "@/hooks/use-in-view";

const testimonials = [
  {
    name: "Kauan Marques",
    role: "Proprietário de Hamburgueria",
    content: "O que mais me impressionou foi a velocidade de entrega e o design moderno. Meu site agora é o principal canal de vendas direto.",
    rating: 5,
  },
  {
    name: "Carla Ferreira",
    role: "Arquiteta",
    content: "A agência transformou meu portfólio em uma vitrine profissional. O layout é limpo e transmite exatamente a sofisticação que meu trabalho exige.",
    rating: 5,
  },
  {
    name: "João Mendes",
    role: "Consultor de Vendas",
    content: "Excelente suporte e atendimento. O site foi otimizado para SEO e hoje já recebo muitos leads qualificados vindos do Google.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const { ref, inView: visible } = useInView({ threshold: 0.1 });
  return (
    <section ref={ref} id="depoimentos" className="py-24 md:py-32 overflow-hidden">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className={`font-heading text-3xl md:text-4xl font-bold tracking-tight transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`}>O que dizem nossos clientes</h2>
          <p className={`mt-4 text-muted-foreground text-lg transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
            A confiança é o que move nossos projetos e parcerias.
          </p>
        </div>
        <div className={`relative px-12 transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
          <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 p-4">
                  <div className="h-full rounded-2xl border border-border bg-card p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                    <div>
                      <div className="flex gap-1 mb-4 text-yellow-500">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic mb-6">"{t.content}"</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm">{t.name}</h4>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default memo(TestimonialsSection);
