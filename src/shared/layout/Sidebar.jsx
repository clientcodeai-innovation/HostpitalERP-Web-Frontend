import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, Activity, FileText, CreditCard, 
  Package, Truck, Wallet, MessageSquare, Phone, Bell, Globe, 
  Brain, BarChart3, UserCog, Building2, Settings, Megaphone,
  ChevronDown, Stethoscope, Shield, Droplet, User, Menu
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
      { name: 'Patients', icon: Users, path: '/admin/patients', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.DOCTOR, ROLES.RECEPTIONIST] },
      { name: 'Appointments', icon: Calendar, path: '/admin/appointments', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.DOCTOR, ROLES.RECEPTIONIST] },
      { name: 'Consultations', icon: Stethoscope, path: '/admin/consultations', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.DOCTOR, ROLES.RECEPTIONIST] },
      { name: 'Prescriptions', icon: FileText, path: '/admin/prescriptions', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.DOCTOR, ROLES.RECEPTIONIST, ROLES.PHARMACIST] },
    ]
  },
  {
    label: 'Finance',
    items: [
      { name: 'Billing & Invoices', icon: CreditCard, path: '/admin/billing', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.RECEPTIONIST] },
      { name: 'Wallet', icon: Wallet, path: '/admin/wallet', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.RECEPTIONIST] },
      { name: 'Referrals', icon: Users, path: '/admin/referrals', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.RECEPTIONIST] },
    ]
  },
  {
    label: 'Inventory',
    items: [
      { name: 'Medicine Stock', icon: Package, path: '/admin/inventory', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.PHARMACIST] },
      { name: 'Delivery & Orders', icon: Truck, path: '/admin/delivery', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.PHARMACIST] },
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
      { name: 'Messages', icon: MessageSquare, path: '/admin/messages', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.CLINIC_ADMIN, ROLES.DOCTOR] },
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

const patientNavGroups = [
  {
    label: '',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/patient/dashboard', allowedRoles: [ROLES.PATIENT] },
      { name: 'Appointment', icon: Calendar, path: '/patient/appointments', allowedRoles: [ROLES.PATIENT] },
      { name: 'Consultation', icon: Stethoscope, path: '/patient/consultations', allowedRoles: [ROLES.PATIENT] },
      { name: 'Prescription', icon: FileText, path: '/patient/prescriptions', allowedRoles: [ROLES.PATIENT] },
      { name: 'Doctor', icon: UserCog, path: '/patient/doctors', allowedRoles: [ROLES.PATIENT] },
      { name: 'Admit History', icon: Building2, path: '/patient/admit-history', allowedRoles: [ROLES.PATIENT] },
      { name: 'Invoice', icon: CreditCard, path: '/patient/invoice', allowedRoles: [ROLES.PATIENT] },
      { name: 'Message', icon: MessageSquare, path: '/patient/message', allowedRoles: [ROLES.PATIENT] },
      { name: 'Settings', icon: Settings, path: '/patient/settings', allowedRoles: [ROLES.PATIENT] },
    ]
  }
];

export function Sidebar({ collapsed, toggleSidebar }) {
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const { user, hasRole, logout } = useAuth();

  const toggleGroup = (label) => {
    setCollapsedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const isPatient = user?.role === ROLES.PATIENT;

  // Filter groups and items based on role
  const activeNavGroups = isPatient ? patientNavGroups : navGroups;
  const filteredGroups = activeNavGroups.map(group => ({
    ...group,
    items: group.items.filter(item => hasRole(item.allowedRoles))
  })).filter(group => group.items.length > 0);

  const getRoleDisplayName = (role) => {
    if (!role) return 'Bachpan Hospital ERP';
    return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ' Dashboard';
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (isPatient) {
    return (
      <aside className={`fixed top-0 left-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-64'}`}>
        <div className="h-full flex flex-col text-foreground">
          {/* Patient Profile Header or Collapsed Hamburger */}
          {collapsed ? (
            <div className="flex items-center justify-center h-16 border-b border-border shrink-0 cursor-pointer hover:bg-muted/50 transition-colors" onClick={toggleSidebar}>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          ) : (
            <Link to="/patient/profile" className={`p-4 border-b border-border flex flex-col items-center hover:bg-muted/50 transition-colors`}>
              <div className={`flex items-center gap-3 w-full px-2`}>
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Welcome,</span>
                  <span className="text-sm font-medium text-foreground truncate">Patient</span>
                </div>
              </div>
              <div className="w-full mt-4 pt-4 border-t border-border text-center">
                <span className="text-xs text-muted-foreground">Patient Code | </span>
                <span className="text-xs font-semibold text-foreground">7780122</span>
              </div>
            </Link>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
            {filteredGroups[0].items.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                title={collapsed ? item.name : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2.5 rounded-md text-[13px] transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  } ${collapsed ? 'justify-center px-0 border-l-0' : 'px-3'}`
                }
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            ))}
          </nav>
          
          {/* Logout Button */}
          <div className={`p-4 border-t border-border mt-auto ${collapsed ? 'flex justify-center' : ''}`}>
            <button 
              onClick={handleLogout}
              title={collapsed ? 'Logout' : undefined}
              className={`flex items-center gap-3 py-2.5 rounded-md text-[13px] text-destructive hover:bg-destructive/10 transition-colors font-medium ${collapsed ? 'justify-center px-2 w-auto' : 'px-3 w-full'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    );
  }

  // Standard Admin/Staff Sidebar
  return (
    <aside className={`fixed top-0 left-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-60'}`}>
      <div className="h-full flex flex-col">
        {/* Profile Header or Collapsed Profile Icon */}
        {collapsed ? (
          <div className="flex items-center justify-center h-16 border-b border-border shrink-0 cursor-pointer hover:bg-muted/50 transition-colors" onClick={toggleSidebar}>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        ) : (
          <div className="p-4 border-b border-border flex flex-col items-center hover:bg-muted/50 transition-colors relative">
            <div className="flex items-center gap-3 w-full px-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Welcome,</span>
                <span className="text-sm font-medium text-foreground truncate">{getRoleDisplayName(user?.role).replace(' Dashboard', '')}</span>
              </div>
            </div>
            <div className="w-full mt-4 pt-4 border-t border-border text-center">
              <span className="text-xs text-muted-foreground">Workspace | </span>
              <span className="text-xs font-semibold text-foreground">Bachpan Hospital</span>
            </div>
          </div>
        )}

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

        {/* Logout Button */}
        <div className={`p-4 border-t border-border mt-auto ${collapsed ? 'flex justify-center' : ''}`}>
          <button 
            onClick={handleLogout}
            title={collapsed ? 'Logout' : undefined}
            className={`flex items-center gap-2.5 px-2.5 py-2 w-full rounded-md text-[13px] text-destructive hover:bg-destructive/10 transition-colors font-medium ${collapsed ? 'justify-center' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
