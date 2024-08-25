import { useRouter } from "next/navigation"


function PedidoItem({ pedido, onDelete, onEdit }) {
  const router = useRouter()

  const onViewPedido = () => {
    router.push(`/pedidos/${pedido.id}`)
  }

  const getEstadoClass = (estado) => {
    switch (estado) {
      case "RECHAZADO":
      case "CANCELADO":
        return "text-red-500";
      case "EN_PREPARACION":
        return "text-yellow-500";
      case "ACEPTADO":
        return "text-blue-500";
      case "ENTREGADO":
        return "text-green-500";
      default:
        return "text-gray-100";
    }
  }

  return (
      <tr className='text-gray-100 text-xl'>
        <td> {pedido.numeroPedido} </td>
        <td> {pedido.fecha} </td>
        <td> {pedido.usuario} </td>
        <td className={getEstadoClass(pedido.estado)}> {pedido.estado} </td>
        <td className='flex gap-4 justify-end mr-2'>
            <button className='bg-blue-500 text-white px-2 py-0 rounded-md my-1' onClick={ onViewPedido }> V </button>
            <button className='bg-yellow-500 text-white px-2 py-0 rounded-md my-1' onClick={ () => onEdit(pedido) }> E </button>
            <button className='bg-red-500 text-white px-2 py-0 rounded-md my-1' onClick={ () => onDelete(pedido.numeroPedido) }> D </button>
        </td>
        
      </tr>
  )
}

export default PedidoItem