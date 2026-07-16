import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center space-x-1.5 text-xs text-muted-foreground font-semibold py-1">
      <div className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer select-none">
        <Home className="w-3.5 h-3.5" />
        <span>Admin</span>
      </div>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
            {isLast ? (
              <span className="text-foreground font-bold truncate">{item.label}</span>
            ) : (
              <span className="hover:text-foreground transition-colors cursor-pointer select-none truncate">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
