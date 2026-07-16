import React from 'react';

export function FormGroup({ label, error, required, children, className = '' }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-foreground flex items-center gap-0.5">
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-[11px] font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-150">
          {error}
        </p>
      )}
    </div>
  );
}

export const FormInput = React.forwardRef(({ error, className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
        error ? 'border-destructive focus-visible:ring-destructive' : 'hover:border-accent-foreground/30'
      } ${className}`}
      {...props}
    />
  );
});
FormInput.displayName = 'FormInput';

export const FormSelect = React.forwardRef(({ error, children, className = '', ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
        error ? 'border-destructive focus-visible:ring-destructive' : 'hover:border-accent-foreground/30'
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  );
});
FormSelect.displayName = 'FormSelect';

export const FormTextarea = React.forwardRef(({ error, className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
        error ? 'border-destructive focus-visible:ring-destructive' : 'hover:border-accent-foreground/30'
      } ${className}`}
      {...props}
    />
  );
});
FormTextarea.displayName = 'FormTextarea';

export function FormCheckbox({ label, error, id, className = '', ...props }) {
  const checkId = id || `check-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className={`flex items-start space-x-2 py-1.5 ${className}`}>
      <input
        type="checkbox"
        id={checkId}
        className="h-4.5 w-4.5 rounded border-gray-300 text-primary focus:ring-primary"
        {...props}
      />
      <div className="grid gap-1.5 leading-none">
        {label && (
          <label htmlFor={checkId} className="text-sm font-medium text-foreground cursor-pointer select-none">
            {label}
          </label>
        )}
        {error && <p className="text-[11px] text-destructive font-medium">{error}</p>}
      </div>
    </div>
  );
}
