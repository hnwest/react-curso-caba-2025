//Obtengo los productos de la api

const getProducts = async () => {

    const response = await fetch('https://fakestoreapi.com/products')
                            .then(response => response.json())
                            .then(data => data);
    return response;

}

const getProductById = async (params : {id:number}) => {
    const {id} = params
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
                            .then(response => response.json())
                            .then(data => data);
    return response;

}

export { 
    getProducts, 
    getProductById 
}