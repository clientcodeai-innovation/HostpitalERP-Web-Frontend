import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Plus, Filter, Calendar, Clock, AlertTriangle, User } from 'lucide-react';

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00'];
const appointments = [
  { id: 'A-401', patient: 'Aarav Sharma', doctor: 'Dr. Vijay', time: '09:00 AM', date: '14 Jul 2026', type: 'OPD', status: 'Confirmed', token: 'T-01' },
  { id: 'A-402', patient: 'Diya Patel', doctor: 'Dr. Sweta', time: '09:30 AM', date: '14 Jul 2026', type: 'Follow-up', status: 'Checked In', token: 'T-02' },
  { id: 'A-403', patient: 'Kabir Singh', doctor: 'Dr. Vijay', time: '10:00 AM', date: '14 Jul 2026', type: 'OPD', status: 'Waiting', token: 'T-03' },
  { id: 'A-404', patient: 'Ananya Gupta', doctor: 'Dr. Vijay', time: '10:30 AM', date: '14 Jul 2026', type: 'Vaccination', status: 'Confirmed', token: 'T-04' },
  { id: 'A-405', patient: 'Rohan Verma', doctor: 'Dr. Sweta', time: '11:00 AM', date: '14 Jul 2026', type: 'OPD', status: 'Cancelled', token: 'â€”' },
  { id: 'A-406', patient: 'Ishaan Kumar', doctor: 'Dr. Vijay', time: '14:00 PM', date: '14 Jul 2026', type: 'Emergency', status: 'In Consultation', token: 'T-05' },
];

const statusColors = { Confirmed: 'default', 'Checked In': 'secondary', Waiting: 'outline', Cancelled: 'destructive', 'In Consultation': 'default' };

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointment Management"
        description="Book, reschedule, cancel appointments. Manage tokens and slot conflicts."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Patient Care' }, { label: 'Appointments' }]}
        actions={[
          { label: 'Slot Settings', icon: Clock, variant: 'outline' },
          { label: 'Book Appointment', icon: Plus },
        ]}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Today', value: '24', sub: '6 confirmed' },
          { label: 'Checked In', value: '8', sub: '3 waiting' },
          { label: 'Completed', value: '12', sub: '50% done' },
          { label: 'Cancelled', value: '2', sub: '1 rescheduled' },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm font-medium text-foreground">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conflict Warning */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm">
        <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0" />
        <span>Slot conflict: <strong>Dr. Vijay</strong> has 2 appointments at <strong>10:00 AM</strong>.</span>
        <Button variant="outline" size="sm" className="ml-auto shrink-0">Resolve</Button>
      </div>

      {/* Calendar Strip */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16', 'Sat 17'].map((d, i) => (
              <button key={i} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${i === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                {d}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Today's Appointments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Token</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Patient</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Doctor</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Time</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Type</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
                  <th className="h-10 px-4 text-right font-medium text-muted-foreground">Actions is under proceess</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono text-xs font-bold">{a.token}</td>
                    <td className="p-4 font-medium">{a.patient}</td>
                    <td className="p-4 text-muted-foreground">{a.doctor}</td>
                    <td className="p-4 text-muted-foreground">{a.time}</td>
                    <td className="p-4"><Badge variant="outline">{a.type}</Badge></td>
                    <td className="p-4"><Badge variant={statusColors[a.status]}>{a.status}</Badge></td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm">Reschedule</Button>
                    </td>
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
