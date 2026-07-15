import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function FaqsPage() {
  const faqs = [
    { q: "What is Constitutional Homeopathy?", a: "Constitutional homeopathy considers the entire person—physical, mental, and emotional—rather than just treating isolated symptoms." },
    { q: "Are homeopathic medicines safe for infants?", a: "Yes, homeopathic medicines are highly diluted, natural, and completely safe for infants, children, and pregnant women when prescribed by an expert." },
    { q: "Do you offer online video consultations?", a: "Absolutely. We offer secure, end-to-end encrypted video consultations so you can get expert care from the comfort of your home." },
    { q: "How do I order a refill of my medicines?", a: "You can use our 'Order Medicines' page under the Resources tab or use our Patient Portal to request a refill, and we will ship it directly to you." },
  ];

  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>Support</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our clinic, homeopathic treatments, and booking procedures.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border border-border">
                <h3 className="text-lg font-bold mb-2 text-foreground">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
