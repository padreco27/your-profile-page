import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    question: "Quanto tempo leva para criar um site?",
    answer: "O prazo médio para um site institucional é de 7 a 15 dias úteis, dependendo da complexidade e da agilidade no envio do conteúdo pelo cliente.",
  },
  {
    question: "O site será otimizado para celulares?",
    answer: "Sim! Todos os nossos projetos são 100% responsivos, o que significa que se adaptam perfeitamente a qualquer tamanho de tela (celulares, tablets e computadores).",
  },
  {
    question: "Vou precisar pagar mensalidade?",
    answer: "Sim, cobramos uma pequena taxa de manutenção mensal para garantir que seu site esteja sempre seguro e atualizado, além dos custos padrão de hospedagem e domínio anual.",
  },
  {
    question: "O site já vem com SEO para aparecer no Google?",
    answer: "Sim, entregamos o site com as melhores práticas de SEO on-page, garantindo uma estrutura técnica que ajuda o Google a encontrar e ranquear seu negócio.",
  },
];

const FAQSection = () => {
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
    <section ref={ref} id="faq" className="py-24 md:py-32 bg-secondary/20">
      <div className="container max-w-3xl">
        <div className="text-center mb-16">
          <h2 className={`font-heading text-3xl md:text-4xl font-bold tracking-tight transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`}>
            Perguntas Frequentes
          </h2>
          <p className={`mt-4 text-muted-foreground text-lg transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
            Tire suas principais dúvidas sobre o nosso processo.
          </p>
        </div>

        <Accordion type="single" collapsible className={`w-full transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
              <AccordionTrigger className="text-left font-heading hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
