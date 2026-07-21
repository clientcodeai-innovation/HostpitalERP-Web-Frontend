import React from 'react';
import { Box } from 'lucide-react';

export default function EmptyState({
  title = 'No records found',
  message = 'Try adjusting your search filters or add a new record to get started.',
  icon: Icon = Box
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px] bg-card/10 backdrop-blur-sm rounded-xl">
      <div className="w-12 h-12 bg-muted/60 rounded-xl flex items-center justify-center mb-4 text-muted-foreground/80 shadow-inner">
        <Icon className="w-6 h-6 animate-pulse" />
      </div>
      <h4 className="text-sm font-bold text-foreground mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">{message}</p>
    </div>
  );
}
