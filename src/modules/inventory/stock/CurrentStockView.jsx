import React, { useState } from 'react';
import { RefreshCw, ArrowRight, ShoppingCart, Info } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import Modal from '../shared/Modal';
import StatusBadge from '../shared/StatusBadge';

export default function CurrentStockView({ onNavigateToPr }) {
  const {
    items,
    batches,
    categories,
    warehouses,
    saveRequisition
  } = useInventory();

  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Compute aggregated quantities for each item
  const aggregatedStock = React.useMemo(() => {
    return items.map(item => {
      const itemBatches = batches.filter(b => b.itemId === item.id);
      const totalQty = itemBatches.reduce((sum, b) => sum + b.qty, 0);
      
      let status = 'In Stock';
      if (totalQty === 0) {
        status = 'Out of Stock';
      } else if (totalQty <= item.reorderLevel / 2) {
        status = 'Very Low Stock';
      } else if (totalQty <= item.reorderLevel) {
        status = 'Low Stock';
      }

      return {
        ...item,
        totalQty,
        status,
        batches: itemBatches
      };
    });
  }, [items, batches]);

  const handleOpenDetails = (row) => {
    setSelectedItem(row);
    setIsDetailsOpen(true);
  };

  const handleQuickReorder = (row) => {
    // Automatically create a quick draft requisition for the item
    saveRequisition({
      department: 'Central Pharmacy Restocking',
      urgency: 'High',
      remarks: `Automated reorder warning trigger for item: ${row.name}`,
      status: 'Pending',
      items: [{
        itemId: row.id,
        qtyRequested: Math.max(50, row.reorderLevel * 2),
        qtyApproved: 0,
        estimatedCost: row.purchasePrice
      }]
    });
    
    // If the navigation callback is provided, redirect to PR tab
    if (onNavigateToPr) onNavigateToPr();
  };

  const columns = [
    { key: 'code', label: 'Item Code', sortable: true, width: '15%' },
    { key: 'name', label: 'Item Name', sortable: true, width: '25%' },
    {
      key: 'categoryId',
      label: 'Category',
      sortable: true,
      width: '15%',
      render: (val) => {
        const cat = categories.find(c => c.id === val);
        return cat ? cat.name : val;
      }
    },
    { 
      key: 'totalQty', 
      label: 'Current Quantity', 
      sortable: true, 
      width: '15%', 
      align: 'right', 
      render: (val, row) => {
        let colorClass = 'text-emerald-600 dark:text-emerald-500';
        if (val === 0 || val <= (row.reorderLevel / 2)) {
          colorClass = 'text-rose-600 dark:text-rose-500';
        } else if (val <= row.reorderLevel) {
          colorClass = 'text-amber-600 dark:text-amber-500';
        }
        return <span className={`font-mono font-bold ${colorClass}`}>{val}</span>;
      }
    },
    { key: 'reorderLevel', label: 'Reorder Level', sortable: true, width: '12%', align: 'right', render: (val) => <span className="font-mono text-muted-foreground">{val}</span> },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '18%',
      render: (val) => <StatusBadge status={val} />
    }
  ];

  const actions = (row) => (
    <>
      <button
        onClick={() => handleOpenDetails(row)}
        className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
        title="View Lot breakdown"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      {row.status !== 'In Stock' && (
        <button
          onClick={() => handleQuickReorder(row)}
          className="p-1 text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors cursor-pointer"
          title="Trigger Quick Restock Requisition"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
        </button>
      )}
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search stock inventory..." className="sm:max-w-xs" />
        <div className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
          <RefreshCw className="w-3.5 h-3.5 text-primary animate-spin-slow" />
          Realtime balances tracked automatically
        </div>
      </div>

      <DataTable
        columns={columns}
        data={aggregatedStock}
        searchQuery={search}
        searchKeys={['name', 'genericName', 'code', 'status']}
        actions={actions}
        emptyMessage="No stocks tracked in warehouses."
      />

      {/* Batch Breakdown Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title={`Stock Breakdown: ${selectedItem?.name}`} size="lg">
        {selectedItem && (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground font-semibold">
              Below is the layout of current batches and warehouse racks holding this inventory lot.
            </div>

            <div className="border border-border rounded-lg overflow-hidden bg-card/20">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-muted border-b border-border text-[10px] text-muted-foreground uppercase font-bold">
                    <th className="p-3">Warehouse Area</th>
                    <th className="p-3">Batch Number</th>
                    <th className="p-3 text-right">In Stock Qty</th>
                    <th className="p-3">QC Quality</th>
                    <th className="p-3">Expiry Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {selectedItem.batches.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-muted-foreground italic font-semibold">
                        No active lots or batches found. Stock is 0.
                      </td>
                    </tr>
                  ) : (
                    selectedItem.batches.map((b, idx) => {
                      const wh = warehouses.find(w => w.id === b.warehouseId);
                      return (
                        <tr key={idx} className="hover:bg-muted/10 font-medium">
                          <td className="p-3">{wh ? wh.name : b.warehouseId}</td>
                          <td className="p-3 font-mono font-bold text-foreground">{b.batchNo}</td>
                          <td className="p-3 text-right font-mono font-bold text-primary">{b.qty}</td>
                          <td className="p-3"><StatusBadge status={b.qcStatus || 'Passed'} /></td>
                          <td className="p-3 font-mono">{b.expiryDate}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
