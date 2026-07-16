import React, { useState } from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import {
  LayoutDashboard,
  FolderOpen,
  ClipboardList,
  Layers,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  History,
  Settings as SettingsIcon,
  Bell,
  Box,
  Truck,
  Building,
  MapPin,
  Tag,
  Hammer,
  Barcode,
  ArrowRightLeft,
  ShieldCheck,
  CalendarRange,
  Inbox,
  Undo2,
  ListFilter
} from 'lucide-react';

// Context
import { InventoryProvider, useInventory } from '../context/InventoryContext';

// Views
import DashboardView from '../dashboard/DashboardView';
import ItemMasterView from '../item-master/ItemMasterView';
import CategoryView from '../categories/CategoryView';
import UnitsView from '../units/UnitsView';
import BrandView from '../brands/BrandView';
import ManufacturerView from '../manufacturers/ManufacturerView';
import VendorView from '../vendors/VendorView';
import WarehouseView from '../warehouses/WarehouseView';
import StorageLocationView from '../storage-locations/StorageLocationView';
import PurchaseRequisitionView from '../purchase/PurchaseRequisitionView';
import PurchaseOrderView from '../purchase/PurchaseOrderView';
import GrnView from '../purchase/GrnView';
import CurrentStockView from '../stock/CurrentStockView';
import StockInOutView from '../stock/StockInOutView';
import StockAdjustmentView from '../stock/StockAdjustmentView';
import StockTransferView from '../stock/StockTransferView';
import BatchManagementView from '../batch-management/BatchManagementView';
import ExpiryManagementView from '../expiry-management/ExpiryManagementView';
import IssueManagementView from '../issue-management/IssueManagementView';
import ReturnManagementView from '../return-management/ReturnManagementView';
import BarcodeView from '../barcode/BarcodeView';
import ReportsView from '../reports/ReportsView';
import AnalyticsView from '../analytics/AnalyticsView';
import NotificationsView from '../notifications/NotificationsView';
import AuditLogsView from '../audit-logs/AuditLogsView';
import SettingsView from '../settings/SettingsView';

