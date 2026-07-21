import React, { useState } from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useNavigate } from 'react-router-dom';

const searchData = [
  { id: 1, type: 'Patient', name: 'Aarav Sharma', detail: 'P-1001', path: '/admin/patients' },
  { id: 2, type: 'Patient', name: 'Diya Patel', detail: 'P-1002', path: '/admin/patients' },
  { id: 3, type: 'Patient', name: 'Kabir Singh', detail: 'P-1003', path: '/admin/patients' },
  { id: 4, type: 'Doctor', name: 'Dr. Sarah Smith', detail: 'Cardiology', path: '/admin/doctors' },
  { id: 5, type: 'Doctor', name: 'Dr. Vijay', detail: 'General Practice', path: '/admin/doctors' },
  { id: 6, type: 'Page', name: 'Consultations', detail: 'Patient Care', path: '/admin/consultations' },
  { id: 7, type: 'Page', name: 'Appointments', detail: 'Patient Care', path: '/admin/appointments' },
  { id: 8, type: 'Page', name: 'Billing & Invoices', detail: 'Finance', path: '/admin/billing' },
];

export function Header({ toggleSidebar, collapsed }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const filteredData = searchData.filter(item => 
    query && (item.name.toLowerCase().includes(query.toLowerCase()) || item.type.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelect = (path) => {
    navigate(path);
    setQuery('');
    setIsFocused(false);
  };

  return (
    <header className={`fixed top-0 right-0 z-30 bg-card border-b border-border h-16 transition-all duration-300 ${collapsed ? 'left-20' : 'left-64'}`}>
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="hidden md:block relative w-72">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
            <Input 
              type="text" 
              className="pl-10" 
              placeholder="Search everywhere..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
            
            {/* Search Dropdown */}
            {isFocused && query && (
              <div className="absolute top-12 left-0 w-full bg-card border border-border rounded-md shadow-lg overflow-hidden z-50">
                {filteredData.length > 0 ? (
                  <ul className="max-h-64 overflow-y-auto">
                    {filteredData.map((item) => (
                      <li 
                        key={item.id} 
                        className="p-3 hover:bg-muted/50 cursor-pointer border-b border-border last:border-0 flex justify-between items-center"
                        onClick={() => handleSelect(item.path)}
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.detail}</p>
                        </div>
                        <span className="text-[10px] uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                          {item.type}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-sm text-center text-muted-foreground">
                    No results found for "{query}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold cursor-pointer ml-2">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
