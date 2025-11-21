// Datos mock para el panel de administración

export const mockOrders = [
  { id: 1, customer: "Juan Pérez", total: 150.00, status: "Pendiente", date: "2025-11-20" },
  { id: 2, customer: "María García", total: 200.50, status: "Completado", date: "2025-11-19" },
  { id: 3, customer: "Carlos López", total: 75.25, status: "Enviado", date: "2025-11-18" },
  { id: 4, customer: "Ana Rodríguez", total: 300.75, status: "Pendiente", date: "2025-11-17" },
  { id: 5, customer: "Luis Martínez", total: 125.00, status: "Completado", date: "2025-11-16" },
];

export const mockUsers = [
  { id: 1, name: "Admin User", email: "admin@test.com", password: "1234", role: "admin", registeredAt: "2025-01-01" },
  { id: 2, name: "Juan Pérez", email: "user@test.com", password: "1234", role: "cliente", registeredAt: "2025-10-15" },
  { id: 3, name: "María García", email: "maria@test.com", password: "1234", role: "cliente", registeredAt: "2025-09-20" },
  { id: 4, name: "Carlos López", email: "carlos@test.com", password: "1234", role: "cliente", registeredAt: "2025-08-10" },
  { id: 5, name: "Ana Rodríguez", email: "ana@test.com", password: "1234", role: "cliente", registeredAt: "2025-07-05" },
  { id: 6, name: "Luis Martínez", email: "luis@test.com", password: "1234", role: "cliente", registeredAt: "2025-06-12" },
];