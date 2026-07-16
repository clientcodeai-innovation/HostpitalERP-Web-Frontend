import React, { useState } from 'react';
import { FileText, Calendar, Filter } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import ExportButton from '../shared/ExportButton';
import { FormGroup, FormSelect } from '../shared/FormFields';

export default function ReportsView() {
  const {
    items,
    batches,
    transactions,
    issues,
    returns
  } = useInventory();

  const [reportType, setReportType] = useState('item-master');

  // Compute reports datasets
  const reportData = React.useMemo(() => {
    switch (reportType) {
      case 'low-stock':
        return items.map(itm => {
          const qty = batches.filter(b => b.itemId === itm.id).reduce((s, b) => s + b.qty, 0);
          return { ...itm, qty };
        }).filter(itm => itm.qty <= itm.reorderLevel);

      case 'stock-ledger':
        return transactions;

      case 'department-issues':
        return issues;

      case 'reverse-returns':
        return returns;

      case 'item-master':
      default:
        return items;
    }
  }, [reportType, items, batches, transactions, issues, returns]);

  // Headers and columns mapping based on selected report type
  const reportConfig = React.useMemo(() => {
    switch (reportType) {
      case 'low-stock':
        return {
          filename: 'low-stock-alert-report',
          headers: [
            { label: 'Item Code', key: 'code' },
            { label: 'Medicine Name', key: 'name' },
            { label: 'UOM SKU', key: 'sku' },
            { label: 'Current Qty', key: 'qty' },
            { label: 'Reorder Level', key: 'reorderLevel' }
          ],
          columns: [
            { key: 'code', label: 'Item Code', width: '15%' },
            { key: 'name', label: 'Medicine Name', width: '35%' },
            { key: 'sku', label: 'SKU Ref', width: '20%' },
            { key: 'qty', label: 'Current Qty', align: 'right', width: '15%' },
            { key: 'reorderLevel', label: 'Reorder Trigger', align: 'right', width: '15%' }
          ]
        };

      case 'stock-ledger':
        return {
          filename: 'stock-transactions-ledger',
          headers: [
            { label: 'Txn ID', key: 'id' },
            { label: 'Type', key: 'type' },
            { label: 'Date', key: 'date' },
            { label: 'Ref Doc', key: 'reference' },
            { label: 'Batch No', key: 'batchNo' },
            { label: 'Qty Change', key: 'qty' }
          ],
          columns: [
            { key: 'id', label: 'Txn ID', width: '15%' },
            { key: 'type', label: 'Type', width: '15%' },
            { key: 'date', label: 'Timestamp', width: '25%', render: (val) => new Date(val).toLocaleString() },
            { key: 'reference', label: 'Doc Ref', width: '15%' },
            { key: 'batchNo', label: 'Batch', width: '15%' },
            { key: 'qty', label: 'Qty', align: 'right', width: '15%' }
          ]
        };

      case 'department-issues':
        return {
          filename: 'departmental-issue-slips',
          headers: [
            { label: 'Issue ID', key: 'id' },
            { label: 'Date', key: 'date' },
            { label: 'Department', key: 'department' },
            { label: 'Remarks', key: 'remarks' },
            { label: 'Issued By', key: 'issuedBy' }
          ],
          columns: [
            { key: 'id', label: 'Slip ID', width: '15%' },
            { key: 'date', label: 'Date', width: '15%' },
            { key: 'department', label: 'Ward/Dept', width: '30%' },
            { key: 'remarks', label: 'Purpose', width: '25%' },
            { key: 'issuedBy', label: 'Authorized', width: '15%' }
          ]
        };

      case 'reverse-returns':
        return {
          filename: 'reverse-returns-log',
          headers: [
            { label: 'Return ID', key: 'id' },
            { label: 'Date', key: 'date' },
            { label: 'Type', key: 'type' },
            { label: 'Vendor/Department', key: 'partyName' },
            { label: 'Doc Ref', key: 'referenceNo' }
          ],
          columns: [
            { key: 'id', label: 'Slip ID', width: '15%' },
            { key: 'date', label: 'Date', width: '15%' },
            { key: 'type', label: 'Return Class', width: '25%' },
            { key: 'partyName', label: 'Vendor/Dept', width: '30%' },
            { key: 'referenceNo', label: 'Reference Code', width: '15%' }
          ]
        };

      case 'item-master':
      default:
        return {
          filename: 'item-master-catalog',
          headers: [
            { label: 'Code', key: 'code' },
            { label: 'Name', key: 'name' },
            { label: 'Generic Name', key: 'genericName' },
            { label: 'Purchase Price', key: 'purchasePrice' },
            { label: 'Selling Price', key: 'sellingPrice' },
            { label: 'GST %', key: 'gst' }
          ],
          columns: [
            { key: 'code', label: 'Item Code', width: '15%' },
            { key: 'name', label: 'Medicine Name', width: '30%' },
            { key: 'genericName', label: 'Generic Name', width: '25%' },
            { key: 'purchasePrice', label: 'Pur. Price', align: 'right', width: '10%', render: (val) => `₹${val.toFixed(2)}` },
            { key: 'sellingPrice', label: 'Sel. Price', align: 'right', width: '10%', render: (val) => `₹${val.toFixed(2)}` },
            { key: 'gst', label: 'GST %', align: 'right', width: '10%' }
          ]
        };
    }
  }, [reportType]);

  return (
    <div className="space-y-4">
      {/* Report Selection bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <div className="flex items-center gap-3 w-full sm:max-w-xs">
          <FormGroup label="Select Report Dataset" className="w-full">
            <FormSelect value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option value="item-master">Item Master Catalog</option>
              <option value="low-stock">Low Stock Alert List</option>
              <option value="stock-ledger">Stock Transactions Ledger</option>
              <option value="department-issues">Department Issues Ledger</option>
              <option value="reverse-returns">Reverse Returns Register</option>
            </FormSelect>
          </FormGroup>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto self-end sm:self-auto justify-end">
          <ExportButton
            data={reportData}
            headers={reportConfig.headers}
            filename={reportConfig.filename}
          />
        </div>
      </div>

      {/* Report Data Table Preview */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 border-b pb-2">
          <FileText className="w-4 h-4 text-primary shrink-0" />
          Previewing {reportConfig.filename.replace(/-/g, ' ')} ({reportData.length} records)
        </h3>

        <DataTable
          columns={reportConfig.columns}
          data={reportData}
          emptyMessage="No matching data found for this report type."
        />
      </div>
    </div>
  );
}
