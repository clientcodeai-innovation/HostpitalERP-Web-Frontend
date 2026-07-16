import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import DrawerForm from '../shared/DrawerForm';
import DeleteDialog from '../shared/DeleteDialog';
import StatusBadge from '../shared/StatusBadge';
import { FormGroup, FormInput, FormSelect } from '../shared/FormFields';

export default function UnitsView() {
  const { units, saveUnit, deleteUnit } = useInventory();
  
  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [formData, setFormData] = useState({ name: '', abbreviation: '', status: 'Active' });
  const [errors, setErrors] = useState({});

  const handleOpenForm = (record = null) => {
    setErrors({});
    if (record) {
      setCurrentRecord(record);
      setFormData({
        name: record.name,
        abbreviation: record.abbreviation,
        status: record.status || 'Active'
      });
    } else {
      setCurrentRecord(null);
      setFormData({ name: '', abbreviation: '', status: 'Active' });
    }
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Unit name is required';
    if (!formData.abbreviation.trim()) tempErrors.abbreviation = 'Abbreviation is required';
    
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    const payload = currentRecord
      ? { ...currentRecord, ...formData }
      : { ...formData };
    
    saveUnit(payload);
    setIsDrawerOpen(false);
  };

  const handleDeleteTrigger = (record) => {
    setCurrentRecord(record);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentRecord) {
      deleteUnit(currentRecord.id);
      setIsDeleteOpen(false);
    }
  };

  const columns = [
    { key: 'id', label: 'Unit ID', sortable: true, width: '20%' },
    { key: 'name', label: 'Unit Name', sortable: true, width: '40%' },
    { key: 'abbreviation', label: 'Abbreviation', sortable: true, width: '20%' },
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
        title="Edit Unit"
      >
        <Edit2 className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => handleDeleteTrigger(row)}
        className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
        title="Delete Unit"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <SearchBar value={search} onChange={setSearch} placeholder="Search units..." className="sm:max-w-xs" />
        <button
          onClick={() => handleOpenForm()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Unit
        </button>
      </div>

      <DataTable
        columns={columns}
        data={units}
        searchQuery={search}
        searchKeys={['name', 'abbreviation', 'id']}
        actions={actions}
        emptyMessage="No units of measure created yet."
      />

      {/* Slide-out Form Drawer */}
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={currentRecord ? 'Edit Unit of Measure' : 'Create Unit of Measure'}
        onSubmit={handleSave}
        submitLabel={currentRecord ? 'Update' : 'Save'}
      >
        <FormGroup label="Unit Name" error={errors.name} required>
          <FormInput
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. Bottle, Strip, Vial"
            error={!!errors.name}
          />
        </FormGroup>

        <FormGroup label="Abbreviation" error={errors.abbreviation} required>
          <FormInput
            value={formData.abbreviation}
            onChange={(e) => setFormData(prev => ({ ...prev, abbreviation: e.target.value.toUpperCase() }))}
            placeholder="e.g. BTL, STRIP, VIAL"
            error={!!errors.abbreviation}
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
        message={`Are you sure you want to delete the unit "${currentRecord?.name}"?`}
      />
    </div>
  );
}
