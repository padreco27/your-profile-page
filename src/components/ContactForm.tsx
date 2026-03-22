import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle } from "lucide-react";

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section ref={ref} id="contato" className="py-24 md:py-32 bg-secondary/10">
      <div className="container max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Vamos tirar seu projeto <span className="text-primary">do papel?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Preencha o formulário e entraremos em contato em até 24 horas úteis com uma proposta personalizada.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Atendimento 100% humanizado</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Análise gratuita do seu negócio</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Propostas sob medida</span>
              </div>
            </div>
          </div>

          <div className={`bg-card rounded-2xl border border-border p-8 shadow-xl transition-all duration-700 ${visible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
            {status === "success" ? (
              <div className="text-center py-12 flex flex-col items-center">
                <CheckCircle className="h-16 w-16 text-primary mb-4 animate-in zoom-in duration-500" />
                <h3 className="font-heading text-2xl font-bold mb-2">Mensagem Enviada!</h3>
                <p className="text-muted-foreground">Obrigado pelo contato. Em breve falaremos com você.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-primary font-semibold hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nome completo</label>
                  <input
                    id="name"
                    required
                    placeholder="Como podemos te chamar?"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">E-mail profissional</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="nome@empresa.com.br"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Conte-nos sobre sua ideia</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Quais seus objetivos com o novo site?"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-heading font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.97] shadow-lg shadow-primary/20 disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar solicitação
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
