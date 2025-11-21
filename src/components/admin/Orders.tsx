import AdminMenu from '@/components/admin/AdminMenu';
import { mockOrders } from '@/data/mockData';

const Orders = () => {
  return (
   <>
      <div
        id="admin-dashboard"
        className="grid grid-cols-[256px_1fr] min-h-screen"
      >
        <AdminMenu />

        <div className="bg-gray-100 p-8" id="admin-dashboard-content">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Pedidos: (datos simulados)</h2>
            <p className="text-gray-600">Gestione los pedidos realizados</p>
          </div>

          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="text-left p-4 mb-4">ID</th>
                <th className="text-left p-4 mb-4">Cliente</th>
                <th className="text-left p-4 mb-4">Total</th>
                <th className="text-left p-4 mb-4">Estado</th>
                <th className="text-left p-4 mb-4">Fecha</th>
               
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border bg-white border-gray-300">
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">${order.total.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      order.status === 'Completado' ? 'bg-green-200 text-green-800' :
                      order.status === 'Pendiente' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">{order.date}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
    );
};

export default Orders;