import { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
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
      <div
        id="admin-dashboard"
        className="grid grid-cols-[256px_1fr] min-h-screen"
      >
        <AdminMenu />

        <div className="bg-gray-100 p-8" id="admin-dashboard-content">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Panel de Administración
            </h2>
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
