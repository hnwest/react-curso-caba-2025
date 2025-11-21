import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import CartItemsCount from "@/components/CartItemsCount";
import { useAuthContext } from "@/AuthContext";

export default function Header() {
  const { isAuthenticated, role, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header bg-yellow-300 shadow-md p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-4">
          <div className="header__logo-container flex items-center">
            <img src="/assets/logo.svg" alt="e-commerce" className="header__logo" />
            <span className="text-gray-900 text-2xl font-bold">e-commerce</span>
          </div>
          <div className="header__nav-container">
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-800 hover:text-black transition-colors"
                title="Inicio"
              >
                <FontAwesomeIcon icon="home" className="text-lg mr-2" />
              Inicio
              </Link>
              <Link
                to="/catalog"
                className="text-gray-800 hover:text-black transition-colors flex items-center"
                title="Catálogo de Productos"
              >
                <FontAwesomeIcon icon="shopping-bag" className="text-lg mr-2" />
              Catalogo
              </Link>            
              <Link 
                to="/cart"
                className="text-gray-800 hover:text-black transition-colors shopping-cart-link flex items-center cursor-pointer"
                title="Carrito"
              >
                <FontAwesomeIcon icon="shopping-cart" className="text-lg mr-2" />
                  Carrito
                  <CartItemsCount />
              </Link>
              {role === 'admin' && (
                <Link 
                  to="/admin"
                  className="text-gray-800 hover:text-black transition-colors flex items-center cursor-pointer"
                  title="Panel Admin"
                >
                  <FontAwesomeIcon icon="cog" className="text-lg mr-2" />
                  Admin
                </Link>
              )}
              {isAuthenticated ? (
                <button 
                  onClick={logout}
                  className="text-gray-800 hover:text-black transition-colors flex items-center cursor-pointer"
                  title="Cerrar Sesión"
                >
                  <FontAwesomeIcon icon="sign-out-alt" className="text-lg mr-2" />
                  Salir
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="text-gray-800 hover:text-black transition-colors flex items-center cursor-pointer"
                  title="Login"
                >
                  <FontAwesomeIcon icon="user" className="text-lg mr-2" />
                  Ingreso
                </Link>
              )}
             
            </nav>
            <button
              className="md:hidden text-gray-800 hover:text-black focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title="Menú"
            >
              <FontAwesomeIcon icon="bars" className="text-2xl" />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-yellow-300 shadow-md p-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-800 hover:text-black transition-colors"
                title="Inicio"
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon="home" className="text-lg mr-2" />
              Inicio
              </Link>
              <Link
                to="/catalog"
                className="text-gray-800 hover:text-black transition-colors flex items-center"
                title="Catálogo de Productos"
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon="shopping-bag" className="text-lg mr-2" />
              Catalogo
              </Link>            
              <Link 
                to="/cart"
                className="text-gray-800 hover:text-black transition-colors shopping-cart-link flex items-center cursor-pointer"
                title="Carrito"
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon="shopping-cart" className="text-lg mr-2" />
                  Carrito
                  <CartItemsCount />
              </Link>
              {role === 'admin' && (
                <Link 
                  to="/admin"
                  className="text-gray-800 hover:text-black transition-colors flex items-center cursor-pointer"
                  title="Panel Admin"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon="cog" className="text-lg mr-2" />
                  Admin
                </Link>
              )}
              {isAuthenticated ? (
                <button 
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="text-gray-800 hover:text-black transition-colors flex items-center cursor-pointer text-left"
                  title="Cerrar Sesión"
                >
                  <FontAwesomeIcon icon="sign-out-alt" className="text-lg mr-2" />
                  Salir
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="text-gray-800 hover:text-black transition-colors flex items-center cursor-pointer"
                  title="Login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon="user" className="text-lg mr-2" />
                  Ingreso
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
