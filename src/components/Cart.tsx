import { useCartContext } from "@/CartContext"; 

const Cart = () => {
    const { removeItem } = useCartContext();
    const { cartItems } = useCartContext();
    return (
        <div className="container mx-auto p-4">   
            <h1 className="text-4xl font-bold mb-4">Mi carrito</h1>
            <p className="text-lg text-gray-600">Productos agregados:</p>
            <table className="w-full mt-6 table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-left">Producto</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Precio</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Cantidad</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id}>
                            <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                            <td className="border border-gray-300 px-4 py-2">$ {item.price.toLocaleString()}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                            <td className="border border-gray-300 px-4 py-2">$ {(item.price * item.quantity).toLocaleString()}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button onClick={() => removeItem(item.id)} className=" cursor-pointer  text-red-500 hover:text-red-700">Eliminar</button>
                                </td>
                        
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="grid place-items-end mt-4">
                <span className="text-xl font-bold">
                    Total: $ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}
                </span>
            </div>
        </div>
    );
};

export default Cart;