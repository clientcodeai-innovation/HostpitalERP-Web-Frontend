import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ThemeToggle } from '../theme/ThemeToggle';

export function Header({ toggleSidebar, collapsed }) {
  return (
    <header className={`fixed top-0 right-0 z-30 bg-card border-b border-border h-16 transition-all duration-300 ${collapsed ? 'left-20' : 'left-64'}`}>
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="hidden md:block relative w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
            <Input type="text" className="pl-10" placeholder="Search everywhere..." />
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
