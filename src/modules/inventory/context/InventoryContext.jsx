import React, { createContext, useContext, useState, useEffect } from 'react';

const InventoryContext = createContext(null);

// Initial Mock Data
const INITIAL_CATEGORIES = [
  { id: 'CAT-001', name: 'Medicines', description: 'All generic and branded pharmaceuticals', status: 'Active', parent: null },
  { id: 'CAT-002', name: 'Antibiotics', description: 'Bacterial infection drugs', status: 'Active', parent: 'CAT-001' },
  { id: 'CAT-003', name: 'Surgical Supplies', description: 'Surgical instruments and consumables', status: 'Active', parent: null },
  { id: 'CAT-004', name: 'Gloves & Masks', description: 'Personal protective equipment', status: 'Active', parent: 'CAT-003' },
  { id: 'CAT-005', name: 'Intravenous Fluids', description: 'Salines and IV solutions', status: 'Active', parent: 'CAT-001' }
];

const INITIAL_UNITS = [
  { id: 'UOM-001', name: 'Box', abbreviation: 'BOX', status: 'Active' },
  { id: 'UOM-002', name: 'Vial', abbreviation: 'VIAL', status: 'Active' },
  { id: 'UOM-003', name: 'Ampoule', abbreviation: 'AMP', status: 'Active' },
  { id: 'UOM-004', name: 'Strip', abbreviation: 'STRIP', status: 'Active' },
  { id: 'UOM-005', name: 'Bottle', abbreviation: 'BTL', status: 'Active' }
];

const INITIAL_BRANDS = [
  { id: 'BRD-001', name: 'Reckeweg', manufacturer: 'Dr. Reckeweg & Co', status: 'Active' },
  { id: 'BRD-002', name: 'SBL Homeopathy', manufacturer: 'SBL Pvt. Ltd.', status: 'Active' },
  { id: 'BRD-003', name: 'Schwabe India', manufacturer: 'Dr. Willmar Schwabe', status: 'Active' },
  { id: 'BRD-004', name: 'Augmentin', manufacturer: 'GSK Pharmaceuticals', status: 'Active' }
];

const INITIAL_MANUFACTURERS = [
  { id: 'MFG-001', name: 'SBL Pvt. Ltd.', country: 'India', contact: 'sbl@homeo.in', status: 'Active' },
  { id: 'MFG-002', name: 'Dr. Reckeweg & Co', country: 'Germany', contact: 'info@reckeweg.de', status: 'Active' },
  { id: 'MFG-003', name: 'GlaxoSmithKline', country: 'United Kingdom', contact: 'gsk.support@gsk.com', status: 'Active' }
];

const INITIAL_VENDORS = [
  { id: 'VND-001', name: 'MedPlus Distributors', contactPerson: 'Rajesh Verma', email: 'rajesh@medplus.com', phone: '+91 98765 43210', status: 'Active', rating: 4.8 },
  { id: 'VND-002', name: 'Apollo Pharmacy Wholesale', contactPerson: 'Anita Rao', email: 'wholesale@apollo.com', phone: '+91 98765 99999', status: 'Active', rating: 4.5 },
  { id: 'VND-003', name: 'Global Pharma Distributors', contactPerson: 'David Miller', email: 'david@globalpharma.com', phone: '+1 (555) 123-4567', status: 'Active', rating: 4.2 }
];

const INITIAL_WAREHOUSES = [
  { id: 'WH-001', name: 'Central Hospital Warehouse', location: 'Basement, Block A', capacity: '10,000 cu ft', status: 'Active' },
  { id: 'WH-002', name: 'OPD Pharmacy Storage', location: 'Ground Floor, Block B', capacity: '2,500 cu ft', status: 'Active' },
  { id: 'WH-003', name: 'Emergency Stockroom', location: 'First Floor, Block C', capacity: '1,500 cu ft', status: 'Active' }
];

const INITIAL_LOCATIONS = [
  { id: 'LOC-001', name: 'Rack A-Shelf 1', warehouseId: 'WH-001', status: 'Active' },
  { id: 'LOC-002', name: 'Rack A-Shelf 2', warehouseId: 'WH-001', status: 'Active' },
  { id: 'LOC-003', name: 'Cold Storage Room 1', warehouseId: 'WH-001', status: 'Active' },
  { id: 'LOC-004', name: 'Rack B-Shelf 1', warehouseId: 'WH-002', status: 'Active' }
];

