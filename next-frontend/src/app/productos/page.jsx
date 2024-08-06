import ProductoCard from "@/components/ProductoCard"
import SearchBar from '@/components/SearchBar'

async function getProductos() {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()
    return data.products
}


async function ProductosPage() {
    const products = await getProductos()
    return (
      <div>
          <div className='flex align-middle p-3'> 
              <SearchBar placeholderText='Buscar productos...'/>
              <button className='bg-green-500 text-white p-2 rounded-md'>Agregar Producto</button>
          </div>
          <section className='p-3 flex flex-col gap-3'>
              {products.map(producto => <ProductoCard key={producto.id} producto={producto}/>)}
          </section>
      </div>
    )
}

export default ProductosPage