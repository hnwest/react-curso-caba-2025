import AdminMenu from '@/components/admin/AdminMenu';
import { mockUsers } from '@/data/mockData';

const Clients = () => {
  return (
   <>
      <div
        id="admin-dashboard"
        className="min-h-screen flex flex-col md:grid md:grid-cols-[200px_1fr]"
      >
        <AdminMenu />
        <div className="bg-gray-100 p-8" id="admin-dashboard-content">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Clientes: (datos simulados)</h2>
                <p className="text-gray-600">Gestione los clientes</p>
            </div>

            <div className="hidden md:block">
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

            <div className="md:hidden space-y-4">
              {mockUsers.map((user) => (
                <div key={user.id} className="border border-gray-300 rounded p-4 bg-white">
                  <h3 className="font-semibold">{user.name}</h3>
                  <p>Email: {user.email}</p>
                  <p>Rol: {user.role}</p>
                  <p>Fecha Registro: {user.registeredAt}</p>
                </div>
              ))}
            </div>
        </div>
      </div>
      </>
      );
};

export default Clients;