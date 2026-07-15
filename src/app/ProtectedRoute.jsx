import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading, hasRole } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    // User does not have required role, redirect to unauthorized or home
    return (
      <div className="flex flex-col h-screen items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Unauthorized</h1>
        <p className="text-muted-foreground mb-6">You do not have permission to view this page.</p>
        <Navigate to="/admin/dashboard" replace />
      </div>
    );
  }

  return <Outlet />;
};
