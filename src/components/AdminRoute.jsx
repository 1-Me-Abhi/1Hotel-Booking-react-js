import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * A wrapper component that redirects non-admin users to the home page
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if user is admin
 */
const AdminRoute = ({ children }) => {
  const { currentUser, isAdmin, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to home if not authenticated or not an admin
  if (!currentUser || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render children if user is authenticated and an admin
  return children;
};

export default AdminRoute; 