import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Gift, IndianRupee } from 'lucide-react';

const transactions = [
  { id: 'TXN-801', patient: 'Aarav Sharma', type: 'Credit', amount: 'â‚¹500', reason: 'Referral Bonus', date: '14 Jul 2026', balance: 'â‚¹1,200' },
  { id: 'TXN-800', patient: 'Diya Patel', type: 'Debit', amount: 'â‚¹300', reason: 'OPD Payment', date: '13 Jul 2026', balance: 'â‚¹700' },
  { id: 'TXN-799', patient: 'Kabir Singh', type: 'Credit', amount: 'â‚¹1,000', reason: 'Wallet Top-up', date: '12 Jul 2026', balance: 'â‚¹1,000' },
  { id: 'TXN-798', patient: 'Aarav Sharma', type: 'Debit', amount: 'â‚¹200', reason: 'Discount Applied', date: '10 Jul 2026', balance: 'â‚¹700' },
];

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Wallet & Referrals" description="Manage patient wallet credits, debits, referral bonuses, and discount tracking." breadcrumbs={[{ label: 'Admin' }, { label: 'Finance' }, { label: 'Wallet' }]} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ label: 'Total Balance', value: 'â‚¹45,200', icon: WalletIcon },{ label: 'Credits This Month', value: 'â‚¹12,800', icon: ArrowDownLeft },{ label: 'Debits This Month', value: 'â‚¹8,400', icon: ArrowUpRight },{ label: 'Referral Bonuses', value: 'â‚¹3,500', icon: Gift }].map((k,i)=>(
          <Card key={i}><CardContent className="p-4"><div className="flex items-center justify-between mb-1"><span className="text-sm text-muted-foreground">{k.label}</span><k.icon className="w-4 h-4 text-muted-foreground" /></div><p className="text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <Card><CardHeader><CardTitle className="text-base">Transaction History</CardTitle></CardHeader><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/30"><th className="h-10 px-4 text-left font-medium text-muted-foreground">ID</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Patient</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Type</th><th className="h-10 px-4 text-right font-medium text-muted-foreground">Amount</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Reason</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th><th className="h-10 px-4 text-right font-medium text-muted-foreground">Balance</th></tr></thead><tbody>
        {transactions.map((t)=>(<tr key={t.id} className="border-b hover:bg-muted/30"><td className="p-4 font-mono text-xs">{t.id}</td><td className="p-4 font-medium">{t.patient}</td><td className="p-4"><Badge variant={t.type==='Credit'?'default':'secondary'}>{t.type}</Badge></td><td className="p-4 text-right font-medium">{t.amount}</td><td className="p-4 text-muted-foreground">{t.reason}</td><td className="p-4 text-muted-foreground">{t.date}</td><td className="p-4 text-right font-mono">{t.balance}</td></tr>))}
      </tbody></table></div></CardContent></Card>
    </div>
  );
}
