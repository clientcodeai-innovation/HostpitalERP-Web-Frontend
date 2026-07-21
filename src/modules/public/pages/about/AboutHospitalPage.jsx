import React from 'react';
import { Building2, CheckCircle2, Heart, Shield, Users } from 'lucide-react';
import { Button } from '../../../../shared/ui/Button';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Years of Experience', value: '15+' },
  { label: 'Happy Patients', value: '50k+' },
  { label: 'Expert Doctors', value: '25+' },
  { label: 'Awards Won', value: '12' },
];

export default function AboutHospitalPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pattern-grid-lg"></div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <Building2 className="w-4 h-4" />
            <span>About Us</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Caring for Your <span className="text-primary">Child's Future</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Hospital Ayurved Clinic is a premier pediatric care center dedicated to providing comprehensive and compassionate healthcare for children of all ages.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" 
                alt="Hospital Facility" 
                className="rounded-2xl shadow-xl object-cover w-full h-[400px]"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
              <p className="text-muted-foreground mb-6">
                Our mission is to deliver high-quality, evidence-based medical care in a child-friendly environment. We believe that every child deserves the best possible start in life, and our team of experts is committed to making that a reality.
              </p>
              <div className="space-y-4">
                {[
                  'Comprehensive pediatric services under one roof',
                  'State-of-the-art NICU and emergency facilities',
                  'Focus on holistic development and constitutional care',
                  'Experienced and compassionate medical team'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-extrabold text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Best Pediatric Care</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-lg">
            Schedule a consultation with our experts today and ensure your child receives the care they deserve.
          </p>
          <Button size="lg" variant="secondary" asChild className="rounded-full">
            <a href="/#appointment">Book an Appointment</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
