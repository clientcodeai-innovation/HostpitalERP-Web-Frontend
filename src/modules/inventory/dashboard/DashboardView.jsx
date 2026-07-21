import React from 'react';
import { Package, FolderOpen, Truck, AlertTriangle, AlertOctagon, TrendingUp, History, ShoppingCart, HelpCircle } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import KpiCards from '../shared/KpiCards';
import { LineChart, DonutChart } from '../shared/Charts';

export default function DashboardView({ onNavigateToSection }) {
  const {
    items,
    batches,
    categories,
    vendors,
    warehouses,
    auditLogs
  } = useInventory();

  // Compute KPI statistics
  const stats = React.useMemo(() => {
    let inventoryValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    
    // Low / Out of Stock counts & Value
    items.forEach(itm => {
      const itmBatches = batches.filter(b => b.itemId === itm.id);
      const totalQty = itmBatches.reduce((s, b) => s + b.qty, 0);
      
      inventoryValue += (totalQty * itm.purchasePrice);

      if (totalQty === 0) {
        outOfStockCount++;
      } else if (totalQty <= itm.reorderLevel) {
        lowStockCount++;
      }
    });

    // Expiry counts
    const today = new Date();
    const threeMonthsAway = new Date();
    threeMonthsAway.setMonth(today.getMonth() + 3);

    let expiredCount = 0;
    let expiringSoonCount = 0;

    batches.forEach(b => {
      if (b.qty > 0) {
        const expDate = new Date(b.expiryDate);
        if (expDate <= today) {
          expiredCount++;
        } else if (expDate <= threeMonthsAway) {
          expiringSoonCount++;
        }
      }
    });

    return {
      totalItems: items.length,
      totalCategories: categories.length,
      totalVendors: vendors.length,
      totalWarehouses: warehouses.length,
      lowStock: lowStockCount,
      outOfStock: outOfStockCount,
      expired: expiredCount,
      expiringSoon: expiringSoonCount,
      value: inventoryValue
    };
  }, [items, batches, categories, vendors, warehouses]);

  const kpis = [
    { title: 'Total Medicines', value: stats.totalItems, icon: Package, description: 'Catalog items' },
    { title: 'Inventory Value', value: `₹${stats.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: TrendingUp, description: 'Assets in stock' },
    { title: 'Low Stock Items', value: stats.lowStock, icon: AlertTriangle, description: 'Action required soon', trend: stats.lowStock > 0 ? 'Warning' : null, trendType: 'down' },
    { title: 'Out of Stock', value: stats.outOfStock, icon: AlertOctagon, valueColor: 'text-rose-600', description: 'Locked items', trend: stats.outOfStock > 0 ? 'Critical' : null, trendType: 'down' }
  ];

  const secondaryKpis = [
    { title: 'Expired Lots', value: stats.expired, icon: AlertOctagon, description: 'Disposal needed' },
    { title: 'Expiring Soon', value: stats.expiringSoon, icon: AlertTriangle, description: 'Next 90 days' },
    { title: 'Active Vendors', value: stats.totalVendors, icon: Truck, description: 'Assigned suppliers' },
    { title: 'Warehouses', value: stats.totalWarehouses, icon: FolderOpen, description: 'Storage locations' }
  ];

  // 1. Calculate stock value per category (For Donut Chart)
  const categoryValueData = React.useMemo(() => {
    const valueMap = {};
    categories.forEach(cat => { valueMap[cat.id] = { label: cat.name, value: 0 }; });

    items.forEach(itm => {
      const itmBatches = batches.filter(b => b.itemId === itm.id);
      const totalQty = itmBatches.reduce((s, b) => s + b.qty, 0);
      const itemVal = totalQty * itm.purchasePrice;
      
      const catId = itm.categoryId;
      if (valueMap[catId]) {
        valueMap[catId].value += itemVal;
      }
    });

    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
    return Object.values(valueMap)
      .filter(x => x.value > 0)
      .map((x, idx) => ({
        label: x.label,
        value: Math.round(x.value),
        color: colors[idx % colors.length]
      }));
  }, [items, batches, categories]);

  // Mock monthly purchases for line chart
  const purchaseTrendsData = [
    { label: 'Feb', value: 45000 },
    { label: 'Mar', value: 38000 },
    { label: 'Apr', value: 52000 },
    { label: 'May', value: 48000 },
    { label: 'Jun', value: 65000 },
    { label: 'Jul', value: 78000 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Expiry / Low stock notifications alert banner */}
      {(stats.expired > 0 || stats.outOfStock > 0) && (
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-600 dark:text-rose-400">
          <AlertOctagon className="w-5 h-5 shrink-0 animate-pulse" />
          <div>
            <h4 className="font-bold text-foreground">Critical Inventory Warnings</h4>
            <p className="mt-0.5">
              Found <strong className="text-foreground">{stats.outOfStock} out-of-stock items</strong> and{' '}
              <strong className="text-foreground">{stats.expired} expired lot batches</strong>. Re-order items or clear expired lots to restore clinical operations.
            </p>
          </div>
        </div>
      )}

      {/* Main Stats Grid */}
      <KpiCards cards={kpis} />
      
      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {secondaryKpis.map((card, idx) => (
          <div key={idx} className="bg-card/40 backdrop-blur-md border border-border p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">{card.title}</p>
              <h4 className="text-lg font-black text-foreground mt-1">{card.value}</h4>
              <p className="text-[10px] text-muted-foreground mt-0.5">{card.description}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-muted text-muted-foreground">
              <card.icon className="w-4.5 h-4.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Value Distribution */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm flex flex-col">
          <h3 className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 border-b pb-2">
            <Package className="w-4 h-4 text-primary shrink-0" />
            Value Distribution by Category
          </h3>
          <div className="flex-1 flex items-center justify-center p-2">
            <DonutChart data={categoryValueData} size={140} />
          </div>
        </div>

        {/* Purchase trends line chart */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm flex flex-col">
          <h3 className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 border-b pb-2">
            <TrendingUp className="w-4 h-4 text-primary shrink-0" />
            Procurement Value Trends
          </h3>
          <div className="flex-1 p-1">
            <LineChart
              data={purchaseTrendsData}
              strokeColor="#3b82f6"
              yAxisLabel="Cost"
            />
          </div>
        </div>
      </div>

      {/* Recent Activities & Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Audit Logs */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-3.5 shadow-sm md:col-span-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 border-b pb-2">
            <History className="w-4 h-4 text-primary" />
            Recent Action Audit Logs
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin">
            {auditLogs.slice(0, 5).map(log => (
              <div key={log.id} className="flex justify-between items-start gap-4 text-xs font-medium border-b border-border/40 pb-2">
                <div>
                  <p className="text-foreground">{log.details}</p>
                  <span className="text-[10px] text-muted-foreground/60 mt-0.5 block">{log.module} — By {log.user}</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono whitespace-nowrap">{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Shortcuts */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm flex flex-col">
          <h3 className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 border-b pb-1.5">
            <ShoppingCart className="w-4 h-4 text-primary" />
            Quick Shortcuts
          </h3>

          <div className="flex-1 flex flex-col gap-2.5">
            <button
              onClick={() => onNavigateToSection('purchase-requisition')}
              className="w-full text-left p-3 rounded-lg border border-border bg-muted/10 hover:bg-muted/50 transition-colors text-xs font-semibold flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="text-foreground">Draft Purchase Requisition</p>
                <span className="text-[10px] text-muted-foreground font-medium mt-0.5 block">Submit drug request list</span>
              </div>
              <Package className="w-4.5 h-4.5 text-primary shrink-0" />
            </button>

            <button
              onClick={() => onNavigateToSection('stock-adjustment')}
              className="w-full text-left p-3 rounded-lg border border-border bg-muted/10 hover:bg-muted/50 transition-colors text-xs font-semibold flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="text-foreground">Reconcile Inventory Stock</p>
                <span className="text-[10px] text-muted-foreground font-medium mt-0.5 block">Record audit discrepant lots</span>
              </div>
              <AlertTriangle className="w-4.5 h-4.5 text-amber-500 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
