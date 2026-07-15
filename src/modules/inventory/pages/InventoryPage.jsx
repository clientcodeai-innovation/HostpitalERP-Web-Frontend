import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Plus, Download, AlertTriangle, Package, Search } from 'lucide-react';
import { Input } from '../../../shared/ui/Input';

const medicines = [
  { id: 'M-101', name: 'Aconitum Napellus', batch: 'BN-2026-01', potency: '30C', stock: 450, reorder: 100, rack: 'A-1', expiry: 'Mar 2028', supplier: 'SBL India', status: 'In Stock' },
  { id: 'M-102', name: 'Bryonia Alba', batch: 'BN-2026-03', potency: '200C', stock: 12, reorder: 50, rack: 'A-2', expiry: 'Jan 2027', supplier: 'Dr. Reckeweg', status: 'Low Stock' },
  { id: 'M-103', name: 'Belladonna', batch: 'BN-2025-12', potency: '6C', stock: 280, reorder: 80, rack: 'A-3', expiry: 'Jun 2027', supplier: 'SBL India', status: 'In Stock' },
  { id: 'M-104', name: 'Nux Vomica', batch: 'BN-2025-11', potency: '30C', stock: 0, reorder: 100, rack: 'B-1', expiry: 'Dec 2026', supplier: 'Schwabe', status: 'Out of Stock' },
  { id: 'M-105', name: 'Arnica Montana', batch: 'BN-2026-02', potency: '200C', stock: 8, reorder: 30, rack: 'B-2', expiry: 'Aug 2026', supplier: 'Allen India', status: 'Expiring Soon' },
];

const statusColors = { 'In Stock': 'default', 'Low Stock': 'secondary', 'Out of Stock': 'destructive', 'Expiring Soon': 'outline' };

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Medicine Inventory"
        description="Manage stock, batches, expiry dates, reorder levels, racks, and suppliers."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Inventory' }, { label: 'Medicine Stock' }]}
        actions={[
          { label: 'Export', icon: Download, variant: 'outline' },
          { label: 'Purchase Entry', icon: Plus },
        ]}
      />

      {/* Low Stock Alert */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm">
        <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0" />
        <span><strong>3 items</strong> need attention: 1 out of stock, 1 low stock, 1 expiring soon.</span>
        <Button variant="outline" size="sm" className="ml-auto">View All Alerts</Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: '342' },
          { label: 'In Stock', value: '298' },
          { label: 'Low Stock', value: '28' },
          { label: 'Expired / Expiring', value: '16' },
        ].map((k, i) => (
          <Card key={i}><CardContent className="p-4"><p className="text-2xl font-bold">{k.value}</p><p className="text-sm text-muted-foreground">{k.label}</p></CardContent></Card>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search medicine by name, batch, or supplier..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Stock Table */}
      <Card>
        <CardHeader><CardTitle className="text-base">Stock List</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/30">
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Medicine</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Potency</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Batch</th>
                <th className="h-10 px-4 text-right font-medium text-muted-foreground">Stock</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Rack</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Expiry</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Supplier</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
              </tr></thead>
              <tbody>
                {medicines.map((m) => (
                  <tr key={m.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{m.name}</td>
                    <td className="p-4"><Badge variant="outline">{m.potency}</Badge></td>
                    <td className="p-4 font-mono text-xs text-muted-foreground">{m.batch}</td>
                    <td className="p-4 text-right font-mono">{m.stock}</td>
                    <td className="p-4 text-muted-foreground">{m.rack}</td>
                    <td className="p-4 text-muted-foreground">{m.expiry}</td>
                    <td className="p-4 text-muted-foreground">{m.supplier}</td>
                    <td className="p-4"><Badge variant={statusColors[m.status]}>{m.status}</Badge></td>
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
