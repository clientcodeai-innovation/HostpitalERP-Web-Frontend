import React from 'react';
import { BarChart3, LineChart as LineIcon, PieChart } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { LineChart, BarChart, DonutChart } from '../shared/Charts';

export default function AnalyticsView() {
  const { items, batches, categories, transactions } = useInventory();

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
      } else {
        // Fallback to medicines category or general
        if (valueMap['CAT-001']) {
          valueMap['CAT-001'].value += itemVal;
        }
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

  // 2. Monthly purchase trends (For Line Chart)
  // Mock monthly purchases for the line chart (or calculated from ledger if available)
  const purchaseTrendsData = React.useMemo(() => {
    return [
      { label: 'Feb', value: 45000 },
      { label: 'Mar', value: 38000 },
      { label: 'Apr', value: 52000 },
      { label: 'May', value: 48000 },
      { label: 'Jun', value: 65000 },
      { label: 'Jul', value: 78000 }
    ];
  }, []);

  // 3. Monthly consumption / issues qty (For Bar Chart)
  const consumptionTrendsData = React.useMemo(() => {
    return [
      { label: 'Feb', value: 120 },
      { label: 'Mar', value: 180 },
      { label: 'Apr', value: 150 },
      { label: 'May', value: 210 },
      { label: 'Jun', value: 240 },
      { label: 'Jul', value: 320 }
    ];
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Value Distribution */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm flex flex-col">
          <h3 className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 border-b pb-2">
            <PieChart className="w-4 h-4 text-primary shrink-0" />
            Inventory Value Distribution (₹)
          </h3>
          <div className="flex-1 flex items-center justify-center p-3">
            <DonutChart data={categoryValueData} size={150} />
          </div>
        </div>

        {/* Purchase Value Trends */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm flex flex-col">
          <h3 className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 border-b pb-2">
            <LineIcon className="w-4 h-4 text-primary shrink-0" />
            Monthly Procurement Expenditure (₹)
          </h3>
          <div className="flex-1 p-1">
            <LineChart
              data={purchaseTrendsData}
              strokeColor="#3b82f6"
              yAxisLabel="Cost"
            />
          </div>
        </div>

        {/* Medicine Consumption trends */}
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm flex flex-col lg:col-span-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 border-b pb-2">
            <BarChart3 className="w-4 h-4 text-primary shrink-0" />
            Monthly Drug Consumption (Unit Qty)
          </h3>
          <div className="p-1">
            <BarChart
              data={consumptionTrendsData}
              barColor="#10b981"
              yAxisLabel="Qty"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
