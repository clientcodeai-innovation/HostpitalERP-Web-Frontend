import React, { useState } from 'react';
import { Plus, Eye, Truck, Printer } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import DrawerForm from '../shared/DrawerForm';
import Modal from '../shared/Modal';
import StatusBadge from '../shared/StatusBadge';
import { FormGroup, FormInput, FormSelect } from '../shared/FormFields';

export default function PurchaseOrderView() {
  const {
    purchaseOrders,
    createPurchaseOrder,
    requisitions,
    vendors,
    items
  } = useInventory();

  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const [currentRecord, setCurrentRecord] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    requisitionId: '',
    vendorId: '',
    paymentTerms: 'Net 30',
    shippingMethod: 'Express Ground',
    remarks: ''
  });

  const [errors, setErrors] = useState({});

  // Filter requisitions that are approved and not yet linked to a PO
  const approvedRequisitions = requisitions.filter(r => r.status === 'Approved');

  const handleOpenForm = () => {
    setErrors({});
    setFormData({
      requisitionId: '',
      vendorId: '',
      paymentTerms: 'Net 30',
      shippingMethod: 'Express Ground',
      remarks: ''
    });
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    const tempErrors = {};
    if (!formData.requisitionId) tempErrors.requisitionId = 'Requisition selection is required';
    if (!formData.vendorId) tempErrors.vendorId = 'Vendor selection is required';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // Pull items from selected requisition to pre-fill PO items
    const selectedReq = requisitions.find(r => r.id === formData.requisitionId);
    if (!selectedReq) return;

    const poItems = selectedReq.items.map(itm => ({
      itemId: itm.itemId,
      qty: itm.qtyApproved || itm.qtyRequested,
      unitPrice: itm.estimatedCost
    }));

    createPurchaseOrder({
      requisitionId: formData.requisitionId,
      vendorId: formData.vendorId,
      paymentTerms: formData.paymentTerms,
      shippingMethod: formData.shippingMethod,
      remarks: formData.remarks,
      items: poItems
    });

    setIsDrawerOpen(false);
  };

  const handleViewDetails = (record) => {
    setCurrentRecord(record);
    setIsDetailsOpen(true);
  };

  const columns = [
    { key: 'id', label: 'PO Code', sortable: true, width: '13%' },
    { key: 'date', label: 'PO Date', sortable: true, width: '13%' },
    { key: 'requisitionId', label: 'PR Ref', sortable: true, width: '13%' },
    {
      key: 'vendorId',
      label: 'Vendor/Supplier',
      sortable: true,
      width: '20%',
      render: (val) => {
        const v = vendors.find(vend => vend.id === val);
        return v ? v.name : val;
      }
    },
    {
      key: 'items',
      label: 'Items Qty',
      sortable: false,
      width: '12%',
      render: (val) => `${val?.reduce((acc, x) => acc + x.qty, 0) || 0} units`
    },
    {
      key: 'totalCost',
      label: 'Total Value',
      sortable: false,
      width: '14%',
      align: 'right',
      render: (_, row) => {
        const val = row.items?.reduce((acc, x) => acc + (x.qty * x.unitPrice), 0) || 0;
        return `₹${val.toFixed(2)}`;
      }
    },
    { key: 'status', label: 'Status', sortable: true, width: '15%', render: (val) => <StatusBadge status={val} /> }
  ];

  const actions = (row) => (
    <>
      <button
        onClick={() => handleViewDetails(row)}
        className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
        title="View Purchase Order details"
      >
        <Eye className="w-3.5 h-3.5" />
      </button>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search Purchase Orders..." className="sm:max-w-xs" />
        <button
          onClick={handleOpenForm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create PO
        </button>
      </div>

      <DataTable
        columns={columns}
        data={purchaseOrders}
        searchQuery={search}
        searchKeys={['id', 'requisitionId', 'vendorId', 'status']}
        actions={actions}
        emptyMessage="No Purchase Orders created yet."
      />

      {/* Creation Form Drawer */}
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Create Purchase Order"
        onSubmit={handleSave}
        submitLabel="Generate PO"
        width="md"
      >
        <FormGroup label="Approved Requisition Reference" error={errors.requisitionId} required>
          <FormSelect
            value={formData.requisitionId}
            onChange={(e) => setFormData(prev => ({ ...prev, requisitionId: e.target.value }))}
            error={!!errors.requisitionId}
          >
            <option value="">Select Approved Requisition</option>
            {approvedRequisitions.map(r => (
              <option key={r.id} value={r.id}>
                {r.id} — {r.department} ({r.urgency} Priority)
              </option>
            ))}
          </FormSelect>
        </FormGroup>

        <FormGroup label="Vendor/Supplier Assignment" error={errors.vendorId} required>
          <FormSelect
            value={formData.vendorId}
            onChange={(e) => setFormData(prev => ({ ...prev, vendorId: e.target.value }))}
            error={!!errors.vendorId}
          >
            <option value="">Select Vendor/Supplier</option>
            {vendors.map(v => (
              <option key={v.id} value={v.id}>{v.name} ({v.phone})</option>
            ))}
          </FormSelect>
        </FormGroup>

        <div className="grid grid-cols-2 gap-4">
          <FormGroup label="Payment Terms">
            <FormSelect
              value={formData.paymentTerms}
              onChange={(e) => setFormData(prev => ({ ...prev, paymentTerms: e.target.value }))}
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Net 15">Net 15 Days</option>
              <option value="Net 30">Net 30 Days</option>
              <option value="Net 60">Net 60 Days</option>
            </FormSelect>
          </FormGroup>

          <FormGroup label="Shipping Method">
            <FormSelect
              value={formData.shippingMethod}
              onChange={(e) => setFormData(prev => ({ ...prev, shippingMethod: e.target.value }))}
            >
              <option value="Express Courier">Express Courier</option>
              <option value="Express Ground">Express Ground</option>
              <option value="Standard Cargo">Standard Cargo</option>
            </FormSelect>
          </FormGroup>
        </div>

        <FormGroup label="Purchase Remarks">
          <FormInput
            value={formData.remarks}
            onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
            placeholder="e.g. Please expedite shipment"
          />
        </FormGroup>
      </DrawerForm>

      {/* Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title={`Purchase Order Detail: ${currentRecord?.id}`} size="lg">
        {currentRecord && (
          <div className="space-y-5 text-xs font-semibold text-muted-foreground">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-muted/20 border rounded-xl">
              <div><span>Date Created:</span><p className="text-foreground mt-0.5">{currentRecord.date}</p></div>
              <div><span>Vendor Code:</span><p className="text-foreground mt-0.5">{currentRecord.vendorId}</p></div>
              <div><span>Payment Term:</span><p className="text-foreground mt-0.5">{currentRecord.paymentTerms}</p></div>
              <div><span>Shipping Method:</span><p className="text-foreground mt-0.5 flex items-center gap-1"><Truck className="w-3.5 h-3.5" />{currentRecord.shippingMethod}</p></div>
            </div>

            {currentRecord.remarks && (
              <div className="p-3 bg-muted/10 border border-dashed rounded-lg">
                <span>PO Remarks:</span>
                <p className="text-foreground font-medium mt-1">{currentRecord.remarks}</p>
              </div>
            )}

            <div className="space-y-2 border-t pt-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-foreground">Ordered Drugs Specification</h4>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="text-[10px] font-bold text-primary hover:underline px-2.5 py-1.5 bg-primary/10 rounded-lg flex items-center gap-1 shrink-0"
                >
                  <Printer className="w-3.5 h-3.5" /> Print PO
                </button>
              </div>
              
              <div className="border border-border rounded-lg overflow-hidden bg-card/20">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted border-b border-border text-[10px] text-muted-foreground uppercase">
                      <th className="p-3">Medicine Description</th>
                      <th className="p-3 text-right">Order Qty</th>
                      <th className="p-3 text-right">Contract Price</th>
                      <th className="p-3 text-right">Extended Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {currentRecord.items.map((itm, i) => {
                      const drug = items.find(d => d.id === itm.itemId);
                      return (
                        <tr key={i} className="hover:bg-muted/10 text-foreground font-medium">
                          <td className="p-3 font-bold">{drug?.name || itm.itemId}</td>
                          <td className="p-3 text-right font-mono">{itm.qty}</td>
                          <td className="p-3 text-right font-mono">₹{itm.unitPrice.toFixed(2)}</td>
                          <td className="p-3 text-right font-mono text-primary">₹{(itm.qty * itm.unitPrice).toFixed(2)}</td>
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
