import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Eye, Download } from 'lucide-react';

export default function PatientPrescriptionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Prescriptions"
        description="View and download your past prescriptions."
      />
      <Card>
        <CardHeader><CardTitle className="text-base">Prescription History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/30">
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">ID</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Doctor</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Medicines</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Actions</th>
              </tr></thead>
              <tbody>
                {[
                  { id: 'Rx-501', doctor: 'Dr. Vijay - General', date: '14 Jul 2026', medicines: 3 },
                  { id: 'Rx-402', doctor: 'Dr. Sarah - Cardiology', date: '01 Jun 2026', medicines: 1 },
                ].map((p) => (
                  <tr key={p.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono text-xs">{p.id}</td>
                    <td className="p-4 font-medium">{p.doctor}</td>
                    <td className="p-4 text-muted-foreground">{p.date}</td>
                    <td className="p-4">{p.medicines} items</td>
                    <td className="p-4 flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs"><Eye className="w-3.5 h-3.5 mr-1" /> View</Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs"><Download className="w-3.5 h-3.5 mr-1" /> PDF</Button>
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
