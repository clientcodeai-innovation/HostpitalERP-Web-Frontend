import { CheckCircle2, Leaf } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';

export default function AboutSection() {
  const points = [
    "Expert Ayurvedic Doctors",
    "Gentle, Side-Effect Free Care",
    "Constitutional Treatments",
    "Pediatric Immunity Building",
    "Compassionate & Caring Staff",
    "Holistic Healing Approach"
  ];

  return (
    <section id="about" className="py-24 bg-background overflow-hidden border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image Side */}
          <div className="relative animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl border border-border/50">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Clinic" 
                className="w-full h-[500px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>

            
            {/* Experience Badge */}
            <div className="absolute bottom-8 left-8 bg-card/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-border z-20 flex items-center gap-4">
              <div className="text-4xl font-extrabold text-primary flex items-center"><Leaf className="w-8 h-8 mr-2" /> 20+</div>
              <div className="text-sm font-semibold text-foreground leading-tight">
                Years of <br /> Natural Healing
              </div>
            </div>
          </div>

          {/* Right: Content Side */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
            <div>
              <Badge variant="outline" className="mb-4">
                About Bachpan Hospital
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
                Natural, Gentle Care For Your Children
              </h2>
            </div>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              At Bachpan Hospital, we believe in healing from within. Our team of expert ayurvedic doctors provides personalized constitutional treatment tailored to the unique needs of infants, children, and adolescents, ensuring a healthy foundation without harsh side effects.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {points.map((point, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium text-foreground text-sm">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button size="lg" className="rounded-full px-8">
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
