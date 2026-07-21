import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Building2 } from 'lucide-react';

export default function PatientAdmitHistoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admit History"
        description="View your past bed allotments and admission records."
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-semibold text-foreground">Admission Records</CardTitle>
          <Building2 className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/30">
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Ward / Bed</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Admitted By</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Admission Date</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Discharge Date</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
              </tr></thead>
              <tbody>
                <tr className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium">General Ward - Bed 12</td>
                  <td className="p-4 text-muted-foreground">Dr. Vijay</td>
                  <td className="p-4 text-muted-foreground">10 Jun 2026</td>
                  <td className="p-4 text-muted-foreground">15 Jun 2026</td>
                  <td className="p-4"><Badge variant="outline" className="text-muted-foreground">Discharged</Badge></td>
                </tr>
                <tr className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium">ICU - Bed 04</td>
                  <td className="p-4 text-muted-foreground">Dr. Sarah Smith</td>
                  <td className="p-4 text-muted-foreground">01 Jan 2025</td>
                  <td className="p-4 text-muted-foreground">10 Jan 2025</td>
                  <td className="p-4"><Badge variant="outline" className="text-muted-foreground">Discharged</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
