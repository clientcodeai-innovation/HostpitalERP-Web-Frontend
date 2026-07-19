import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, Activity, FileText, CreditCard, 
  Package, Truck, Wallet, MessageSquare, Phone, Bell, Globe, 
  Brain, BarChart3, UserCog, Building2, Settings, Megaphone,
  ChevronDown, Stethoscope, Shield
} from 'lucide-react';
import { useAuth, ROLES } from '../../app/AuthContext';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard', allowedRoles: Object.values(ROLES) }, // Everyone sees dashboard
    ]
  },
  {
    label: 'Patient Care',
    items: [
      { name: 'Patients', icon: Users, path: '/admin/patients', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.DOCTOR, ROLES.FRONT_DESK] },
      { name: 'Appointments', icon: Calendar, path: '/admin/appointments', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.DOCTOR, ROLES.FRONT_DESK] },
      { name: 'Consultations', icon: Stethoscope, path: '/admin/consultations', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.DOCTOR] },
      { name: 'Prescriptions', icon: FileText, path: '/admin/prescriptions', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.DOCTOR, ROLES.FRONT_DESK, ROLES.PHARMACIST] },
    ]
  },
  {
    label: 'Finance',
    items: [
      { name: 'Billing & Invoices', icon: CreditCard, path: '/admin/billing', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.FRONT_DESK] },
      { name: 'Wallet & Referrals', icon: Wallet, path: '/admin/wallet', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.FRONT_DESK] },
    ]
  },
  {
    label: 'Inventory',
    items: [
      { name: 'Medicine Stock', icon: Package, path: '/admin/inventory', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.PHARMACIST] },
      { name: 'Delivery & Orders', icon: Truck, path: '/admin/delivery', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.PHARMACIST, ROLES.FRONT_DESK] },
    ]
  },
  {
    label: 'Communication',
    items: [
      { name: 'WhatsApp', icon: MessageSquare, path: '/admin/whatsapp', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN] },
      { name: 'IVR / Calls', icon: Phone, path: '/admin/ivr', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN] },
      { name: 'Notifications', icon: Bell, path: '/admin/notifications', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN] },
    ]
  },
  {
    label: 'Platform',
    items: [
      { name: 'Public Website', icon: Globe, path: '/admin/public-website', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN] },
      { name: 'Portals', icon: Shield, path: '/admin/portals', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN] },
      { name: 'AI Workbench', icon: Brain, path: '/admin/ai-workbench', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.DOCTOR] },
      { name: 'Reports', icon: BarChart3, path: '/admin/reports', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN] },
      { name: 'Marketing', icon: Megaphone, path: '/admin/marketing', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN] },
    ]
  },
  {
    label: 'Administration',
    items: [
      { name: 'Users & Roles', icon: UserCog, path: '/admin/users-roles', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN] },
      { name: 'Clinic Settings', icon: Building2, path: '/admin/clinic-settings', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN] },
      { name: 'Settings', icon: Settings, path: '/admin/settings', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN] },
    ]
  },
];

export function Sidebar({ collapsed }) {
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const { hasRole } = useAuth();

  const toggleGroup = (label) => {
    setCollapsedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  // Filter groups and items based on role
  const filteredGroups = navGroups.map(group => ({
    ...group,
    items: group.items.filter(item => hasRole(item.allowedRoles))
  })).filter(group => group.items.length > 0);

  return (
    <aside className={`fixed top-0 left-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-60'}`}>
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className={`flex items-center h-16 px-4 border-b border-border shrink-0 ${collapsed ? 'justify-center' : 'gap-2.5'}`}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
            H
          </div>
          {!collapsed && (
            <span className="font-semibold text-sm whitespace-nowrap text-foreground">hospital ERP</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {filteredGroups.map((group) => (
            <div key={group.label}>
              {/* Group Label */}
              {!collapsed ? (
                <button 
                  onClick={() => toggleGroup(group.label)}
                  className="flex items-center justify-between w-full px-2 mb-1"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{group.label}</span>
                  <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${collapsedGroups[group.label] ? '-rotate-90' : ''}`} />
                </button>
              ) : (
                <div className="h-px bg-border mx-2 my-2" />
              )}

              {/* Group Items */}
              {!collapsedGroups[group.label] && (
                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        title={collapsed ? item.name : undefined}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] font-medium transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          } ${collapsed ? 'justify-center' : ''}`
                        }
                      >
                        <item.icon className="w-4 h-4 shrink-0" />
                        {!collapsed && <span className="truncate">{item.name}</span>}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
