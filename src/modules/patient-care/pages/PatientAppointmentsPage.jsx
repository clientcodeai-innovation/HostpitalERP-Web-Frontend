import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Calendar as CalendarIcon, Clock, X, Video, MapPin } from 'lucide-react';
import { useToast } from '../../../shared/ui/ToastContext';

export default function PatientAppointmentsPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Appointments"
        description="View and manage your upcoming and past appointments."
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-semibold text-foreground">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/30">
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Date & Time</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Doctor</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Type</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Actions</th>
              </tr></thead>
              <tbody>
                <tr className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-medium">
                      <CalendarIcon className="w-4 h-4 text-primary" />
                      Tomorrow, 10:00 AM
                    </div>
                  </td>
                  <td className="p-4 font-medium">Dr. Sarah Smith<span className="block text-xs text-muted-foreground font-normal">Cardiology</span></td>
                  <td className="p-4"><Badge variant="outline" className="gap-1.5"><MapPin className="w-3 h-3" /> Hospital Visit</Badge></td>
                  <td className="p-4"><Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">Confirmed</Badge></td>
                  <td className="p-4 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => toast('Reschedule flow initiated', 'default')}><Clock className="w-3.5 h-3.5 mr-1" /> Reschedule</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => toast('Appointment Cancelled', 'error')}><X className="w-3.5 h-3.5 mr-1" /> Cancel</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-semibold text-foreground">Past Appointments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/30">
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Doctor</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Type</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
              </tr></thead>
              <tbody>
                {[
                  { date: '12 Jul 2026', doctor: 'Dr. Priya Patel - General', type: 'Online Video Call', icon: Video, status: 'Completed' },
                  { date: '01 Jun 2026', doctor: 'Dr. Michael Jones - Pediatrics', type: 'Hospital Visit', icon: MapPin, status: 'Completed' },
                ].map((a, i) => (
                  <tr key={i} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-muted-foreground">{a.date}</td>
                    <td className="p-4 font-medium">{a.doctor}</td>
                    <td className="p-4"><Badge variant="outline" className="gap-1.5 text-muted-foreground"><a.icon className="w-3 h-3" /> {a.type}</Badge></td>
                    <td className="p-4"><Badge variant="secondary">{a.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
