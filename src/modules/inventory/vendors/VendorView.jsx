import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import DrawerForm from '../shared/DrawerForm';
import DeleteDialog from '../shared/DeleteDialog';
import StatusBadge from '../shared/StatusBadge';
import { FormGroup, FormInput, FormSelect } from '../shared/FormFields';

export default function VendorView() {
  const { vendors, saveVendor, deleteVendor } = useInventory();
  
  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [formData, setFormData] = useState({ name: '', contactPerson: '', email: '', phone: '', status: 'Active' });
  const [errors, setErrors] = useState({});

  const handleOpenForm = (record = null) => {
    setErrors({});
    if (record) {
      setCurrentRecord(record);
      setFormData({
        name: record.name,
        contactPerson: record.contactPerson || '',
        email: record.email || '',
        phone: record.phone || '',
        status: record.status || 'Active'
      });
    } else {
      setCurrentRecord(null);
      setFormData({ name: '', contactPerson: '', email: '', phone: '', status: 'Active' });
    }
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Vendor name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) tempErrors.phone = 'Phone number is required';
    
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    const payload = currentRecord
      ? { ...currentRecord, ...formData }
      : { ...formData };
    
    saveVendor(payload);
    setIsDrawerOpen(false);
  };

  const handleDeleteTrigger = (record) => {
    setCurrentRecord(record);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentRecord) {
      deleteVendor(currentRecord.id);
      setIsDeleteOpen(false);
    }
  };

  const columns = [
    { key: 'id', label: 'Vendor ID', sortable: true, width: '15%' },
    { key: 'name', label: 'Supplier/Vendor Name', sortable: true, width: '25%' },
    { key: 'contactPerson', label: 'Contact Person', sortable: true, width: '20%' },
    { key: 'email', label: 'Email Address', sortable: false, width: '20%' },
    { key: 'phone', label: 'Phone', sortable: false, width: '10%' },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      width: '10%',
      render: (val) => (
        <div className="flex items-center gap-1 text-amber-500 font-bold font-mono">
          <Star className="w-3.5 h-3.5 fill-current shrink-0" />
          <span>{Number(val || 5.0).toFixed(1)}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '10%',
      render: (val) => <StatusBadge status={val} />
    }
  ];

  const actions = (row) => (
    <>
      <button
        onClick={() => handleOpenForm(row)}
        className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
        title="Edit Vendor"
      >
        <Edit2 className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => handleDeleteTrigger(row)}
        className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
        title="Delete Vendor"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search vendors..." className="sm:max-w-xs" />
        <button
          onClick={() => handleOpenForm()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Vendor
        </button>
      </div>

      <DataTable
        columns={columns}
        data={vendors}
        searchQuery={search}
        searchKeys={['name', 'contactPerson', 'email', 'phone', 'id']}
        actions={actions}
        emptyMessage="No vendors created yet."
      />

      {/* Slide-out Form Drawer */}
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={currentRecord ? 'Edit Vendor' : 'Create Vendor'}
        onSubmit={handleSave}
        submitLabel={currentRecord ? 'Update' : 'Save'}
      >
        <FormGroup label="Vendor/Supplier Company Name" error={errors.name} required>
          <FormInput
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. MedPlus Wholesales"
            error={!!errors.name}
          />
        </FormGroup>

        <FormGroup label="Contact Person Name">
          <FormInput
            value={formData.contactPerson}
            onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
            placeholder="e.g. John Doe"
          />
        </FormGroup>

        <FormGroup label="Email Address" error={errors.email} required>
          <FormInput
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="e.g. billing@medplus.com"
            error={!!errors.email}
          />
        </FormGroup>

        <FormGroup label="Phone Number" error={errors.phone} required>
          <FormInput
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="e.g. +91 98765 43210"
            error={!!errors.phone}
          />
        </FormGroup>

        <FormGroup label="Status">
          <FormSelect
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </FormSelect>
        </FormGroup>
      </DrawerForm>

      {/* Delete Confirmation */}
      <DeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete the vendor "${currentRecord?.name}"?`}
      />
    </div>
  );
}
