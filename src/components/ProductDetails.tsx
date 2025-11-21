import {useParams, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '@/service/Api';
import type {iProduct} from '@/types/interfaces';
import Product from '@components/Product'

const ProductDetails = () => {
    const {id} = useParams();

    const [product, setProduct] = useState<iProduct | null>(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(()=>{
        if(id){
            getProductById({  id: parseInt(id)})
            .then(data => {
                setProduct(data)
            })
            .catch(e => {
                console.error(e)
                setError('No se pudieron cargar los productos')
            })
            .finally(() => {
                setLoading(false)
            })
        }
    },[id])

    if(loading) return <div>Loading...</div>
    
    return (
          <div className="w-full p-2">
            <h2 className="text-2xl font-bold mt-4 mb-4">Detalle del Producto</h2>

            {loading && 
                <div className="flex justify-center items-center mb-4 loader ">
                    <p className="text-bold border-1 border-green-600 rounded p-4 w-50 mt-8">Cargando productos...</p>
                </div>
                }
            {error && 
                <div className="flex justify-center items-center">
                    <p className="text-red-600  mb-4 loader border-1 border-red-600 rounded p-4 w-50">{error}</p>
                </div>}


            {!loading && product && (
                <>  
                    <div className="w-full">
                        <Product key={product.id} product={product} viewOnly={false} />
                    </div>
                    <div className="m-4 justify-content-end">
                        <Link to='/catalog' className="text-blue-500 hover:underline mt-4 block">Volver al Catálogo</Link>
                    </div>
                </>
            )}

            {!loading && !product && !error && (
                <p>No se encontraron productos coincidentes con la búsqueda</p>
            )}
        </div>
    )
}

export default ProductDetails;