import React from 'react';
import { Baby, Activity, HeartPulse, Stethoscope } from 'lucide-react';
import { Button } from '../../../../shared/ui/Button';

export default function PediatricsPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Baby className="w-4 h-4" />
              <span>General Pediatrics</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Comprehensive Child Care
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From newborn checkups to adolescent care, we offer a full spectrum of pediatric services to ensure your child's healthy development.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1542890875-3505c87e1f40?q=80&w=1000&auto=format&fit=crop" 
              alt="Pediatrician with child" 
              className="rounded-3xl shadow-2xl object-cover h-[400px] w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Activity, title: 'Growth Monitoring', desc: 'Tracking physical and mental milestones meticulously.' },
              { icon: HeartPulse, title: 'Nutritional Guidance', desc: 'Dietary planning for optimal growth and immunity.' },
              { icon: Stethoscope, title: 'Routine Checkups', desc: 'Preventive healthcare to catch issues early.' }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border border-border text-center hover:-translate-y-1 transition-transform">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
