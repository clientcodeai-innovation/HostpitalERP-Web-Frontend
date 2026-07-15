import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Users, Stethoscope, Shield, ExternalLink } from 'lucide-react';

const portals = [
  { title: 'Patient Portal', desc: 'Appointments, prescriptions, invoices, medical history, wallet, and profile.', icon: Users, users: '1,240 patients', status: 'Active', color: 'text-blue-500 bg-blue-500/10' },
  { title: 'Doctor Portal', desc: "Today's patients, consultations, prescriptions, schedule, and reports.", icon: Stethoscope, users: '12 doctors', status: 'Active', color: 'text-green-500 bg-green-500/10' },
  { title: 'Admin Portal', desc: 'Complete system control, settings, audit logs, analytics, and user management.', icon: Shield, users: '3 admins', status: 'Active', color: 'text-purple-500 bg-purple-500/10' },
];

export default function PortalsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Portal Management" description="Patient, Doctor, and Admin portal entry points with authenticated dashboard redirection." breadcrumbs={[{ label: 'Admin' }, { label: 'Platform' }, { label: 'Portals' }]} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portals.map((p, i) => (
          <Card key={i} className="hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${p.color}`}><p.icon className="w-7 h-7" /></div>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription>{p.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{p.users}</Badge>
                <Badge>{p.status}</Badge>
              </div>
              <Button variant="outline" className="w-full mt-4 gap-2"><ExternalLink className="w-4 h-4" />Open Portal</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
