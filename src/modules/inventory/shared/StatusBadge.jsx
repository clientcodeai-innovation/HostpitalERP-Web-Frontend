import React from 'react';

const statusVariants = {
  // General status
  active: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  inactive: 'bg-zinc-500/10 border-zinc-500/20 text-zinc-600 dark:text-zinc-400',
  
  // Workflows
  pending: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
  approved: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  rejected: 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400',
  ordered: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400',
  draft: 'bg-zinc-500/10 border-zinc-500/20 text-zinc-600 dark:text-zinc-400',
  sent: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
  received: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  
  // Stock levels
  'in stock': 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  'low stock': 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
  'out of stock': 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400',
  'expiring soon': 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
  'expired': 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400',
  
  // QC statuses
  passed: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  failed: 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400',
  
  // Transfers & Issues
  shipped: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
  delivered: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  packaging: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
  issued: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
  completed: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
};

export default function StatusBadge({ status = 'active', className = '' }) {
  const normStatus = String(status).toLowerCase();
  const variantClass = statusVariants[normStatus] || 'bg-muted border-border text-foreground';

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-semibold tracking-wide capitalize transition-all select-none ${variantClass} ${className}`}
    >
      {status}
    </span>
  );
}
