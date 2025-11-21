import type { iProduct, iCartItem } from "@/types/interfaces";
import { useCartContext } from "@/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Product = (params: { product: iProduct; viewOnly?: boolean }) => {
  const { product, viewOnly } = params;
  const { addItem } = useCartContext();
  const addToCart = (product: iProduct) => {
    if (product.id === undefined) return;
    
    const item: iCartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
    };
    addItem(item);
  };

  return (
    <article
      key={product.id}
      className="border border-gray-300 rounded-lg shadow-sm p-4 bg-white product-card flex justify-between flex-col"
    >
      <div className="product-header">
        <div className="product-image_container mb-4">
          <img
            src={product.image ?? "/src/assets/logo.svg"}
            alt={product.title ?? "Producto"}
            className="product-image"
          />
        </div>

        <h3 className=" font-semibold">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {viewOnly ? product.description.slice(0, 50) +'...'  : product.description}
        </p>
      </div>

      <div className="flex items-center justify-between product-footer pt-4">
        <div className="text-lg font-bold font-size-lg text-blue-600">
          $ {product.price.toLocaleString()}.-
        </div>

        <div className="add-to-cart">
          {viewOnly ? (
            <Link className="ver_detalle p-2 rounded cursor-pointer border border-blue-500 text-blue-500" to={`/product/${product.id}`}>
              <FontAwesomeIcon icon="eye" className="text-lg mr-2 text-blue-500" />
              Ver producto
            </Link>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"
              onClick={() => addToCart(product)}
            >
              Agregar al carrito
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
export default Product;
