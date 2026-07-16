import React, { useState } from 'react';
import { CalendarRange, AlertOctagon, HelpCircle, ShieldAlert } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import StatusBadge from '../shared/StatusBadge';

export default function ExpiryManagementView() {
  const { batches, items, warehouses } = useInventory();
  const [search, setSearch] = useState('');
  const [expiryFilter, setExpiryFilter] = useState('all');

  const today = new Date();
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(today.getMonth() + 3);

  // Classify expiry status
  const classifiedBatches = React.useMemo(() => {
    return batches.map(b => {
      const expDate = new Date(b.expiryDate);
      let expiryStatus = 'Safe';
      
      if (expDate <= today) {
        expiryStatus = 'Expired';
      } else if (expDate <= threeMonthsFromNow) {
        expiryStatus = 'Expiring Soon';
      }

      return {
        ...b,
        expiryStatus
      };
    });
  }, [batches]);

  // Filter based on selected criteria
  const filteredBatches = React.useMemo(() => {
    const list = classifiedBatches.filter(b => b.qty > 0); // only show lots with stock
    if (expiryFilter === 'all') return list;
    return list.filter(b => b.expiryStatus === expiryFilter);
  }, [classifiedBatches, expiryFilter]);

  // Counts for summary metrics
  const stats = React.useMemo(() => {
    const activeLots = classifiedBatches.filter(b => b.qty > 0);
    return {
      expired: activeLots.filter(b => b.expiryStatus === 'Expired').length,
      expiringSoon: activeLots.filter(b => b.expiryStatus === 'Expiring Soon').length,
      safe: activeLots.filter(b => b.expiryStatus === 'Safe').length
    };
  }, [classifiedBatches]);

  const columns = [
    { key: 'batchNo', label: 'Batch No', sortable: true, width: '15%', render: (val) => <span className="font-mono font-bold">{val}</span> },
    {
      key: 'itemId',
      label: 'Medicine Description',
      sortable: true,
      width: '25%',
      render: (val) => {
        const itm = items.find(i => i.id === val);
        return itm ? itm.name : val;
      }
    },
    {
      key: 'warehouseId',
      label: 'Warehouse location',
      sortable: true,
      width: '20%',
      render: (val) => {
        const wh = warehouses.find(w => w.id === val);
        return wh ? wh.name : val;
      }
    },
    { key: 'qty', label: 'In Stock', sortable: true, width: '12%', align: 'right' },
    { key: 'expiryDate', label: 'Expiry Date', sortable: true, width: '13%', render: (val) => <span className="font-mono">{val}</span> },
    {
      key: 'expiryStatus',
      label: 'Risk Classification',
      sortable: true,
      width: '15%',
      render: (val) => (
        <span className={`inline-flex items-center gap-1 font-bold text-[10px] uppercase px-2 py-0.5 rounded-full border ${
          val === 'Expired'
            ? 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
            : val === 'Expiring Soon'
            ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
        }`}>
          {val === 'Expired' ? <AlertOctagon className="w-3 h-3" /> : val === 'Expiring Soon' ? <ShieldAlert className="w-3 h-3" /> : <CheckCircleIcon />}
          {val}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {/* Expiry alerts dashboard banner */}
      {(stats.expired > 0 || stats.expiringSoon > 0) && (
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-600 dark:text-rose-400">
          <AlertOctagon className="w-5 h-5 shrink-0 animate-bounce" />
          <div>
            <h4 className="font-bold text-foreground">Expiration Risk Alert</h4>
            <p className="mt-0.5">
              Found <strong className="text-foreground">{stats.expired} expired batches</strong> and{' '}
              <strong className="text-foreground">{stats.expiringSoon} lots expiring</strong> in the next 90 days. Please take immediate action.
            </p>
          </div>
        </div>
      )}

      {/* Summary KPI tabs */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Expired Lots', val: stats.expired, filterKey: 'Expired', border: 'border-rose-500/20', bg: 'bg-rose-500/5', color: 'text-rose-600' },
          { label: 'Expiring Soon', val: stats.expiringSoon, filterKey: 'Expiring Soon', border: 'border-amber-500/20', bg: 'bg-amber-500/5', color: 'text-amber-600' },
          { label: 'Safe Lots', val: stats.safe, filterKey: 'Safe', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5', color: 'text-emerald-600' }
        ].map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setExpiryFilter(expiryFilter === tab.filterKey ? 'all' : tab.filterKey)}
            className={`p-3 border rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${tab.border} ${tab.bg} ${
              expiryFilter === tab.filterKey ? 'ring-2 ring-primary ring-offset-1' : 'hover:scale-102 hover:shadow-xs'
            }`}
          >
            <span className="text-[10px] uppercase font-bold text-muted-foreground">{tab.label}</span>
            <span className={`text-xl font-extrabold ${tab.color} mt-1`}>{tab.val}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search lots..." className="sm:max-w-xs" />
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <CalendarRange className="w-4 h-4 text-primary shrink-0" />
          Filter: {expiryFilter === 'all' ? 'All batches' : `${expiryFilter} items`}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredBatches}
        searchQuery={search}
        searchKeys={['batchNo', 'expiryStatus']}
        emptyMessage="No batches match current filter status."
      />
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-3 h-3 text-emerald-500 fill-current shrink-0" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
    </svg>
  );
}
