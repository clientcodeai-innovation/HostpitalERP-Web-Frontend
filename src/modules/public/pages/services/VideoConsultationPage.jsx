import React from 'react';
import { Video, MonitorSmartphone, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../../shared/ui/Button';

export default function VideoConsultationPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Video className="w-4 h-4" />
              <span>Telehealth</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Expert Care From Home
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Consult with our pediatricians and homeopathic experts through secure, high-quality video calls without leaving your home.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="rounded-full gap-2" asChild>
                <a href="/#appointment">
                  <MonitorSmartphone className="w-5 h-5" /> Book Teleconsultation
                </a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173ff9e5950?q=80&w=1000&auto=format&fit=crop" 
              alt="Doctor on video call" 
              className="rounded-3xl shadow-2xl object-cover h-[400px] w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle2, title: 'Secure & Private', desc: 'End-to-end encrypted video sessions ensuring complete privacy.' },
              { icon: Clock, title: 'Flexible Timing', desc: 'Schedule appointments at your convenience, including evenings.' },
              { icon: MonitorSmartphone, title: 'Digital Prescriptions', desc: 'Receive e-prescriptions instantly on your patient portal or WhatsApp.' }
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
