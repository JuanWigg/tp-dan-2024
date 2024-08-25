import { useRouter } from "next/navigation"


function ProductoItem({ producto, onDelete, onEdit }) {
  const router = useRouter()

  const onViewProducto = () => {
    router.push(`/productos/${producto.id}`)
  }

  return (
      <tr className='text-gray-100 text-xl'>
        <td> {producto.nombre} </td>
        <td> {producto.descripcion} </td>
        <td> {producto.categoria.nombre} </td>
        <td> {producto.stockActual} </td>
        <td className='flex gap-4 justify-end mr-2'>
            <button className='bg-blue-500 text-white px-2 py-0 rounded-md my-1' onClick={ onViewProducto }> V </button>
            <button className='bg-yellow-500 text-white px-2 py-0 rounded-md my-1' onClick={ () => onEdit({...producto, id: producto.id}) }> E </button>
            <button className='bg-red-500 text-white px-2 py-0 rounded-md my-1' onClick={ () => onDelete(producto.id) }> D </button>
        </td>
      </tr>
  )
}

export default ProductoItem