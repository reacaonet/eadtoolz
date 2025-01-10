<<<<<<< HEAD
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
=======
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
>>>>>>> 36b2f35 (feat: implementação do perfil de usuário com upload de foto)

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
<<<<<<< HEAD
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" />;
  }

  // Renderiza o componente filho se o usuário estiver autenticado
=======
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

>>>>>>> 36b2f35 (feat: implementação do perfil de usuário com upload de foto)
  return <>{children}</>;
}
