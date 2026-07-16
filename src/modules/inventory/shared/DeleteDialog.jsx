import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';

export default function DeleteDialog({
  isOpen = false,
  onClose,
  onConfirm,
  title = 'Delete Record',
  message = 'Are you sure you want to permanently delete this record? This action cannot be undone.',
  loading = false
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-5 py-2">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center shrink-0 text-destructive shadow-xs">
            <AlertTriangle className="w-5.5 h-5.5 animate-bounce" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Critical Warning</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">{message}</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 border border-border text-xs font-semibold text-foreground hover:bg-muted rounded-lg transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-3.5 py-1.5 bg-destructive hover:bg-destructive/90 text-xs font-semibold text-destructive-foreground rounded-lg shadow-sm transition-colors flex items-center gap-1.5 min-w-[70px] justify-center"
            disabled={loading}
          >
            {loading && <div className="w-3 h-3 border-2 border-destructive-foreground/30 border-t-destructive-foreground rounded-full animate-spin" />}
            Confirm Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
