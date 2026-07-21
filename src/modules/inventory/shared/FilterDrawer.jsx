import React, { useEffect } from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';

export default function FilterDrawer({
  isOpen = false,
  onClose,
  children,
  onApply,
  onReset,
  width = 'sm'
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-xs',
    md: 'max-w-md',
    lg: 'max-w-lg'
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`relative w-full ${widthClasses[width] || widthClasses.sm} bg-card text-card-foreground border-l border-border h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Advanced Filters</h3>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted p-1 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 scrollbar-thin">
          {children}
        </div>

        <div className="border-t border-border px-5 py-3.5 bg-muted/30 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              if (onReset) onReset();
            }}
            className="px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted border border-border rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            type="button"
            onClick={() => {
              if (onApply) onApply();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/95 rounded-lg shadow-sm transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
