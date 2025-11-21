import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="bg-gray-800 text-white p-6" id="admin-menu-sidebar">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Administrador</h2>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          to="/admin/products"
          className="px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Productos
        </Link>
        <Link
          to="/admin/clients"
          className="px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Clientes
        </Link>
        <Link
          to="/admin/orders"
          className="px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Órdenes
        </Link>
      </nav>
    </div>
  );
};

export default AdminMenu;
