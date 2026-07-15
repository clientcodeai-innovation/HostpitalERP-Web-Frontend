import React from 'react';
import { Baby, ShieldPlus, Heart, Activity } from 'lucide-react';
import { Button } from '../../../../shared/ui/Button';

export default function NicuCarePage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Baby className="w-4 h-4" />
              <span>Level III NICU</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Advanced Neonatal Intensive Care
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              State-of-the-art life support and monitoring systems to provide the highest level of care for premature and critically ill newborns.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1000&auto=format&fit=crop" 
              alt="NICU Incubator" 
              className="rounded-3xl shadow-2xl object-cover h-[400px] w-full grayscale-[20%]"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldPlus, title: 'Infection Control', desc: 'Strict HEPA-filtered environment and isolation protocols.' },
              { icon: Activity, title: '24/7 Monitoring', desc: 'Continuous multipara monitoring by specialized neonatal nurses.' },
              { icon: Heart, title: 'Kangaroo Mother Care', desc: 'Encouraging skin-to-skin contact for faster recovery.' },
              { icon: Baby, title: 'Advanced Ventilators', desc: 'High-frequency oscillatory ventilation for tiny lungs.' }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border border-border">
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
