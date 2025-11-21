//Obtengo los productos de la api
import type { iProduct } from "@/types/interfaces";

const API_PATH = import.meta.env.VITE_MOCKAPI_PATH;

const getProducts = async (params?: {page: number, limit: number, searchTerm?: string}) => {

    const  page = params?.page ? params.page : 1;
    const  limit = params?.limit ? params.limit : 10;
    const searchTerm = params?.searchTerm ? params.searchTerm : "";
    console.log(searchTerm)
    const url = !searchTerm ? `?page=${page}&limit=${limit}` : '';
    try {
    const response = await fetch(`${API_PATH}product${url}`)
      .then((response) => response.json())
      .then((data) => data);
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const getCategories = async () => {
  try {
    const response = await fetch(`${API_PATH}categories`)
      .then((response) => response.json())
      .then((data) => data);
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

const getProductById = async (params: { id: number }) => {
  const { id } = params;
  try {
    const response = await fetch(`${API_PATH}product/${id}`)
      .then((response) => response.json())
      .then((data) => data);
    return response;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

//Guarda en mockapi un producto
const setProduct = async(product: iProduct) => {
  try {
    const response  = await fetch(`${API_PATH}product`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => data);
    return response;
  }

  catch (error) {
    console.error("Error saving product:", error);
    throw error;
  }
}

//Actualiza productos
const updateProduct = async(product: iProduct) => {
  try {
    const response  = await fetch(`${API_PATH}product/${product.id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => data);
    return response;
  }

  catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

//Borra productos
const deleteProduct = async (id:number) => {
  try {
    const response  = await fetch(`${API_PATH}product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => data);
    return response;
  }

  catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export { getProducts, getCategories, getProductById, updateProduct, setProduct, deleteProduct };