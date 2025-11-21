import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/AuthContext';
import Login from '@/components/Login';

/** Componente para la ruta de login: si ya está logueado, redirige según rol */
const LoginRoute = () => {
  const { isAuthenticated, role } = useAuthContext();

  if (isAuthenticated) {
    if (role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (role === 'cliente') {
      return <Navigate to="/" replace />;
    }
  }

  return <Login />;
};

export default LoginRoute;