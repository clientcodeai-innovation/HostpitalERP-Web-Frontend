import React from 'react';
import { Activity, Phone, ShieldAlert, HeartPulse } from 'lucide-react';
import { Button } from '../../../../shared/ui/Button';

export default function EmergencyCarePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-red-50 dark:bg-red-950/20">
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold text-sm mb-6 animate-pulse">
            <Activity className="w-5 h-5" />
            <span>24/7 Emergency Care</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Always Ready for Your Child
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Medical emergencies can happen anytime. Our specialized pediatric emergency team is available round-the-clock to handle all critical situations.
          </p>
          
          <div className="bg-card p-6 md:p-8 rounded-3xl shadow-xl max-w-3xl mx-auto border border-red-100 dark:border-red-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-lg font-medium text-muted-foreground mb-1">Emergency Helpline</h3>
              <div className="text-3xl md:text-4xl font-extrabold text-foreground">
                +91 98765 43210
              </div>
            </div>
            <Button size="lg" className="rounded-full gap-2 bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-600/30 w-full md:w-auto" asChild>
              <a href="tel:+919876543210">
                <Phone className="w-5 h-5" /> Call Ambulance Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: HeartPulse, title: 'Advanced Life Support', desc: 'Equipped with the latest pediatric ventilators and defibrillators.' },
              { icon: ShieldAlert, title: 'Rapid Triage', desc: 'Immediate assessment protocol to prioritize critical cases instantly.' },
              { icon: Activity, title: 'In-house Diagnostics', desc: '24/7 Pathology and Radiology support for quick clinical decisions.' }
            ].map((feature, i) => (
              <div key={i} className="bg-muted/30 p-8 rounded-2xl border border-border">
                <feature.icon className="w-10 h-10 text-red-500 mb-4" />
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
