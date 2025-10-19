 import { useCartContextCount } from "@/CartContext";

const CartItemsCount = () => {
    const totalItems = useCartContextCount();
    return (
        <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold cart-count">
            {totalItems}
        </span>
    );
}
export default CartItemsCount;