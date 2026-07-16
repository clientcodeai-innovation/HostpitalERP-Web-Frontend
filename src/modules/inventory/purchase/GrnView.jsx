import React, { useState } from 'react';
import { Plus, Eye, CheckCircle2 } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import DrawerForm from '../shared/DrawerForm';
import Modal from '../shared/Modal';
import StatusBadge from '../shared/StatusBadge';
import { FormGroup, FormInput, FormSelect } from '../shared/FormFields';

export default function GrnView() {
  const {
    grns,
    receiveGRN,
    purchaseOrders,
    vendors,
    items,
    warehouses
  } = useInventory();

  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const [currentRecord, setCurrentRecord] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    purchaseOrderId: '',
    invoiceNo: '',
    invoiceDate: '',
    warehouseId: 'WH-001',
    remarks: '',
    itemsList: [] // pre-filled from PO when selected
  });

  const [errors, setErrors] = useState({});

  // Active POs available for receipt
  const pendingPurchaseOrders = purchaseOrders.filter(po => po.status === 'Sent');

  const handleOpenForm = () => {
    setErrors({});
    setFormData({
      purchaseOrderId: '',
      invoiceNo: '',
      invoiceDate: new Date().toISOString().split('T')[0],
      warehouseId: 'WH-001',
      remarks: '',
      itemsList: []
    });
    setIsDrawerOpen(true);
  };

  const handlePoChange = (poId) => {
    const matchedPo = purchaseOrders.find(po => po.id === poId);
    if (!matchedPo) {
      setFormData(prev => ({ ...prev, purchaseOrderId: poId, itemsList: [] }));
      return;
    }

    // Pre-fill items list from PO items
    const prefilledItems = matchedPo.items.map(itm => ({
      itemId: itm.itemId,
      qtyOrdered: itm.qty,
      qtyReceived: itm.qty,
      qtyAccepted: itm.qty,
      qtyRejected: 0,
      batchNo: `BAT-${Date.now().toString().slice(-3)}${Math.floor(Math.random() * 100)}`,
      expiryDate: '2028-12-31',
      notes: ''
    }));

    setFormData(prev => ({
      ...prev,
      purchaseOrderId: poId,
      itemsList: prefilledItems,
      vendorId: matchedPo.vendorId
    }));
  };

  const handleItemChange = (idx, field, val) => {
    setFormData(prev => {
      const newList = [...prev.itemsList];
      const updatedItem = { ...newList[idx], [field]: val };
      
      if (field === 'qtyReceived') {
        const received = Number(val) || 0;
        updatedItem.qtyAccepted = received;
        updatedItem.qtyRejected = 0;
      }
      if (field === 'qtyAccepted') {
        const accepted = Number(val) || 0;
        updatedItem.qtyRejected = Math.max(0, updatedItem.qtyReceived - accepted);
      }
      
      newList[idx] = updatedItem;
      return { ...prev, itemsList: newList };
    });
  };

  const handleSave = () => {
    const tempErrors = {};
    if (!formData.purchaseOrderId) tempErrors.purchaseOrderId = 'Purchase Order mapping is required';
    if (!formData.invoiceNo.trim()) tempErrors.invoiceNo = 'Invoice number is required';
    if (!formData.invoiceDate) tempErrors.invoiceDate = 'Invoice date is required';
    
    // Validate quantities
    const invalidItems = formData.itemsList.some(itm =>
      isNaN(itm.qtyReceived) || itm.qtyReceived <= 0 ||
      isNaN(itm.qtyAccepted) || itm.qtyAccepted < 0 ||
      !itm.batchNo.trim() || !itm.expiryDate
    );
    if (invalidItems) tempErrors.items = 'Please specify valid quantities, batch numbers, and expiry dates';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    receiveGRN({
      purchaseOrderId: formData.purchaseOrderId,
      vendorId: formData.vendorId,
      invoiceNo: formData.invoiceNo,
      invoiceDate: formData.invoiceDate,
      warehouseId: formData.warehouseId,
      remarks: formData.remarks,
      items: formData.itemsList.map(itm => ({
        ...itm,
        qtyOrdered: Number(itm.qtyOrdered),
        qtyReceived: Number(itm.qtyReceived),
        qtyAccepted: Number(itm.qtyAccepted),
        qtyRejected: Number(itm.qtyRejected)
      }))
    });

    setIsDrawerOpen(false);
  };

  const handleViewDetails = (record) => {
    setCurrentRecord(record);
    setIsDetailsOpen(true);
  };

  const columns = [
    { key: 'id', label: 'GRN Code', sortable: true, width: '13%' },
    { key: 'date', label: 'Receipt Date', sortable: true, width: '13%' },
    { key: 'purchaseOrderId', label: 'PO Ref', sortable: true, width: '13%' },
    {
      key: 'vendorId',
      label: 'Vendor',
      sortable: true,
      width: '20%',
      render: (val) => {
        const v = vendors.find(vend => vend.id === val);
        return v ? v.name : val;
      }
    },
    { key: 'invoiceNo', label: 'Invoice No', sortable: true, width: '15%' },
    {
      key: 'items',
      label: 'Accepted Items',
      sortable: false,
      width: '13%',
      render: (val) => `${val?.reduce((acc, x) => acc + x.qtyAccepted, 0) || 0} units`
    },
    {
      key: 'status',
      label: 'Status',
      sortable: false,
      width: '13%',
      render: () => <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" />Received</span>
    }
  ];

  const actions = (row) => (
    <>
      <button
        onClick={() => handleViewDetails(row)}
        className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
        title="View Goods Receipt Note details"
      >
        <Eye className="w-3.5 h-3.5" />
      </button>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search Receipts..." className="sm:max-w-xs" />
        <button
          onClick={handleOpenForm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Receipt Entry
        </button>
      </div>

      <DataTable
        columns={columns}
        data={grns}
        searchQuery={search}
        searchKeys={['id', 'purchaseOrderId', 'invoiceNo', 'vendorId']}
        actions={actions}
        emptyMessage="No goods received yet."
      />

      {/* Creation Form Drawer */}
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Goods Receipt Entry (GRN)"
        onSubmit={handleSave}
        submitLabel="Complete GRN"
        width="xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormGroup label="Purchase Order Reference" error={errors.purchaseOrderId} required>
            <FormSelect
              value={formData.purchaseOrderId}
              onChange={(e) => handlePoChange(e.target.value)}
              error={!!errors.purchaseOrderId}
            >
              <option value="">Select PO Reference</option>
              {pendingPurchaseOrders.map(p => (
                <option key={p.id} value={p.id}>{p.id} — PO Ref</option>
              ))}
            </FormSelect>
          </FormGroup>

          <FormGroup label="Vendor Invoice Number" error={errors.invoiceNo} required>
            <FormInput
              value={formData.invoiceNo}
              onChange={(e) => setFormData(prev => ({ ...prev, invoiceNo: e.target.value }))}
              placeholder="e.g. INV-2026-90"
              error={!!errors.invoiceNo}
            />
          </FormGroup>

          <FormGroup label="Invoice Date" error={errors.invoiceDate} required>
            <FormInput
              type="date"
              value={formData.invoiceDate}
              onChange={(e) => setFormData(prev => ({ ...prev, invoiceDate: e.target.value }))}
              error={!!errors.invoiceDate}
            />
          </FormGroup>

          <FormGroup label="Receiving Warehouse Area">
            <FormSelect
              value={formData.warehouseId}
              onChange={(e) => setFormData(prev => ({ ...prev, warehouseId: e.target.value }))}
            >
              {warehouses.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </FormSelect>
          </FormGroup>

          <div className="md:col-span-2">
            <FormGroup label="Remarks / Receipt Notes">
              <FormInput
                value={formData.remarks}
                onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                placeholder="e.g. Fully checked for quality parameters"
              />
            </FormGroup>
          </div>
        </div>

        <div className="space-y-3.5 border-t pt-4">
          <h4 className="text-xs font-bold text-foreground">Items Checked & Accepted</h4>
          {errors.items && <p className="text-[11px] text-destructive font-semibold">{errors.items}</p>}

          {formData.itemsList.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">Select a Purchase Order to load requested items.</p>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin pr-1">
              {formData.itemsList.map((itm, idx) => {
                const drug = items.find(d => d.id === itm.itemId);
                return (
                  <div key={idx} className="p-4 rounded-xl border border-border bg-muted/20 space-y-3.5 animate-in fade-in">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-extrabold text-foreground">{drug?.name || itm.itemId}</p>
                      <span className="text-[10px] font-semibold text-muted-foreground">Ordered Qty: {itm.qtyOrdered}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <FormGroup label="Received Qty">
                        <FormInput
                          type="number"
                          value={itm.qtyReceived}
                          onChange={(e) => handleItemChange(idx, 'qtyReceived', e.target.value)}
                        />
                      </FormGroup>

                      <FormGroup label="Accepted Qty">
                        <FormInput
                          type="number"
                          value={itm.qtyAccepted}
                          onChange={(e) => handleItemChange(idx, 'qtyAccepted', e.target.value)}
                        />
                      </FormGroup>

                      <FormGroup label="Batch Number">
                        <FormInput
                          value={itm.batchNo}
                          onChange={(e) => handleItemChange(idx, 'batchNo', e.target.value.toUpperCase())}
                          placeholder="e.g. BN-AUG-1"
                        />
                      </FormGroup>

                      <FormGroup label="Expiry Date">
                        <FormInput
                          type="date"
                          value={itm.expiryDate}
                          onChange={(e) => handleItemChange(idx, 'expiryDate', e.target.value)}
                        />
                      </FormGroup>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DrawerForm>

      {/* Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title={`Goods Receipt Note: ${currentRecord?.id}`} size="lg">
        {currentRecord && (
          <div className="space-y-5 text-xs font-semibold text-muted-foreground">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-muted/20 border rounded-xl">
              <div><span>Date Received:</span><p className="text-foreground mt-0.5">{currentRecord.date}</p></div>
              <div><span>Vendor Invoice:</span><p className="text-foreground mt-0.5">{currentRecord.invoiceNo}</p></div>
              <div><span>Invoice Date:</span><p className="text-foreground mt-0.5">{currentRecord.invoiceDate}</p></div>
              <div><span>Received By:</span><p className="text-foreground mt-0.5">{currentRecord.receivedBy}</p></div>
            </div>

            {currentRecord.remarks && (
              <div className="p-3 bg-muted/10 border border-dashed rounded-lg">
                <span>Receipt Remarks:</span>
                <p className="text-foreground font-medium mt-1">{currentRecord.remarks}</p>
              </div>
            )}

            <div className="space-y-2 border-t pt-3">
              <h4 className="text-xs font-bold text-foreground font-semibold">Lot Batching checklist</h4>
              <div className="border border-border rounded-lg overflow-hidden bg-card/20 font-medium">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted border-b border-border text-[10px] text-muted-foreground uppercase">
                      <th className="p-3">Medicine</th>
                      <th className="p-3 text-right">Received</th>
                      <th className="p-3 text-right">Accepted</th>
                      <th className="p-3 text-right">Rejected</th>
                      <th className="p-3">Lot/Batch</th>
                      <th className="p-3">Expiry Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {currentRecord.items.map((itm, i) => {
                      const drug = items.find(d => d.id === itm.itemId);
                      return (
                        <tr key={i} className="hover:bg-muted/10 text-foreground">
                          <td className="p-3 font-bold">{drug?.name || itm.itemId}</td>
                          <td className="p-3 text-right font-mono">{itm.qtyReceived}</td>
                          <td className="p-3 text-right font-mono text-emerald-600 dark:text-emerald-400">{itm.qtyAccepted}</td>
                          <td className="p-3 text-right font-mono text-rose-500">{itm.qtyRejected}</td>
                          <td className="p-3 font-mono font-bold">{itm.batchNo}</td>
                          <td className="p-3 font-mono">{itm.expiryDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
