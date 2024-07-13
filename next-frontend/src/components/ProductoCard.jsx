import Link from 'next/link'

function ProductoCard({ producto }) {
  return (
    <div>
        <Link href={`/productos/${producto.id}`}>
            <div className='p-4 bg-blue-800 text-slate-300 rounded-md'>
                <h3 className='text-xl font-bold p-3'>{producto.title}</h3>
                <p className='text-sm ml-1 mb-2'>{producto.description}</p>
                <p className='text-sm ml-1'>Tags: {producto.tags.map(tag => `${tag} `)}</p>
            </div>
        </Link>
    </div>
  )
}

export default ProductoCard