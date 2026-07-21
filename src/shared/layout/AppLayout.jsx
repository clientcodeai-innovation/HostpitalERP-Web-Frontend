import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} />
      <Header collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} />
      
      <main className={`pt-16 transition-all duration-300 ${collapsed ? 'ml-[68px]' : 'ml-60'}`}>
        <div className="p-6 page-transition">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
