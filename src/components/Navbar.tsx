import logo from "@/assets/logo-presenca.png";
import { Instagram, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <img src={logo} alt="Presença Pro" className="h-7 w-7 invert" />
          <span className="font-heading font-bold text-lg">Presença Pro</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#servicos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Serviços</a>
          <a href="#portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Portfólio</a>
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

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-2" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg animate-fade-in">
          <div className="container py-6 flex flex-col gap-4">
            <a href="#servicos" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">Serviços</a>
            <a href="#portfolio" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">Portfólio</a>
            <a
              href="https://www.instagram.com/presenca__pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground w-fit"
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
