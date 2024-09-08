import { useRouter } from "next/navigation"
import moment from 'moment';

function PedidoItem({ pedido, onDelete, onEdit }) {
  const router = useRouter()
  const formattedDateWithTime = moment(pedido.fecha).format('DD/MM/YYYY HH:mm:ss');

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

  const getEstadoText = (estado) => {
    switch (estado) {
      case "RECHAZADO":
        return "Rechazado";
      case "CANCELADO":
        return "Cancelado";
      case "EN_PREPARACION":
        return "En preparación";
      case "ACEPTADO":
        return "Aceptado";
      case "ENTREGADO":
        return "Entregado";
      default:
        return "Desconocido";
    }
  }

  return (
    <tr className='text-gray-100'>
      <td className='p-3'>{pedido.numeroPedido}</td>
      <td className='p-3'>{formattedDateWithTime}</td>
      <td className='p-3'>{pedido.usuario}</td>
      <td className={`p-3 ${getEstadoClass(pedido.estado)}`}>{getEstadoText(pedido.estado)}</td>
      <td className='p-3 flex gap-2 justify-end'>
        <button className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded-md' onClick={onViewPedido}>
          Ver
        </button>
        <button className='bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-1 rounded-md' onClick={() => onEdit(pedido)}>
          Editar
        </button>
        <button className='bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded-md' onClick={() => onDelete(pedido.numeroPedido)}>
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default PedidoItem
