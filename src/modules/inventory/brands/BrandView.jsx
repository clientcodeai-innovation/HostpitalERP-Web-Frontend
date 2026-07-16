import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import DrawerForm from '../shared/DrawerForm';
import DeleteDialog from '../shared/DeleteDialog';
import StatusBadge from '../shared/StatusBadge';
import { FormGroup, FormInput, FormSelect } from '../shared/FormFields';

export default function BrandView() {
  const { brands, saveBrand, deleteBrand, manufacturers } = useInventory();
  
  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [formData, setFormData] = useState({ name: '', manufacturer: '', status: 'Active' });
  const [errors, setErrors] = useState({});

  const handleOpenForm = (record = null) => {
    setErrors({});
    if (record) {
      setCurrentRecord(record);
      setFormData({
        name: record.name,
        manufacturer: record.manufacturer || '',
        status: record.status || 'Active'
      });
    } else {
      setCurrentRecord(null);
      setFormData({ name: '', manufacturer: '', status: 'Active' });
    }
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Brand name is required';
    if (!formData.manufacturer.trim()) tempErrors.manufacturer = 'Manufacturer selection is required';
    
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    const payload = currentRecord
      ? { ...currentRecord, ...formData }
      : { ...formData };
    
    saveBrand(payload);
    setIsDrawerOpen(false);
  };

  const handleDeleteTrigger = (record) => {
    setCurrentRecord(record);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentRecord) {
      deleteBrand(currentRecord.id);
      setIsDeleteOpen(false);
    }
  };

  const columns = [
    { key: 'id', label: 'Brand ID', sortable: true, width: '20%' },
    { key: 'name', label: 'Brand Name', sortable: true, width: '35%' },
    {
      key: 'manufacturer',
      label: 'Manufacturer',
      sortable: true,
      width: '25%',
      render: (val) => {
        const mfg = manufacturers.find(m => m.id === val || m.name === val);
        return mfg ? mfg.name : (val || <span className="text-muted-foreground">—</span>);
      }
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '20%',
      render: (val) => <StatusBadge status={val} />
    }
  ];

  const actions = (row) => (
    <>
      <button
        onClick={() => handleOpenForm(row)}
        className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
        title="Edit Brand"
      >
        <Edit2 className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => handleDeleteTrigger(row)}
        className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
        title="Delete Brand"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search brands..." className="sm:max-w-xs" />
        <button
          onClick={() => handleOpenForm()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Brand
        </button>
      </div>

      <DataTable
        columns={columns}
        data={brands}
        searchQuery={search}
        searchKeys={['name', 'manufacturer', 'id']}
        actions={actions}
        emptyMessage="No brands created yet."
      />

      {/* Slide-out Form Drawer */}
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={currentRecord ? 'Edit Brand' : 'Create Brand'}
        onSubmit={handleSave}
        submitLabel={currentRecord ? 'Update' : 'Save'}
      >
        <FormGroup label="Brand Name" error={errors.name} required>
          <FormInput
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. Augmentin, Calpol"
            error={!!errors.name}
          />
        </FormGroup>

        <FormGroup label="Manufacturer" error={errors.manufacturer} required>
          <FormSelect
            value={formData.manufacturer}
            onChange={(e) => setFormData(prev => ({ ...prev, manufacturer: e.target.value }))}
            error={!!errors.manufacturer}
          >
            <option value="">Select Manufacturer</option>
            {manufacturers.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </FormSelect>
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
        message={`Are you sure you want to delete the brand "${currentRecord?.name}"?`}
      />
    </div>
  );
}
