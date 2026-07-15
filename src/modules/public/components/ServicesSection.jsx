import { Calendar, Siren, Syringe, Video, Leaf, Stethoscope, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';

const services = [
  {
    icon: Stethoscope,
    title: 'Homeopathic OPD',
    desc: 'Constitutional case-taking and personalized homeopathic treatment plans.',
    colorClass: 'text-emerald-600 bg-emerald-500/10',
  },
  {
    icon: Siren,
    title: 'Emergency & Acute Care',
    desc: '24/7 priority care with integrated homeopathic first-aid remedies.',
    colorClass: 'text-red-500 bg-red-500/10',
  },
  {
    icon: Syringe,
    title: 'Vaccination & Immunization',
    desc: "Complete immunization tracking with homeopathic post-vaccine support.",
    colorClass: 'text-amber-600 bg-amber-500/10',
  },
  {
    icon: Video,
    title: 'Video Consultation',
    desc: 'Remote homeopathic consultation from the comfort of your home.',
    colorClass: 'text-teal-500 bg-teal-500/10',
  },
  {
    icon: Leaf,
    title: 'Constitutional Treatment',
    desc: 'Deep-acting remedies based on complete case analysis and miasm study.',
    colorClass: 'text-green-600 bg-green-500/10',
  },
  {
    icon: Calendar,
    title: 'Pediatric & Neonatal',
    desc: 'Gentle, safe homeopathic care for newborns, infants, and children.',
    colorClass: 'text-sky-500 bg-sky-500/10',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Badge variant="outline" className="mb-4">
            <Leaf className="w-3.5 h-3.5 mr-1.5 inline-block" />
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">Holistic Healthcare Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive homeopathic & pediatric care blending classical remedies with modern diagnostics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Card key={i} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border/50">
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.colorClass}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </CardContent>
              <CardFooter>
                <a href="#appointment" className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
