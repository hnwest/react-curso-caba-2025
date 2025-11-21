import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/AuthContext';

/** Componente para proteger rutas */
const ProtectedRoutes = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { isAuthenticated, role } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && role !== 'admin') {
    if (role === 'cliente') {
      return <Navigate to="/catalog" replace />; // Redirige a catálogo si es cliente
    }
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h2>
          <p className="text-gray-600">No posee los permisos necesarios para acceder a esta sección.</p>
          <p className="text-gray-500 mt-2">Solo los administradores pueden ver esta página.</p>
        </div>
      </div>
    );
  }

  return <>{ children }</>;
};

export default ProtectedRoutes;