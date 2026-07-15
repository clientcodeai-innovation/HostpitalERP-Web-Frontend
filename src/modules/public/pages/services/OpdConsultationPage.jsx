import React from 'react';
import { Stethoscope, Clock, CheckCircle2, Calendar } from 'lucide-react';
import { Button } from '../../../../shared/ui/Button';

export default function OpdConsultationPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Stethoscope className="w-4 h-4" />
              <span>General Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Expert OPD Consultation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive outpatient care for your child's routine health checkups, minor illnesses, and developmental assessments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full gap-2" asChild>
                <a href="/#appointment">
                  <Calendar className="w-5 h-5" /> Book Consultation
                </a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=1000&auto=format&fit=crop" 
              alt="Doctor consulting a child" 
              className="rounded-3xl shadow-2xl object-cover h-[400px] w-full"
            />
          </div>
        </div>
      </section>

      {/* OPD Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our OPD?</h2>
            <p className="text-muted-foreground">We provide a child-friendly environment ensuring a stress-free experience for both parents and kids.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Experienced Pediatricians', desc: 'Consult with top child specialists with over a decade of experience.' },
              { title: 'Minimal Waiting Time', desc: 'Pre-book your slots to avoid long queues in the waiting area.' },
              { title: 'Digital Health Records', desc: 'Access your child\'s prescriptions and history anytime via our portal.' }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timings */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto shadow-xl">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">OPD Timings</h3>
                <p className="text-primary-foreground/80">Open Monday to Saturday</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold mb-1">Morning: 09:00 AM - 01:00 PM</div>
              <div className="text-xl font-bold">Evening: 05:00 PM - 09:00 PM</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
