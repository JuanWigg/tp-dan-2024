import { useRouter } from 'next/navigation'

function ProductoItem({ producto, onDelete, onEdit }) {
  const router = useRouter()

  const onViewProducto = () => {
    router.push(`/productos/${producto.id}`)
  }

  return (
    <tr className='text-gray-200 text-sm hover:bg-gray-800'>
      <td className='p-2'>{producto.nombre}</td>
      <td className='p-2'>{producto.descripcion}</td>
      <td className='p-2'>{producto.categoria.nombre}</td>
      <td className='p-2'>{producto.stockActual}</td>
      <td className='p-2'>
        <div className='flex gap-2 justify-end'>
          <button className='bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded-md' onClick={onViewProducto}>
            Ver
          </button>
          <button className='bg-yellow-600 hover:bg-yellow-500 text-white px-2 py-1 rounded-md' onClick={() => onEdit(producto)}>
            Editar
          </button>
          <button className='bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded-md' onClick={() => onDelete(producto.id)}>
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ProductoItem
