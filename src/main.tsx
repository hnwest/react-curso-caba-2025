import { StrictMode } from 'react' 
import '@styles/index.css'
import './config/fontawesome'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import { CartProvider } from './CartContext.tsx'
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
    </StrictMode>
  );
} else {
  throw new Error("Root container not found");
}
