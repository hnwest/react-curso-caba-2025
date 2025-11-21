import { useEffect, useState } from "react";
import type { iProduct } from "@/types/interfaces";
import Product from "@components/Product";
import { getProducts } from "@service/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 

const Catalog = (params?: {page:number, limit:number, searchTerm?: string}) => {

  const [products, setProducts] = useState<iProduct[] | null>(null);
  const [products_counter, setProducts_counter] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const  page = params?.page || 1 ;
  const limit = 5 ;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProducts({ page, limit })
      .then((data) => {
        if (!mounted) return;
        setProducts(data);
        setProducts_counter(data.length);
      })
      .catch((e) => {
        console.error(e);
        if (!mounted) return;
        setError("No se pudieron cargar los productos");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchReset = () => {
    setSearchTerm("");
    // Recargar productos completos al resetear
    setLoading(true);

    getProducts({page, limit})
      .then((data) => {
        console.log('data reset', data);
        if (data.length > 0) {
          setProducts(data);
          setProducts_counter(data.length);
        }
      })
      .catch((e) => {
        console.error(e);
        setError("No se pudieron cargar los productos");
      })
      .finally(() => {
        setLoading(false);
      });
    return;
  }

  const handleSearch = () => {
    // console.log("buscando,", searchTerm);
    // console.log("productos antes", products);
     
      setLoading(true);

      getProducts({page, limit,searchTerm: searchTerm })
        .then((data) => {
          console.log('data busca', data);
          
           
          if (data.length > 0) { 
            //  console.log("productos despues", data);

              const filteredProducts = data.filter((product: iProduct) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
              );
              console.log('filteredProducts',filteredProducts)

              setProducts(filteredProducts);
              setProducts_counter(filteredProducts.length);
           
          }
        })
        .catch((e) => {
          console.error(e);
          setError("No se pudieron cargar los productos");
        })
        .finally(() => {
          setLoading(false);
        });
    return;
    }
   
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mt-4 mb-4">Catálogo de Productos</h2>
      <span className="text-gray-600 mb-4 block">
        Explora nuestra variedad de productos ({products_counter == 1 ? "1 disponible" : `${products_counter} disponibles`})
      </span>
      <div className="mb-4 buscador mt-2">
        <input
          type="text"
          value={searchTerm}
          placeholder="Buscar productos..."
          className="border w-md rounded border-gray-300 p-2 "
          onChange={handleSearchInput}
        />
        <button
          type="button"
          className="cursor-pointer     p-2 ml-2 bg-yellow-300 rounded"
          onClick={handleSearch}
        >
          <FontAwesomeIcon
            icon="search"
            className=" border-gray-300   text-gray-600 hover:text-black"
          />
        </button>
        
         <button
          type="button"
          className="cursor-pointer     p-2 ml-2 bg-yellow-300 rounded"
          onClick={handleSearchReset}
        >
          <FontAwesomeIcon
            icon="trash"
            className=" border-gray-300   text-gray-600 hover:text-black"
          />
        </button>
 
       
      </div>
      {loading && (
        <div className="flex justify-center items-center mb-4 loader ">
          <p className="text-bold border-1 border-green-600 rounded p-4 w-50 mt-8">
            Cargando productos...
          </p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center">
          <p className="text-red-600  mb-4 loader border-1 border-red-600 rounded p-4 w-50">
            {error}
          </p>
        </div>
      )}

      {!loading && products && (
        <div className="grid md:grid-cols-4  gap-4">
          {products.map((product) => (
            <Product key={product.id} product={product} viewOnly={true} />
          ))}
        </div>
      )}
     
      {!loading && !products && !error && <p>No hay productos para mostrar</p>}
    </div>
  );
};

export default Catalog;
