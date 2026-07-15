import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock roles for testing
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  CLINIC_ADMIN: 'clinic_admin',
  DOCTOR: 'doctor',
  FRONT_DESK: 'front_desk',
  PHARMACIST: 'pharmacist',
  PATIENT: 'patient'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock check for existing login in localStorage
    const savedRole = localStorage.getItem('mockRole');
    if (savedRole) {
      setUser({
        name: 'Mock User',
        role: savedRole,
        clinicId: 'clinic_1'
      });
    }
    setLoading(false);
  }, []);

  const login = (role) => {
    localStorage.setItem('mockRole', role);
    setUser({
      name: 'Mock User',
      role: role,
      clinicId: 'clinic_1'
    });
  };

  const logout = () => {
    localStorage.removeItem('mockRole');
    setUser(null);
  };

  const hasRole = (allowedRoles) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
