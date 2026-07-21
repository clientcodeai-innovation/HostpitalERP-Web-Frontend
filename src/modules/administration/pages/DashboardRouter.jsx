import React from 'react';
import { useAuth, ROLES } from '../../../app/AuthContext';
import AdminDashboard from './AdminDashboard';
import SuperAdminDashboard from './SuperAdminDashboard';
import PharmacistDashboard from '../../inventory/pages/PharmacistDashboard';
import PatientDashboard from '../../patient-care/pages/PatientDashboard';
import DoctorDashboard from '../../patient-care/pages/DoctorDashboard';
import InventoryManagerDashboard from '../../inventory/pages/InventoryManagerDashboard';

export default function DashboardRouter() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case ROLES.SUPER_ADMIN:
      return <SuperAdminDashboard />;
    case ROLES.PHARMACIST:
      return <PharmacistDashboard />;
    case ROLES.INVENTORY_MANAGER:
      return <InventoryManagerDashboard />;
    case ROLES.PATIENT:
      return <PatientDashboard />;
    case ROLES.DOCTOR:
      return <DoctorDashboard />;
    case ROLES.CLINIC_ADMIN:
    case ROLES.RECEPTIONIST:
    default:
      return <AdminDashboard />;
  }
}
