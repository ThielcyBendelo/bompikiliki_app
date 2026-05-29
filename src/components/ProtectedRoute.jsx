import React from 'react';
import NotConnected from './NotConnected.jsx';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) {
    return <NotConnected />;
  }
  // Autoriser l'admin à tout voir
  if (role && user.role !== role && user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}
