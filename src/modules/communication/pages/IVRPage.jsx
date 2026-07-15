import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Phone, PhoneIncoming, PhoneOutgoing, Hash } from 'lucide-react';

const calls = [
  { id: 'IVR-201', caller: '+91 98765 43210', patient: 'Aarav Sharma', duration: '2:34', keypress: '1 â†’ 2', action: 'Book Appointment', status: 'Completed', time: '14 Jul, 09:10 AM' },
  { id: 'IVR-200', caller: '+91 87654 32109', patient: 'Unknown', duration: '0:45', keypress: '1 â†’ 3', action: 'Speak to Doctor', status: 'Transferred', time: '13 Jul, 03:45 PM' },
  { id: 'IVR-199', caller: '+91 76543 21098', patient: 'Kabir Singh', duration: '1:12', keypress: '2', action: 'Clinic Hours', status: 'Completed', time: '13 Jul, 11:00 AM' },
  { id: 'IVR-198', caller: '+91 55555 12345', patient: 'Unknown', duration: '0:08', keypress: 'â€”', action: 'Abandoned', status: 'Missed', time: '12 Jul, 06:30 PM' },
];
const statusColors = { Completed: 'default', Transferred: 'secondary', Missed: 'destructive' };

export default function IVRPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="IVR / Call Management" description="Twilio-powered IVR with keypress menu, call logs, and interaction tracking." breadcrumbs={[{ label: 'Admin' }, { label: 'Communication' }, { label: 'IVR' }]} />

      {/* IVR Menu Preview */}
      <Card>
        <CardHeader><CardTitle className="text-base">IVR Menu â€” Hari Om Homeo Clinic</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {[
              { key: '1', label: 'Book Appointment', sub: 'â†’ Press 1 for OPD, 2 for Emergency, 3 for Doctor' },
              { key: '2', label: 'Clinic Hours & Location' },
              { key: '3', label: 'Speak to Receptionist' },
              { key: '0', label: 'Repeat Menu' },
            ].map((m, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0"><Hash className="w-4 h-4 text-primary" /><span className="text-xs font-bold text-primary">{m.key}</span></div>
                <div><p className="font-medium">{m.label}</p>{m.sub && <p className="text-xs text-muted-foreground mt-0.5">{m.sub}</p>}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ label: 'Total Calls', value: '342', icon: Phone },{ label: 'Inbound', value: '298', icon: PhoneIncoming },{ label: 'Completed', value: '285', icon: PhoneOutgoing },{ label: 'Missed', value: '13', icon: Phone }].map((k,i)=>(
          <Card key={i}><CardContent className="p-4 flex items-center gap-3"><k.icon className="w-5 h-5 text-primary" /><div><p className="text-xl font-bold">{k.value}</p><p className="text-xs text-muted-foreground">{k.label}</p></div></CardContent></Card>
        ))}
      </div>

      {/* Call Log */}
      <Card><CardHeader><CardTitle className="text-base">Call Log</CardTitle></CardHeader><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/30"><th className="h-10 px-4 text-left font-medium text-muted-foreground">Caller</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Patient</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Duration</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Keypress</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Action</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Time</th></tr></thead><tbody>
        {calls.map((c)=>(<tr key={c.id} className="border-b hover:bg-muted/30"><td className="p-4 font-mono text-xs">{c.caller}</td><td className="p-4 font-medium">{c.patient}</td><td className="p-4">{c.duration}</td><td className="p-4 font-mono">{c.keypress}</td><td className="p-4">{c.action}</td><td className="p-4"><Badge variant={statusColors[c.status]}>{c.status}</Badge></td><td className="p-4 text-xs text-muted-foreground">{c.time}</td></tr>))}
      </tbody></table></div></CardContent></Card>
    </div>
  );
}
