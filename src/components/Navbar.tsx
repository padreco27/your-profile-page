import logo from "@/assets/logo-presenca.png";
import { Instagram, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <img src={logo} alt="Presença Pro" className="h-7 w-7 dark:invert" />
          <span className="font-heading font-bold text-lg">Presença Pro</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#servicos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Serviços</a>
          <a href="#portfolio" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Portfólio</a>
          <a href="#processo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Processo</a>
          <a href="#depoimentos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Depoimentos</a>
          <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          <a href="#contato" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-primary font-bold">Orçamento</a>
          
          <div className="flex items-center gap-4 ml-2 pl-6 border-l border-border/50">
            <ThemeToggle />
            <a
              href="https://www.instagram.com/presenca__pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.97]"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="text-foreground p-2" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg animate-fade-in text-center">
          <div className="container py-8 flex flex-col gap-6">
            <a href="#servicos" onClick={() => setOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-foreground">Serviços</a>
            <a href="#portfolio" onClick={() => setOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-foreground">Portfólio</a>
            <a href="#depoimentos" onClick={() => setOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-foreground">Depoimentos</a>
            <a href="#faq" onClick={() => setOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-foreground">FAQ</a>
            <a
              href="https://www.instagram.com/presenca__pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground mx-auto w-full max-w-[200px]"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
