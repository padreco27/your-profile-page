import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <>
    <Navbar />
    <HeroSection />
    <ServicesSection />
    <PortfolioSection />
    <ProcessSection />
    <TestimonialsSection />
    <FAQSection />
    <ContactForm />
    <CTASection />
    <Footer />
    <WhatsAppButton />
  </>
);

export default Index;
