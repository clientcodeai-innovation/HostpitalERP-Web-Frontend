import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function DrawerForm({
  isOpen = false,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  width = 'md', // sm, md, lg
  loading = false
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
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
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
        className={`relative w-full ${widthClasses[width] || widthClasses.md} bg-card text-card-foreground border-l border-border h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-base font-bold text-foreground">{title}</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted p-1.5 rounded-full transition-colors"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) onSubmit(e);
          }}
          className="flex-1 flex flex-col min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin">
            {children}
          </div>

          <div className="border-t border-border px-6 py-4 bg-muted/30 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted border border-border rounded-lg transition-colors"
              disabled={loading}
            >
              {cancelLabel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/95 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 min-w-[70px]"
              disabled={loading}
            >
              {loading && <div className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />}
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
