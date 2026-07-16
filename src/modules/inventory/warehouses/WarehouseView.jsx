import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import DrawerForm from '../shared/DrawerForm';
import DeleteDialog from '../shared/DeleteDialog';
import StatusBadge from '../shared/StatusBadge';
import { FormGroup, FormInput, FormSelect } from '../shared/FormFields';

export default function WarehouseView() {
  const { warehouses, saveWarehouse, deleteWarehouse } = useInventory();
  
  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [formData, setFormData] = useState({ name: '', location: '', capacity: '', status: 'Active' });
  const [errors, setErrors] = useState({});

  const handleOpenForm = (record = null) => {
    setErrors({});
    if (record) {
      setCurrentRecord(record);
      setFormData({
        name: record.name,
        location: record.location || '',
        capacity: record.capacity || '',
        status: record.status || 'Active'
      });
    } else {
      setCurrentRecord(null);
      setFormData({ name: '', location: '', capacity: '', status: 'Active' });
    }
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Warehouse name is required';
    if (!formData.location.trim()) tempErrors.location = 'Location description is required';
    
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    const payload = currentRecord
      ? { ...currentRecord, ...formData }
      : { ...formData };
    
    saveWarehouse(payload);
    setIsDrawerOpen(false);
  };

  const handleDeleteTrigger = (record) => {
    setCurrentRecord(record);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentRecord) {
      deleteWarehouse(currentRecord.id);
      setIsDeleteOpen(false);
    }
  };

  const columns = [
    { key: 'id', label: 'Warehouse ID', sortable: true, width: '15%' },
    { key: 'name', label: 'Warehouse Name', sortable: true, width: '35%' },
    { key: 'location', label: 'Physical Location', sortable: true, width: '25%' },
    { key: 'capacity', label: 'Storage Capacity', sortable: false, width: '15%' },
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
        title="Edit Warehouse"
      >
        <Edit2 className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => handleDeleteTrigger(row)}
        className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
        title="Delete Warehouse"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search warehouses..." className="sm:max-w-xs" />
        <button
          onClick={() => handleOpenForm()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Warehouse
        </button>
      </div>

      <DataTable
        columns={columns}
        data={warehouses}
        searchQuery={search}
        searchKeys={['name', 'location', 'id']}
        actions={actions}
        emptyMessage="No warehouses created yet."
      />

      {/* Slide-out Form Drawer */}
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={currentRecord ? 'Edit Warehouse' : 'Create Warehouse'}
        onSubmit={handleSave}
        submitLabel={currentRecord ? 'Update' : 'Save'}
      >
        <FormGroup label="Warehouse Name" error={errors.name} required>
          <FormInput
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. Central Pharmacy Basement"
            error={!!errors.name}
          />
        </FormGroup>

        <FormGroup label="Location" error={errors.location} required>
          <FormInput
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="e.g. Basement, Block A"
            error={!!errors.location}
          />
        </FormGroup>

        <FormGroup label="Storage Capacity Volume">
          <FormInput
            value={formData.capacity}
            onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
            placeholder="e.g. 10,000 cu ft"
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
        message={`Are you sure you want to delete the warehouse "${currentRecord?.name}"?`}
      />
    </div>
  );
}
