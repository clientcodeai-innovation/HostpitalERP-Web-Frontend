import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Plus, Truck, Package, MapPin } from 'lucide-react';

const orders = [
  { id: 'ORD-301', patient: 'Aarav Sharma', items: 3, date: '14 Jul 2026', awb: 'AWB12345678', carrier: 'BlueDart', status: 'Shipped' },
  { id: 'ORD-300', patient: 'Diya Patel', items: 2, date: '13 Jul 2026', awb: '-', carrier: '-', status: 'Packaging' },
  { id: 'ORD-299', patient: 'Kabir Singh', items: 1, date: '12 Jul 2026', awb: 'AWB98765432', carrier: 'DTDC', status: 'Delivered' },
  { id: 'ORD-298', patient: 'Rohan Verma', items: 4, date: '10 Jul 2026', awb: 'AWB55566677', carrier: 'BlueDart', status: 'Delivered' },
];
const statusColors = { Packaging: 'secondary', Shipped: 'default', Delivered: 'outline', Cancelled: 'destructive' };

export default function DeliveryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Delivery & Orders" description="Medicine orders, shipment tracking, AWB management, and delivery status." breadcrumbs={[{ label: 'Admin' }, { label: 'Inventory' }, { label: 'Delivery' }]} actions={[{ label: 'New Order', icon: Plus }]} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ label: 'Total Orders', value: '156', icon: Package },{ label: 'In Transit', value: '8', icon: Truck },{ label: 'Delivered', value: '142', icon: MapPin },{ label: 'Pending', value: '6', icon: Package }].map((k,i)=>(
          <Card key={i}><CardContent className="p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><k.icon className="w-5 h-5 text-primary" /></div><div><p className="text-xl font-bold">{k.value}</p><p className="text-xs text-muted-foreground">{k.label}</p></div></CardContent></Card>
        ))}
      </div>
      <Card><CardHeader><CardTitle className="text-base">Orders</CardTitle></CardHeader><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/30"><th className="h-10 px-4 text-left font-medium text-muted-foreground">Order ID</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Patient</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Items</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">AWB</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Carrier</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th></tr></thead><tbody>
        {orders.map((o)=>(<tr key={o.id} className="border-b hover:bg-muted/30 transition-colors"><td className="p-4 font-mono text-xs">{o.id}</td><td className="p-4 font-medium">{o.patient}</td><td className="p-4">{o.items}</td><td className="p-4 text-muted-foreground">{o.date}</td><td className="p-4 font-mono text-xs">{o.awb}</td><td className="p-4 text-muted-foreground">{o.carrier}</td><td className="p-4"><Badge variant={statusColors[o.status]}>{o.status}</Badge></td></tr>))}
      </tbody></table></div></CardContent></Card>
    </div>
  );
}
