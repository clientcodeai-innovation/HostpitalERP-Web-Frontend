import React from 'react';
import { HelpCircle } from 'lucide-react';
import Modal from './Modal';

export default function ConfirmationDialog({
  isOpen = false,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to perform this action?',
  confirmLabel = 'Proceed',
  variant = 'primary', // primary, success, warning, info
  loading = false
}) {
  const colorMap = {
    primary: {
      bg: 'bg-primary/10 text-primary',
      btn: 'bg-primary hover:bg-primary/95 text-primary-foreground'
    },
    success: {
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      btn: 'bg-emerald-600 hover:bg-emerald-600/95 text-white'
    },
    warning: {
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      btn: 'bg-amber-600 hover:bg-amber-600/95 text-white'
    },
    info: {
      bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      btn: 'bg-blue-600 hover:bg-blue-600/95 text-white'
    }
  };

  const selectedTheme = colorMap[variant] || colorMap.primary;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-5 py-2">
        <div className="flex items-start gap-3.5">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-xs ${selectedTheme.bg}`}>
            <HelpCircle className="w-5.5 h-5.5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Action Confirmation</h4>
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
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5 min-w-[70px] justify-center ${selectedTheme.btn}`}
            disabled={loading}
          >
            {loading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
