import React, {createContext, useState} from 'react';
import type {iCartItem, iCartContextType} from '@/types/interfaces';
import toast  from 'react-hot-toast';

const CartContext = createContext<iCartContextType | undefined>(undefined);

/** El CartProvider maneja el estado del carrito. */
export function CartProvider({children}: {children: React.ReactNode}) {

    const [cartItems, setCartItems] = useState<iCartItem[]>([]);    

    const addItem = (item: iCartItem) => { 

        const exists = cartItems.find(cartItems => cartItems.id === item.id);

        if(exists){
            setCartItems(cartItems.map(cartItem => 
                cartItem.id === item.id 
                ? {...cartItem, quantity: cartItem.quantity + item.quantity} 
                : cartItem
            ));
            toast.success(`Producto ${item.name} actualizado en el carrito.`);
           
        }else{
            setCartItems([...cartItems, item]);
            toast.success(`Producto ${item.name} agregado al carrito.`);
        }
        
    }

    const removeItem = (productId:number) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
        toast.success(`Producto ${productId} removido del carrito.`);
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

export const useCartContextCount = () => {
    const context = React.useContext(CartContext);
    
    if (!context) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    const { cartItems } = context; 
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    return itemCount;
}