function InventoryShell() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [navCollapsed, setNavCollapsed] = useState(false);
  const { notifications } = useInventory();

  // Tab Groups definition
  const groups = [
    {
      title: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp }
      ]
    },
    {
      title: 'Catalog Master',
      items: [
        { id: 'item-master', label: 'Item Master', icon: Box }
      ]
    },
    {
      title: 'Procurement Workflow',
      items: [
        { id: 'purchase-requisition', label: 'Requisitions (PR)', icon: ClipboardList },
        { id: 'purchase-order', label: 'Purchase Orders (PO)', icon: ListFilter },
        { id: 'grn', label: 'Receipt Notes (GRN)', icon: Inbox }
      ]
    },
    {
      title: 'Stock Ledger',
      items: [
        { id: 'current-stock', label: 'Current Stock', icon: Layers },
        { id: 'stock-in-out', label: 'Stock Transactions', icon: ArrowRightLeft },
        { id: 'stock-adjustment', label: 'Stock Adjustment', icon: Hammer },
        { id: 'stock-transfer', label: 'Stock Transfer', icon: ArrowRightLeft }
      ]
    },
    {
      title: 'Operations',
      items: [
        { id: 'batch-management', label: 'Batch Management', icon: ShieldCheck },
        { id: 'expiry-management', label: 'Expiry Management', icon: CalendarRange },
        { id: 'issue-management', label: 'Issue to Ward', icon: ArrowRightLeft },
        { id: 'return-management', label: 'Return Management', icon: Undo2 }
      ]
    },
    {
      title: 'Master Setup',
      items: [
        { id: 'categories', label: 'Categories', icon: FolderOpen },
        { id: 'units', label: 'Units (UOM)', icon: Tag },
        { id: 'brands', label: 'Brands', icon: Tag },
        { id: 'manufacturers', label: 'Manufacturers', icon: Building },
        { id: 'vendors', label: 'Vendors', icon: Truck },
        { id: 'warehouses', label: 'Warehouses', icon: Building },
        { id: 'storage-locations', label: 'Storage Locations', icon: MapPin }
      ]
    },
    {
      title: 'System Utilities',
      items: [
        { id: 'barcode', label: 'Barcode & QR Labeller', icon: Barcode },
        { id: 'reports', label: 'Reports', icon: ClipboardList },
        { id: 'notifications', label: 'Alert Center', icon: Bell, badge: notifications.length },
        { id: 'audit-logs', label: 'Audit Trail Logs', icon: History },
        { id: 'settings', label: 'Inventory Settings', icon: SettingsIcon }
      ]
    }
  ];

  // Render active view
  const renderActiveView = () => {
    switch (activeTab) {
      case 'item-master':
        return <ItemMasterView />;
      case 'categories':
        return <CategoryView />;
      case 'units':
        return <UnitsView />;
      case 'brands':
        return <BrandView />;
      case 'manufacturers':
        return <ManufacturerView />;
      case 'vendors':
        return <VendorView />;
      case 'warehouses':
        return <WarehouseView />;
      case 'storage-locations':
        return <StorageLocationView />;
      case 'purchase-requisition':
        return <PurchaseRequisitionView />;
      case 'purchase-order':
        return <PurchaseOrderView />;
      case 'grn':
        return <GrnView />;
      case 'current-stock':
        return <CurrentStockView onNavigateToPr={() => setActiveTab('purchase-requisition')} />;
      case 'stock-in-out':
        return <StockInOutView />;
      case 'stock-adjustment':
        return <StockAdjustmentView />;
      case 'stock-transfer':
        return <StockTransferView />;
      case 'batch-management':
        return <BatchManagementView />;
      case 'expiry-management':
        return <ExpiryManagementView />;
      case 'issue-management':
        return <IssueManagementView />;
      case 'return-management':
        return <ReturnManagementView />;
      case 'barcode':
        return <BarcodeView />;
      case 'reports':
        return <ReportsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'audit-logs':
        return <AuditLogsView />;
      case 'settings':
        return <SettingsView />;
      case 'dashboard':
      default:
        return <DashboardView onNavigateToSection={setActiveTab} />;
    }
  };

  const getBreadcrumbLabel = () => {
    for (const group of groups) {
      const match = group.items.find(item => item.id === activeTab);
      if (match) return match.label;
    }
    return 'Dashboard';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory Module"
        description="Comprehensive clinical inventory, pharmacy batch traceability, purchase requisitions, orders, and audits."
        breadcrumbs={[{ label: 'Inventory' }, { label: getBreadcrumbLabel() }]}
      />

      <div className="flex flex-col lg:flex-row gap-5 min-h-[580px] items-stretch">
        
        {/* Module Sub-Navigation sidebar */}
        <div className={`shrink-0 transition-all duration-300 ${navCollapsed ? 'w-14' : 'w-60'} flex flex-col bg-card/65 backdrop-blur-md rounded-2xl border border-border p-2.5 space-y-4`}>
          <div className="flex items-center justify-between border-b pb-2 px-1">
            {!navCollapsed && <span className="text-[10px] font-black text-primary uppercase tracking-wider">Inventory Modules</span>}
            <button
              onClick={() => setNavCollapsed(!navCollapsed)}
              className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer ml-auto"
            >
              {navCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[600px] space-y-4 scrollbar-thin pr-0.5">
            {groups.map((group, idx) => (
              <div key={idx} className="space-y-1">
                {!navCollapsed && (
                  <h4 className="text-[9px] font-extrabold text-muted-foreground/60 uppercase tracking-widest px-2 mb-1">
                    {group.title}
                  </h4>
                )}
                <ul className="space-y-0.5">
                  {group.items.map(item => {
                    const isSelected = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all duration-150 select-none cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-primary-foreground shadow-sm scale-102 font-bold'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          } ${navCollapsed ? 'justify-center' : ''}`}
                          title={navCollapsed ? item.label : undefined}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'animate-pulse' : ''}`} />
                          {!navCollapsed && <span className="truncate">{item.label}</span>}
                          {!navCollapsed && item.badge > 0 && (
                            <span className="ml-auto bg-rose-500 text-white font-bold text-[9px] px-1.5 py-0.25 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace Display Area */}
        <div className="flex-1 min-w-0 bg-card/25 backdrop-blur-md rounded-2xl border border-border p-5 shadow-xs transition-all duration-300">
          {renderActiveView()}
        </div>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  return (
    <InventoryProvider>
      <InventoryShell />
    </InventoryProvider>
  );
}
