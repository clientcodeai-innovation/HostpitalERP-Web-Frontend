import React, { useState } from 'react';
import { Upload, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';
import Modal from './Modal';
import FileUpload from './FileUpload';

export default function ImportButton({
  onImport,
  templateHeaders = [],
  sampleRows = [],
  title = 'Import Records',
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [importedData, setImportedData] = useState([]);
  const [successCount, setSuccessCount] = useState(0);

  const handleFileSelect = (file) => {
    if (!file) {
      setImportedData([]);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split(/\r?\n/).filter(row => row.trim());
      if (rows.length <= 1) return;

      const headers = rows[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
      const dataRows = rows.slice(1).map(rowLine => {
        // Handle commas inside double quotes
        const values = [];
        let insideQuote = false;
        let currentValue = '';
        for (let i = 0; i < rowLine.length; i++) {
          const char = rowLine[i];
          if (char === '"') {
            insideQuote = !insideQuote;
          } else if (char === ',' && !insideQuote) {
            values.push(currentValue.trim());
            currentValue = '';
          } else {
            currentValue += char;
          }
        }
        values.push(currentValue.trim());

        // Map headers to values
        const rowObj = {};
        headers.forEach((h, index) => {
          let cleanVal = (values[index] || '').replace(/^"|"$/g, '');
          rowObj[h] = cleanVal;
        });
        return rowObj;
      });

      setImportedData(dataRows);
    };
    reader.readAsText(file);
  };

  const handleDownloadTemplate = () => {
    const csvContent = [
      templateHeaders.join(','),
      ...sampleRows.map(row => templateHeaders.map(h => `"${row[h] || ''}"`).join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `import_template.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const executeImport = () => {
    if (onImport && importedData.length > 0) {
      onImport(importedData);
      setSuccessCount(importedData.length);
      setTimeout(() => {
        setIsOpen(false);
        setImportedData([]);
        setSuccessCount(0);
      }, 1500);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-1.5 px-3.5 py-2 border border-border bg-card text-foreground hover:bg-muted text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer select-none ${className}`}
      >
        <Upload className="w-3.5 h-3.5" />
        Import
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} size="md">
        <div className="space-y-5">
          <div className="flex items-start justify-between p-3.5 bg-muted/40 rounded-xl border border-border">
            <div className="flex gap-2.5">
              <HelpCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground">Import Guide</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                  Make sure your CSV contains columns matching the system's requirements. Download our template to get started.
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadTemplate}
              className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 bg-primary/10 rounded-lg shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              Get Template
            </button>
          </div>

          <FileUpload accept=".csv" onFileSelect={handleFileSelect} label="Upload CSV Import File" />

          {successCount > 0 ? (
            <div className="flex items-center gap-2.5 p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-in zoom-in-95">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              Successfully imported {successCount} records!
            </div>
          ) : importedData.length > 0 ? (
            <div className="space-y-3">
              <div className="text-xs font-bold text-muted-foreground">
                Found <span className="text-foreground">{importedData.length} records</span> ready to import:
              </div>
              <div className="max-h-40 overflow-y-auto border border-border rounded-lg text-xs bg-muted/20 divide-y divide-border">
                {importedData.slice(0, 5).map((row, index) => (
                  <div key={index} className="p-2 font-medium truncate">
                    {row.name || row.code || Object.values(row)[0] || `Row ${index + 1}`}
                  </div>
                ))}
                {importedData.length > 5 && (
                  <div className="p-2 text-center text-muted-foreground font-semibold bg-muted/40">
                    + {importedData.length - 5} more rows...
                  </div>
                )}
              </div>
            </div>
          ) : null}

          <div className="flex justify-end gap-2.5 border-t pt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted"
            >
              Close
            </button>
            <button
              disabled={importedData.length === 0 || successCount > 0}
              onClick={executeImport}
              className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-xs rounded-lg shadow-sm hover:bg-primary/95 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Execute Import
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
