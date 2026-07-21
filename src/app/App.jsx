import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../modules/public/pages/LandingPage';
import PublicLayout from '../modules/public/layouts/PublicLayout';
import PlaceholderPage from '../modules/public/pages/PlaceholderPage';

// About Pages
import AboutHospitalPage from '../modules/public/pages/about/AboutHospitalPage';
import OurDoctorsPage from '../modules/public/pages/about/OurDoctorsPage';
import AwardsPage from '../modules/public/pages/about/AwardsPage';
import TestimonialsPage from '../modules/public/pages/about/TestimonialsPage';
import FaqsPage from '../modules/public/pages/about/FaqsPage';

// Service Pages
import OpdConsultationPage from '../modules/public/pages/services/OpdConsultationPage';
import EmergencyCarePage from '../modules/public/pages/services/EmergencyCarePage';
import VaccinationPage from '../modules/public/pages/services/VaccinationPage';
import VideoConsultationPage from '../modules/public/pages/services/VideoConsultationPage';
import NicuCarePage from '../modules/public/pages/services/NicuCarePage';
import LabDiagnosticsPage from '../modules/public/pages/services/LabDiagnosticsPage';
import PackagesPage from '../modules/public/pages/services/PackagesPage';

// Resource Pages
import BlogPage from '../modules/public/pages/resources/BlogPage';
import PharmacyPage from '../modules/public/pages/resources/PharmacyPage';

// Department Pages
import PediatricsPage from '../modules/public/pages/departments/PediatricsPage';
import ConstitutionalCarePage from '../modules/public/pages/departments/ConstitutionalCarePage';
import AllergiesAsthmaPage from '../modules/public/pages/departments/AllergiesAsthmaPage';
import AcuteFeversPage from '../modules/public/pages/departments/AcuteFeversPage';

import AdminLogin from '../modules/auth/pages/AdminLogin';
import DashboardRouter from '../modules/administration/pages/DashboardRouter';
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
import ReferralsPage from '../modules/finance/pages/ReferralsPage';
import WhatsAppPage from '../modules/communication/pages/WhatsAppPage';
import IVRPage from '../modules/communication/pages/IVRPage';
import NotificationsPage from '../modules/communication/pages/NotificationsPage';
import PublicWebsitePage from '../modules/platform/pages/PublicWebsitePage';
import PortalsPage from '../modules/platform/pages/PortalsPage';
import AdminMessagePage from '../modules/communication/pages/AdminMessagePage';
import ReportsPage from '../modules/platform/pages/ReportsPage';
import UsersRolesPage from '../modules/administration/pages/UsersRolesPage';
import ClinicSettingsPage from '../modules/administration/pages/ClinicSettingsPage';
import SettingsPage from '../modules/administration/pages/SettingsPage';
import MarketingPage from '../modules/platform/pages/MarketingPage';

// Admin dummy pages (to prevent undefined errors)
import BloodBankPage from '../modules/patient-care/pages/BloodBankPage';
import AdmitHistoryPage from '../modules/patient-care/pages/AdmitHistoryPage';
import OperationHistoryPage from '../modules/patient-care/pages/OperationHistoryPage';

// Patient Portal Pages
import PatientDashboard from '../modules/patient-care/pages/PatientDashboard';
import PatientAppointmentsPage from '../modules/patient-care/pages/PatientAppointmentsPage';
import PatientConsultationsPage from '../modules/patient-care/pages/PatientConsultationsPage';
import PatientPrescriptionsPage from '../modules/patient-care/pages/PatientPrescriptionsPage';
import PatientDoctorsPage from '../modules/patient-care/pages/PatientDoctorsPage';
import PatientBloodBankPage from '../modules/patient-care/pages/PatientBloodBankPage';
import PatientAdmitHistoryPage from '../modules/patient-care/pages/PatientAdmitHistoryPage';
import PatientInvoicePage from '../modules/patient-care/pages/PatientInvoicePage';
import PatientMessagePage from '../modules/patient-care/pages/PatientMessagePage';
import PatientProfilePage from '../modules/patient-care/pages/PatientProfilePage';
import PatientSettingsPage from '../modules/patient-care/pages/PatientSettingsPage';

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
            <Route path="/about/faqs" element={<FaqsPage />} />

            {/* Service Pages */}
            <Route path="/services/opd-consultation" element={<OpdConsultationPage />} />
            <Route path="/services/emergency-care" element={<EmergencyCarePage />} />
            <Route path="/services/vaccination" element={<VaccinationPage />} />
            <Route path="/services/video-consultation" element={<VideoConsultationPage />} />
            <Route path="/services/nicu-care" element={<NicuCarePage />} />
            <Route path="/services/lab-diagnostics" element={<LabDiagnosticsPage />} />
            <Route path="/services/packages" element={<PackagesPage />} />

            {/* Department Pages */}
            <Route path="/departments/pediatrics" element={<PediatricsPage />} />
            <Route path="/departments/constitutional-care" element={<ConstitutionalCarePage />} />
            <Route path="/departments/allergies-asthma" element={<AllergiesAsthmaPage />} />
            <Route path="/departments/acute-fevers" element={<AcuteFeversPage />} />

            {/* Resource Pages */}
            <Route path="/resources/blog" element={<BlogPage />} />
            <Route path="/resources/pharmacy" element={<PharmacyPage />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Routes wrapped in AppLayout and ProtectedRoute */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardRouter />} />
              
            {/* Patient Care */}
            <Route path="patients" element={<PatientsPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="consultations" element={<ConsultationsPage />} />
            <Route path="prescriptions" element={<PrescriptionsPage />} />
            <Route path="doctors" element={<PatientDoctorsPage />} />
            <Route path="blood-bank" element={<BloodBankPage />} />
            <Route path="admit-history" element={<AdmitHistoryPage />} />
            <Route path="operation-history" element={<OperationHistoryPage />} />
            
            {/* Finance */}
            <Route path="billing" element={<BillingPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="referrals" element={<ReferralsPage />} />
            <Route path="patient-invoice" element={<PatientInvoicePage />} />
            
            {/* Inventory */}
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="delivery" element={<DeliveryPage />} />
            
            {/* Communication */}
            <Route path="whatsapp" element={<WhatsAppPage />} />
            <Route path="ivr" element={<IVRPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="patient-message" element={<PatientMessagePage />} />
            
            {/* Platform / Messages */}
            <Route path="public-website" element={<PublicWebsitePage />} />
            <Route path="portals" element={<PortalsPage />} />
            <Route path="messages" element={<AdminMessagePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="marketing" element={<MarketingPage />} />
            
            {/* Administration */}
            {/* Administration */}
            <Route path="users-roles" element={<UsersRolesPage />} />
            <Route path="clinic-settings" element={<ClinicSettingsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Patient Routes wrapped in AppLayout and ProtectedRoute */}
          <Route path="/patient" element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/patient/dashboard" replace />} />
              <Route path="dashboard" element={<PatientDashboard />} />
              <Route path="appointments" element={<PatientAppointmentsPage />} />
              <Route path="consultations" element={<PatientConsultationsPage />} />
              <Route path="prescriptions" element={<PatientPrescriptionsPage />} />
              <Route path="doctors" element={<PatientDoctorsPage />} />
              <Route path="blood-bank" element={<PatientBloodBankPage />} />
              <Route path="admit-history" element={<PatientAdmitHistoryPage />} />
              <Route path="invoice" element={<PatientInvoicePage />} />
              <Route path="message" element={<PatientMessagePage />} />
              <Route path="profile" element={<PatientProfilePage />} />
              <Route path="settings" element={<PatientSettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