const INITIAL_ITEMS = [
  {
    id: 'ITEM-001',
    code: 'MED-AUG-625',
    sku: 'SKU-AUG-625-10',
    barcode: '8901234567890',
    qrCode: 'QR-MED-AUG-625',
    name: 'Augmentin 625 Duo',
    genericName: 'Amoxicillin + Clavulanic Acid',
    brandId: 'BRD-004',
    manufacturerId: 'MFG-003',
    categoryId: 'CAT-002',
    unitId: 'UOM-004',
    purchasePrice: 125.50,
    sellingPrice: 168.00,
    gst: 12,
    hsn: '30041010',
    storageCondition: 'Store below 25°C',
    locationId: 'LOC-001',
    minStock: 50,
    maxStock: 500,
    reorderLevel: 100,
    batchTracking: true,
    expiryTracking: true,
    image: null
  },
  {
    id: 'ITEM-002',
    code: 'HOM-ARN-200',
    sku: 'SKU-ARN-200-30',
    barcode: '8902345678901',
    qrCode: 'QR-HOM-ARN-200',
    name: 'Arnica Montana 200C',
    genericName: 'Arnica Montana',
    brandId: 'BRD-002',
    manufacturerId: 'MFG-001',
    categoryId: 'CAT-001',
    unitId: 'UOM-005',
    purchasePrice: 80.00,
    sellingPrice: 110.00,
    gst: 5,
    hsn: '30049011',
    storageCondition: 'Keep away from direct sunlight',
    locationId: 'LOC-002',
    minStock: 20,
    maxStock: 200,
    reorderLevel: 40,
    batchTracking: true,
    expiryTracking: true,
    image: null
  },
  {
    id: 'ITEM-003',
    code: 'SUR-GLV-7.0',
    sku: 'SKU-GLV-70-100',
    barcode: '8903456789012',
    qrCode: 'QR-SUR-GLV-7.0',
    name: 'Surgical Sterile Gloves - Size 7',
    genericName: 'Latex Surgical Gloves',
    brandId: 'BRD-003',
    manufacturerId: 'MFG-001',
    categoryId: 'CAT-004',
    unitId: 'UOM-001',
    purchasePrice: 450.00,
    sellingPrice: 650.00,
    gst: 12,
    hsn: '40151100',
    storageCondition: 'Cool and dry place',
    locationId: 'LOC-004',
    minStock: 10,
    maxStock: 100,
    reorderLevel: 25,
    batchTracking: false,
    expiryTracking: true,
    image: null
  }
];

const INITIAL_BATCHES = [
  { id: 'BAT-001', itemId: 'ITEM-001', batchNo: 'BN-AUG-01', warehouseId: 'WH-001', locationId: 'LOC-001', qty: 250, expiryDate: '2027-10-31', qcStatus: 'Passed' },
  { id: 'BAT-002', itemId: 'ITEM-001', batchNo: 'BN-AUG-02', warehouseId: 'WH-001', locationId: 'LOC-001', qty: 8, expiryDate: '2026-08-15', qcStatus: 'Passed' }, // Expiring soon
  { id: 'BAT-003', itemId: 'ITEM-002', batchNo: 'BN-ARN-99', warehouseId: 'WH-001', locationId: 'LOC-002', qty: 12, expiryDate: '2026-01-10', qcStatus: 'Passed' }, // Expired (mocking 2026-01)
  { id: 'BAT-004', itemId: 'ITEM-002', batchNo: 'BN-ARN-100', warehouseId: 'WH-002', locationId: 'LOC-004', qty: 120, expiryDate: '2028-05-20', qcStatus: 'Passed' }
];

const INITIAL_REQUISITIONS = [
  {
    id: 'PR-001',
    date: '2026-07-10',
    department: 'OPD Pharmacy',
    urgency: 'Medium',
    status: 'Approved',
    remarks: 'Monthly restocking for OPD pharmacy',
    items: [
      { itemId: 'ITEM-001', qtyRequested: 100, qtyApproved: 100, estimatedCost: 125.50 },
      { itemId: 'ITEM-002', qtyRequested: 50, qtyApproved: 50, estimatedCost: 80.00 }
    ],
    createdBy: 'Dr. Amit Patel',
    approvedBy: 'Admin'
  },
  {
    id: 'PR-002',
    date: '2026-07-15',
    department: 'ICU Department',
    urgency: 'High',
    status: 'Pending',
    remarks: 'Emergency requirements for critical care units',
    items: [
      { itemId: 'ITEM-003', qtyRequested: 30, qtyApproved: 0, estimatedCost: 450.00 }
    ],
    createdBy: 'Sister Shiny',
    approvedBy: null
  }
];

const INITIAL_PURCHASE_ORDERS = [
  {
    id: 'PO-001',
    date: '2026-07-11',
    requisitionId: 'PR-001',
    vendorId: 'VND-001',
    status: 'Sent',
    paymentTerms: 'Net 30',
    shippingMethod: 'Express Courier',
    remarks: 'Order dispatched to supplier MedPlus',
    items: [
      { itemId: 'ITEM-001', qty: 100, unitPrice: 125.50 },
      { itemId: 'ITEM-002', qty: 50, unitPrice: 80.00 }
    ],
    createdBy: 'Admin'
  }
];

