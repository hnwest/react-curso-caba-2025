import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="bg-gray-800 text-white p-4 md:p-6 flex flex-row md:flex-col gap-4 md:gap-2 justify-center md:justify-start">
      <div className="md:mb-8">
        <h2 className="text-lg md:text-2xl font-bold md:block hidden">Administrador</h2>
      </div>

      <nav className="flex flex-row md:flex-col gap-4 md:gap-2">
        <Link
          to="/admin/products"
          className="px-3 py-2 md:px-4 md:py-2 rounded hover:bg-gray-700 transition text-sm md:text-base"
        >
          Productos
        </Link>
        <Link
          to="/admin/clients"
          className="px-3 py-2 md:px-4 md:py-2 rounded hover:bg-gray-700 transition text-sm md:text-base"
        >
          Clientes
        </Link>
        <Link
          to="/admin/orders"
          className="px-3 py-2 md:px-4 md:py-2 rounded hover:bg-gray-700 transition text-sm md:text-base"
        >
          Órdenes
        </Link>
      </nav>
    </div>
  );
};

export default AdminMenu;
