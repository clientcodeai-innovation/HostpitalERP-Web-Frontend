import React from 'react';
import { Syringe, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../../shared/ui/Button';

export default function VaccinationPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Syringe className="w-4 h-4" />
              <span>Immunization Clinic</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Complete Vaccination Coverage
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Protect your child's future with our comprehensive, pain-minimized vaccination schedules administered by expert pediatric nurses.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="rounded-full gap-2" asChild>
                <a href="/#appointment">
                  <Calendar className="w-5 h-5" /> Schedule Vaccine
                </a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/images/vaccination.png" 
              alt="Child getting vaccinated" 
              className="rounded-3xl shadow-2xl object-cover h-[400px] w-full"
            />
          </div>
        </div>
      </section>

      {/* Vaccine Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: ShieldCheck, title: 'IAP Approved Schedule', desc: 'Following the latest guidelines from Indian Academy of Pediatrics.' },
              { icon: Syringe, title: 'Painless Options', desc: 'Offering painless variants of vaccines to minimize discomfort.' },
              { icon: CheckCircle2, title: 'Digital Reminders', desc: 'Automated WhatsApp alerts for upcoming due dates.' }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border border-border shadow-sm text-center hover:border-primary/50 transition-colors">
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
