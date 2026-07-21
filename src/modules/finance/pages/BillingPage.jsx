import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Plus, Download, CreditCard, AlertCircle, IndianRupee } from 'lucide-react';

const invoices = [
  { id: 'INV-2001', patient: 'Aarav Sharma', amount: '₹ 2,500/-', paid: '₹ 2,500/-', due: '₹ 0/-', date: '14 Jul 2026', status: 'Paid' },
  { id: 'INV-2000', patient: 'Diya Patel', amount: '₹ 1,800/-', paid: '₹ 1,000/-', due: '₹ 800/-', date: '13 Jul 2026', status: 'Partial' },
  { id: 'INV-1999', patient: 'Kabir Singh', amount: '₹ 3,200/-', paid: '₹ 0/-', due: '₹ 3,200/-', date: '12 Jul 2026', status: 'Unpaid' },
  { id: 'INV-1998', patient: 'Ananya Gupta', amount: '₹ 950/-', paid: '₹ 950/-', due: '₹ 0/-', date: '10 Jul 2026', status: 'Paid' },
  { id: 'INV-1997', patient: 'Rohan Verma', amount: '₹ 1,500/-', paid: '₹ 1,500/-', due: '₹ 0/-', date: '08 Jul 2026', status: 'Refunded' },
];

const statusColors = { Paid: 'default', Partial: 'secondary', Unpaid: 'destructive', Refunded: 'outline' };

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing & Invoices"
        description="Invoice management, payment tracking, discounts, taxes, and PDF generation."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Finance' }, { label: 'Billing' }]}
        actions={[
          { label: 'Export', icon: Download, variant: 'outline' },
          { label: 'Create Invoice', icon: Plus },
        ]}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '₹ 4,85,000/-', icon: IndianRupee, sub: 'This month', color: 'text-green-500' },
          { label: 'Outstanding Dues', value: '₹ 12,400/-', icon: AlertCircle, sub: '8 invoices', color: 'text-destructive' },
          { label: 'Payments Today', value: '₹ 8,200/-', icon: CreditCard, sub: '5 transactions', color: 'text-primary' },
          { label: 'Avg Invoice', value: '₹ 1,850/-', icon: IndianRupee, sub: 'Per patient', color: 'text-muted-foreground' },
        ].map((k, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">{k.label}</span>
                <k.icon className={`w-4 h-4 ${k.color}`} />
              </div>
              <p className="text-2xl font-bold">{k.value}</p>
              <p className="text-xs text-muted-foreground">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invoice Table */}
      <Card>
        <CardHeader><CardTitle className="text-base">Recent Invoices</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/30">
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Invoice</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Patient</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th>
                <th className="h-10 px-4 text-right font-medium text-muted-foreground">Amount</th>
                <th className="h-10 px-4 text-right font-medium text-muted-foreground">Paid</th>
                <th className="h-10 px-4 text-right font-medium text-muted-foreground">Due</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
                <th className="h-10 px-4 text-right font-medium text-muted-foreground">Actions</th>
              </tr></thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono text-xs">{inv.id}</td>
                    <td className="p-4 font-medium">{inv.patient}</td>
                    <td className="p-4 text-muted-foreground">{inv.date}</td>
                    <td className="p-4 text-right font-medium">{inv.amount}</td>
                    <td className="p-4 text-right text-muted-foreground">{inv.paid}</td>
                    <td className="p-4 text-right font-medium">{inv.due}</td>
                    <td className="p-4"><Badge variant={statusColors[inv.status]}>{inv.status}</Badge></td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm">View</Button>
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
