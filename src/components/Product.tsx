import type { iProduct, iCartItem } from "@/types/interfaces";
import { useCartContext } from "@/CartContext";


const Product = (params: { product: iProduct }) => {
  const { product } = params;
  const { addItem } = useCartContext();
  const addToCart = (product:iProduct) => {
    const item: iCartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
    };
    addItem(item);
  };

  return (
    <article  key={product.id}  className="border border-gray-300 rounded-lg shadow-sm p-4 bg-white product-card flex justify-between flex-col"  >
        <div className="product-header">
          <div className="product-image_container mb-4">
              <img
                src={product.image ?? "/src/assets/logo.svg"}
                alt={product.title ?? "Producto"}
                className="product-image"
            />
          </div>

            <h3 className=" font-semibold">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description.slice(0,50)}...</p>
        </div>

        <div className="flex items-center justify-between product-footer pt-4">
            
            <div className="text-lg font-bold font-size-lg text-blue-600">
            $ {product.price.toLocaleString()}.-
            </div>

            <div className="add-to-cart">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"
                onClick={() => addToCart(product)}
            >
                Agregar
            </button>
            </div>

        </div>
    </article>
  );
};
export default Product;
