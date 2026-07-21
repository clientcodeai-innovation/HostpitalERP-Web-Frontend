import React, { useState, useRef, useEffect } from 'react';
import { Download, FileSpreadsheet, FileText, Printer, ChevronDown } from 'lucide-react';

export default function ExportButton({
  data = [],
  filename = 'inventory-report',
  headers = [], // [{ label: 'Name', key: 'name' }]
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format data to CSV
  const convertToCSV = (arr) => {
    const headerRow = headers.map(h => `"${h.label}"`).join(',');
    const rows = arr.map(row =>
      headers.map(h => {
        const val = row[h.key] === undefined || row[h.key] === null ? '' : row[h.key];
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(',')
    );
    return [headerRow, ...rows].join('\r\n');
  };

  // Trigger file download
  const downloadFile = (content, mimeType, fileExtension) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handleExportCSV = () => {
    const csvContent = convertToCSV(data);
    downloadFile(csvContent, 'text/csv;charset=utf-8;', '.csv');
  };

  const handleExportExcel = () => {
    // Generate simple XML spreadsheet representation or tsv
    const tsvContent = convertToCSV(data).replace(/,/g, '\t');
    downloadFile(tsvContent, 'application/vnd.ms-excel;charset=utf-8;', '.xls');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const tableHeader = headers.map(h => `<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">${h.label}</th>`).join('');
    const tableRows = data.map(row => 
      `<tr>${headers.map(h => {
        const val = row[h.key] === undefined || row[h.key] === null ? '' : row[h.key];
        return `<td style="border: 1px solid #ddd; padding: 8px;">${val}</td>`;
      }).join('')}</tr>`
    ).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>${filename}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            h2 { margin-bottom: 5px; }
            p { font-size: 12px; color: #666; margin-top: 0; }
          </style>
        </head>
        <body>
          <h2>${filename.replace(/-/g, ' ').toUpperCase()}</h2>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead><tr>${tableHeader}</tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-border bg-card text-foreground hover:bg-muted text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer select-none"
      >
        <Download className="w-3.5 h-3.5" />
        Export
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1.5 w-40 bg-card text-card-foreground rounded-lg border border-border shadow-md divide-y divide-border animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="p-1">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-md text-xs font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground select-none"
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              Export to CSV
            </button>
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-md text-xs font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground select-none"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
              Export to Excel
            </button>
          </div>
          <div className="p-1">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-md text-xs font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground select-none"
            >
              <Printer className="w-3.5 h-3.5 text-purple-500" />
              Print PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
