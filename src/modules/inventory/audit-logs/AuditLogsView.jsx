import React, { useState } from 'react';
import { History } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';

export default function AuditLogsView() {
  const { auditLogs } = useInventory();
  const [search, setSearch] = useState('');

  const columns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true, width: '20%', render: (val) => new Date(val).toLocaleString() },
    { key: 'user', label: 'User Agent', sortable: true, width: '15%', render: (val) => <span className="font-bold">{val}</span> },
    {
      key: 'action',
      label: 'Activity',
      sortable: true,
      width: '15%',
      render: (val) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-bold tracking-wide uppercase ${
          val === 'CREATE'
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
            : val === 'DELETE'
            ? 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
            : 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400'
        }`}>
          {val}
        </span>
      )
    },
    { key: 'module', label: 'Module Section', sortable: true, width: '20%' },
    { key: 'details', label: 'Modification Details', sortable: false, width: '30%' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search audit trails..." className="sm:max-w-xs" />
        <div className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
          <History className="w-4 h-4 text-primary shrink-0" />
          Traceability ledger compliant with health records audit mandates
        </div>
      </div>

      <DataTable
        columns={columns}
        data={auditLogs}
        searchQuery={search}
        searchKeys={['action', 'module', 'details', 'user']}
        emptyMessage="No audit logs generated."
      />
    </div>
  );
}
