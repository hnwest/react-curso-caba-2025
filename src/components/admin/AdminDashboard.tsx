import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "@/service/Api";
import { mockOrders, mockUsers } from "@/data/mockData";
import type { iProduct } from "@/types/interfaces";

const AdminDashboard = () => {
  const [products, setProducts] = useState<iProduct[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Menú superior */}
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
            <nav className="flex gap-4">
              <Link to="/admin/products" className="hover:bg-gray-700 px-3 py-2 rounded transition">
                Productos
              </Link>
              <Link to="/admin/clients" className="hover:bg-gray-700 px-3 py-2 rounded transition">
                Clientes
              </Link>
              <Link to="/admin/orders" className="hover:bg-gray-700 px-3 py-2 rounded transition">
                Órdenes
              </Link>
            </nav>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-6">
            <p className="text-gray-600">Resumen general del sistema</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Productos */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Productos</h3>
              <p className="text-3xl font-bold text-blue-600">{products.length}</p>
              <p className="text-gray-600">productos disponibles</p>
            </div>

            {/* Card Pedidos */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Pedidos</h3>
              <p className="text-3xl font-bold text-green-600">{mockOrders.length}</p>
              <p className="text-gray-600">pedidos realizados (simulado)</p>
            </div>

            {/* Card Usuarios */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Usuarios</h3>
              <p className="text-3xl font-bold text-purple-600">{mockUsers.length}</p>
              <p className="text-gray-600">usuarios registrados (simulado)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