const INITIAL_GRNS = [
  {
    id: 'GRN-001',
    date: '2026-07-05',
    purchaseOrderId: 'PO-001',
    vendorId: 'VND-001',
    invoiceNo: 'INV-7890',
    invoiceDate: '2026-07-02',
    receivedBy: 'Store Officer Shailesh',
    remarks: 'Fully received and quality checked',
    items: [
      { itemId: 'ITEM-001', qtyOrdered: 100, qtyReceived: 100, qtyAccepted: 100, qtyRejected: 0, batchNo: 'BN-AUG-01', expiryDate: '2027-10-31', notes: 'Perfect condition' },
      { itemId: 'ITEM-002', qtyOrdered: 50, qtyReceived: 50, qtyAccepted: 50, qtyRejected: 0, batchNo: 'BN-ARN-100', expiryDate: '2028-05-20', notes: 'Perfect condition' }
    ]
  }
];

const INITIAL_TRANSACTIONS = [
  { id: 'TXN-001', type: 'Stock In', date: '2026-07-05T10:30:00Z', reference: 'GRN-001', warehouseId: 'WH-001', itemId: 'ITEM-001', batchNo: 'BN-AUG-01', qty: 100, remarks: 'Received via GRN-001' },
  { id: 'TXN-002', type: 'Stock In', date: '2026-07-05T10:35:00Z', reference: 'GRN-001', warehouseId: 'WH-002', itemId: 'ITEM-002', batchNo: 'BN-ARN-100', qty: 50, remarks: 'Received via GRN-001' },
  { id: 'TXN-003', type: 'Issue Out', date: '2026-07-12T14:20:00Z', reference: 'ISS-001', warehouseId: 'WH-001', itemId: 'ITEM-001', batchNo: 'BN-AUG-01', qty: 20, remarks: 'Issued to Emergency Ward' }
];

const INITIAL_ISSUES = [
  {
    id: 'ISS-001',
    date: '2026-07-12',
    department: 'Emergency Ward',
    issuedBy: 'Admin',
    receivedBy: 'Nurse Emily',
    status: 'Issued',
    remarks: 'Emergency medicines replenishment',
    items: [
      { itemId: 'ITEM-001', batchNo: 'BN-AUG-01', qty: 20 }
    ]
  }
];

const INITIAL_RETURNS = [
  {
    id: 'RET-001',
    date: '2026-07-13',
    type: 'Return to Vendor', // Return to Vendor or Return from Department
    partyName: 'MedPlus Distributors', // or Department name
    referenceNo: 'GRN-001',
    returnedBy: 'Store Officer Shailesh',
    status: 'Completed',
    remarks: 'Slight box damage, replaced by vendor',
    items: [
      { itemId: 'ITEM-001', batchNo: 'BN-AUG-02', qty: 2 }
    ]
  }
];

const INITIAL_AUDIT_LOGS = [
  { id: 'LOG-001', timestamp: '2026-07-16T10:00:00Z', user: 'Admin', action: 'CREATE', module: 'Categories', details: 'Added new Category: Medicines' },
  { id: 'LOG-002', timestamp: '2026-07-16T10:15:00Z', user: 'Admin', action: 'CREATE', module: 'Item Master', details: 'Registered new medicine Augmentin 625 Duo' },
  { id: 'LOG-003', timestamp: '2026-07-16T11:00:00Z', user: 'Admin', action: 'UPDATE', module: 'Stock In', details: 'Stock In completed for PO-001' }
];

const INITIAL_SETTINGS = {
  reorderAlertThreshold: 20,
  autoApprovalThreshold: 10000,
  prCodePrefix: 'PR-',
  poCodePrefix: 'PO-',
  grnCodePrefix: 'GRN-',
  itemCodePrefix: 'ITEM-',
  batchCodePrefix: 'BN-',
  enableNotifications: true,
  enableExpiryAlerts: true
};

