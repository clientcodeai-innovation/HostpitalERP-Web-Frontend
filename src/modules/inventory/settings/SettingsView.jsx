import React, { useState } from 'react';
import { Settings, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { FormGroup, FormInput, FormCheckbox } from '../shared/FormFields';

export default function SettingsView() {
  const { settings, setSettings, logAudit } = useInventory();
  
  const [formData, setFormData] = useState({
    reorderAlertThreshold: settings.reorderAlertThreshold || 20,
    autoApprovalThreshold: settings.autoApprovalThreshold || 10000,
    prCodePrefix: settings.prCodePrefix || 'PR-',
    poCodePrefix: settings.poCodePrefix || 'PO-',
    grnCodePrefix: settings.grnCodePrefix || 'GRN-',
    itemCodePrefix: settings.itemCodePrefix || 'ITEM-',
    batchCodePrefix: settings.batchCodePrefix || 'BN-',
    enableNotifications: settings.enableNotifications !== false,
    enableExpiryAlerts: settings.enableExpiryAlerts !== false
  });

  const [toastMessage, setToastMessage] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSettings(formData);
    logAudit('UPDATE', 'Settings', 'Modified global inventory parameters');
    
    setToastMessage('Settings updated successfully!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {toastMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-xl animate-in zoom-in-95">
          {toastMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-sm">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2 border-b pb-2">
          <Settings className="w-4 h-4 text-primary shrink-0" />
          Inventory Administration Panel
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Reorder Buffer Margin %">
            <FormInput
              type="number"
              value={formData.reorderAlertThreshold}
              onChange={(e) => setFormData(prev => ({ ...prev, reorderAlertThreshold: Number(e.target.value) }))}
            />
          </FormGroup>

          <FormGroup label="PR Auto-Approval Limit (₹)">
            <FormInput
              type="number"
              value={formData.autoApprovalThreshold}
              onChange={(e) => setFormData(prev => ({ ...prev, autoApprovalThreshold: Number(e.target.value) }))}
            />
          </FormGroup>
        </div>

        <div className="space-y-4 border-t pt-4">
          <h4 className="text-xs font-bold text-foreground">Auto-code numbering prefixes</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            <FormGroup label="Requisition prefix">
              <FormInput value={formData.prCodePrefix} onChange={(e) => setFormData(prev => ({ ...prev, prCodePrefix: e.target.value }))} />
            </FormGroup>
            
            <FormGroup label="Purchase Order prefix">
              <FormInput value={formData.poCodePrefix} onChange={(e) => setFormData(prev => ({ ...prev, poCodePrefix: e.target.value }))} />
            </FormGroup>

            <FormGroup label="Receipt prefix">
              <FormInput value={formData.grnCodePrefix} onChange={(e) => setFormData(prev => ({ ...prev, grnCodePrefix: e.target.value }))} />
            </FormGroup>

            <FormGroup label="Item Code prefix">
              <FormInput value={formData.itemCodePrefix} onChange={(e) => setFormData(prev => ({ ...prev, itemCodePrefix: e.target.value }))} />
            </FormGroup>

            <FormGroup label="Batch Code prefix">
              <FormInput value={formData.batchCodePrefix} onChange={(e) => setFormData(prev => ({ ...prev, batchCodePrefix: e.target.value }))} />
            </FormGroup>
          </div>
        </div>

        <div className="space-y-3.5 border-t pt-4">
          <h4 className="text-xs font-bold text-foreground">Notification alert toggles</h4>
          <div className="flex flex-col gap-2">
            <FormCheckbox
              label="Enable Real-Time Low Stock Warning Alerts"
              checked={formData.enableNotifications}
              onChange={(e) => setFormData(prev => ({ ...prev, enableNotifications: e.target.checked }))}
            />

            <FormCheckbox
              label="Enable Batch Expiration Risk Alerts"
              checked={formData.enableExpiryAlerts}
              onChange={(e) => setFormData(prev => ({ ...prev, enableExpiryAlerts: e.target.checked }))}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
