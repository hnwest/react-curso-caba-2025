import { useEffect, useState } from "react";
import { deleteProduct, setProduct, updateProduct, getCategories, getProducts, getProductById } from "@/service/Api";
import type { iProduct, iCategory } from "@/types/interfaces";
import toast from "react-hot-toast";
import AdminMenu from "./AdminMenu";
import { uploadImage } from '@/service/cloudinaryService';


const Products = () => {
  const [products, setProducts] = useState<iProduct[]>([]);
  const [categories, setCategories] = useState<iCategory[]>([]);
  const [errorValidacion, setErrorValidacion] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<iProduct>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    inventory: 0,
  });

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
    getProducts().then((data) => setProducts(data));
  }, []);

  //Subo imagenes a cloudinary
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file, 'ml_default');
        setNewProduct((prev) => ({ ...prev, image: imageUrl }));
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  //  Manejo el submit del form para editar o agregar 
  const handleProductSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!newProduct) return;

    //validar los inputs, precio > 0 y titulo no vacio
    if (!newProduct.title || newProduct.title.trim() === "") {
      setErrorValidacion("El título no puede estar vacío.");
      return;
    }
    if (isNaN(newProduct.price) || newProduct.price <= 0) {
      setErrorValidacion("El precio debe ser un número mayor que cero.");
      return;
    }

    setErrorValidacion("");

    let apiResponse;

    if (!isEditing) {
      // llamo a la función para guardar el producto en la API
        apiResponse = await setProduct(newProduct);
    }else{
      // llamo a la función para actualizar el producto en la API
        apiResponse = await updateProduct(newProduct);
    }

    if (apiResponse) {
      toast.success(isEditing ? "Producto actualizado" : "Producto agregado" );
      // recargar tabla de productos
      getProducts().then((data) => setProducts(data));
    }else{
      toast.error("Error al agregar el producto" );
    }
    //vacio newProduct y cierro modal
    setNewProduct({
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      inventory: 0,
    });
    setModalAddProduct(false);
  };

 // Manejo el cambio en los inputs del form
  const handleProductChange = () => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: name === 'price' || name === 'inventory' ? Number(value) : value,
      }));
  };

 // Manejo el click en agregar 
  const handleAddProduct = () => {
    setIsEditing(false);

    setNewProduct({
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      inventory: 0,
    });
    setModalAddProduct(true);
  };

 // Manejo el click en editar
  const handleEditProduct = (id: number) => {
    setIsEditing(true);
    getProductById({ id }).then((data) => {
      setNewProduct(data);
      setModalAddProduct(true);
    });
  };

 // Manejo el click en eliminar
  const handleDeleteProduct = (id: number) => {
    // preguntar si esta seguro de eliminar
    if (window.confirm("Eliminar este producto?")) {
      deleteProduct(id).then(() => {
        toast.success("Producto eliminado");
        getProducts().then((data) => setProducts(data));
      }).catch(() => {
        toast.error("Error al eliminar el producto");
      });
    }
  };

  return (
    <>
      <div
        id="admin-dashboard"
        className="grid grid-cols-[256px_1fr] min-h-screen"
      >
        <AdminMenu />

        <div className="bg-gray-100 p-8" id="admin-dashboard-content">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Productos:</h2>
            <p className="text-gray-600">Gestione los productos</p>

            {/** Boton para agregar  un producto
             * Listado de productos
             * Dentro de la grilla boton para editar y borrar
             */}
            
            <div className="mt-4 mb-6">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleAddProduct}
              >
                Agregar Producto
              </button>
            </div>

            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="text-left image-preview p-4 mb-4">Imagen</th>
                  <th className="text-left  p-4 mb-4">Producto</th>
                  <th className="text-left  p-4 mb-4">Descripcion</th>
                  <th className="text-left  p-4 mb-4">Precio</th>
                  <th className="text-left  p-4 mb-4">Categoria</th>
                  <th className="text-left  p-4 mb-4">Inventario</th>
                  <th className="text-left  p-4 mb-4">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border bg-white border-gray-300"
                  >
                    <td className=" p-4">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-center text-sm rounded">
                          Sin Imagen
                        </div>
                      )}
                    </td>
                    <td className=" p-4">{product.title}</td>
                    <td className=" p-4">{product.description}</td>
                    <td className=" p-4">{product.price}</td>
                    <td className=" p-4">{product.category}</td>
                    <td className=" p-4">{product.inventory}</td>
                    <td className="flex gap-2  p-4">
                      <button
                        onClick={() => product.id && handleEditProduct(product.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => product.id && handleDeleteProduct(product.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl mb-4">{isEditing ? "Editar Producto" : "Agregar Producto"}</h2>
            {errorValidacion && (
              <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
                {errorValidacion}
              </div>
            )}
            <form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="font-small mb-0 ">Titulo <span className="text-red-500 ml-1">*</span></label>
                <input
                  type="text"
                  onChange={handleProductChange()}
                  value={newProduct.title}
                  name="title"
                  placeholder="Título"
                  className="border p-2 rounded border-gray-300"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-small mb-0 ">Descripción <span className="text-red-500 ml-1">*</span></label>
                <textarea
                    onChange={handleProductChange()}
                  value={newProduct.description}
                  name="description"
                  placeholder=""
                  className="border p-2 rounded border-gray-300 h-40"
                  required
                />
                <span className="text-small text-gray-400">Mínimo 10 caracteres</span>
              </div>

              <div className="flex flex-col">
                <label className="font-small mb-0 ">
                  Categoría del producto <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  onChange={handleProductChange()}
                  value={newProduct.category}
                  name="category"
                  className="border p-2 rounded border-gray-300"
                  required
                >
                  <option key="default" value="">Seleccione una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
               
              <div className="flex flex-row gap-4">
                <div className="flex flex-col">
                  <label className="font-small mb-0 ">Precio <span className="text-red-500 ml-1">*</span></label>
                  <input
                    type="number"
                    onChange={handleProductChange()}
                    value={newProduct.price}
                    name="price"
                    placeholder="Precio"
                    className="border p-2 rounded border-gray-300 w-full"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-small mb-0 ">Inventario</label>
                  <input
                    type="number"
                    onChange={handleProductChange()}
                    value={newProduct.inventory}
                    name="inventory"
                    placeholder="Inventario"
                    className="border p-2 rounded border-gray-300 w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="mt-2 flex flex-col">
                  {newProduct.image && (
                    <>  
                    <label className="font-small mb-2 ">Imagen actual</label>

                    <img
                      src={newProduct.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded mb-2"
                    />
                    </>

                  )}
                  <label className="mb-2">Subir nueva imagen:</label>
                   <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      name="image"
                      placeholder="Imagen del producto"
                      className="border p-2 rounded border-gray-300"
                    />
                </div>
               
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={() => setModalAddProduct(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  onClick={handleProductSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
};

export default Products;