export function InventoryProvider({ children }) {
  const getStoredData = (key, fallback) => {
    try {
      const stored = localStorage.getItem(`h_erp_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch (e) {
      console.error(e);
      return fallback;
    }
  };

  const [categories, setCategories] = useState(() => getStoredData('categories', INITIAL_CATEGORIES));
  const [units, setUnits] = useState(() => getStoredData('units', INITIAL_UNITS));
  const [brands, setBrands] = useState(() => getStoredData('brands', INITIAL_BRANDS));
  const [manufacturers, setManufacturers] = useState(() => getStoredData('manufacturers', INITIAL_MANUFACTURERS));
  const [vendors, setVendors] = useState(() => getStoredData('vendors', INITIAL_VENDORS));
  const [warehouses, setWarehouses] = useState(() => getStoredData('warehouses', INITIAL_WAREHOUSES));
  const [locations, setLocations] = useState(() => getStoredData('locations', INITIAL_LOCATIONS));
  const [items, setItems] = useState(() => getStoredData('items', INITIAL_ITEMS));
  const [batches, setBatches] = useState(() => getStoredData('batches', INITIAL_BATCHES));
  const [requisitions, setRequisitions] = useState(() => getStoredData('requisitions', INITIAL_REQUISITIONS));
  const [purchaseOrders, setPurchaseOrders] = useState(() => getStoredData('purchaseOrders', INITIAL_PURCHASE_ORDERS));
  const [grns, setGrns] = useState(() => getStoredData('grns', INITIAL_GRNS));
  const [transactions, setTransactions] = useState(() => getStoredData('transactions', INITIAL_TRANSACTIONS));
  const [issues, setIssues] = useState(() => getStoredData('issues', INITIAL_ISSUES));
  const [returns, setReturns] = useState(() => getStoredData('returns', INITIAL_RETURNS));
  const [auditLogs, setAuditLogs] = useState(() => getStoredData('auditLogs', INITIAL_AUDIT_LOGS));
  const [settings, setSettings] = useState(() => getStoredData('settings', INITIAL_SETTINGS));
  const [notifications, setNotifications] = useState([]);

  useEffect(() => { localStorage.setItem('h_erp_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('h_erp_units', JSON.stringify(units)); }, [units]);
  useEffect(() => { localStorage.setItem('h_erp_brands', JSON.stringify(brands)); }, [brands]);
  useEffect(() => { localStorage.setItem('h_erp_manufacturers', JSON.stringify(manufacturers)); }, [manufacturers]);
  useEffect(() => { localStorage.setItem('h_erp_vendors', JSON.stringify(vendors)); }, [vendors]);
  useEffect(() => { localStorage.setItem('h_erp_warehouses', JSON.stringify(warehouses)); }, [warehouses]);
  useEffect(() => { localStorage.setItem('h_erp_locations', JSON.stringify(locations)); }, [locations]);
  useEffect(() => { localStorage.setItem('h_erp_items', JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem('h_erp_batches', JSON.stringify(batches)); }, [batches]);
  useEffect(() => { localStorage.setItem('h_erp_requisitions', JSON.stringify(requisitions)); }, [requisitions]);
  useEffect(() => { localStorage.setItem('h_erp_purchaseOrders', JSON.stringify(purchaseOrders)); }, [purchaseOrders]);
  useEffect(() => { localStorage.setItem('h_erp_grns', JSON.stringify(grns)); }, [grns]);
  useEffect(() => { localStorage.setItem('h_erp_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('h_erp_issues', JSON.stringify(issues)); }, [issues]);
  useEffect(() => { localStorage.setItem('h_erp_returns', JSON.stringify(returns)); }, [returns]);
  useEffect(() => { localStorage.setItem('h_erp_auditLogs', JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('h_erp_settings', JSON.stringify(settings)); }, [settings]);

  const logAudit = (action, module, details) => {
    const newLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: 'Admin',
      action,
      module,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addNotification = (title, message, type = 'info') => {
    setNotifications(prev => [
      { id: `NOTIF-${Date.now()}`, title, message, type, date: new Date().toISOString(), read: false },
      ...prev
    ]);
  };

  useEffect(() => {
    if (!settings.enableNotifications) return;

    items.forEach(item => {
      const totalQty = batches
        .filter(b => b.itemId === item.id)
        .reduce((sum, b) => sum + b.qty, 0);

      if (totalQty <= item.reorderLevel) {
        addNotification(
          'Low Stock Warning',
          `Medicine "${item.name}" is below reorder level (Stock: ${totalQty}, Reorder Level: ${item.reorderLevel})`,
          'warning'
        );
      }
    });

    if (settings.enableExpiryAlerts) {
      const today = new Date();
      const threeMonthsAway = new Date();
      threeMonthsAway.setMonth(today.getMonth() + 3);

      batches.forEach(b => {
        const item = items.find(i => i.id === b.itemId);
        if (!item) return;

        const expDate = new Date(b.expiryDate);
        if (expDate <= today && b.qty > 0) {
          addNotification(
            'Batch Expired',
            `Batch "${b.batchNo}" of medicine "${item.name}" has expired on ${b.expiryDate}`,
            'danger'
          );
        } else if (expDate <= threeMonthsAway && b.qty > 0) {
          addNotification(
            'Batch Expiring Soon',
            `Batch "${b.batchNo}" of medicine "${item.name}" expires soon on ${b.expiryDate}`,
            'warning'
          );
        }
      });
    }
  }, [items, batches, settings.enableNotifications, settings.enableExpiryAlerts]);

  // Categories CRUD
  const saveCategory = (category) => {
    if (category.id) {
      setCategories(prev => prev.map(c => c.id === category.id ? category : c));
      logAudit('UPDATE', 'Categories', `Updated Category: ${category.name}`);
    } else {
      const newCat = { ...category, id: `CAT-${Date.now()}` };
      setCategories(prev => [...prev, newCat]);
      logAudit('CREATE', 'Categories', `Created Category: ${category.name}`);
    }
  };
  const deleteCategory = (id) => {
    const cat = categories.find(c => c.id === id);
    setCategories(prev => prev.filter(c => c.id !== id));
    logAudit('DELETE', 'Categories', `Deleted Category: ${cat?.name || id}`);
  };

  // Units CRUD
  const saveUnit = (unit) => {
    if (unit.id) {
      setUnits(prev => prev.map(u => u.id === unit.id ? unit : u));
      logAudit('UPDATE', 'Units', `Updated Unit: ${unit.name}`);
    } else {
      const newUnit = { ...unit, id: `UOM-${Date.now()}` };
      setUnits(prev => [...prev, newUnit]);
      logAudit('CREATE', 'Units', `Created Unit: ${unit.name}`);
    }
  };
  const deleteUnit = (id) => {
    const unit = units.find(u => u.id === id);
    setUnits(prev => prev.filter(u => u.id !== id));
    logAudit('DELETE', 'Units', `Deleted Unit: ${unit?.name || id}`);
  };

  // Brands CRUD
  const saveBrand = (brand) => {
    if (brand.id) {
      setBrands(prev => prev.map(b => b.id === brand.id ? brand : b));
      logAudit('UPDATE', 'Brands', `Updated Brand: ${brand.name}`);
    } else {
      const newBrd = { ...brand, id: `BRD-${Date.now()}` };
      setBrands(prev => [...prev, newBrd]);
      logAudit('CREATE', 'Brands', `Created Brand: ${brand.name}`);
    }
  };
  const deleteBrand = (id) => {
    const brand = brands.find(b => b.id === id);
    setBrands(prev => prev.filter(b => b.id !== id));
    logAudit('DELETE', 'Brands', `Deleted Brand: ${brand?.name || id}`);
  };

  // Manufacturers CRUD
  const saveManufacturer = (mfg) => {
    if (mfg.id) {
      setManufacturers(prev => prev.map(m => m.id === mfg.id ? mfg : m));
      logAudit('UPDATE', 'Manufacturers', `Updated Manufacturer: ${mfg.name}`);
    } else {
      const newMfg = { ...mfg, id: `MFG-${Date.now()}` };
      setManufacturers(prev => [...prev, newMfg]);
      logAudit('CREATE', 'Manufacturers', `Created Manufacturer: ${mfg.name}`);
    }
  };
  const deleteManufacturer = (id) => {
    const mfg = manufacturers.find(m => m.id === id);
    setManufacturers(prev => prev.filter(m => m.id !== id));
    logAudit('DELETE', 'Manufacturers', `Deleted Manufacturer: ${mfg?.name || id}`);
  };

  // Vendors CRUD
  const saveVendor = (vendor) => {
    if (vendor.id) {
      setVendors(prev => prev.map(v => v.id === vendor.id ? vendor : v));
      logAudit('UPDATE', 'Vendors', `Updated Vendor: ${vendor.name}`);
    } else {
      const newVend = { ...vendor, id: `VND-${Date.now()}`, rating: 5.0 };
      setVendors(prev => [...prev, newVend]);
      logAudit('CREATE', 'Vendors', `Created Vendor: ${vendor.name}`);
    }
  };
  const deleteVendor = (id) => {
    const vend = vendors.find(v => v.id === id);
    setVendors(prev => prev.filter(v => v.id !== id));
    logAudit('DELETE', 'Vendors', `Deleted Vendor: ${vend?.name || id}`);
  };

  // Warehouses CRUD
  const saveWarehouse = (wh) => {
    if (wh.id) {
      setWarehouses(prev => prev.map(w => w.id === wh.id ? wh : w));
      logAudit('UPDATE', 'Warehouses', `Updated Warehouse: ${wh.name}`);
    } else {
      const newWh = { ...wh, id: `WH-${Date.now()}` };
      setWarehouses(prev => [...prev, newWh]);
      logAudit('CREATE', 'Warehouses', `Created Warehouse: ${wh.name}`);
    }
  };
  const deleteWarehouse = (id) => {
    const wh = warehouses.find(w => w.id === id);
    setWarehouses(prev => prev.filter(w => w.id !== id));
    logAudit('DELETE', 'Warehouses', `Deleted Warehouse: ${wh?.name || id}`);
  };

  // Storage Locations CRUD
  const saveLocation = (loc) => {
    if (loc.id) {
      setLocations(prev => prev.map(l => l.id === loc.id ? loc : l));
      logAudit('UPDATE', 'Storage Locations', `Updated Storage Location: ${loc.name}`);
    } else {
      const newLoc = { ...loc, id: `LOC-${Date.now()}` };
      setLocations(prev => [...prev, newLoc]);
      logAudit('CREATE', 'Storage Locations', `Created Storage Location: ${loc.name}`);
    }
  };
  const deleteLocation = (id) => {
    const loc = locations.find(l => l.id === id);
    setLocations(prev => prev.filter(l => l.id !== id));
    logAudit('DELETE', 'Storage Locations', `Deleted Storage Location: ${loc?.name || id}`);
  };

  // Item Master CRUD
  const saveItem = (item) => {
    if (item.id) {
      setItems(prev => prev.map(i => i.id === item.id ? item : i));
      logAudit('UPDATE', 'Item Master', `Updated Item: ${item.name} (${item.code})`);
    } else {
      const suffix = String(items.length + 1).padStart(3, '0');
      const generatedCode = item.code || `${settings.itemCodePrefix}${suffix}`;
      const newItem = {
        ...item,
        id: `ITEM-${Date.now()}`,
        code: generatedCode,
        sku: item.sku || `SKU-${generatedCode}-${suffix}`,
        barcode: item.barcode || `890${Date.now().toString().slice(-10)}`,
        qrCode: item.qrCode || `QR-${generatedCode}`
      };
      setItems(prev => [...prev, newItem]);
      logAudit('CREATE', 'Item Master', `Created Item: ${newItem.name} (${newItem.code})`);
    }
  };
  const deleteItem = (id) => {
    const item = items.find(i => i.id === id);
    setItems(prev => prev.filter(i => i.id !== id));
    logAudit('DELETE', 'Item Master', `Deleted Item: ${item?.name || id}`);
  };

  // Requisitions Workflow
  const saveRequisition = (req) => {
    if (req.id) {
      setRequisitions(prev => prev.map(r => r.id === req.id ? req : r));
      logAudit('UPDATE', 'Purchase Requisition', `Updated Requisition: ${req.id}`);
    } else {
      const newReq = {
        ...req,
        id: `${settings.prCodePrefix}${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().split('T')[0],
        status: req.status || 'Pending',
        createdBy: 'Admin'
      };
      setRequisitions(prev => [newReq, ...prev]);
      logAudit('CREATE', 'Purchase Requisition', `Drafted Purchase Requisition: ${newReq.id}`);
    }
  };

  const approveRequisition = (id, itemsApproval) => {
    setRequisitions(prev => prev.map(r => {
      if (r.id === id) {
        const updatedItems = r.items.map(item => {
          const approvedInfo = itemsApproval.find(x => x.itemId === item.itemId);
          return {
            ...item,
            qtyApproved: approvedInfo ? Number(approvedInfo.qtyApproved) : item.qtyRequested
          };
        });
        return { ...r, status: 'Approved', approvedBy: 'Admin', items: updatedItems };
      }
      return r;
    }));
    logAudit('WORKFLOW', 'Purchase Requisition', `Approved Purchase Requisition: ${id}`);
    addNotification('Requisition Approved', `Requisition ${id} has been approved. Ready for PO.`, 'success');
  };

  const rejectRequisition = (id, reason) => {
    setRequisitions(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, status: 'Rejected', remarks: `${r.remarks || ''} [Rejected: ${reason}]` };
      }
      return r;
    }));
    logAudit('WORKFLOW', 'Purchase Requisition', `Rejected Purchase Requisition: ${id}`);
    addNotification('Requisition Rejected', `Requisition ${id} has been rejected.`, 'danger');
  };

  // Purchase Order Workflow
  const createPurchaseOrder = (poData) => {
    const newPO = {
      ...poData,
      id: `${settings.poCodePrefix}${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Sent',
      createdBy: 'Admin'
    };
    setPurchaseOrders(prev => [newPO, ...prev]);

    if (poData.requisitionId) {
      setRequisitions(prev => prev.map(r => r.id === poData.requisitionId ? { ...r, status: 'Ordered' } : r));
    }

    logAudit('CREATE', 'Purchase Order', `Generated Purchase Order: ${newPO.id}`);
    addNotification('Purchase Order Sent', `PO ${newPO.id} has been created and sent to vendor.`, 'success');
    return newPO;
  };

  // Goods Receipt Note (GRN) & Stock In
  const receiveGRN = (grnData) => {
    const newGRN = {
      ...grnData,
      id: `${settings.grnCodePrefix}${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      receivedBy: 'Admin'
    };

    setGrns(prev => [newGRN, ...prev]);

    if (grnData.purchaseOrderId) {
      setPurchaseOrders(prev => prev.map(p => p.id === grnData.purchaseOrderId ? { ...p, status: 'Received' } : p));
    }

    grnData.items.forEach(rcvItem => {
      const itemDef = items.find(i => i.id === rcvItem.itemId);
      if (!itemDef) return;

      const generatedBatchNo = rcvItem.batchNo || `BN-${Date.now().toString().slice(-4)}`;
      const batchExpiry = rcvItem.expiryDate || '2028-12-31';

      setBatches(prev => {
        const existingBatch = prev.find(b => b.itemId === rcvItem.itemId && b.batchNo === generatedBatchNo);
        if (existingBatch) {
          return prev.map(b => b.id === existingBatch.id ? { ...b, qty: b.qty + Number(rcvItem.qtyAccepted) } : b);
        } else {
          return [...prev, {
            id: `BAT-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            itemId: rcvItem.itemId,
            batchNo: generatedBatchNo,
            warehouseId: grnData.warehouseId || 'WH-001',
            locationId: itemDef.locationId || 'LOC-001',
            qty: Number(rcvItem.qtyAccepted),
            expiryDate: batchExpiry,
            qcStatus: 'Passed'
          }];
        }
      });

      const newTxn = {
        id: `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type: 'Stock In',
        date: new Date().toISOString(),
        reference: newGRN.id,
        warehouseId: grnData.warehouseId || 'WH-001',
        itemId: rcvItem.itemId,
        batchNo: generatedBatchNo,
        qty: Number(rcvItem.qtyAccepted),
        remarks: `Received via Goods Receipt: ${newGRN.id}`
      };
      setTransactions(prev => [newTxn, ...prev]);
    });

    logAudit('CREATE', 'Goods Receipt Note', `Received goods on GRN: ${newGRN.id}`);
    addNotification('Goods Received', `GRN ${newGRN.id} created. Stock quantities updated.`, 'success');
  };

  // Manual Stock Transactions
  const adjustStock = (itemId, batchNo, warehouseId, qtyDifference, remarks) => {
    setBatches(prev => prev.map(b => {
      if (b.itemId === itemId && b.batchNo === batchNo && b.warehouseId === warehouseId) {
        return { ...b, qty: Math.max(0, b.qty + qtyDifference) };
      }
      return b;
    }));

    const newTxn = {
      id: `TXN-${Date.now()}`,
      type: 'Stock Adjustment',
      date: new Date().toISOString(),
      reference: 'ADJ-MANUAL',
      warehouseId,
      itemId,
      batchNo,
      qty: qtyDifference,
      remarks: remarks || 'Manual stock adjustment'
    };
    setTransactions(prev => [newTxn, ...prev]);

    logAudit('STOCK', 'Stock Adjustment', `Adjusted item stock (ID: ${itemId}, Diff: ${qtyDifference})`);
  };

  const transferStock = (itemId, batchNo, fromWhId, toWhId, qty, remarks) => {
    let batchInfo = null;
    setBatches(prev => prev.map(b => {
      if (b.itemId === itemId && b.batchNo === batchNo && b.warehouseId === fromWhId) {
        batchInfo = b;
        return { ...b, qty: Math.max(0, b.qty - qty) };
      }
      return b;
    }));

    if (!batchInfo) return;

    setBatches(prev => {
      const existing = prev.find(b => b.itemId === itemId && b.batchNo === batchNo && b.warehouseId === toWhId);
      if (existing) {
        return prev.map(b => b.id === existing.id ? { ...b, qty: b.qty + qty } : b);
      } else {
        return [...prev, {
          id: `BAT-${Date.now()}`,
          itemId,
          batchNo,
          warehouseId: toWhId,
          locationId: 'LOC-004',
          qty,
          expiryDate: batchInfo.expiryDate,
          qcStatus: 'Passed'
        }];
      }
    });

    const newTxnOut = {
      id: `TXN-${Date.now()}-1`,
      type: 'Stock Out',
      date: new Date().toISOString(),
      reference: 'TRANSFER',
      warehouseId: fromWhId,
      itemId,
      batchNo,
      qty: -qty,
      remarks: `Transferred to ${toWhId}: ${remarks || ''}`
    };
    const newTxnIn = {
      id: `TXN-${Date.now()}-2`,
      type: 'Stock In',
      date: new Date().toISOString(),
      reference: 'TRANSFER',
      warehouseId: toWhId,
      itemId,
      batchNo,
      qty,
      remarks: `Transferred from ${fromWhId}: ${remarks || ''}`
    };

    setTransactions(prev => [newTxnOut, newTxnIn, ...prev]);
    logAudit('STOCK', 'Stock Transfer', `Transferred qty ${qty} of batch ${batchNo} from WH ${fromWhId} to WH ${toWhId}`);
  };

  // Issue Stock to Departments
  const issueStock = (issueData) => {
    const newIssue = {
      ...issueData,
      id: `ISS-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Issued',
      issuedBy: 'Admin'
    };

    setIssues(prev => [newIssue, ...prev]);

    issueData.items.forEach(itm => {
      setBatches(prev => prev.map(b => {
        if (b.itemId === itm.itemId && b.batchNo === itm.batchNo) {
          return { ...b, qty: Math.max(0, b.qty - itm.qty) };
        }
        return b;
      }));

      const newTxn = {
        id: `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type: 'Issue Out',
        date: new Date().toISOString(),
        reference: newIssue.id,
        warehouseId: 'WH-001',
        itemId: itm.itemId,
        batchNo: itm.batchNo,
        qty: -itm.qty,
        remarks: `Issued to department ${issueData.department}`
      };
      setTransactions(prev => [newTxn, ...prev]);
    });

    logAudit('OPERATIONS', 'Issue Management', `Issued stock on ticket: ${newIssue.id} to ${issueData.department}`);
    addNotification('Stock Issued', `Medicines issued to ${issueData.department}.`, 'info');
  };

  // Returns Management
  const returnStock = (returnData) => {
    const newReturn = {
      ...returnData,
      id: `RET-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
      returnedBy: 'Admin'
    };

    setReturns(prev => [newReturn, ...prev]);

    returnData.items.forEach(itm => {
      if (returnData.type === 'Return from Department') {
        setBatches(prev => {
          const exists = prev.find(b => b.itemId === itm.itemId && b.batchNo === itm.batchNo);
          if (exists) {
            return prev.map(b => b.id === exists.id ? { ...b, qty: b.qty + itm.qty } : b);
          } else {
            return [...prev, {
              id: `BAT-${Date.now()}`,
              itemId: itm.itemId,
              batchNo: itm.batchNo,
              warehouseId: 'WH-001',
              locationId: 'LOC-001',
              qty: itm.qty,
              expiryDate: '2028-12-31',
              qcStatus: 'Passed'
            }];
          }
        });

        setTransactions(prev => [{
          id: `TXN-${Date.now()}`,
          type: 'Stock In',
          date: new Date().toISOString(),
          reference: newReturn.id,
          warehouseId: 'WH-001',
          itemId: itm.itemId,
          batchNo: itm.batchNo,
          qty: itm.qty,
          remarks: `Returned from dept: ${returnData.partyName}`
        }, ...prev]);
      } else {
        setBatches(prev => prev.map(b => {
          if (b.itemId === itm.itemId && b.batchNo === itm.batchNo) {
            return { ...b, qty: Math.max(0, b.qty - itm.qty) };
          }
          return b;
        }));

        setTransactions(prev => [{
          id: `TXN-${Date.now()}`,
          type: 'Stock Out',
          date: new Date().toISOString(),
          reference: newReturn.id,
          warehouseId: 'WH-001',
          itemId: itm.itemId,
          batchNo: itm.batchNo,
          qty: -itm.qty,
          remarks: `Returned to Vendor: ${returnData.partyName}`
        }, ...prev]);
      }
    });

    logAudit('OPERATIONS', 'Return Management', `Processed return ${newReturn.id} (${returnData.type})`);
    addNotification('Return Logged', `Return ticket ${newReturn.id} processed successfully.`, 'info');
  };

  const importItems = (importedList) => {
    importedList.forEach(item => {
      saveItem(item);
    });
    addNotification('Import Successful', `${importedList.length} items imported to Item Master.`, 'success');
  };

  return (
    <InventoryContext.Provider value={{
      categories, saveCategory, deleteCategory,
      units, saveUnit, deleteUnit,
      brands, saveBrand, deleteBrand,
      manufacturers, saveManufacturer, deleteManufacturer,
      vendors, saveVendor, deleteVendor,
      warehouses, saveWarehouse, deleteWarehouse,
      locations, saveLocation, deleteLocation,
      items, saveItem, deleteItem, importItems,
      batches, setBatches,
      requisitions, saveRequisition, approveRequisition, rejectRequisition,
      purchaseOrders, createPurchaseOrder,
      grns, receiveGRN,
      transactions, adjustStock, transferStock,
      issues, issueStock,
      returns, returnStock,
      auditLogs, logAudit,
      settings, setSettings,
      notifications, setNotifications
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
