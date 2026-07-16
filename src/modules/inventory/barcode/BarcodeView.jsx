import React, { useState } from 'react';
import { Printer, Grid, Barcode } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import BarcodeGenerator from '../shared/BarcodeGenerator';
import QrGenerator from '../shared/QrGenerator';
import { FormGroup, FormSelect, FormInput } from '../shared/FormFields';

export default function BarcodeView() {
  const { items, batches } = useInventory();
  
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedBatchNo, setSelectedBatchNo] = useState('');
  const [labelType, setLabelType] = useState('barcode'); // barcode, qr
  const [gridCols, setGridCols] = useState('3');
  const [labelCount, setLabelCount] = useState('12');

  const filteredBatches = batches.filter(b => b.itemId === selectedItemId);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const selectedItem = items.find(i => i.id === selectedItemId);
    const labelCode = labelType === 'barcode' 
      ? (selectedBatchNo || selectedItem?.code || 'ITEM') 
      : (selectedItem?.qrCode || selectedItem?.code || 'QR');

    const labelsHtml = Array.from({ length: Number(labelCount) }).map((_, idx) => `
      <div style="border: 1px dashed #ccc; padding: 12px; display: flex; flex-col; items-center; justify-content: center; text-align: center; font-family: monospace; break-inside: avoid;">
        <div style="font-size: 10px; font-weight: bold; margin-bottom: 5px; truncate; max-width: 150px;">${selectedItem?.name || 'Medicine'}</div>
        ${labelType === 'barcode' 
          ? `<div style="display: flex; justify-content: center; transform: scale(0.9);">${drawPseudoBarcodeHtml(labelCode)}</div>` 
          : `<div style="display: flex; justify-content: center; margin: 4px 0;">${drawPseudoQrHtml(labelCode)}</div>`
        }
        <div style="font-size: 8px; color: #666; margin-top: 5px;">Lot: ${selectedBatchNo || 'N/A'}</div>
      </div>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Labels</title>
          <style>
            @page { size: auto; margin: 15mm; }
            body { margin: 0; font-family: sans-serif; }
            .grid-container {
              display: grid;
              grid-template-columns: repeat(${gridCols}, 1fr);
              gap: 15px;
            }
          </style>
        </head>
        <body>
          <h3 style="text-align: center; margin-bottom: 20px; font-size: 14px;">PRINTED BARCODE/QR SHEET</h3>
          <div class="grid-container">
            ${labelsHtml}
          </div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Pseudo drawers for print HTML
  const drawPseudoBarcodeHtml = (val) => {
    return `<div style="display: flex; flex-direction: column; align-items: center;">
      <div style="display: flex; height: 35px; background: black; width: 110px; justify-content: space-between; overflow: hidden; opacity: 0.95;">
        ${Array.from({ length: 18 }).map((_, i) => `<div style="width: ${i % 3 === 0 ? '4px' : i % 2 === 0 ? '1px' : '2px'}; background: black; height: 100%;"></div>`).join('')}
      </div>
      <span style="font-size: 8px; font-weight: bold; margin-top: 2px;">${val}</span>
    </div>`;
  };

  const drawPseudoQrHtml = (val) => {
    return `<div style="display: flex; flex-direction: column; align-items: center;">
      <div style="width: 50px; height: 50px; border: 1.5px solid black; padding: 2px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: white;">
        <div style="background: black;"></div><div style="background: black;"></div><div style="background: white;"></div><div style="background: black;"></div><div style="background: black;"></div>
        <div style="background: black;"></div><div style="background: white;"></div><div style="background: black;"></div><div style="background: white;"></div><div style="background: black;"></div>
        <div style="background: white;"></div><div style="background: black;"></div><div style="background: white;"></div><div style="background: black;"></div><div style="background: white;"></div>
        <div style="background: black;"></div><div style="background: white;"></div><div style="background: black;"></div><div style="background: black;"></div><div style="background: white;"></div>
        <div style="background: black;"></div><div style="background: black;"></div><div style="background: white;"></div><div style="background: white;"></div><div style="background: black;"></div>
      </div>
      <span style="font-size: 8px; font-weight: bold; margin-top: 2px; font-family: monospace;">${val}</span>
    </div>`;
  };

  const selectedItem = items.find(i => i.id === selectedItemId);
  const labelCode = selectedItem 
    ? (labelType === 'barcode' ? (selectedBatchNo || selectedItem.code) : selectedItem.qrCode)
    : 'SAMPLE';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Configuration Panel */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm max-h-fit">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Grid className="w-4 h-4 text-primary" />
          Label Layout Configuration
        </h3>

        <FormGroup label="Select Medicine/Item" required>
          <FormSelect value={selectedItemId} onChange={(e) => { setSelectedItemId(e.target.value); setSelectedBatchNo(''); }}>
            <option value="">Select Item</option>
            {items.map(itm => (
              <option key={itm.id} value={itm.id}>{itm.name} ({itm.code})</option>
            ))}
          </FormSelect>
        </FormGroup>

        <FormGroup label="Filter by Batch (Optional)">
          <FormSelect value={selectedBatchNo} onChange={(e) => setSelectedBatchNo(e.target.value)} disabled={!selectedItemId}>
            <option value="">No specific batch (Print Item Code)</option>
            {filteredBatches.map(b => (
              <option key={b.id} value={b.batchNo}>{b.batchNo} (Qty: {b.qty})</option>
            ))}
          </FormSelect>
        </FormGroup>

        <FormGroup label="Code Format Type">
          <FormSelect value={labelType} onChange={(e) => setLabelType(e.target.value)}>
            <option value="barcode">1D Linear Barcode</option>
            <option value="qr">2D Matrix QR Code</option>
          </FormSelect>
        </FormGroup>

        <div className="grid grid-cols-2 gap-4">
          <FormGroup label="Grid Columns">
            <FormSelect value={gridCols} onChange={(e) => setGridCols(e.target.value)}>
              <option value="2">2 Columns</option>
              <option value="3">3 Columns</option>
              <option value="4">4 Columns</option>
            </FormSelect>
          </FormGroup>

          <FormGroup label="Label Count">
            <FormInput type="number" min="1" max="48" value={labelCount} onChange={(e) => setLabelCount(e.target.value)} />
          </FormGroup>
        </div>

        <button
          onClick={handlePrint}
          disabled={!selectedItemId}
          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Printer className="w-4 h-4" />
          Print Label Sheet
        </button>
      </div>

      {/* Live Preview Panel */}
      <div className="lg:col-span-2 bg-card/40 border border-border rounded-xl p-5 flex flex-col min-h-[350px]">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4 border-b pb-2">
          <Barcode className="w-4 h-4 text-primary" />
          Label Live Print Preview
        </h3>

        <div className="flex-1 flex items-center justify-center p-4 bg-muted/20 border border-dashed rounded-lg">
          {!selectedItemId ? (
            <p className="text-xs text-muted-foreground italic">Choose an item to generate a live print preview sheet.</p>
          ) : (
            <div className="space-y-4 text-center max-w-sm p-4 bg-card border border-border rounded-xl shadow-md">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase">Target Layout Preview</span>
              <p className="text-xs font-bold text-foreground truncate mt-1">{selectedItem?.name}</p>
              
              <div className="flex justify-center p-3 bg-white text-black border rounded-lg shadow-inner">
                {labelType === 'barcode' ? (
                  <BarcodeGenerator value={labelCode} />
                ) : (
                  <QrGenerator value={labelCode} size={110} />
                )}
              </div>

              <div className="text-[9px] font-semibold text-muted-foreground bg-muted/40 p-2 rounded-lg mt-2">
                Format: {labelType === 'barcode' ? 'Code-128 Linear' : 'QR-Code Matrix'}<br />
                Target Value: <span className="font-mono text-foreground font-bold">{labelCode}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
