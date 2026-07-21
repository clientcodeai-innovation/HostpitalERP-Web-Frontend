import React, { useState } from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Clock, AlertTriangle } from 'lucide-react';

const DATES = [
  { label: 'Mon 12', value: '12 Jul 2026' },
  { label: 'Tue 13', value: '13 Jul 2026' },
  { label: 'Wed 14', value: '14 Jul 2026' },
  { label: 'Thu 15', value: '15 Jul 2026' },
  { label: 'Fri 16', value: '16 Jul 2026' },
  { label: 'Sat 17', value: '17 Jul 2026' },
];

const allAppointments = [
  // 12 Jul
  { id: 'A-301', patient: 'Rahul Dravid', age: 45, gender: 'M', referredBy: 'Self', doctor: 'Dr. Sweta', time: '10:00 AM', date: '12 Jul 2026', type: 'OPD', status: 'Completed', token: 'T-01' },
  { id: 'A-302', patient: 'Smriti Mandhana', age: 28, gender: 'F', referredBy: 'Dr. Anand', doctor: 'Dr. Vijay', time: '11:30 AM', date: '12 Jul 2026', type: 'Follow-up', status: 'Completed', token: 'T-02' },
  // 13 Jul
  { id: 'A-351', patient: 'Virat Kohli', age: 35, gender: 'M', referredBy: 'Self', doctor: 'Dr. Vijay', time: '09:00 AM', date: '13 Jul 2026', type: 'OPD', status: 'Cancelled', token: '-' },
  { id: 'A-352', patient: 'Saina Nehwal', age: 34, gender: 'F', referredBy: 'Dr. Sharma', doctor: 'Dr. Sweta', time: '14:00 PM', date: '13 Jul 2026', type: 'Follow-up', status: 'Completed', token: 'T-01' },
  // 14 Jul (Original data expanded)
  { id: 'A-401', patient: 'Aarav Sharma', age: 32, gender: 'M', referredBy: 'Self', doctor: 'Dr. Vijay', time: '09:00 AM', date: '14 Jul 2026', type: 'OPD', status: 'Confirmed', token: 'T-01' },
  { id: 'A-402', patient: 'Diya Patel', age: 24, gender: 'F', referredBy: 'Dr. Joshi', doctor: 'Dr. Sweta', time: '09:30 AM', date: '14 Jul 2026', type: 'Follow-up', status: 'Checked In', token: 'T-02' },
  { id: 'A-403', patient: 'Kabir Singh', age: 41, gender: 'M', referredBy: 'Dr. Reddy', doctor: 'Dr. Vijay', time: '10:00 AM', date: '14 Jul 2026', type: 'OPD', status: 'Waiting', token: 'T-03' },
  { id: 'A-404', patient: 'Ananya Gupta', age: 29, gender: 'F', referredBy: 'Self', doctor: 'Dr. Vijay', time: '10:30 AM', date: '14 Jul 2026', type: 'Vaccination', status: 'Confirmed', token: 'T-04' },
  { id: 'A-405', patient: 'Rohan Verma', age: 55, gender: 'M', referredBy: 'Dr. Kumar', doctor: 'Dr. Sweta', time: '11:00 AM', date: '14 Jul 2026', type: 'OPD', status: 'Cancelled', token: '-' },
  { id: 'A-406', patient: 'Ishaan Kumar', age: 18, gender: 'M', referredBy: 'Self', doctor: 'Dr. Vijay', time: '14:00 PM', date: '14 Jul 2026', type: 'Emergency', status: 'In Consultation', token: 'T-05' },
  // 15 Jul
  { id: 'A-501', patient: 'Meera Rajput', age: 38, gender: 'F', referredBy: 'Dr. Patel', doctor: 'Dr. Sweta', time: '10:00 AM', date: '15 Jul 2026', type: 'OPD', status: 'Confirmed', token: 'T-01' },
  { id: 'A-502', patient: 'Aditya Chopra', age: 44, gender: 'M', referredBy: 'Self', doctor: 'Dr. Vijay', time: '12:00 PM', date: '15 Jul 2026', type: 'Follow-up', status: 'Confirmed', token: 'T-02' },
];

const statusColors = { Confirmed: 'default', 'Checked In': 'secondary', Waiting: 'outline', Cancelled: 'destructive', 'In Consultation': 'default', Completed: 'success' };

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState('14 Jul 2026');

  const filteredAppointments = allAppointments.filter((a) => a.date === selectedDate);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointment Management"
        description="Book, reschedule, cancel appointments. Manage tokens and slot conflicts."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Patient Care' }, { label: 'Appointments' }]}
        actions={[
          { label: 'Slot Settings', icon: Clock, variant: 'outline' }
        ]}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Today', value: filteredAppointments.length, sub: 'Filtered by date' },
          { label: 'Checked In', value: filteredAppointments.filter(a => a.status === 'Checked In').length, sub: 'Currently waiting' },
          { label: 'Completed', value: filteredAppointments.filter(a => a.status === 'Completed').length, sub: 'Done' },
          { label: 'Cancelled', value: filteredAppointments.filter(a => a.status === 'Cancelled').length, sub: 'Need rescheduling' },
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

      {/* Conflict Warning (Only show for 14 Jul as per mock data) */}
      {selectedDate === '14 Jul 2026' && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm">
          <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0" />
          <span>Slot conflict: <strong>Dr. Vijay</strong> has 2 appointments at <strong>10:00 AM</strong>.</span>
          <Button variant="outline" size="sm" className="ml-auto shrink-0">Resolve</Button>
        </div>
      )}

      {/* Calendar Strip */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {DATES.map((d, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedDate(d.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedDate === d.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Appointments for {selectedDate}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Token</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Patient</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Age</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Gender</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Doctor</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Time</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Type</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Referred By</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
                  <th className="h-10 px-4 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((a) => (
                    <tr key={a.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-mono text-xs font-bold">{a.token}</td>
                      <td className="p-4 font-medium">{a.patient}</td>
                      <td className="p-4">{a.age}</td>
                      <td className="p-4">{a.gender}</td>
                      <td className="p-4 text-muted-foreground">{a.doctor}</td>
                      <td className="p-4 text-muted-foreground">{a.time}</td>
                      <td className="p-4"><Badge variant="outline">{a.type}</Badge></td>
                      <td className="p-4 text-muted-foreground">{a.referredBy}</td>
                      <td className="p-4"><Badge variant={statusColors[a.status]}>{a.status}</Badge></td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm">Reschedule</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="p-8 text-center text-muted-foreground">No appointments scheduled for this date.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
