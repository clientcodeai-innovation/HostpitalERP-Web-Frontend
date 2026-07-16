import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import Pagination from './Pagination';
import EmptyState from './EmptyState';
import { TableRowSkeleton } from './LoadingSkeleton';

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  selectable = false,
  selectedRows = [],
  onSelectRow,
  onSelectAllRows,
  searchQuery = '',
  searchKeys = [],
  actions,
  pageSize = 10,
  emptyMessage = 'No records found.'
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting logic
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter data by search query
  const filteredData = React.useMemo(() => {
    if (!searchQuery || searchKeys.length === 0) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(item => {
      return searchKeys.some(key => {
        const val = item[key];
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(query);
      });
    });
  }, [data, searchQuery, searchKeys]);

  // Sort filtered data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortConfig.direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return sorted;
  }, [filteredData, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Adjust page number if records decrease
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectAllRows(paginatedData);
    } else {
      onSelectAllRows([]);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl border border-border bg-card/60 backdrop-blur-md overflow-hidden shadow-sm transition-all duration-300">
        <div className="overflow-x-auto max-h-[600px] scrollbar-thin">
          <table className="w-full text-sm border-collapse text-left">
            <thead className="sticky top-0 bg-muted/95 backdrop-blur-sm z-10 border-b border-border shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
              <tr>
                {selectable && (
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={paginatedData.length > 0 && paginatedData.every(r => selectedRows.includes(r.id))}
                      onChange={handleSelectAll}
                    />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable !== false && handleSort(col.key)}
                    className={`p-4 font-semibold text-muted-foreground transition-colors select-none ${
                      col.sortable !== false ? 'cursor-pointer hover:bg-muted/80' : ''
                    } ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                    style={{ width: col.width }}
                  >
                    <div className={`flex items-center gap-1.5 ${
                      col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : 'justify-start'
                    }`}>
                      <span>{col.label}</span>
                      {col.sortable !== false && (
                        sortConfig.key === col.key ? (
                          sortConfig.direction === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
                        ) : <ArrowUpDown className="w-3 h-3 text-muted-foreground/50" />
                      )}
                    </div>
                  </th>
                ))}
                {actions && <th className="p-4 text-center font-semibold text-muted-foreground w-20">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                Array.from({ length: pageSize }).map((_, i) => (
                  <TableRowSkeleton key={i} columnsCount={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} />
                ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} className="p-0">
                    <EmptyState message={emptyMessage} />
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => {
                  const isSelected = selectedRows.includes(row.id);
                  return (
                    <tr
                      key={row.id || index}
                      className={`hover:bg-muted/30 transition-all duration-150 ${
                        isSelected ? 'bg-primary/5 hover:bg-primary/10' : ''
                      }`}
                    >
                      {selectable && (
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                            checked={isSelected}
                            onChange={() => onSelectRow(row.id)}
                          />
                        </td>
                      )}
                      {columns.map((col) => {
                        const cellVal = row[col.key];
                        return (
                          <td
                            key={col.key}
                            className={`p-4 align-middle text-foreground/90 font-medium ${
                              col.align === 'right' ? 'text-right font-mono' : col.align === 'center' ? 'text-center' : 'text-left'
                            }`}
                          >
                            {col.render ? col.render(cellVal, row) : cellVal}
                          </td>
                        );
                      })}
                      {actions && (
                        <td className="p-4 align-middle text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {actions(row)}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {!loading && sortedData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalRecords={sortedData.length}
          startIndex={(currentPage - 1) * pageSize + 1}
          endIndex={Math.min(currentPage * pageSize, sortedData.length)}
        />
      )}
    </div>
  );
}
