import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Plus, Send, MessageSquare, CheckCheck, Clock, AlertCircle } from 'lucide-react';

const messages = [
  { id: 'WA-101', to: '+91 98765 43210', patient: 'Aarav Sharma', template: 'appointment_reminder', status: 'Delivered', time: '14 Jul, 09:15 AM', mode: 'Live' },
  { id: 'WA-100', to: '+91 87654 32109', patient: 'Diya Patel', template: 'prescription_ready', status: 'Read', time: '13 Jul, 04:30 PM', mode: 'Live' },
  { id: 'WA-099', to: '+91 76543 21098', patient: 'Kabir Singh', template: 'followup_reminder', status: 'Failed', time: '13 Jul, 10:00 AM', mode: 'Test' },
  { id: 'WA-098', to: '+91 65432 10987', patient: 'Ananya Gupta', template: 'welcome_message', status: 'Delivered', time: '12 Jul, 02:00 PM', mode: 'Live' },
];
const statusIcons = { Delivered: CheckCheck, Read: CheckCheck, Failed: AlertCircle, Pending: Clock };
const statusColors = { Delivered: 'default', Read: 'secondary', Failed: 'destructive', Pending: 'outline' };

export default function WhatsAppPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="WhatsApp Integration" description="Templates, broadcast, test/live mode, delivery reports, and booking commands." breadcrumbs={[{ label: 'Admin' }, { label: 'Communication' }, { label: 'WhatsApp' }]} actions={[{ label: 'Broadcast', icon: Send, variant: 'outline' }, { label: 'New Template', icon: Plus }]} />

      {/* Mode Toggle */}
      <div className="flex gap-2">
        <Button variant="default" size="sm">ðŸŸ¢ Live Mode</Button>
        <Button variant="outline" size="sm">ðŸ§ª Test Mode</Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ label: 'Messages Sent', value: '1,248' },{ label: 'Delivered', value: '1,180' },{ label: 'Read', value: '890' },{ label: 'Failed', value: '68' }].map((k,i)=>(
          <Card key={i}><CardContent className="p-4"><p className="text-2xl font-bold">{k.value}</p><p className="text-xs text-muted-foreground">{k.label}</p></CardContent></Card>
        ))}
      </div>

      {/* Templates */}
      <Card>
        <CardHeader><CardTitle className="text-base">Message Templates</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {['appointment_reminder', 'prescription_ready', 'followup_reminder', 'welcome_message', 'payment_receipt', 'vaccination_due'].map((t, i) => (
              <div key={i} className="border border-border rounded-lg p-3 hover:border-primary/50 transition-colors cursor-pointer">
                <p className="text-sm font-medium font-mono">{t}</p>
                <p className="text-xs text-muted-foreground mt-1">Approved · WhatsApp Business</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message Log */}
      <Card>
        <CardHeader><CardTitle className="text-base">Message History</CardTitle></CardHeader>
        <CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/30"><th className="h-10 px-4 text-left font-medium text-muted-foreground">To</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Patient</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Template</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Mode</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Time</th></tr></thead><tbody>
          {messages.map((m)=>(<tr key={m.id} className="border-b hover:bg-muted/30"><td className="p-4 font-mono text-xs">{m.to}</td><td className="p-4 font-medium">{m.patient}</td><td className="p-4 font-mono text-xs">{m.template}</td><td className="p-4"><Badge variant={m.mode==='Live'?'default':'outline'}>{m.mode}</Badge></td><td className="p-4"><Badge variant={statusColors[m.status]}>{m.status}</Badge></td><td className="p-4 text-muted-foreground text-xs">{m.time}</td></tr>))}
        </tbody></table></div></CardContent>
      </Card>
    </div>
  );
}
