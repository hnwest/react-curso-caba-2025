import AdminMenu from '@/components/admin/AdminMenu';
import { mockUsers } from '@/data/mockData';

const Clients = () => {
  return (
   <>
      <div
        id="admin-dashboard"
        className="grid grid-cols-[256px_1fr] min-h-screen"
      >
        <AdminMenu />
        <div className="bg-gray-100 p-8" id="admin-dashboard-content">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Clientes: (datos simulados)</h2>
                <p className="text-gray-600">Gestione los clientes</p>
            </div>

            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="text-left p-4 mb-4">ID</th>
                  <th className="text-left p-4 mb-4">Nombre</th>
                  <th className="text-left p-4 mb-4">Email</th>
                  <th className="text-left p-4 mb-4">Rol</th>
                  <th className="text-left p-4 mb-4">Fecha Registro</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr key={user.id} className="border bg-white border-gray-300">
                    <td className="p-4">{user.id}</td>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.role}</td>
                    <td className="p-4">{user.registeredAt}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
      </>
      );
};

export default Clients;