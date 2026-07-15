import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../modules/public/pages/LandingPage';
import PublicLayout from '../modules/public/layouts/PublicLayout';
import PlaceholderPage from '../modules/public/pages/PlaceholderPage';

// About Pages
import AboutHospitalPage from '../modules/public/pages/about/AboutHospitalPage';
import OurDoctorsPage from '../modules/public/pages/about/OurDoctorsPage';
import AwardsPage from '../modules/public/pages/about/AwardsPage';
import TestimonialsPage from '../modules/public/pages/about/TestimonialsPage';

// Service Pages
import OpdConsultationPage from '../modules/public/pages/services/OpdConsultationPage';
import EmergencyCarePage from '../modules/public/pages/services/EmergencyCarePage';
import VaccinationPage from '../modules/public/pages/services/VaccinationPage';
import VideoConsultationPage from '../modules/public/pages/services/VideoConsultationPage';
import NicuCarePage from '../modules/public/pages/services/NicuCarePage';
import LabDiagnosticsPage from '../modules/public/pages/services/LabDiagnosticsPage';

// Department Pages
import PediatricsPage from '../modules/public/pages/departments/PediatricsPage';
import ConstitutionalCarePage from '../modules/public/pages/departments/ConstitutionalCarePage';
import AllergiesAsthmaPage from '../modules/public/pages/departments/AllergiesAsthmaPage';
import AcuteFeversPage from '../modules/public/pages/departments/AcuteFeversPage';

import AdminLogin from '../modules/auth/pages/AdminLogin';
import AdminDashboard from '../modules/administration/pages/AdminDashboard';
import { ThemeProvider } from '../shared/theme/ThemeProvider';
import { AppLayout } from '../shared/layout/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { ROLES } from './AuthContext';
import { 
  Building2, Users, Award, MessageSquare, Stethoscope, Activity, 
  Syringe, Video, Baby, FlaskConical, Heart, Shield
} from 'lucide-react';

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
          {/* Public Routes with Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            
            {/* About Pages */}
            <Route path="/about/hospital" element={<AboutHospitalPage />} />
            <Route path="/about/doctors" element={<OurDoctorsPage />} />
            <Route path="/about/awards" element={<AwardsPage />} />
            <Route path="/about/testimonials" element={<TestimonialsPage />} />

            {/* Service Pages */}
            <Route path="/services/opd-consultation" element={<OpdConsultationPage />} />
            <Route path="/services/emergency-care" element={<EmergencyCarePage />} />
            <Route path="/services/vaccination" element={<VaccinationPage />} />
            <Route path="/services/video-consultation" element={<VideoConsultationPage />} />
            <Route path="/services/nicu-care" element={<NicuCarePage />} />
            <Route path="/services/lab-diagnostics" element={<LabDiagnosticsPage />} />

            {/* Department Pages */}
            <Route path="/departments/pediatrics" element={<PediatricsPage />} />
            <Route path="/departments/constitutional-care" element={<ConstitutionalCarePage />} />
            <Route path="/departments/allergies-asthma" element={<AllergiesAsthmaPage />} />
            <Route path="/departments/acute-fevers" element={<AcuteFeversPage />} />
          </Route>

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
