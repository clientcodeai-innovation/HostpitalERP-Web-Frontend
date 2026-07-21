import React, { useState } from 'react';
import { Plus, Check, X, FileSpreadsheet, Eye } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import DrawerForm from '../shared/DrawerForm';
import Modal from '../shared/Modal';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import StatusBadge from '../shared/StatusBadge';
import { FormGroup, FormInput, FormSelect } from '../shared/FormFields';

export default function PurchaseRequisitionView() {
  const {
    requisitions,
    saveRequisition,
    approveRequisition,
    rejectRequisition,
    items
  } = useInventory();

  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const [currentRecord, setCurrentRecord] = useState(null);
  
  // Create Requisition Form State
  const [formData, setFormData] = useState({
    department: 'OPD Pharmacy',
    urgency: 'Medium',
    remarks: '',
    itemsList: [{ itemId: '', qtyRequested: 1 }]
  });
  
  // Requisition Approval items adjustment state
  const [approvalItems, setApprovalItems] = useState([]);
  const [rejectionReason, setRejectionReason] = useState('');
  const [errors, setErrors] = useState({});

  const handleOpenForm = () => {
    setErrors({});
    setFormData({
      department: 'OPD Pharmacy',
      urgency: 'Medium',
      remarks: '',
      itemsList: [{ itemId: '', qtyRequested: 1 }]
    });
    setIsDrawerOpen(true);
  };

  const handleAddFormItem = () => {
    setFormData(prev => ({
      ...prev,
      itemsList: [...prev.itemsList, { itemId: '', qtyRequested: 1 }]
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
      newList[idx] = { ...newList[idx], [field]: val };
      return { ...prev, itemsList: newList };
    });
  };

  const handleSave = () => {
    const tempErrors = {};
    if (!formData.department.trim()) tempErrors.department = 'Department name is required';
    
    // Validate items
    const invalidItems = formData.itemsList.some(itm => !itm.itemId || isNaN(itm.qtyRequested) || itm.qtyRequested <= 0);
    if (invalidItems) tempErrors.items = 'Please select a valid item and quantity for all entries';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // Prepare payload
    const formattedItems = formData.itemsList.map(itm => {
      const matchedItem = items.find(i => i.id === itm.itemId);
      return {
        itemId: itm.itemId,
        qtyRequested: Number(itm.qtyRequested),
        qtyApproved: 0,
        estimatedCost: matchedItem ? matchedItem.purchasePrice : 0
      };
    });

    saveRequisition({
      department: formData.department,
      urgency: formData.urgency,
      remarks: formData.remarks,
      items: formattedItems
    });

    setIsDrawerOpen(false);
  };

  const handleViewDetails = (record) => {
    setCurrentRecord(record);
    setIsDetailsOpen(true);
  };

  const handleApproveTrigger = (record) => {
    setCurrentRecord(record);
    setApprovalItems(record.items.map(itm => ({
      itemId: itm.itemId,
      qtyRequested: itm.qtyRequested,
      qtyApproved: itm.qtyRequested // default approved to requested
    })));
    setIsApproveOpen(true);
  };

  const handleApproveConfirm = () => {
    if (currentRecord) {
      approveRequisition(currentRecord.id, approvalItems);
      setIsApproveOpen(false);
    }
  };

  const handleRejectTrigger = (record) => {
    setCurrentRecord(record);
    setRejectionReason('');
    setIsRejectOpen(true);
  };

  const handleRejectConfirm = () => {
    if (currentRecord) {
      rejectRequisition(currentRecord.id, rejectionReason || 'Does not match standard criteria');
      setIsRejectOpen(false);
    }
  };

  const columns = [
    { key: 'id', label: 'Req Code', sortable: true, width: '12%' },
    { key: 'date', label: 'Date Requested', sortable: true, width: '13%' },
    { key: 'department', label: 'Department', sortable: true, width: '18%' },
    { key: 'urgency', label: 'Urgency', sortable: true, width: '12%', render: (val) => (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
        val === 'High' ? 'bg-rose-500/10 text-rose-600' : val === 'Medium' ? 'bg-amber-500/10 text-amber-600' : 'bg-blue-500/10 text-blue-600'
      }`}>
        {val}
      </span>
    )},
    {
      key: 'items',
      label: 'Items Count',
      sortable: false,
      width: '13%',
      render: (val) => `${val?.length || 0} drugs`
    },
    { key: 'createdBy', label: 'Requested By', sortable: true, width: '15%' },
    { key: 'status', label: 'Status', sortable: true, width: '17%', render: (val) => <StatusBadge status={val} /> }
  ];

  const actions = (row) => (
    <>
      <button
        onClick={() => handleViewDetails(row)}
        className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
        title="View Requisition Details"
      >
        <Eye className="w-3.5 h-3.5" />
      </button>
      {row.status === 'Pending' && (
        <>
          <button
            onClick={() => handleApproveTrigger(row)}
            className="p-1 text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors cursor-pointer"
            title="Approve Requisition"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleRejectTrigger(row)}
            className="p-1 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
            title="Reject Requisition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </>
      )}
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search requisitions..." className="sm:max-w-xs" />
        <button
          onClick={handleOpenForm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Draft Requisition
        </button>
      </div>

      <DataTable
        columns={columns}
        data={requisitions}
        searchQuery={search}
        searchKeys={['id', 'department', 'createdBy', 'urgency']}
        actions={actions}
        emptyMessage="No requisitions generated yet."
      />

      {/* Creation Form Drawer */}
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Draft Requisition"
        onSubmit={handleSave}
        submitLabel="Submit Requisition"
        width="lg"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormGroup label="Department/Ward" error={errors.department} required>
            <FormInput
              value={formData.department}
              onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
              placeholder="e.g. ICU, OPD Pharmacy"
              error={!!errors.department}
            />
          </FormGroup>

          <FormGroup label="Urgency Priority">
            <FormSelect
              value={formData.urgency}
              onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </FormSelect>
          </FormGroup>
        </div>

        <FormGroup label="Remarks / Purchase Reason">
          <FormInput
            value={formData.remarks}
            onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
            placeholder="e.g. Regular monthly restock"
          />
        </FormGroup>

        <div className="space-y-3.5 border-t pt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-foreground">Requested Medicines list</h4>
            <button
              type="button"
              onClick={handleAddFormItem}
              className="text-[10px] font-bold text-primary hover:underline px-2.5 py-1.5 bg-primary/10 rounded-lg"
            >
              + Add Item
            </button>
          </div>
          
          {errors.items && <p className="text-[11px] text-destructive font-semibold">{errors.items}</p>}

          <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin pr-1">
            {formData.itemsList.map((itm, idx) => (
              <div key={idx} className="flex gap-3 items-end p-3 rounded-lg border border-border bg-muted/20 animate-in fade-in">
                <FormGroup label="Item / Drug" className="flex-1">
                  <FormSelect
                    value={itm.itemId}
                    onChange={(e) => handleFormItemChange(idx, 'itemId', e.target.value)}
                  >
                    <option value="">Choose medicine...</option>
                    {items.map(i => (
                      <option key={i.id} value={i.id}>{i.name} ({i.genericName})</option>
                    ))}
                  </FormSelect>
                </FormGroup>

                <FormGroup label="Qty" className="w-24">
                  <FormInput
                    type="number"
                    min="1"
                    value={itm.qtyRequested}
                    onChange={(e) => handleFormItemChange(idx, 'qtyRequested', e.target.value)}
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
            ))}
          </div>
        </div>
      </DrawerForm>

      {/* Details View Modal */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title={`Requisition Details: ${currentRecord?.id}`} size="lg">
        {currentRecord && (
          <div className="space-y-4 text-xs font-semibold text-muted-foreground">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-muted/20 border rounded-xl">
              <div><span>Date:</span><p className="text-foreground mt-0.5">{currentRecord.date}</p></div>
              <div><span>Urgency:</span><p className="text-foreground mt-0.5">{currentRecord.urgency}</p></div>
              <div><span>Creator:</span><p className="text-foreground mt-0.5">{currentRecord.createdBy}</p></div>
              <div><span>Status:</span><div className="mt-0.5"><StatusBadge status={currentRecord.status} /></div></div>
            </div>

            {currentRecord.remarks && (
              <div className="p-3 bg-muted/10 border border-dashed rounded-lg">
                <span>Reason / Remarks:</span>
                <p className="text-foreground font-medium mt-1 leading-relaxed">{currentRecord.remarks}</p>
              </div>
            )}

            <div className="space-y-2 border-t pt-3">
              <h4 className="text-xs font-bold text-foreground">Items Checklist</h4>
              <div className="border border-border rounded-lg overflow-hidden bg-card/20">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted border-b border-border text-[10px] text-muted-foreground uppercase">
                      <th className="p-3">Medicine Description</th>
                      <th className="p-3 text-right">Requested Qty</th>
                      <th className="p-3 text-right">Approved Qty</th>
                      <th className="p-3 text-right">Est. Unit Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {currentRecord.items.map((itm, i) => {
                      const drug = items.find(d => d.id === itm.itemId);
                      return (
                        <tr key={i} className="hover:bg-muted/10 text-foreground">
                          <td className="p-3 font-bold">{drug?.name || itm.itemId}</td>
                          <td className="p-3 text-right font-mono font-medium">{itm.qtyRequested}</td>
                          <td className="p-3 text-right font-mono font-medium text-emerald-600 dark:text-emerald-400">
                            {currentRecord.status === 'Approved' ? itm.qtyApproved : '—'}
                          </td>
                          <td className="p-3 text-right font-mono">₹{itm.estimatedCost.toFixed(2)}</td>
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

      {/* Adjust & Approve Modal */}
      <Modal isOpen={isApproveOpen} onClose={() => setIsApproveOpen(false)} title="Verify & Approve Requisition" size="md">
        <div className="space-y-5">
          <div className="text-xs text-muted-foreground font-semibold">
            Adjust the approved quantities if necessary before signing off this requisition.
          </div>
          <div className="space-y-3.5 max-h-60 overflow-y-auto divide-y divide-border pr-1">
            {approvalItems.map((itm, i) => {
              const drug = items.find(d => d.id === itm.itemId);
              return (
                <div key={i} className="flex justify-between items-center py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate text-foreground">{drug?.name || itm.itemId}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">Requested: {itm.qtyRequested}</p>
                  </div>
                  <div className="w-28">
                    <FormInput
                      type="number"
                      min="0"
                      value={itm.qtyApproved}
                      onChange={(e) => {
                        const val = e.target.value;
                        setApprovalItems(prev => prev.map((x, idx) => idx === i ? { ...x, qtyApproved: val } : x));
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-2.5 border-t pt-4">
            <button onClick={() => setIsApproveOpen(false)} className="px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-muted">
              Cancel
            </button>
            <button onClick={handleApproveConfirm} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-600/95 text-white text-xs font-semibold rounded-lg shadow-sm">
              Confirm Approval
            </button>
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal isOpen={isRejectOpen} onClose={() => setIsRejectOpen(false)} title="Reject Requisition" size="sm">
        <div className="space-y-4">
          <FormGroup label="Reason for Rejection" required>
            <FormInput
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Inventory already contains sufficient stock"
            />
          </FormGroup>
          <div className="flex justify-end gap-2.5">
            <button onClick={() => setIsRejectOpen(false)} className="px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-muted">
              Cancel
            </button>
            <button onClick={handleRejectConfirm} className="px-4 py-2 bg-rose-600 hover:bg-rose-600/95 text-white text-xs font-semibold rounded-lg shadow-sm">
              Confirm Reject
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
