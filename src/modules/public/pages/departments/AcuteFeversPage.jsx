import React from 'react';
import { Thermometer, Activity, Clock, Cross } from 'lucide-react';

export default function AcuteFeversPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-20 overflow-hidden bg-orange-50 dark:bg-orange-950/20">
        <div className="container relative mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 font-medium text-sm mb-6">
              <Thermometer className="w-4 h-4" />
              <span>Infectious Diseases</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Acute Fevers & Infections
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Rapid diagnosis and evidence-based treatment for acute viral, bacterial fevers, and seasonal infections in children.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop" 
              alt="Taking child's temperature" 
              className="rounded-3xl shadow-2xl object-cover h-[400px] w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Rapid Diagnosis', desc: 'Quick turnaround time for dengue, malaria, and typhoid panels.' },
              { icon: Activity, title: 'Fluid Management', desc: 'Day-care IV fluid therapy and monitoring for dehydrated children.' },
              { icon: Thermometer, title: 'Fever Protocol', desc: 'Strict protocols to manage high-grade fevers and prevent seizures.' }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border border-border text-center">
                <feature.icon className="w-12 h-12 text-orange-500 mx-auto mb-6" />
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
