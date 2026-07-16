import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading this view. Please try again.',
  onRetry
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px] border border-destructive/20 bg-destructive/5 rounded-xl">
      <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-4 text-destructive shadow-sm">
        <AlertCircle className="w-6 h-6 animate-bounce" />
      </div>
      <h4 className="text-sm font-bold text-foreground mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground max-w-sm mb-4 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg text-xs hover:bg-primary/90 transition-all shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry View
        </button>
      )}
    </div>
  );
}
