
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Shield, Stethoscope, ClipboardList, Pill, Phone, Package } from 'lucide-react';
import { useAuth, ROLES } from '../../../app/AuthContext';
import { Button } from '../../../shared/ui/Button';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleMockLogin = (role) => {
    login(role);
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-primary-dark">ERP Portal Login</h2>
          <p className="text-gray-500 mt-2 text-sm">Select a role to mock login (Development Mode)</p>
        </div>

        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start text-left h-12 text-gray-700" 
            onClick={() => handleMockLogin(ROLES.SUPER_ADMIN)}
          >
            <Shield className="w-5 h-5 mr-3 text-red-500" />
            <span className="font-semibold">Login as Super Admin</span>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start text-left h-12 text-gray-700" 
            onClick={() => handleMockLogin(ROLES.CLINIC_ADMIN)}
          >
            <Shield className="w-5 h-5 mr-3 text-blue-500" />
            <span className="font-semibold">Login as Clinic Admin</span>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start text-left h-12 text-gray-700" 
            onClick={() => handleMockLogin(ROLES.DOCTOR)}
          >
            <Stethoscope className="w-5 h-5 mr-3 text-emerald-500" />
            <span className="font-semibold">Login as Doctor</span>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start text-left h-12 text-gray-700" 
            onClick={() => handleMockLogin(ROLES.RECEPTIONIST)}
          >
            <Phone className="w-5 h-5 mr-3 text-purple-500" />
            <span className="font-semibold">Login as Receptionist</span>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start text-left h-12 text-gray-700" 
            onClick={() => handleMockLogin(ROLES.PHARMACIST)}
          >
            <Pill className="w-5 h-5 mr-3 text-orange-500" />
            <span className="font-semibold">Login as Pharmacist</span>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start text-left h-12 text-gray-700" 
            onClick={() => handleMockLogin(ROLES.INVENTORY_MANAGER)}
          >
            <Package className="w-5 h-5 mr-3 text-amber-600" />
            <span className="font-semibold">Login as Inventory Manager</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-left h-12 text-gray-700" 
            onClick={() => handleMockLogin(ROLES.PATIENT)}
          >
            <User className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-semibold">Login as Patient</span>
          </Button>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}
