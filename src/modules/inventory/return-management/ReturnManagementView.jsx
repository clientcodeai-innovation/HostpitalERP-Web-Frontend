import React, { useState } from 'react';
import { Plus, Eye, CornerUpLeft } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import DrawerForm from '../shared/DrawerForm';
import Modal from '../shared/Modal';
import StatusBadge from '../shared/StatusBadge';
import { FormGroup, FormInput, FormSelect } from '../shared/FormFields';

export default function ReturnManagementView() {
  const {
    returns,
    returnStock,
    items,
    batches,
    vendors
  } = useInventory();

  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [currentRecord, setCurrentRecord] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    type: 'Return to Vendor',
    partyName: '',
    referenceNo: '',
    remarks: '',
    itemsList: [{ itemId: '', batchNo: '', qty: 1 }]
  });

  const [errors, setErrors] = useState({});

  const handleOpenForm = () => {
    setErrors({});
    setFormData({
      type: 'Return to Vendor',
      partyName: '',
      referenceNo: '',
      remarks: '',
      itemsList: [{ itemId: '', batchNo: '', qty: 1 }]
    });
    setIsDrawerOpen(true);
  };

  const handleAddFormItem = () => {
    setFormData(prev => ({
      ...prev,
      itemsList: [...prev.itemsList, { itemId: '', batchNo: '', qty: 1 }]
    }));
  };

  const handleRemoveFormItem = (idx) => {
    setFormData(prev => ({
      ...prev,
      itemsList: prev.itemsList.filter((_, i) => i !== idx)
    }));
  };

  const handleFormItemChange = (idx, field, val) => {
    setFormData(prev => {
      const newList = [...prev.itemsList];
      const updatedItem = { ...newList[idx], [field]: val };
      
      if (field === 'itemId') {
        updatedItem.batchNo = '';
        updatedItem.qty = 1;
      }
      
      newList[idx] = updatedItem;
      return { ...prev, itemsList: newList };
    });
  };

  const handleSave = () => {
    const tempErrors = {};
    if (!formData.partyName.trim()) tempErrors.partyName = 'Party Name / Vendor / Department is required';
    
    // Validate items
    const invalidItems = formData.itemsList.some(itm => {
      if (!itm.itemId || !itm.batchNo || isNaN(itm.qty) || itm.qty <= 0) return true;
      
      // If returning to vendor, check that we have enough stock to return
      if (formData.type === 'Return to Vendor') {
        const matchedBatch = batches.find(b => b.itemId === itm.itemId && b.batchNo === itm.batchNo);
        return !matchedBatch || itm.qty > matchedBatch.qty;
      }
      return false;
    });

    if (invalidItems) {
      tempErrors.items = 'Please check items list (Ensure return qty does not exceed current stock for Vendor Returns)';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    returnStock({
      type: formData.type,
      partyName: formData.partyName,
      referenceNo: formData.referenceNo,
      remarks: formData.remarks,
      items: formData.itemsList.map(itm => ({
        itemId: itm.itemId,
        batchNo: itm.batchNo,
        qty: Number(itm.qty)
      }))
    });

    setIsDrawerOpen(false);
  };

  const handleViewDetails = (record) => {
    setCurrentRecord(record);
    setIsDetailsOpen(true);
  };

  const columns = [
    { key: 'id', label: 'Return Slip', sortable: true, width: '13%' },
    { key: 'date', label: 'Return Date', sortable: true, width: '15%' },
    { key: 'type', label: 'Return Class', sortable: true, width: '20%' },
    { key: 'partyName', label: 'Vendor / Department', sortable: true, width: '22%' },
    {
      key: 'items',
      label: 'Items Qty',
      sortable: false,
      width: '15%',
      render: (val) => `${val?.reduce((acc, x) => acc + x.qty, 0) || 0} items`
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '15%',
      render: (val) => <StatusBadge status={val} />
    }
  ];

  const actions = (row) => (
    <>
      <button
        onClick={() => handleViewDetails(row)}
        className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
        title="View details"
      >
        <Eye className="w-3.5 h-3.5" />
      </button>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search return sheets..." className="sm:max-w-xs" />
        <button
          onClick={handleOpenForm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer animate-in fade-in"
        >
          <CornerUpLeft className="w-4 h-4" />
          Log Return
        </button>
      </div>

      <DataTable
        columns={columns}
        data={returns}
        searchQuery={search}
        searchKeys={['id', 'partyName', 'type']}
        actions={actions}
        emptyMessage="No reverse inventory transactions found."
      />

      {/* Creation Form Drawer */}
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Log Reverse Return Ticket"
        onSubmit={handleSave}
        submitLabel="Complete Return"
        width="lg"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormGroup label="Return Type">
            <FormSelect
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value, partyName: '', itemsList: [{ itemId: '', batchNo: '', qty: 1 }] }))}
            >
              <option value="Return to Vendor">Return to Vendor</option>
              <option value="Return from Department">Return from Department</option>
            </FormSelect>
          </FormGroup>

          <FormGroup label={formData.type === 'Return to Vendor' ? 'Supplier Company Name' : 'Returning Department'} error={errors.partyName} required>
            {formData.type === 'Return to Vendor' ? (
              <FormSelect
                value={formData.partyName}
                onChange={(e) => setFormData(prev => ({ ...prev, partyName: e.target.value }))}
                error={!!errors.partyName}
              >
                <option value="">Choose vendor...</option>
                {vendors.map(v => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </FormSelect>
            ) : (
              <FormSelect
                value={formData.partyName}
                onChange={(e) => setFormData(prev => ({ ...prev, partyName: e.target.value }))}
                error={!!errors.partyName}
              >
                <option value="">Choose department...</option>
                <option value="OPD Pharmacy">OPD Pharmacy</option>
                <option value="Emergency Ward">Emergency Ward</option>
                <option value="ICU Block">ICU Block</option>
              </FormSelect>
            )}
          </FormGroup>
        </div>

        <FormGroup label="Reference document / GRN code">
          <FormInput
            value={formData.referenceNo}
            onChange={(e) => setFormData(prev => ({ ...prev, referenceNo: e.target.value.toUpperCase() }))}
            placeholder="e.g. GRN-001 or ISS-001"
          />
        </FormGroup>

        <FormGroup label="Return notes/reason">
          <FormInput
            value={formData.remarks}
            onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
            placeholder="e.g. Packaging damaged, near expiration"
          />
        </FormGroup>

        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-foreground">Medicines List</h4>
            <button
              type="button"
              onClick={handleAddFormItem}
              className="text-[10px] font-bold text-primary hover:underline px-2.5 py-1.5 bg-primary/10 rounded-lg"
            >
              + Add Item
            </button>
          </div>

          {errors.items && <p className="text-[11px] text-destructive font-semibold">{errors.items}</p>}

          <div className="space-y-3.5 max-h-60 overflow-y-auto scrollbar-thin pr-1">
            {formData.itemsList.map((itm, idx) => {
              // Filters batches based on itemId and types
              const itemBatches = batches.filter(b => b.itemId === itm.itemId);
              
              return (
                <div key={idx} className="flex flex-col sm:flex-row gap-3 items-end p-3 rounded-lg border border-border bg-muted/20 animate-in fade-in">
                  <FormGroup label="Medicine" className="flex-1 w-full sm:w-auto">
                    <FormSelect
                      value={itm.itemId}
                      onChange={(e) => handleFormItemChange(idx, 'itemId', e.target.value)}
                    >
                      <option value="">Choose medicine...</option>
                      {items.map(i => (
                        <option key={i.id} value={i.id}>{i.name}</option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <FormGroup label="Batch Number" className="w-full sm:w-44">
                    <FormSelect
                      value={itm.batchNo}
                      onChange={(e) => handleFormItemChange(idx, 'batchNo', e.target.value)}
                      disabled={!itm.itemId}
                    >
                      <option value="">Select Lot</option>
                      {itemBatches.map(b => (
                        <option key={b.id} value={b.batchNo}>
                          {b.batchNo} {formData.type === 'Return to Vendor' ? `(In Stock: ${b.qty})` : ''}
                        </option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <FormGroup label="Return Qty" className="w-full sm:w-24">
                    <FormInput
                      type="number"
                      min="1"
                      value={itm.qty}
                      onChange={(e) => handleFormItemChange(idx, 'qty', e.target.value)}
                      disabled={!itm.batchNo}
                    />
                  </FormGroup>

                  {formData.itemsList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFormItem(idx)}
                      className="p-2 border border-border hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-lg transition-colors shrink-0 mb-1"
                    >
                      <X className="w-4.5 h-4.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </DrawerForm>

      {/* Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title={`Return Slip Details: ${currentRecord?.id}`} size="lg">
        {currentRecord && (
          <div className="space-y-4 text-xs font-semibold text-muted-foreground font-medium">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-muted/20 border rounded-xl">
              <div><span>Date Logged:</span><p className="text-foreground mt-0.5">{currentRecord.date}</p></div>
              <div><span>Return Class:</span><p className="text-foreground mt-0.5">{currentRecord.type}</p></div>
              <div><span>Vendor/Department:</span><p className="text-foreground mt-0.5">{currentRecord.partyName}</p></div>
              <div><span>Status:</span><div className="mt-0.5"><StatusBadge status={currentRecord.status} /></div></div>
            </div>

            {currentRecord.referenceNo && (
              <div className="p-3 bg-muted/10 border border-dashed rounded-lg">
                <span>Reference Document:</span>
                <p className="text-foreground font-mono font-bold mt-1">{currentRecord.referenceNo}</p>
              </div>
            )}

            {currentRecord.remarks && (
              <div className="p-3 bg-muted/10 border border-dashed rounded-lg">
                <span>Return Reason:</span>
                <p className="text-foreground mt-1 leading-relaxed">{currentRecord.remarks}</p>
              </div>
            )}

            <div className="space-y-2 border-t pt-3">
              <h4 className="text-xs font-bold text-foreground font-semibold">Returned lots detail</h4>
              <div className="border border-border rounded-lg overflow-hidden bg-card/20 font-medium">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-muted border-b border-border text-[10px] text-muted-foreground uppercase font-bold">
                      <th className="p-3">Medicine Description</th>
                      <th className="p-3">Batch Number</th>
                      <th className="p-3 text-right">Returned Qty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {currentRecord.items.map((itm, i) => {
                      const drug = items.find(d => d.id === itm.itemId);
                      return (
                        <tr key={i} className="hover:bg-muted/10 text-foreground font-medium">
                          <td className="p-3 font-bold">{drug?.name || itm.itemId}</td>
                          <td className="p-3 font-mono font-bold">{itm.batchNo}</td>
                          <td className="p-3 text-right font-mono font-bold text-rose-500">{itm.qty}</td>
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
