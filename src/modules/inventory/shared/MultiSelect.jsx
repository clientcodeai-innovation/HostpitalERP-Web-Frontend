import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';

export default function MultiSelect({ options = [], selected = [], onChange, placeholder = 'Select options...', className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optionValue) => {
    if (selected.includes(optionValue)) {
      onChange(selected.filter(val => val !== optionValue));
    } else {
      onChange([...selected, optionValue]);
    }
  };

  const removeSelected = (e, valToRemove) => {
    e.stopPropagation();
    onChange(selected.filter(val => val !== valToRemove));
  };

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-10 w-full rounded-md border border-input bg-background p-1.5 flex items-center justify-between text-sm cursor-pointer hover:border-accent-foreground/30 transition-colors focus:ring-2 focus:ring-primary"
      >
        <div className="flex flex-wrap gap-1 items-center">
          {selected.length === 0 ? (
            <span className="text-muted-foreground px-2">{placeholder}</span>
          ) : (
            selected.map(val => {
              const option = options.find(o => o.value === val);
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-0.5 rounded-full"
                >
                  {option ? option.label : val}
                  <button
                    type="button"
                    onClick={(e) => removeSelected(e, val)}
                    className="hover:bg-muted-foreground/30 rounded-full p-0.5 text-secondary-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mr-2" />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full bg-card text-card-foreground rounded-lg border border-border shadow-md max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="p-1 border-b border-border bg-card">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/50 border border-input rounded-md px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="p-1 bg-card">
            {filteredOptions.length === 0 ? (
              <div className="text-xs text-muted-foreground p-2 text-center">No options found.</div>
            ) : (
              filteredOptions.map(opt => {
                const isChecked = selected.includes(opt.value);
                return (
                  <div
                    key={opt.value}
                    onClick={() => toggleOption(opt.value)}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground select-none"
                  >
                    <span>{opt.label}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
