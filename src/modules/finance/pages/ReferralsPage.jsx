import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Users, Gift, TrendingUp, Award } from 'lucide-react';

const referralTransactions = [
  { id: 'REF-105', referrer: 'Aarav Sharma', referredPatient: 'Diya Patel', amount: '₹ 500/-', status: 'Credited', date: '14 Jul 2026' },
  { id: 'REF-104', referrer: 'Kabir Singh', referredPatient: 'Rohan Verma', amount: '₹ 500/-', status: 'Pending', date: '11 Jul 2026' },
  { id: 'REF-103', referrer: 'Dr. Vivek Jain', referredPatient: 'Kabir Singh', amount: '₹ 1,500/-', status: 'Credited', date: '08 Jul 2026' },
];

export default function ReferralsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Referrals Program" 
        description="Track patient and external doctor referrals, monitor bonuses, and manage payouts." 
        breadcrumbs={[{ label: 'Admin' }, { label: 'Finance' }, { label: 'Referrals' }]} 
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Referrals', value: '1,240', icon: Users },
          { label: 'Bonuses Paid', value: '₹ 45,500/-', icon: Gift },
          { label: 'Pending Bonuses', value: '₹ 3,000/-', icon: TrendingUp },
          { label: 'Top Referrer', value: 'Aarav Sharma', icon: Award }
        ].map((k,i)=>(
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted-foreground">{k.label}</span>
                <k.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-xl font-bold truncate">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Referral Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">ID</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Referrer</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Referred Patient</th>
                  <th className="h-10 px-4 text-right font-medium text-muted-foreground">Amount</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {referralTransactions.map((t)=>(
                  <tr key={t.id} className="border-b hover:bg-muted/30">
                    <td className="p-4 font-mono text-xs text-muted-foreground">{t.id}</td>
                    <td className="p-4 font-medium">{t.referrer}</td>
                    <td className="p-4 font-medium">{t.referredPatient}</td>
                    <td className="p-4 text-right font-medium text-success">{t.amount}</td>
                    <td className="p-4 text-muted-foreground">{t.date}</td>
                    <td className="p-4">
                      <Badge variant={t.status === 'Credited' ? 'default' : 'secondary'}>{t.status}</Badge>
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
