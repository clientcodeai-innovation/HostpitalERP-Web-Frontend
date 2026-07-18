import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Heart, ShieldCheck, Users, Siren, ChevronLeft, ChevronRight, Leaf } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';

import slide1 from "../../../assets/slide 1.png";
import slide2 from "../../../assets/slide 2.png";
import slide3 from "../../../assets/slide 3.png";

const slides = [
  {
    image: slide1,
    tagline: 'Natural Healing for Your Little Ones',
    heading: 'Gentle Care,',
    highlight: 'Natural Cure',
    description: 'Ayurvedic pediatric care with compassion â€” safe, gentle remedies for a healthier childhood.',
  },
  {
    image: slide2,
    tagline: 'Expert Ayurvedic Specialists',
    heading: 'Healing Through',
    highlight: 'Nature\'s Way',
    description: 'Our certified ayurvedic doctors provide personalized constitutional treatment for children and families.',
  },
  {
    image: slide3,
    tagline: '24/7 Emergency & Neonatal Care',
    heading: 'Advanced Care,',
    highlight: 'Holistic Approach',
    description: 'Combining modern diagnostics with classical ayurveda for complete child wellness.',
  },
];

const features = [
  { icon: Leaf, label: 'Ayurvedic', sublabel: 'Remedies' },
  { icon: ShieldCheck, label: 'Child-Friendly', sublabel: 'No Side Effects' },
  { icon: Users, label: 'Expert', sublabel: 'Ayurvedic Doctors' },
  { icon: Siren, label: '24/7 Emergency', sublabel: 'Available' },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + slides.length) % slides.length);
  }, [current, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Image Slider */}
      <div className="relative h-[600px] sm:h-[700px] lg:h-[85vh] min-h-[600px]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              i === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
            }`}
          >
            {/* Background Image */}
            <img src={slide.image} alt={`Slide ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
            {/* Neutral Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <div className={`mb-6 transition-all duration-500 delay-200 ${i === current ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <Badge className="bg-emerald-500/20 backdrop-blur-md text-white border-emerald-400/30 px-4 py-1.5 text-sm">
                      <Leaf className="w-3.5 h-3.5 mr-2 inline-block text-emerald-300" />
                      {slide.tagline}
                    </Badge>
                  </div>

                  <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6 transition-all duration-500 delay-300 ${i === current ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                    {slide.heading}
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-200">
                      {slide.highlight}
                    </span>
                  </h1>

                  <p className={`text-base sm:text-lg text-white/80 max-w-lg mb-8 leading-relaxed transition-all duration-500 delay-[400ms] ${i === current ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                    {slide.description}
                  </p>

                  <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 delay-500 ${i === current ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                    <a href="#appointment">
                      <Button size="lg" className="rounded-full px-8 text-base h-13 group w-full sm:w-auto shadow-lg shadow-emerald-600/30">
                        Book Appointment
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                    <a href="#services">
                      <Button variant="outline" size="lg" className="rounded-full px-8 text-base h-13 w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:text-white bg-white/5 backdrop-blur-sm">
                        Our Treatments
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls - Arrows */}
        <div className="absolute inset-y-0 left-0 right-0 z-20 hidden sm:flex items-center justify-between px-4 sm:px-8 pointer-events-none">
          <button onClick={prevSlide} className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:scale-110" aria-label="Previous slide">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:scale-110" aria-label="Next slide">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Slider Controls - Dots */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="flex items-center justify-center gap-3">
              {slides.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => goToSlide(i)} 
                  className={`pointer-events-auto transition-all duration-300 rounded-full ${i === current ? 'w-10 h-2.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'}`} 
                  aria-label={`Go to slide ${i + 1}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Strip */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 pb-12">
        <div className="bg-card rounded-2xl shadow-xl shadow-black/5 border border-border overflow-hidden">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] divide-x divide-border">
            {[...features, ...features, ...features, ...features].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 py-5 px-6 sm:px-10 group hover:bg-primary/5 transition-colors cursor-default whitespace-nowrap shrink-0">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground leading-tight">{feature.label}</div>
                  <div className="text-xs text-muted-foreground">{feature.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
