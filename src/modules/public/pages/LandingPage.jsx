import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import BottomSection from '../components/BottomSection';
import ContactSection from '../components/ContactSection';

export default function LandingPage() {
  return (
    <div className="bg-background">
      <div id="hero"><HeroSection /></div>
      <div id="about"><AboutSection /></div>
      <div id="how-it-works"><HowItWorks /></div>
      <div id="services"><ServicesSection /></div>
      <div id="departments"><BottomSection /></div>
      <div id="contact"><ContactSection /></div>
    </div>
  );
}
