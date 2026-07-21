import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, RefreshCw } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import StatusBadge from '../shared/StatusBadge';
import ConfirmationDialog from '../shared/ConfirmationDialog';

export default function BatchManagementView() {
  const { batches, setBatches, items, warehouses } = useInventory();
  const [search, setSearch] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [targetBatch, setTargetBatch] = useState(null);

  const handleQcToggleTrigger = (batch) => {
    setTargetBatch(batch);
    setIsConfirmOpen(true);
  };

  const handleQcConfirm = () => {
    if (targetBatch) {
      const nextStatus = targetBatch.qcStatus === 'Passed' ? 'Failed' : 'Passed';
      setBatches(prev => prev.map(b => b.id === targetBatch.id ? { ...b, qcStatus: nextStatus } : b));
      setIsConfirmOpen(false);
    }
  };

  const columns = [
    { key: 'batchNo', label: 'Batch/Lot Number', sortable: true, width: '20%', render: (val) => <span className="font-mono font-bold text-foreground">{val}</span> },
    {
      key: 'itemId',
      label: 'Medicine Item',
      sortable: true,
      width: '25%',
      render: (val) => {
        const itm = items.find(i => i.id === val);
        return itm ? itm.name : val;
      }
    },
    {
      key: 'warehouseId',
      label: 'Storage Warehouse',
      sortable: true,
      width: '20%',
      render: (val) => {
        const wh = warehouses.find(w => w.id === val);
        return wh ? wh.name : val;
      }
    },
    { key: 'qty', label: 'Quantity In Lot', sortable: true, width: '12%', align: 'right', render: (val) => <span className="font-mono font-bold">{val}</span> },
    { key: 'expiryDate', label: 'Expiry Date', sortable: true, width: '13%', render: (val) => <span className="font-mono">{val}</span> },
    {
      key: 'qcStatus',
      label: 'QC Status',
      sortable: true,
      width: '10%',
      render: (val) => <StatusBadge status={val || 'Passed'} />
    }
  ];

  const actions = (row) => (
    <button
      onClick={() => handleQcToggleTrigger(row)}
      className={`p-1.5 rounded-lg border transition-colors cursor-pointer flex items-center justify-center ${
        row.qcStatus === 'Failed'
          ? 'border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-600'
          : 'border-rose-500/20 hover:bg-rose-500/10 text-rose-600'
      }`}
      title={row.qcStatus === 'Failed' ? 'Release QC Lock' : 'Apply QC Lock (Fail)'}
    >
      {row.qcStatus === 'Failed' ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
    </button>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search batches..." className="sm:max-w-xs" />
        <div className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Controlled Batching release workspace
        </div>
      </div>

      <DataTable
        columns={columns}
        data={batches}
        searchQuery={search}
        searchKeys={['batchNo', 'qcStatus']}
        actions={actions}
        emptyMessage="No batches active in storage."
      />

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleQcConfirm}
        title="Toggle Quality Control Release"
        message={`Are you sure you want to change the QC Status of batch "${targetBatch?.batchNo}" to "${targetBatch?.qcStatus === 'Passed' ? 'Failed' : 'Passed'}"? Failed batches are locked from departmental issues.`}
        variant={targetBatch?.qcStatus === 'Passed' ? 'warning' : 'success'}
      />
    </div>
  );
}
