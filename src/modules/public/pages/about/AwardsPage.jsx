import React from 'react';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

const awards = [
  {
    title: 'NABH Accredited',
    year: '2023',
    description: 'Recognized by the National Accreditation Board for Hospitals & Healthcare Providers for excellence in patient care and safety standards.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Best Pediatric Hospital',
    year: '2022',
    description: 'Awarded the Best Pediatric Hospital in the region for our comprehensive childcare services and state-of-the-art NICU facilities.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Excellence in Homeopathy',
    year: '2021',
    description: 'Honored for our unique integration of constitutional homeopathic care alongside modern pediatric medicine.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop'
  }
];

export default function AwardsPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-primary/5 py-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <Award className="w-4 h-4" />
            <span>Excellence Recognized</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Awards & Recognitions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our commitment to quality healthcare and patient safety has earned us prestigious accreditations and awards over the years.
          </p>
        </div>
      </section>

      {/* Accreditations Banner */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="font-bold text-lg">ISO 9001:2015</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="font-bold text-lg">NABH Certified</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="font-bold text-lg">Govt. Approved</span>
          </div>
        </div>
      </section>

      {/* Awards List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {awards.map((award, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-shadow p-6 md:p-8`}
              >
                <div className="w-full md:w-2/5">
                  <img 
                    src={award.image} 
                    alt={award.title} 
                    className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-sm"
                  />
                </div>
                <div className="w-full md:w-3/5">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold mb-4">
                    {award.year}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{award.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {award.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <CheckCircle2 className="w-5 h-5" />
                    Verified Recognition
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
