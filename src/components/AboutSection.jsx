import { CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const points = [
    "Expert Pediatric Specialists",
    "24/7 Emergency Child Care",
    "Modern Medical Equipment",
    "Child-Friendly Environment",
    "Compassionate & Caring Staff",
    "Advanced Neonatal Care (NICU)"
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image Side */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Hospital" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Decorative blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl"></div>
            
            {/* Experience Badge */}
            <div className="absolute bottom-10 left-10 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4">
              <div className="text-4xl font-bold text-primary">20+</div>
              <div className="text-sm font-semibold text-gray-600 leading-tight">
                Years of <br /> Excellence
              </div>
            </div>
          </div>

          {/* Right: Content Side */}
          <div className="space-y-8">
            <div>
              <span className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4 block">
                About Bachpan Hospital
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark leading-tight">
                Providing World-Class Care For Your Children
              </h2>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              At Bachpan Hospital, we believe that every child deserves the best possible start in life. Our team of dedicated pediatric specialists provides compassionate, comprehensive care tailored to the unique needs of infants, children, and adolescents.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {points.map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="font-medium text-gray-700">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:-translate-y-1"
              >
                Learn More About Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
