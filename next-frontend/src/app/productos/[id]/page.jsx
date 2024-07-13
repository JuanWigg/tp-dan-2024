
async function getProductData(id) {
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await response.json()
    return data
}

async function ProductoPage({ params }) {
  const product = await getProductData(params.id)
  return (
    <section className='p-2 h-screen'>
        <div className='flex justify-between p-3'>
            <h1 className='text-bold text-slate-200 text-3xl p-3'> {product.title} </h1>
            <div className='flex justify-between gap-2'>
                <button className='bg-orange-500 text-white p-2 rounded-md'>Editar Producto</button>
                <button className='bg-red-500 text-white p-2 rounded-md'>Eliminar Producto</button>
            </div>
        </div>
        
        <hr></hr>
        <h3 className='text-2xl text-slate-300 text-bold p-3'> Datos del Producto </h3>
        <div className='p-3'>
            <p className='text-slate-300 mb-4'>{product.description}</p>
            <p className='text-slate-300'> <span className='text-bold'>Categoria:</span> {product.category} </p>
            <p className='text-slate-300'> <span className='text-bold'>Precio:</span> {product.price}$ </p>
            <p className='text-slate-300'> <span className='text-bold'>Stock:</span> {product.stock} </p>  
        </div>
    </section>
  )
}

export default ProductoPage