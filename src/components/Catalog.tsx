import { useEffect, useState } from 'react'
import type {iProduct} from '@/types/interfaces'
import Product from '@components/Product'
import {getProducts} from '@service/Api'

const Catalog = () => {
    const [products, setProducts] = useState<iProduct[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true
        setLoading(true)
        getProducts()
            .then(data => {
                if (!mounted) return
                setProducts(data)
            })
            .catch(e => {
                console.error(e)
                if (!mounted) return
                setError('No se pudieron cargar los productos')
            })
            .finally(() => {
                if (!mounted) return
                setLoading(false)
            })

        return () => { mounted = false }
    }, [])

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mt-4 mb-4">Catálogo de Productos</h2>
            <span className="text-gray-600 mb-4 block">Explora nuestra variedad de productos</span>

            {loading && 
                <div className="flex justify-center items-center mb-4 loader ">
                    <p className="text-bold border-1 border-green-600 rounded p-4 w-50 mt-8">Cargando productos...</p>
                </div>
                }
            {error && 
                <div className="flex justify-center items-center">
                    <p className="text-red-600  mb-4 loader border-1 border-red-600 rounded p-4 w-50">{error}</p>
                </div>}


            {!loading && products && (
                <div className="grid md:grid-cols-4  gap-4">
                    {products.map(product => (
                        <Product key={product.id} product={product} viewOnly={true} />
                    ))}
                </div>
            )}

            {!loading && !products && !error && (
                <p>No hay productos para mostrar</p>
            )}
        </div>
    )
}

export default Catalog;