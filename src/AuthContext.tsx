import { useState, createContext, useContext } from "react";
import toast from "react-hot-toast";
import type { iAuth } from "@/types/interfaces";
import { mockUsers } from "@/data/mockData";

// Creo el contexto
const AuthContext = createContext<iAuth | undefined>(undefined);

// Creo el proveedor del contexto
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(() => {
    // Cargar usuario desde localStorage al iniciar
    const token = localStorage.getItem("token");
    if (token) {
      const parts = token.split('_');
      if (parts.length >= 3) {
        const role = parts[0];
        const userId = parseInt(parts[2]);
        const userFound = mockUsers.find(u => u.id === userId && u.role === role);
        if (userFound) {
          return userFound.name;
        }
      }
    }
    return null;
  });
  //roles admin o cliente
  const [role, setRole] = useState<'admin' | 'cliente' | null>(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const parts = token.split('_');
      if (parts.length >= 3) {
        const role = parts[0];
        if (role === 'admin' || role === 'cliente') {
          return role;
        }
      }
    }
    return null;
  });

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    // Buscar usuario en mockUsers por email o name
    const userFound = mockUsers.find(u => u.email === username || u.name === username);

    if (userFound && userFound.password === password) {
      const token = `${userFound.role}_token_${userFound.id}_${new Date().getTime()}`;
      localStorage.setItem("token", token);
      setUser(userFound.name);
      setRole(userFound.role as 'admin' | 'cliente');
      toast.success(`Inicio de sesión exitoso como ${userFound.role}`);
      return true;
    } else {
      toast.error("Credenciales incorrectas");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setRole(null);
    toast.success("Cierre de sesión exitoso");
  };

  return (
    <AuthContext.Provider
      value={{ user, role, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//   creo una funcion para acceder al contexto y a las funciones
 
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
};
