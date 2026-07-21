import React from 'react';
import { Package, Shield } from 'lucide-react';
import { Button } from '../../../../shared/ui/Button';

export default function PackagesPage() {
  const packages = [
    { title: "Child Wellness Plan", price: "₹ 2,999/-", desc: "Annual checkups, growth monitoring, and unlimited text consultations." },
    { title: "Immunity Booster Pack", price: "₹ 1,499/-", desc: "3-month constitutional medicine course to build robust immunity against seasonal flus." },
    { title: "Complete Family Care", price: "₹ 4,999/-", desc: "Comprehensive ayurvedic care for up to 4 family members including basic lab tests." }
  ];

  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <Package className="w-4 h-4" />
            <span>Health Plans</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive Health Packages
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Affordable, holistic, and preventive healthcare packages tailored for you and your family.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:border-primary transition-colors flex flex-col">
                <Shield className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <div className="text-3xl font-extrabold text-primary mb-4">{pkg.price}</div>
                <p className="text-muted-foreground mb-8 flex-1">{pkg.desc}</p>
                <Button className="w-full">Choose Package</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
