import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface RoleRouteProps {
  children: React.ReactNode;
  role: string | string[];
}

export function RoleRoute({ children, role }: RoleRouteProps) {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  // Verifica se o role é um array ou uma string
  const hasPermission = Array.isArray(role) 
    ? role.includes(userRole)
    : role === userRole;

  if (!hasPermission) {
    return <Navigate to={`/dashboard/${userRole}`} />;
  }

  return <>{children}</>;
}
