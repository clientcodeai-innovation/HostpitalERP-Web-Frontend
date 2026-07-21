import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { FileText, Video, Plus } from 'lucide-react';
import { useToast } from '../../../shared/ui/ToastContext';

export default function PatientConsultationsPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Consultations"
        description="View your past consultation records, clinical notes, and request new sessions."
        actions={[{ label: 'Request Video Session', icon: Video, onClick: () => toast('Request initiated', 'default') }]}
      />
      <Card>
        <CardHeader><CardTitle className="text-base">Consultation History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/30">
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Doctor</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Diagnosis</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Type</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Actions</th>
              </tr></thead>
              <tbody>
                {[
                  { date: '12 Jul 2026', doctor: 'Dr. Vijay - General', diag: 'Bronchitis', type: 'In-person' },
                  { date: '01 Jun 2026', doctor: 'Dr. Sarah - Cardiology', diag: 'Routine Checkup', type: 'Video' },
                ].map((c, i) => (
                  <tr key={i} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-muted-foreground">{c.date}</td>
                    <td className="p-4 font-medium">{c.doctor}</td>
                    <td className="p-4">{c.diag}</td>
                    <td className="p-4"><Badge variant="outline">{c.type}</Badge></td>
                    <td className="p-4 flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => toast('Loading Summary PDF...', 'default')}><FileText className="w-3.5 h-3.5 mr-1" /> Summary</Button>
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
