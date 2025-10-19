import React, {createContext, useState} from 'react';
import type {iCartItem, iCartContextType} from '@/types/interfaces';

const CartContext = createContext<iCartContextType | undefined>(undefined);

/** El CartProvider maneja el estado del carrito. */
export function CartProvider({children}: {children: React.ReactNode}) {

    const [cartItems, setCartItems] = useState<iCartItem[]>([]);    

    const addItem = (item: iCartItem) => {
        setCartItems([...cartItems, item]);
        alert(`Producto ${item.name} agregado al carrito.`);
    }

    const removeItem = (productId:number) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
        alert(`Producto ${productId} removido del carrito.`);
    }

    return (
        <CartContext.Provider value={{cartItems, addItem, removeItem}}>
            {children}
        </CartContext.Provider>
    )
}

/** Me creo una funcion para acceder al contexto
 *  y a las funciones y productos
 */
export const useCartContext = () => {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    return context;
}