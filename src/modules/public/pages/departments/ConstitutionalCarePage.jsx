import React from 'react';
import { Leaf, UserCircle, Target, Sparkles } from 'lucide-react';

export default function ConstitutionalCarePage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Leaf className="w-4 h-4" />
              <span>Homeopathy</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Constitutional Homeopathy
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A holistic approach focusing on the individual's physical, emotional, and psychological makeup to build long-term immunity naturally.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1616671285418-472e90c8f58b?q=80&w=1000&auto=format&fit=crop" 
              alt="Homeopathic medicine" 
              className="rounded-3xl shadow-2xl object-cover h-[400px] w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: UserCircle, title: 'Personalized Treatment', desc: 'Medicines tailored uniquely to your child’s constitution.' },
              { icon: ShieldPlus, title: 'Immunity Building', desc: 'Strengthens the body’s natural defense mechanisms.' },
              { icon: Sparkles, title: 'No Side Effects', desc: 'Gentle, safe, and highly effective for infants and children.' }
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

// Quick fallback for ShieldPlus missing import
const ShieldPlus = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 11h8"/><path d="M12 8v6"/></svg>
);
