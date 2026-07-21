import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { User, Calendar, MapPin, Mail, Phone } from 'lucide-react';
import { useToast } from '../../../shared/ui/ToastContext';

export default function PatientDoctorsPage() {
  const { toast } = useToast();

  const doctors = [
    { name: 'Dr. Sarah Smith', department: 'Cardiology', image: null, phone: '+1 234 567 8900', email: 'sarah.smith@hospital.com', availability: 'Mon, Wed, Fri' },
    { name: 'Dr. Michael Jones', department: 'Pediatrics', image: null, phone: '+1 234 567 8901', email: 'michael.jones@hospital.com', availability: 'Tue, Thu, Sat' },
    { name: 'Dr. Priya Patel', department: 'General Practice', image: null, phone: '+1 234 567 8902', email: 'priya.patel@hospital.com', availability: 'Mon-Fri' },
    { name: 'Dr. John Doe', department: 'Neurology', image: null, phone: '+1 234 567 8903', email: 'john.doe@hospital.com', availability: 'Mon, Thu' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Our Doctors"
        description="View our list of specialists and book an appointment."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((doc, idx) => (
          <Card key={idx} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-24 bg-primary/10 flex items-center justify-center border-b border-border">
              <div className="w-16 h-16 bg-background rounded-full border-4 border-background flex items-center justify-center shadow-sm translate-y-6">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
            <CardContent className="pt-10 pb-6 text-center">
              <h3 className="text-lg font-semibold text-foreground">{doc.name}</h3>
              <p className="text-sm text-primary font-medium mt-1">{doc.department}</p>
              
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{doc.phone}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[180px]">{doc.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{doc.availability}</span>
                </div>
              </div>

              <Button className="w-full mt-6" onClick={() => toast(`Initiating booking for ${doc.name}`, 'default')}>
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
