import logo from "@/assets/logo-presenca.png";
import { Instagram, MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Presença Pro" className="h-8 w-8 invert" />
        <span className="font-heading font-semibold text-lg">Presença Pro</span>
      </div>
      <div className="flex items-center gap-6">
        <a
          href="https://www.instagram.com/presenca__pro/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="h-5 w-5" />
        </a>
        <a
          href="https://wa.me/5500000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Presença Pro. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
