import React from 'react';
import { Pill, Upload, ShoppingBag } from 'lucide-react';
import { Button } from '../../../../shared/ui/Button';

export default function PharmacyPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <Pill className="w-4 h-4" />
            <span>E-Pharmacy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Order Medicines Online
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your prescription or request a refill of your constitutional medicine. We'll deliver it right to your doorstep.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card p-8 rounded-3xl border border-border shadow-sm text-center flex flex-col items-center justify-center">
              <Upload className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Upload Prescription</h3>
              <p className="text-muted-foreground mb-8">
                Have a new prescription from our doctors? Upload it here to get your medicines prepared and shipped immediately.
              </p>
              <Button size="lg" className="w-full gap-2"><Upload className="w-4 h-4" /> Upload File</Button>
            </div>
            
            <div className="bg-card p-8 rounded-3xl border border-border shadow-sm text-center flex flex-col items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Request Refill</h3>
              <p className="text-muted-foreground mb-8">
                Running out of your ongoing constitutional medicine? Request a refill by entering your patient ID.
              </p>
              <Button size="lg" variant="outline" className="w-full gap-2"><Pill className="w-4 h-4" /> Request Refill</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
