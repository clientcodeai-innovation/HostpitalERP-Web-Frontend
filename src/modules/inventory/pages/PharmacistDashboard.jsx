import React from 'react';
import { Pill, AlertCircle, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { useToast } from '../../../shared/ui/ToastContext';

export default function PharmacistDashboard() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pharmacy Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage inventory, prescriptions, and alerts.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => toast('Inventory sync started', 'default')}>Sync Inventory</Button>
          <Button onClick={() => toast('New dispense record form opened', 'default')}>Dispense Medicine</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Prescriptions</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">Needs attention today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">8</div>
            <p className="text-xs text-muted-foreground mt-1">Items below threshold</p>
            <Button variant="link" className="px-0 h-auto text-xs mt-2" onClick={() => toast('Navigating to low stock alerts', 'default')}>View Details</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
