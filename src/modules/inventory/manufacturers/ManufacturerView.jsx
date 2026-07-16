import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import DrawerForm from '../shared/DrawerForm';
import DeleteDialog from '../shared/DeleteDialog';
import StatusBadge from '../shared/StatusBadge';
import { FormGroup, FormInput, FormSelect } from '../shared/FormFields';

export default function ManufacturerView() {
  const { manufacturers, saveManufacturer, deleteManufacturer } = useInventory();
  
  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [formData, setFormData] = useState({ name: '', country: '', contact: '', status: 'Active' });
  const [errors, setErrors] = useState({});

  const handleOpenForm = (record = null) => {
    setErrors({});
    if (record) {
      setCurrentRecord(record);
      setFormData({
        name: record.name,
        country: record.country || '',
        contact: record.contact || '',
        status: record.status || 'Active'
      });
    } else {
      setCurrentRecord(null);
      setFormData({ name: '', country: '', contact: '', status: 'Active' });
    }
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Manufacturer name is required';
    if (!formData.country.trim()) tempErrors.country = 'Country is required';
    
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    const payload = currentRecord
      ? { ...currentRecord, ...formData }
      : { ...formData };
    
    saveManufacturer(payload);
    setIsDrawerOpen(false);
  };

  const handleDeleteTrigger = (record) => {
    setCurrentRecord(record);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentRecord) {
      deleteManufacturer(currentRecord.id);
      setIsDeleteOpen(false);
    }
  };

  const columns = [
    { key: 'id', label: 'Mfg ID', sortable: true, width: '15%' },
    { key: 'name', label: 'Manufacturer Name', sortable: true, width: '35%' },
    { key: 'country', label: 'Country', sortable: true, width: '20%' },
    { key: 'contact', label: 'Contact Info', sortable: false, width: '15%' },
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
        onClick={() => handleOpenForm(row)}
        className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
        title="Edit Manufacturer"
      >
        <Edit2 className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => handleDeleteTrigger(row)}
        className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
        title="Delete Manufacturer"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search manufacturers..." className="sm:max-w-xs" />
        <button
          onClick={() => handleOpenForm()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Manufacturer
        </button>
      </div>

      <DataTable
        columns={columns}
        data={manufacturers}
        searchQuery={search}
        searchKeys={['name', 'country', 'id', 'contact']}
        actions={actions}
        emptyMessage="No manufacturers created yet."
      />

      {/* Slide-out Form Drawer */}
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={currentRecord ? 'Edit Manufacturer' : 'Create Manufacturer'}
        onSubmit={handleSave}
        submitLabel={currentRecord ? 'Update' : 'Save'}
      >
        <FormGroup label="Manufacturer Name" error={errors.name} required>
          <FormInput
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. GlaxoSmithKline, Pfizer"
            error={!!errors.name}
          />
        </FormGroup>

        <FormGroup label="Country of Origin" error={errors.country} required>
          <FormInput
            value={formData.country}
            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
            placeholder="e.g. India, Germany, USA"
            error={!!errors.country}
          />
        </FormGroup>

        <FormGroup label="Contact Information (Email/Phone)">
          <FormInput
            value={formData.contact}
            onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
            placeholder="e.g. support@pfizer.com"
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
        message={`Are you sure you want to delete the manufacturer "${currentRecord?.name}"?`}
      />
    </div>
  );
}
