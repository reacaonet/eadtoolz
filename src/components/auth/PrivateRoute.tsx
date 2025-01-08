import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" />;
  }

  // Renderiza o componente filho se o usuário estiver autenticado
  return <>{children}</>;
}
