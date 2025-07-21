
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!user) return <Navigate to="/signin" />;
  return children;
};
export default ProtectedRoute;