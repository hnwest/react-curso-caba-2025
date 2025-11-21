//interface products

export interface iProduct {
  id?: number;
  title: string;
  price: number;  
  description: string;
  category: string;
  image: string;
  inventory: number;
}

export interface iCategory {
  id: number;
  name: string;
}

//interface clients
export interface iClient {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface iCartItem {
  id: number;
  name:string;
  price:number;
  quantity:number;
}

export interface iCartContextType {
  cartItems: iCartItem[];
  addItem: (item: iCartItem) => void;
  removeItem: (productId: number) => void;
}

export interface iAuth {
  user: string | null;
  isAuthenticated: boolean;
  role: 'admin' | 'cliente' | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}