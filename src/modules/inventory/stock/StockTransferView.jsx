import React, { useState } from 'react';
import { Plus, ArrowRight, ArrowRightLeft } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import DrawerForm from '../shared/DrawerForm';
import { FormGroup, FormInput, FormSelect } from '../shared/FormFields';

export default function StockTransferView() {
  const {
    transactions,
    items,
    batches,
    warehouses,
    transferStock
  } = useInventory();

  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    itemId: '',
    batchNo: '',
    fromWarehouseId: '',
    toWarehouseId: '',
    qty: '',
    remarks: ''
  });

  const handleOpenForm = () => {
    setErrors({});
    setFormData({
      itemId: '',
      batchNo: '',
      fromWarehouseId: '',
      toWarehouseId: '',
      qty: '',
      remarks: ''
    });
    setIsDrawerOpen(true);
  };

  const handleItemChange = (itemId) => {
    const itemBatches = batches.filter(b => b.itemId === itemId && b.qty > 0);
    const firstBatch = itemBatches[0];
    
    setFormData(prev => ({
      ...prev,
      itemId,
      batchNo: firstBatch ? firstBatch.batchNo : '',
      fromWarehouseId: firstBatch ? firstBatch.warehouseId : '',
      toWarehouseId: ''
    }));
  };

  const handleBatchChange = (batchNo) => {
    const matchedBatch = batches.find(b => b.itemId === formData.itemId && b.batchNo === batchNo);
    setFormData(prev => ({
      ...prev,
      batchNo,
      fromWarehouseId: matchedBatch ? matchedBatch.warehouseId : prev.fromWarehouseId,
      toWarehouseId: ''
    }));
  };

  const handleSave = () => {
    const tempErrors = {};
    if (!formData.itemId) tempErrors.itemId = 'Item selection is required';
    if (!formData.batchNo) tempErrors.batchNo = 'Batch selection is required';
    if (!formData.fromWarehouseId) tempErrors.fromWarehouseId = 'Source warehouse is required';
    if (!formData.toWarehouseId) {
      tempErrors.toWarehouseId = 'Destination warehouse is required';
    } else if (formData.fromWarehouseId === formData.toWarehouseId) {
      tempErrors.toWarehouseId = 'Source and destination warehouses must differ';
    }
    
    const transferQty = Number(formData.qty);
    if (isNaN(transferQty) || transferQty <= 0) {
      tempErrors.qty = 'Please enter a valid transfer quantity';
    } else {
      const matchedBatch = batches.find(b => b.itemId === formData.itemId && b.batchNo === formData.batchNo && b.warehouseId === formData.fromWarehouseId);
      const currentQty = matchedBatch ? matchedBatch.qty : 0;
      if (transferQty > currentQty) {
        tempErrors.qty = `Transfer quantity exceeds stock limit (Current batch stock: ${currentQty})`;
      }
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    transferStock(
      formData.itemId,
      formData.batchNo,
      formData.fromWarehouseId,
      formData.toWarehouseId,
      Number(formData.qty),
      formData.remarks
    );

    setIsDrawerOpen(false);
  };

  // Filter transfer transactions
  const transferTxns = React.useMemo(() => {
    return transactions.filter(t => t.reference === 'TRANSFER');
  }, [transactions]);

  const columns = [
    { key: 'id', label: 'Transfer ID', sortable: true, width: '13%' },
    { key: 'date', label: 'Transfer Date', sortable: true, width: '18%', render: (val) => new Date(val).toLocaleString() },
    {
      key: 'itemId',
      label: 'Medicine Item',
      sortable: true,
      width: '20%',
      render: (val) => {
        const itm = items.find(i => i.id === val);
        return itm ? itm.name : val;
      }
    },
    { key: 'batchNo', label: 'Batch No', sortable: true, width: '12%', render: (val) => <span className="font-mono text-muted-foreground">{val}</span> },
    {
      key: 'warehouseId',
      label: 'Route',
      sortable: false,
      width: '18%',
      render: (val, row) => {
        const sourceWh = warehouses.find(w => w.id === val);
        const isOut = row.qty < 0;
        return (
          <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
            {isOut ? (
              <>
                <span>{sourceWh?.name || val}</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-foreground font-bold">Transfer out</span>
              </>
            ) : (
              <>
                <span className="text-foreground font-bold">Received into</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{sourceWh?.name || val}</span>
              </>
            )}
          </span>
        );
      }
    },
    {
      key: 'qty',
      label: 'Quantity',
      sortable: true,
      width: '10%',
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
    { key: 'remarks', label: 'Remarks / Transfer Notes', sortable: false, width: '9%' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search transfers..." className="sm:max-w-xs" />
        <button
          onClick={handleOpenForm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <ArrowRightLeft className="w-4 h-4" />
          Transfer Stock
        </button>
      </div>

      <DataTable
        columns={columns}
        data={transferTxns}
        searchQuery={search}
        searchKeys={['id', 'batchNo', 'remarks']}
        emptyMessage="No stock transfers recorded yet."
      />

      {/* Creation Form Drawer */}
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Inter-Warehouse Stock Transfer"
        onSubmit={handleSave}
        submitLabel="Initiate Transfer"
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
            <FormGroup label="Select Available Batch" error={errors.batchNo} required>
              <FormSelect
                value={formData.batchNo}
                onChange={(e) => handleBatchChange(e.target.value)}
                error={!!errors.batchNo}
              >
                <option value="">Select Batch</option>
                {batches
                  .filter(b => b.itemId === formData.itemId && b.qty > 0)
                  .map(b => {
                    const wh = warehouses.find(w => w.id === b.warehouseId);
                    return (
                      <option key={b.id} value={b.batchNo}>
                        {b.batchNo} — in {wh ? wh.name : b.warehouseId} (Available Qty: {b.qty})
                      </option>
                    );
                  })}
              </FormSelect>
            </FormGroup>

            <div className="grid grid-cols-2 gap-4">
              <FormGroup label="Sender Warehouse (Source)">
                <FormSelect value={formData.fromWarehouseId} disabled>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </FormSelect>
              </FormGroup>

              <FormGroup label="Receiver Warehouse (Destination)" error={errors.toWarehouseId} required>
                <FormSelect
                  value={formData.toWarehouseId}
                  onChange={(e) => setFormData(prev => ({ ...prev, toWarehouseId: e.target.value }))}
                  error={!!errors.toWarehouseId}
                >
                  <option value="">Select Destination</option>
                  {warehouses
                    .filter(w => w.id !== formData.fromWarehouseId)
                    .map(w => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                </FormSelect>
              </FormGroup>
            </div>

            <FormGroup label="Transfer Quantity" error={errors.qty} required>
              <FormInput
                type="number"
                min="1"
                value={formData.qty}
                onChange={(e) => setFormData(prev => ({ ...prev, qty: e.target.value }))}
                placeholder="e.g. 20"
                error={!!errors.qty}
              />
            </FormGroup>
          </>
        )}

        <FormGroup label="Transfer Remarks / Reason">
          <FormInput
            value={formData.remarks}
            onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
            placeholder="e.g. ICU emergency replenishment"
          />
        </FormGroup>
      </DrawerForm>
    </div>
  );
}
