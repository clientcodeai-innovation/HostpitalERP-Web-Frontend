import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../modules/public/pages/LandingPage';
import AdminLogin from '../modules/auth/pages/AdminLogin';
import AdminDashboard from '../modules/administration/pages/AdminDashboard';
import { ThemeProvider } from '../shared/theme/ThemeProvider';
import { AppLayout } from '../shared/layout/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { ROLES } from './AuthContext';

// Admin Module Pages
import PatientsPage from '../modules/patient-care/pages/PatientsPage';
import AppointmentsPage from '../modules/patient-care/pages/AppointmentsPage';
import ConsultationsPage from '../modules/patient-care/pages/ConsultationsPage';
import PrescriptionsPage from '../modules/patient-care/pages/PrescriptionsPage';
import BillingPage from '../modules/finance/pages/BillingPage';
import InventoryPage from '../modules/inventory/pages/InventoryPage';
import DeliveryPage from '../modules/inventory/pages/DeliveryPage';
import WalletPage from '../modules/finance/pages/WalletPage';
import WhatsAppPage from '../modules/communication/pages/WhatsAppPage';
import IVRPage from '../modules/communication/pages/IVRPage';
import NotificationsPage from '../modules/communication/pages/NotificationsPage';
import PublicWebsitePage from '../modules/platform/pages/PublicWebsitePage';
import PortalsPage from '../modules/platform/pages/PortalsPage';
import AIWorkbenchPage from '../modules/platform/pages/AIWorkbenchPage';
import ReportsPage from '../modules/platform/pages/ReportsPage';
import UsersRolesPage from '../modules/administration/pages/UsersRolesPage';
import ClinicSettingsPage from '../modules/administration/pages/ClinicSettingsPage';
import SettingsPage from '../modules/administration/pages/SettingsPage';
import MarketingPage from '../modules/platform/pages/MarketingPage';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="erp-theme">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Routes wrapped in AppLayout and ProtectedRoute */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              
              {/* Patient Care */}
            <Route path="patients" element={<PatientsPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="consultations" element={<ConsultationsPage />} />
            <Route path="prescriptions" element={<PrescriptionsPage />} />
            
            {/* Finance */}
            <Route path="billing" element={<BillingPage />} />
            <Route path="wallet" element={<WalletPage />} />
            
            {/* Inventory */}
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="delivery" element={<DeliveryPage />} />
            
            {/* Communication */}
            <Route path="whatsapp" element={<WhatsAppPage />} />
            <Route path="ivr" element={<IVRPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            
            {/* Platform */}
            <Route path="public-website" element={<PublicWebsitePage />} />
            <Route path="portals" element={<PortalsPage />} />
            <Route path="ai-workbench" element={<AIWorkbenchPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="marketing" element={<MarketingPage />} />
            
            {/* Administration */}
            <Route path="users-roles" element={<UsersRolesPage />} />
            <Route path="clinic-settings" element={<ClinicSettingsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
