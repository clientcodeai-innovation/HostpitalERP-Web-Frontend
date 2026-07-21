import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Download, CreditCard } from 'lucide-react';
import { useToast } from '../../../shared/ui/ToastContext';

export default function PatientInvoicePage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Invoices"
        description="View and download your billing statements and payment history."
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-semibold text-foreground">Billing History</CardTitle>
          <CreditCard className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/30">
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Invoice #</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Title</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Amount</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Actions</th>
              </tr></thead>
              <tbody>
                {[
                  { id: 'INV-2026-001', title: 'Consultation Fee', date: '14 Jul 2026', amount: '₹ 500', status: 'Paid' },
                  { id: 'INV-2026-002', title: 'Lab Test - Blood Profile', date: '12 Jul 2026', amount: '₹ 1200', status: 'Paid' },
                  { id: 'INV-2026-003', title: 'Pharmacy Charges', date: '10 Jun 2026', amount: '₹ 350', status: 'Paid' },
                ].map((inv, i) => (
                  <tr key={i} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono text-xs">{inv.id}</td>
                    <td className="p-4 font-medium">{inv.title}</td>
                    <td className="p-4 text-muted-foreground">{inv.date}</td>
                    <td className="p-4 font-medium">{inv.amount}</td>
                    <td className="p-4"><Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">{inv.status}</Badge></td>
                    <td className="p-4">
                      <Button variant="outline" size="sm" onClick={() => toast(`Downloading ${inv.id}...`, 'default')}><Download className="w-3.5 h-3.5 mr-1" /> PDF</Button>
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
