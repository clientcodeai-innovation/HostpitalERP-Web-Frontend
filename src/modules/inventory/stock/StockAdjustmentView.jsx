import React, { useState } from 'react';
import { Plus, Check, ArrowRightLeft } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import DrawerForm from '../shared/DrawerForm';
import { FormGroup, FormInput, FormSelect } from '../shared/FormFields';

export default function StockAdjustmentView() {
  const {
    transactions,
    items,
    batches,
    warehouses,
    adjustStock
  } = useInventory();

  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    itemId: '',
    batchNo: '',
    warehouseId: '',
    qtyDifference: '',
    remarks: ''
  });

  const handleOpenForm = () => {
    setErrors({});
    setFormData({
      itemId: '',
      batchNo: '',
      warehouseId: '',
      qtyDifference: '',
      remarks: ''
    });
    setIsDrawerOpen(true);
  };

  const handleItemChange = (itemId) => {
    const itemBatches = batches.filter(b => b.itemId === itemId);
    const firstBatch = itemBatches[0];
    
    setFormData(prev => ({
      ...prev,
      itemId,
      batchNo: firstBatch ? firstBatch.batchNo : '',
      warehouseId: firstBatch ? firstBatch.warehouseId : ''
    }));
  };

  const handleBatchChange = (batchNo) => {
    const matchedBatch = batches.find(b => b.itemId === formData.itemId && b.batchNo === batchNo);
    setFormData(prev => ({
      ...prev,
      batchNo,
      warehouseId: matchedBatch ? matchedBatch.warehouseId : prev.warehouseId
    }));
  };

  const handleSave = () => {
    const tempErrors = {};
    if (!formData.itemId) tempErrors.itemId = 'Item selection is required';
    if (!formData.batchNo) tempErrors.batchNo = 'Batch selection is required';
    if (!formData.warehouseId) tempErrors.warehouseId = 'Warehouse is required';
    
    const diff = Number(formData.qtyDifference);
    if (isNaN(diff) || diff === 0) {
      tempErrors.qtyDifference = 'Please enter a non-zero adjustment quantity';
    } else {
      // If negative, ensure we don't adjust below 0 stock
      const matchedBatch = batches.find(b => b.itemId === formData.itemId && b.batchNo === formData.batchNo && b.warehouseId === formData.warehouseId);
      const currentQty = matchedBatch ? matchedBatch.qty : 0;
      if (currentQty + diff < 0) {
        tempErrors.qtyDifference = `Cannot adjust stock below zero (Current batch stock: ${currentQty})`;
      }
    }
    
    if (!formData.remarks.trim()) tempErrors.remarks = 'Adjustment reason is required';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    adjustStock(
      formData.itemId,
      formData.batchNo,
      formData.warehouseId,
      Number(formData.qtyDifference),
      formData.remarks
    );

    setIsDrawerOpen(false);
  };

  // Filter only manual stock adjustments
  const adjustmentTxns = React.useMemo(() => {
    return transactions.filter(t => t.reference === 'ADJ-MANUAL');
  }, [transactions]);

  const columns = [
    { key: 'id', label: 'Adj Code', sortable: true, width: '15%' },
    { key: 'date', label: 'Adjustment Date', sortable: true, width: '20%', render: (val) => new Date(val).toLocaleString() },
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
    { key: 'batchNo', label: 'Batch No', sortable: true, width: '15%', render: (val) => <span className="font-mono text-muted-foreground">{val}</span> },
    {
      key: 'qty',
      label: 'Adjusted Qty',
      sortable: true,
      width: '12%',
      align: 'right',
      render: (val) => {
        const isPos = val > 0;
        return (
          <span className={`font-mono font-bold ${isPos ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
            {isPos ? `+${val}` : val}
          </span>
        );
      }
    },
    { key: 'remarks', label: 'Reason / Remarks', sortable: false, width: '13%' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search adjustments..." className="sm:max-w-xs" />
        <button
          onClick={handleOpenForm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Reconcile Stock
        </button>
      </div>

      <DataTable
        columns={columns}
        data={adjustmentTxns}
        searchQuery={search}
        searchKeys={['id', 'batchNo', 'remarks']}
        emptyMessage="No stock adjustments recorded yet."
      />

      {/* Creation Form Drawer */}
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Physical Stock Reconciliation"
        onSubmit={handleSave}
        submitLabel="Reconcile"
        width="md"
      >
        <FormGroup label="Select Medicine/Item" error={errors.itemId} required>
          <FormSelect
            value={formData.itemId}
            onChange={(e) => handleItemChange(e.target.value)}
            error={!!errors.itemId}
          >
            <option value="">Select Item</option>
            {items.map(itm => (
              <option key={itm.id} value={itm.id}>{itm.name} ({itm.code})</option>
            ))}
          </FormSelect>
        </FormGroup>

        {formData.itemId && (
          <>
            <FormGroup label="Select Lot / Batch" error={errors.batchNo} required>
              <FormSelect
                value={formData.batchNo}
                onChange={(e) => handleBatchChange(e.target.value)}
                error={!!errors.batchNo}
              >
                <option value="">Select Batch</option>
                {batches
                  .filter(b => b.itemId === formData.itemId)
                  .map(b => {
                    const wh = warehouses.find(w => w.id === b.warehouseId);
                    return (
                      <option key={b.id} value={b.batchNo}>
                        {b.batchNo} — in {wh ? wh.name : b.warehouseId} (Qty: {b.qty})
                      </option>
                    );
                  })}
              </FormSelect>
            </FormGroup>

            <div className="grid grid-cols-2 gap-4">
              <FormGroup label="Warehouse Area">
                <FormSelect value={formData.warehouseId} disabled>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </FormSelect>
              </FormGroup>

              <FormGroup label="Adjustment Count (+/-)" error={errors.qtyDifference} required>
                <FormInput
                  type="number"
                  value={formData.qtyDifference}
                  onChange={(e) => setFormData(prev => ({ ...prev, qtyDifference: e.target.value }))}
                  placeholder="e.g. -5 or +10"
                  error={!!errors.qtyDifference}
                />
              </FormGroup>
            </div>
          </>
        )}

        <FormGroup label="Audit Discrepancy Reason" error={errors.remarks} required>
          <FormInput
            value={formData.remarks}
            onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
            placeholder="e.g. Broken packaging vial, manual audit write-off"
            error={!!errors.remarks}
          />
        </FormGroup>
      </DrawerForm>
    </div>
  );
}
