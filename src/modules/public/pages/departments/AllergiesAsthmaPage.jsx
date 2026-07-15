import React from 'react';
import { Wind, ShieldAlert, Activity, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../../shared/ui/Button';

export default function AllergiesAsthmaPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Wind className="w-4 h-4" />
              <span>Respiratory Care</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Allergies & Asthma Management
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Specialized diagnosis and long-term management plans for childhood asthma, seasonal allergies, and skin sensitivities.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=1000&auto=format&fit=crop" 
              alt="Child using inhaler" 
              className="rounded-3xl shadow-2xl object-cover h-[400px] w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldAlert, title: 'Allergy Testing', desc: 'Comprehensive panels to identify specific triggers.' },
              { icon: Wind, title: 'Nebulization Support', desc: 'In-clinic emergency nebulization and oxygen support.' },
              { icon: CheckCircle2, title: 'Homeopathic Integration', desc: 'Reducing dependency on inhalers through constitutional medicine.' }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border border-border text-center hover:border-primary/50 transition-colors">
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
