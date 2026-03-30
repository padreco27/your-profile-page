import logo from "@/assets/logo-presenca.png";
import { Instagram, Menu, X } from "lucide-react";
import { memo, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#processo", label: "Processo" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Orçamento", special: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <img src={logo} alt="Presença Pro" className="h-7 w-7 dark:invert" />
          <span className="font-heading font-bold text-lg">Presença Pro</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label, special }) => (
            <a key={href} href={href} className={`text-sm font-medium transition-colors ${special ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}>{label}</a>
          ))}
          <div className="flex items-center gap-4 ml-2 pl-6 border-l border-border/50">
            <ThemeToggle />
            <a href="https://www.instagram.com/presenca__pro/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.97]">
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>
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
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-muted-foreground hover:text-foreground"
              >
                {label}
              </a>
            ))}
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

export default memo(Navbar);
