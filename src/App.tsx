import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import Header  from '@components/Header'
import Footer  from '@components/Footer'

import Home    from '@components/Home'
import Catalog from '@components/Catalog'
import Cart    from '@components/Cart'
import ProductDetails from '@components/ProductDetails'
import AdminDashboard from '@/components/admin/AdminDashboard'
import Products from '@/components/admin/Products'
import Clients from '@/components/admin/Clients'
import Orders from '@/components/admin/Orders'
import LoginRoute from '@/components/LoginRoute'

import { AuthProvider } from '@/AuthContext'
import ProtectedRoutes from '@/components/ProtectedRoutes'

import '@styles/App.css'

function App() {
  
  return ( 
    <AuthProvider>
    <Router>
      <AppContent />
    </Router> 
    </AuthProvider>
  );
}

export default App

//Defino un componente por que useLocation solo puede usarse dentro de un Router
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return ( <div className="flex flex-col min-h-screen">
        <Header />
          <main className={`flex-1 ${!isAdminRoute ? ' container mx-auto' : 'w-full mt-5'}`}>
            <Routes>

              {/** genero rutas del front */}
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              
              {/* genero las admin routes si isAuthenticated es falso los envio al login */}
              <Route path="/login" element={<LoginRoute />} />
              <Route path="/admin" element={<ProtectedRoutes requireAdmin={true}><AdminDashboard /></ProtectedRoutes>} />
              <Route path="/admin/clients" element={<ProtectedRoutes requireAdmin={true}><Clients /></ProtectedRoutes>} />
              <Route path="/admin/products" element={<ProtectedRoutes requireAdmin={true}><Products /></ProtectedRoutes>} />
              <Route path="/admin/orders" element={<ProtectedRoutes requireAdmin={true}><Orders /></ProtectedRoutes>} />

            </Routes>
          </main>
        <Footer />
      </div>);
}