import { useState, useEffect } from 'react';
import { Heart, ShieldCheck, Users, Siren, Search, FlaskConical, Building2, BookOpen, ChevronRight, AlertTriangle } from 'lucide-react';

const features = [
  { icon: ShieldCheck, label: 'Child-Friendly', sublabel: 'Environment' },
  { icon: Heart, label: 'Safe &', sublabel: 'Secure Care' },
  { icon: Users, label: 'Pediatric', sublabel: 'Experts' },
  { icon: Siren, label: '24/7 Pediatric', sublabel: 'Emergency Care' },
];

import slide1 from '../assets/slide 1.png';
import slide2 from '../assets/slide 2.png';
import slide3 from '../assets/slide 3.png';

const heroImages = [slide1, slide2, slide3];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Slower transition for better loading
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-white via-primary-50/30 to-white overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/3 w-48 h-48 bg-blue-100/40 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 relative z-10">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-primary-100 rounded-full px-4 py-2 shadow-sm">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-700">Trusted Care for Your Little Ones</span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight text-dark">
                Healthy Today,
                <br />
                <span className="text-primary">Happy Tomorrow</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-base leading-relaxed max-w-md">
              Specialized pediatric care with compassion, ensuring a healthy and happy future for your child.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-4 pt-2">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center">
                    <f.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-xs leading-tight">
                    <div className="font-semibold text-gray-800">{f.label}</div>
                    <div className="text-gray-500">{f.sublabel}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#appointment"
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/30"
              >
                <span>📅</span> Book Appointment
              </a>
              <a
                href="#services"
                className="flex items-center gap-2 border-2 border-gray-200 hover:border-primary text-gray-700 hover:text-primary px-7 py-3 rounded-lg text-sm font-semibold transition-all"
              >
                Explore Services <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Image Slider */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-square sm:aspect-[4/5] lg:aspect-square">
              {heroImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Bachpan Hospital Slide ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl transition-opacity duration-1000 ease-in-out ${
                    i === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              ))}
              
              {/* Decorative blobs behind image */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-100/50 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-200/40 rounded-full blur-lg" />
              
              {/* 20+ Years Experience Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-20 flex items-center gap-4 animate-bounce-slow">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">20+</span>
                </div>
                <div>
                  <p className="font-bold text-dark leading-tight">Years</p>
                  <p className="text-xs text-gray-500 font-medium">Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
