'use client'
import PedidoItem from '@/components/PedidoItem'
import EditPedidoModal from '@/components/EditPedidoModal'
import DeleteModal from '@/components/DeleteModal'
import SearchBar from "@/components/SearchBar"
import { useState, useEffect } from 'react'



function PedidosPage() {
  const pedidosDefault = [
    { numeroPedido: 1, fecha: '2021-10-10', usuario: 'Juan Perez', estado: 'ACEPTADO' },
    { numeroPedido: 2, fecha: '2021-10-11', usuario: 'Juan Perez', estado: 'RECHAZADO' },
    { numeroPedido: 3, fecha: '2021-10-12', usuario: 'Juan Perez', estado: 'CANCELADO' },
    { numeroPedido: 4, fecha: '2021-10-13', usuario: 'Juan Perez', estado: 'EN_PREPARACION' },
    { numeroPedido: 5, fecha: '2021-10-14', usuario: 'Juan Perez', estado: 'ENTREGADO' }
  ]
  const [pedidos, setPedidos] = useState([])
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [pedidoEdicion, setPedidoEdicion] = useState(null)

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [pedidoEliminar, setPedidoEliminar] = useState(null)

  useEffect(() => {
    setPedidos(pedidosDefault)
  }, [])

  const onEditPedido = (pedido) => {
    setPedidoEdicion(pedido)
    setEditModalIsOpen(true)
  }

  const onCloseEditModal = () => {
    setEditModalIsOpen(false)
  }

  const onSaveEditModal = (pedido) => {
    console.log('Pedido editado: ', pedido)
    setEditModalIsOpen(false)
  }

  const onDeletePedido = (idPedido) => {
    setPedidoEliminar(idPedido)
    setDeleteModalIsOpen(true)
  }

  const onConfirmDelete = (pedido) => {
    console.log('Pedido eliminado: ', pedido)
    setDeleteModalIsOpen(false)
  }

  const onCancelDelete = () => {
    setDeleteModalIsOpen(false)
  }

  return (
    <div className='h-screen'>
        <div className='flex align-middle p-3'> 
            <SearchBar placeholderText='Buscar pedido...'/>
            <button className='bg-green-500 text-white p-2 rounded-md'>Nuevo Pedido</button>
        </div>
        <table className='table-auto w-screen'>
          <thead>
            <tr className='text-slate-400 text-2xl'>
              <th className="max-w-28"> Numero de Pedido </th>
              <th> Fecha </th>
              <th> Usuario </th>
              <th> Estado </th>
              <th>        </th>
            </tr>
          </thead>
          <tbody className='text-center'>
            { pedidos.map(pedido => <PedidoItem key={pedido.numeroPedido} pedido={pedido} onEdit={onEditPedido} onDelete={onDeletePedido}/>)}
          </tbody>
        </table>
        <EditPedidoModal pedido={pedidoEdicion} isOpen={editModalIsOpen} onClose={onCloseEditModal} onSave={onSaveEditModal}/>
        <DeleteModal entidad='pedido' isOpen={deleteModalIsOpen} onDelete={() => onConfirmDelete(pedidoEliminar)} onClose={onCancelDelete}/>
    </div>
  )
}

export default PedidosPage