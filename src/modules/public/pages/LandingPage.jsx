import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import BottomSection from '../components/BottomSection';
import ContactSection from '../components/ContactSection';
import ChatWidget from '../components/ChatWidget';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HowItWorks />
      <ServicesSection />
      <BottomSection />
      <ContactSection />
      <ChatWidget />
      <Footer />
    </div>
  );
}
