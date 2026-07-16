import React from 'react';

export default function DatePicker({ value, onChange, placeholder = 'Select date', error, className = '', ...props }) {
  return (
    <input
      type="date"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
        error ? 'border-destructive focus-visible:ring-destructive' : 'hover:border-accent-foreground/30'
      } ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
}
