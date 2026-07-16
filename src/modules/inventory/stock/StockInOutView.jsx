import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, RefreshCw } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';

export default function StockInOutView() {
  const { transactions, items, warehouses } = useInventory();
  const [search, setSearch] = useState('');

  const columns = [
    { key: 'id', label: 'Txn ID', sortable: true, width: '13%' },
    {
      key: 'type',
      label: 'Transaction Type',
      sortable: true,
      width: '15%',
      render: (val) => (
        <span className={`inline-flex items-center gap-1 font-bold text-[10px] uppercase px-2 py-0.5 rounded-full border ${
          val.includes('In') || val.includes('Return')
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
            : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
        }`}>
          {val.includes('In') || val.includes('Return') ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
          {val}
        </span>
      )
    },
    { key: 'date', label: 'Timestamp', sortable: true, width: '17%', render: (val) => new Date(val).toLocaleString() },
    { key: 'reference', label: 'Reference Ref', sortable: true, width: '12%', render: (val) => <span className="font-mono text-[10px] font-bold">{val}</span> },
    {
      key: 'itemId',
      label: 'Medicine Item',
      sortable: true,
      width: '20%',
      render: (val) => {
        const item = items.find(i => i.id === val);
        return item ? item.name : val;
      }
    },
    { key: 'batchNo', label: 'Batch No', sortable: true, width: '13%', render: (val) => <span className="font-mono text-muted-foreground">{val}</span> },
    {
      key: 'qty',
      label: 'Qty Transferred',
      sortable: true,
      width: '10%',
      align: 'right',
      render: (val) => {
        const isPositive = val > 0;
        return (
          <span className={`font-mono font-bold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
            {isPositive ? `+${val}` : val}
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search ledger logs..." className="sm:max-w-xs" />
        <div className="text-xs text-muted-foreground font-semibold">
          Complete audit trail of all warehouse stock changes.
        </div>
      </div>

      <DataTable
        columns={columns}
        data={transactions}
        searchQuery={search}
        searchKeys={['id', 'type', 'reference', 'batchNo']}
        emptyMessage="No ledger transactions recorded."
      />
    </div>
  );
}
