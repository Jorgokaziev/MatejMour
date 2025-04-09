
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'customer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { currentUser, loading } = useAuth();
  
  // If still loading auth state, show loading
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  // If no user is logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // If a specific role is required and user doesn't have it
  if (requiredRole && currentUser.role !== requiredRole) {
    // Redirect admins to admin dashboard
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    // Redirect customers to customer dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
