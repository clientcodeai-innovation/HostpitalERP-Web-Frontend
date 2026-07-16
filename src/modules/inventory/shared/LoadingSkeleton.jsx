import React from 'react';

export function TableRowSkeleton({ columnsCount = 5 }) {
  return (
    <tr className="animate-pulse border-b border-border">
      {Array.from({ length: columnsCount }).map((_, i) => (
        <td key={i} className="p-4">
          <div className="h-4 bg-muted rounded-md w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="h-4 bg-muted rounded-md w-1/3" />
      <div className="h-8 bg-muted rounded-md w-1/2" />
      <div className="h-3 bg-muted rounded-md w-2/3" />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 bg-muted rounded-md w-1/4" />
            <div className="h-10 bg-muted rounded-md w-full" />
          </div>
        ))}
      </div>
      <div className="h-20 bg-muted rounded-md w-full" />
      <div className="flex justify-end gap-2">
        <div className="h-10 bg-muted rounded-md w-20" />
        <div className="h-10 bg-muted rounded-md w-24" />
      </div>
    </div>
  );
}
