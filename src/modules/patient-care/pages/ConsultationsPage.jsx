import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { Plus, Thermometer, HeartPulse, Stethoscope, ClipboardList, CalendarCheck } from 'lucide-react';

export default function ConsultationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Consultation Workflow"
        description="Chief complaints, vitals, diagnosis, treatment plans, and follow-ups."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Patient Care' }, { label: 'Consultations' }]}
        actions={[{ label: 'Start Consultation', icon: Plus }]}
      />

      {/* Active Consultation Demo */}
      <Card className="border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Consultation â€” Aarav Sharma</CardTitle>
              <CardDescription>Token T-01 Â· Dr. Vijay Â· 14 Jul 2026</CardDescription>
            </div>
            <Badge>In Progress</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Vitals */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Thermometer className="w-4 h-4 text-primary" /> Vitals</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: 'Temperature', value: '98.6Â°F' },
                { label: 'Weight', value: '14.2 kg' },
                { label: 'Height', value: '96 cm' },
                { label: 'Heart Rate', value: '110 bpm' },
                { label: 'SpO2', value: '98%' },
              ].map((v, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold">{v.value}</p>
                  <p className="text-xs text-muted-foreground">{v.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chief Complaint */}
          <div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><ClipboardList className="w-4 h-4 text-primary" /> Chief Complaint</h3>
            <div className="bg-muted/30 border border-border rounded-lg p-3 text-sm text-foreground">
              Fever since 2 days, mild cough, reduced appetite. No vomiting or loose stools.
            </div>
          </div>

          {/* Symptoms Tags */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {['Fever', 'Cough', 'Loss of appetite', 'Runny nose', 'Fatigue'].map((s, i) => (
                <Badge key={i} variant="secondary">{s}</Badge>
              ))}
            </div>
          </div>

          {/* Diagnosis */}
          <div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><Stethoscope className="w-4 h-4 text-primary" /> Diagnosis</h3>
            <Input placeholder="Enter diagnosis..." defaultValue="Acute upper respiratory infection (AURI)" />
          </div>

          {/* Clinical Notes */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Clinical Notes</h3>
            <textarea rows={3} className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" defaultValue="Mild pharyngeal congestion. Chest clear. Advised rest, fluids, and follow-up after 3 days if symptoms persist." />
          </div>

          {/* Follow-up */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Follow-up:</span>
              <Badge variant="outline">17 Jul 2026</Badge>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="outline">Save Draft</Button>
              <Button>Complete & Prescribe</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Consultations */}
      <Card>
        <CardHeader><CardTitle className="text-base">Recent Consultations</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/30">
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Patient</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Doctor</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Diagnosis</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
              </tr></thead>
              <tbody>
                {[
                  { patient: 'Diya Patel', doctor: 'Dr. Sweta', date: '13 Jul', diag: 'Gastroenteritis', status: 'Completed' },
                  { patient: 'Kabir Singh', doctor: 'Dr. Vijay', date: '12 Jul', diag: 'Bronchitis', status: 'Follow-up' },
                  { patient: 'Rohan Verma', doctor: 'Dr. Vijay', date: '10 Jul', diag: 'Viral Fever', status: 'Completed' },
                ].map((c, i) => (
                  <tr key={i} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{c.patient}</td>
                    <td className="p-4 text-muted-foreground">{c.doctor}</td>
                    <td className="p-4 text-muted-foreground">{c.date}</td>
                    <td className="p-4">{c.diag}</td>
                    <td className="p-4"><Badge variant={c.status === 'Completed' ? 'default' : 'secondary'}>{c.status}</Badge></td>
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
