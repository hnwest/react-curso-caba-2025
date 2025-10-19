import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CartItemsCount from "@/components/CartItemsCount";
export default function Header() {
  return (
    <header className="header bg-yellow-300 shadow-md p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-4">
          <div className="header__logo-container flex items-center">
            <img src="/assets/logo.svg" alt="e-commerce" className="header__logo" />
            <span className="text-gray-900 text-2xl font-bold">e-commerce</span>
          </div>
          <div className="header__nav-container">
            <nav className="flex items-center space-x-8">
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
                className="text-gray-800 hover:text-black transition-colors shopping-cart-link flex items-center"
                title="Carrito"
              >
                <FontAwesomeIcon icon="shopping-cart" className="text-lg mr-2" />
                  Carrito
                  <CartItemsCount />
              </Link>
             
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
