import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Filter, ArrowRightLeft } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import DataTable from '../shared/DataTable';
import SearchBar from '../shared/SearchBar';
import DrawerForm from '../shared/DrawerForm';
import FilterDrawer from '../shared/FilterDrawer';
import DeleteDialog from '../shared/DeleteDialog';
import Modal from '../shared/Modal';
import StatusBadge from '../shared/StatusBadge';
import BarcodeGenerator from '../shared/BarcodeGenerator';
import QrGenerator from '../shared/QrGenerator';
import ExportButton from '../shared/ExportButton';
import ImportButton from '../shared/ImportButton';
import FileUpload from '../shared/FileUpload';
import { FormGroup, FormInput, FormSelect, FormCheckbox } from '../shared/FormFields';

export default function ItemMasterView() {
  const {
    items,
    saveItem,
    deleteItem,
    importItems,
    categories,
    units,
    brands,
    manufacturers,
    locations
  } = useInventory();

  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [currentRecord, setCurrentRecord] = useState(null);
  
  // Advanced filters state
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterBatchTracking, setFilterBatchTracking] = useState('all');

  // Applied filters state
  const [appliedFilters, setAppliedFilters] = useState({ categoryId: '', brandId: '', batchTracking: 'all' });

  // Form state
  const [formData, setFormData] = useState({
    code: '',
    sku: '',
    name: '',
    genericName: '',
    brandId: '',
    manufacturerId: '',
    categoryId: '',
    unitId: '',
    purchasePrice: '',
    sellingPrice: '',
    gst: '12',
    hsn: '',
    storageCondition: '',
    locationId: '',
    minStock: '',
    maxStock: '',
    reorderLevel: '',
    batchTracking: true,
    expiryTracking: true,
    image: null
  });
  
  const [errors, setErrors] = useState({});

  const handleOpenForm = (record = null) => {
    setErrors({});
    if (record) {
      setCurrentRecord(record);
      setFormData({
        code: record.code || '',
        sku: record.sku || '',
        name: record.name || '',
        genericName: record.genericName || '',
        brandId: record.brandId || '',
        manufacturerId: record.manufacturerId || '',
        categoryId: record.categoryId || '',
        unitId: record.unitId || '',
        purchasePrice: record.purchasePrice || '',
        sellingPrice: record.sellingPrice || '',
        gst: String(record.gst || '12'),
        hsn: record.hsn || '',
        storageCondition: record.storageCondition || '',
        locationId: record.locationId || '',
        minStock: record.minStock || '',
        maxStock: record.maxStock || '',
        reorderLevel: record.reorderLevel || '',
        batchTracking: record.batchTracking !== false,
        expiryTracking: record.expiryTracking !== false,
        image: record.image || null
      });
    } else {
      setCurrentRecord(null);
      setFormData({
        code: '',
        sku: '',
        name: '',
        genericName: '',
        brandId: '',
        manufacturerId: '',
        categoryId: '',
        unitId: '',
        purchasePrice: '',
        sellingPrice: '',
        gst: '12',
        hsn: '',
        storageCondition: '',
        locationId: '',
        minStock: '',
        maxStock: '',
        reorderLevel: '',
        batchTracking: true,
        expiryTracking: true,
        image: null
      });
    }
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Item name is required';
    if (!formData.brandId) tempErrors.brandId = 'Brand selection is required';
    if (!formData.manufacturerId) tempErrors.manufacturerId = 'Manufacturer selection is required';
    if (!formData.categoryId) tempErrors.categoryId = 'Category selection is required';
    if (!formData.unitId) tempErrors.unitId = 'Unit (UOM) selection is required';
    
    const pPrice = Number(formData.purchasePrice);
    const sPrice = Number(formData.sellingPrice);
    if (isNaN(pPrice) || pPrice <= 0) tempErrors.purchasePrice = 'Purchase price must be positive';
    if (isNaN(sPrice) || sPrice <= 0) tempErrors.sellingPrice = 'Selling price must be positive';
    if (sPrice < pPrice) tempErrors.sellingPrice = 'Selling price should exceed purchase price';
    
    if (formData.reorderLevel !== '' && Number(formData.reorderLevel) < 0) {
      tempErrors.reorderLevel = 'Reorder level must be non-negative';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    const payload = currentRecord
      ? {
          ...currentRecord,
          ...formData,
          purchasePrice: Number(formData.purchasePrice),
          sellingPrice: Number(formData.sellingPrice),
          gst: Number(formData.gst),
          minStock: Number(formData.minStock || 0),
          maxStock: Number(formData.maxStock || 0),
          reorderLevel: Number(formData.reorderLevel || 0)
        }
      : {
          ...formData,
          purchasePrice: Number(formData.purchasePrice),
          sellingPrice: Number(formData.sellingPrice),
          gst: Number(formData.gst),
          minStock: Number(formData.minStock || 0),
          maxStock: Number(formData.maxStock || 0),
          reorderLevel: Number(formData.reorderLevel || 0)
        };

    saveItem(payload);
    setIsDrawerOpen(false);
  };

  const handleDeleteTrigger = (record) => {
    setCurrentRecord(record);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentRecord) {
      deleteItem(currentRecord.id);
      setIsDeleteOpen(false);
    }
  };

  const handleViewDetails = (record) => {
    setCurrentRecord(record);
    setIsDetailsOpen(true);
  };

  const applyFilters = () => {
    setAppliedFilters({
      categoryId: filterCategory,
      brandId: filterBrand,
      batchTracking: filterBatchTracking
    });
  };

  const resetFilters = () => {
    setFilterCategory('');
    setFilterBrand('');
    setFilterBatchTracking('all');
    setAppliedFilters({ categoryId: '', brandId: '', batchTracking: 'all' });
  };

  // Filter items logic
  const filteredItems = React.useMemo(() => {
    return items.filter(itm => {
      if (appliedFilters.categoryId && itm.categoryId !== appliedFilters.categoryId) return false;
      if (appliedFilters.brandId && itm.brandId !== appliedFilters.brandId) return false;
      if (appliedFilters.batchTracking !== 'all') {
        const isTracking = appliedFilters.batchTracking === 'yes';
        if (itm.batchTracking !== isTracking) return false;
      }
      return true;
    });
  }, [items, appliedFilters]);

  // Export properties map
  const exportHeaders = [
    { label: 'Item Code', key: 'code' },
    { label: 'Name', key: 'name' },
    { label: 'Generic Name', key: 'genericName' },
    { label: 'Purchase Price', key: 'purchasePrice' },
    { label: 'Selling Price', key: 'sellingPrice' },
    { label: 'GST %', key: 'gst' },
    { label: 'Reorder Level', key: 'reorderLevel' }
  ];

  // Import template fields
  const importHeaders = ['name', 'genericName', 'brandId', 'manufacturerId', 'categoryId', 'unitId', 'purchasePrice', 'sellingPrice', 'hsn'];
  const importSample = [
    { name: 'Paracetamol 500mg', genericName: 'Acetaminophen', brandId: 'BRD-001', manufacturerId: 'MFG-001', categoryId: 'CAT-001', unitId: 'UOM-004', purchasePrice: '12.00', sellingPrice: '18.50', hsn: '30049012' }
  ];

  const columns = [
    { key: 'code', label: 'Item Code', sortable: true, width: '12%' },
    { key: 'name', label: 'Item Name', sortable: true, width: '22%' },
    {
      key: 'categoryId',
      label: 'Category',
      sortable: true,
      width: '13%',
      render: (val) => {
        const cat = categories.find(c => c.id === val);
        return cat ? cat.name : val;
      }
    },
    {
      key: 'brandId',
      label: 'Brand',
      sortable: true,
      width: '13%',
      render: (val) => {
        const brd = brands.find(b => b.id === val);
        return brd ? brd.name : val;
      }
    },
    { key: 'purchasePrice', label: 'Pur. Price', sortable: true, width: '10%', align: 'right', render: (val) => `₹${Number(val).toFixed(2)}` },
    { key: 'sellingPrice', label: 'Sel. Price', sortable: true, width: '10%', align: 'right', render: (val) => `₹${Number(val).toFixed(2)}` },
    { key: 'reorderLevel', label: 'Reorder Qty', sortable: true, width: '10%', align: 'right' },
    {
      key: 'batchTracking',
      label: 'Tracking',
      sortable: false,
      width: '12%',
      render: (_, row) => (
        <span className="text-[10px] font-bold text-muted-foreground flex flex-col gap-0.5">
          <span>Batch: <span className="font-mono text-primary/80">{row.batchTracking ? (row.batchNumber || 'Yes') : 'No'}</span></span>
          <span>Expiry: <span className="text-primary/80">{row.expiryTracking ? (row.expiryDate || 'Yes') : 'No'}</span></span>
        </span>
      )
    }
  ];

  const actions = (row) => (
    <>
      <button
        onClick={() => handleViewDetails(row)}
        className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
        title="View Code & QR details"
      >
        <Eye className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => handleOpenForm(row)}
        className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
        title="Edit Item"
      >
        <Edit2 className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => handleDeleteTrigger(row)}
        className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
        title="Delete Item"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-card/40 backdrop-blur-md p-4 rounded-xl border border-border">
        <div className="flex items-center gap-2 w-full md:max-w-md">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name, SKU, or generic drug..." />
          <button
            onClick={() => setIsFilterOpen(true)}
            className={`p-2 border rounded-lg hover:bg-muted relative transition-colors cursor-pointer shrink-0 ${
              appliedFilters.categoryId || appliedFilters.brandId || appliedFilters.batchTracking !== 'all'
                ? 'border-primary text-primary bg-primary/5'
                : 'border-border text-foreground'
            }`}
            title="Advanced Filters"
          >
            <Filter className="w-4 h-4" />
            {(appliedFilters.categoryId || appliedFilters.brandId || appliedFilters.batchTracking !== 'all') && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 w-full md:w-auto">
          <ImportButton onImport={importItems} templateHeaders={importHeaders} sampleRows={importSample} title="Import Item Master CSV" />
          <ExportButton data={filteredItems} headers={exportHeaders} filename="item-master-report" />
          <button
            onClick={() => handleOpenForm()}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredItems}
        searchQuery={search}
        searchKeys={['name', 'genericName', 'code', 'sku', 'hsn']}
        actions={actions}
        emptyMessage="No items configured in the Master catalog."
      />

      {/* Advanced Filter Drawer */}
      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onApply={applyFilters} onReset={resetFilters}>
        <FormGroup label="Category">
          <FormSelect value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </FormSelect>
        </FormGroup>

        <FormGroup label="Brand">
          <FormSelect value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)}>
            <option value="">All Brands</option>
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </FormSelect>
        </FormGroup>

        <FormGroup label="Batch Tracking">
          <FormSelect value={filterBatchTracking} onChange={(e) => setFilterBatchTracking(e.target.value)}>
            <option value="all">All Items</option>
            <option value="yes">Tracking Active</option>
            <option value="no">No Tracking</option>
          </FormSelect>
        </FormGroup>
      </FilterDrawer>

      {/* Item Setup Form Drawer */}
      <DrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={currentRecord ? `Edit Item (${currentRecord.code})` : 'Register New Item'}
        onSubmit={handleSave}
        submitLabel={currentRecord ? 'Update' : 'Save'}
        width="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Item Name" error={errors.name} required>
            <FormInput
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Augmentin 625 Duo"
              error={!!errors.name}
            />
          </FormGroup>

          <FormGroup label="Generic Drug Name">
            <FormInput
              value={formData.genericName}
              onChange={(e) => setFormData(prev => ({ ...prev, genericName: e.target.value }))}
              placeholder="e.g. Amoxicillin + Clavulanic Acid"
            />
          </FormGroup>

          <FormGroup label="Brand Group" error={errors.brandId} required>
            <FormSelect
              value={formData.brandId}
              onChange={(e) => setFormData(prev => ({ ...prev, brandId: e.target.value }))}
              error={!!errors.brandId}
            >
              <option value="">Select Brand</option>
              {brands.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </FormSelect>
          </FormGroup>

          <FormGroup label="Manufacturer" error={errors.manufacturerId} required>
            <FormSelect
              value={formData.manufacturerId}
              onChange={(e) => setFormData(prev => ({ ...prev, manufacturerId: e.target.value }))}
              error={!!errors.manufacturerId}
            >
              <option value="">Select Manufacturer</option>
              {manufacturers.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </FormSelect>
          </FormGroup>

          <FormGroup label="Category Class" error={errors.categoryId} required>
            <FormSelect
              value={formData.categoryId}
              onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
              error={!!errors.categoryId}
            >
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </FormSelect>
          </FormGroup>

          <FormGroup label="Unit of Measure (UOM)" error={errors.unitId} required>
            <FormSelect
              value={formData.unitId}
              onChange={(e) => setFormData(prev => ({ ...prev, unitId: e.target.value }))}
              error={!!errors.unitId}
            >
              <option value="">Select UOM</option>
              {units.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.abbreviation})</option>
              ))}
            </FormSelect>
          </FormGroup>

          <FormGroup label="Purchase Price (Excl. Tax)" error={errors.purchasePrice} required>
            <FormInput
              type="number"
              step="0.01"
              value={formData.purchasePrice}
              onChange={(e) => setFormData(prev => ({ ...prev, purchasePrice: e.target.value }))}
              placeholder="0.00"
              error={!!errors.purchasePrice}
            />
          </FormGroup>

          <FormGroup label="Selling Price (MRP)" error={errors.sellingPrice} required>
            <FormInput
              type="number"
              step="0.01"
              value={formData.sellingPrice}
              onChange={(e) => setFormData(prev => ({ ...prev, sellingPrice: e.target.value }))}
              placeholder="0.00"
              error={!!errors.sellingPrice}
            />
          </FormGroup>

          <FormGroup label="GST Rate %">
            <FormSelect value={formData.gst} onChange={(e) => setFormData(prev => ({ ...prev, gst: e.target.value }))}>
              <option value="0">0% (Nil)</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </FormSelect>
          </FormGroup>

          <FormGroup label="HSN Code / Tariff Code">
            <FormInput
              value={formData.hsn}
              onChange={(e) => setFormData(prev => ({ ...prev, hsn: e.target.value }))}
              placeholder="e.g. 30041010"
            />
          </FormGroup>

          <FormGroup label="Storage Conditions">
            <FormInput
              value={formData.storageCondition}
              onChange={(e) => setFormData(prev => ({ ...prev, storageCondition: e.target.value }))}
              placeholder="e.g. Store below 25°C, Cold Room"
            />
          </FormGroup>

          <FormGroup label="Storage Shelf Rack Location">
            <FormSelect value={formData.locationId} onChange={(e) => setFormData(prev => ({ ...prev, locationId: e.target.value }))}>
              <option value="">Select Rack Location</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </FormSelect>
          </FormGroup>

          <FormGroup label="Minimum Threshold Stock">
            <FormInput
              type="number"
              value={formData.minStock}
              onChange={(e) => setFormData(prev => ({ ...prev, minStock: e.target.value }))}
              placeholder="0"
            />
          </FormGroup>

          <FormGroup label="Maximum Threshold Stock">
            <FormInput
              type="number"
              value={formData.maxStock}
              onChange={(e) => setFormData(prev => ({ ...prev, maxStock: e.target.value }))}
              placeholder="0"
            />
          </FormGroup>

          <FormGroup label="Reorder Level Alert Qty" error={errors.reorderLevel}>
            <FormInput
              type="number"
              value={formData.reorderLevel}
              onChange={(e) => setFormData(prev => ({ ...prev, reorderLevel: e.target.value }))}
              placeholder="0"
              error={!!errors.reorderLevel}
            />
          </FormGroup>
        </div>

        <div className="flex gap-4 border-t pt-4">
          <FormCheckbox
            label="Track Batches"
            checked={formData.batchTracking}
            onChange={(e) => setFormData(prev => ({ ...prev, batchTracking: e.target.checked }))}
          />
          <FormCheckbox
            label="Track Expiry Dates"
            checked={formData.expiryTracking}
            onChange={(e) => setFormData(prev => ({ ...prev, expiryTracking: e.target.checked }))}
          />
        </div>

        <FormGroup label="Item Reference Image">
          <FileUpload accept="image/*" label="Upload Medicine / Item Photo" />
        </FormGroup>
      </DrawerForm>

      {/* Details (Barcode & QR View) Modal */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title={`Identities for ${currentRecord?.name}`} size="md">
        {currentRecord && (
          <div className="space-y-6 text-center py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-muted/40 rounded-xl border border-border">
                <BarcodeGenerator value={currentRecord.barcode || currentRecord.code} />
              </div>
              <div className="p-3 bg-muted/40 rounded-xl border border-border">
                <QrGenerator value={currentRecord.qrCode || currentRecord.code} size={130} />
              </div>
            </div>
            
            <div className="border-t border-border pt-4 text-left max-w-sm mx-auto text-xs space-y-1.5 font-semibold text-muted-foreground">
              <div className="flex justify-between"><span>SKU Reference:</span><span className="font-mono text-foreground">{currentRecord.sku}</span></div>
              <div className="flex justify-between"><span>HSN Classification:</span><span className="font-mono text-foreground">{currentRecord.hsn || '—'}</span></div>
              <div className="flex justify-between"><span>Conditions:</span><span className="text-foreground">{currentRecord.storageCondition || 'Room Temp'}</span></div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <DeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete "${currentRecord?.name}"?`}
      />
    </div>
  );
}
