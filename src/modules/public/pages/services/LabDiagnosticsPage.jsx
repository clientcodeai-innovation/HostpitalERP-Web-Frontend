import React from 'react';
import { FlaskConical, TestTube2, Microscope, ClipboardList } from 'lucide-react';
import { Button } from '../../../../shared/ui/Button';

export default function LabDiagnosticsPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <FlaskConical className="w-4 h-4" />
              <span>Pathology & Radiology</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Precision Diagnostics
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              In-house state-of-the-art laboratory ensuring quick and accurate test results for faster clinical decisions.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop" 
              alt="Lab technician" 
              className="rounded-3xl shadow-2xl object-cover h-[400px] w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TestTube2, title: 'Routine Blood Tests', desc: 'CBC, LFT, KFT, and comprehensive metabolic panels.' },
              { icon: FlaskConical, title: 'Specialized Assays', desc: 'Hormonal profiling, allergy panels, and immunology tests.' },
              { icon: ClipboardList, title: 'Digital Reports', desc: 'Access all lab reports directly from your patient portal.' }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border border-border text-center">
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
