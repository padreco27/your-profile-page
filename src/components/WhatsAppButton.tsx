import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/+553196851692?text=Ol%C3%A1%21%20Tudo%20bem%3F%20%0A%0AGostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20cria%C3%A7%C3%A3o%20de%20um%20site%20profissional.%0A%0AFiquei%20interessado%28a%29%20no%20trabalho%20de%20voc%C3%AAs%20e%20gostaria%20de%20entender%20melhor%20como%20funciona%20o%20processo%2C%20valores%20e%20prazos.%0A%0AAguardo%20seu%20retorno%20"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/20 active:scale-95 animate-fade-in"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="h-7 w-7 fill-current" />
      <span className="absolute -top-2 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-white text-[10px] text-[#25D366] font-bold items-center justify-center">1</span>
      </span>
    </a>
  );
};

export default WhatsAppButton;
