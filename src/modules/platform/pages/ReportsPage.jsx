import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Download, BarChart3, Users, Calendar, Stethoscope, CreditCard, Package, Truck, MessageSquare, Phone, Activity } from 'lucide-react';

const reportCategories = [
  { title: 'Patient Reports', desc: 'Registrations, demographics, visit frequency, referrals.', icon: Users, count: 8 },
  { title: 'Appointment Reports', desc: 'Daily/weekly/monthly bookings, no-shows, cancellations.', icon: Calendar, count: 6 },
  { title: 'Consultation Reports', desc: 'Consultation logs, diagnosis trends, follow-up rates.', icon: Stethoscope, count: 5 },
  { title: 'Billing Reports', desc: 'Revenue, outstanding dues, payment method split.', icon: CreditCard, count: 7 },
  { title: 'Inventory Reports', desc: 'Stock levels, expiry alerts, purchase history.', icon: Package, count: 4 },
  { title: 'Delivery Reports', desc: 'Order fulfillment, shipment delays, delivery rate.', icon: Truck, count: 3 },
  { title: 'WhatsApp Reports', desc: 'Message delivery, read rates, template performance.', icon: MessageSquare, count: 4 },
  { title: 'IVR Analytics', desc: 'Call volume, missed calls, menu navigation.', icon: Phone, count: 3 },
  { title: 'Operational Dashboard', desc: 'Real-time KPIs, daily summary, trends.', icon: Activity, count: 5 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" description="Comprehensive reports across all modules with export and date filters." breadcrumbs={[{ label: 'Admin' }, { label: 'Platform' }, { label: 'Reports' }]} actions={[{ label: 'Export All', icon: Download, variant: 'outline' }]} />
      {/* Date Filter */}
      <Card><CardContent className="p-4 flex flex-wrap gap-3 items-center">
        <span className="text-sm font-medium">Date Range:</span>
        {['Today', 'This Week', 'This Month', 'Custom'].map((d, i) => (
          <Button key={i} variant={i === 2 ? 'default' : 'outline'} size="sm">{d}</Button>
        ))}
      </CardContent></Card>
      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportCategories.map((r, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"><r.icon className="w-5 h-5 text-primary" /></div>
                <Badge variant="outline">{r.count} reports</Badge>
              </div>
              <CardTitle className="text-base mt-3">{r.title}</CardTitle>
            </CardHeader>
            <CardContent><CardDescription>{r.desc}</CardDescription>
              <Button variant="ghost" size="sm" className="mt-3 gap-1.5 p-0 h-auto text-primary"><Download className="w-3.5 h-3.5" />Export CSV</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
