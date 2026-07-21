import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Bell, Mail, MessageSquare, Smartphone, Plus } from 'lucide-react';

const notifications = [
  { id: 1, title: 'Appointment Reminder', channel: 'WhatsApp', to: 'Aarav Sharma', time: '14 Jul, 08:00 AM', status: 'Sent' },
  { id: 2, title: 'Payment Receipt', channel: 'Email', to: 'diya@email.com', time: '13 Jul, 05:00 PM', status: 'Sent' },
  { id: 3, title: 'Follow-up Reminder', channel: 'SMS', to: '+91 76543 21098', time: '13 Jul, 09:00 AM', status: 'Failed' },
  { id: 4, title: 'Low Stock Alert', channel: 'Push', to: 'Admin', time: '12 Jul, 06:00 PM', status: 'Sent' },
  { id: 5, title: 'Vaccination Due', channel: 'WhatsApp', to: 'Ananya Gupta', time: '12 Jul, 10:00 AM', status: 'Queued' },
];
const channelIcons = { WhatsApp: MessageSquare, Email: Mail, SMS: Smartphone, Push: Bell };
const statusColors = { Sent: 'default', Failed: 'destructive', Queued: 'secondary' };

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notification Center" description="Email, SMS, WhatsApp, push notifications - templates, logs, and automation rules." breadcrumbs={[{ label: 'Admin' }, { label: 'Communication' }, { label: 'Notifications' }]} actions={[{ label: 'New Template', icon: Plus }]} />
      {/* Channel Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'WhatsApp', 'Email', 'SMS', 'Push'].map((ch, i) => (
          <Button key={i} variant={i === 0 ? 'default' : 'outline'} size="sm">{ch}</Button>
        ))}
      </div>
      <Card><CardHeader><CardTitle className="text-base">Notification Log</CardTitle></CardHeader><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/30"><th className="h-10 px-4 text-left font-medium text-muted-foreground">Title</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Channel</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Recipient</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Time</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th></tr></thead><tbody>
        {notifications.map((n)=>{ const Icon = channelIcons[n.channel]; return (
          <tr key={n.id} className="border-b hover:bg-muted/30"><td className="p-4 font-medium">{n.title}</td><td className="p-4"><span className="flex items-center gap-1.5"><Icon className="w-3.5 h-3.5 text-muted-foreground" />{n.channel}</span></td><td className="p-4 text-muted-foreground">{n.to}</td><td className="p-4 text-xs text-muted-foreground">{n.time}</td><td className="p-4"><Badge variant={statusColors[n.status]}>{n.status}</Badge></td></tr>
        );})}
      </tbody></table></div></CardContent></Card>
    </div>
  );
}
