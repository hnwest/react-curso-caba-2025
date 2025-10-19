//Obtengo los productos de la api

const getProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => data);
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const getProductById = async (params: { id: number }) => {
  const { id } = params;
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => data);
    return response;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

export { getProducts, getProductById };
