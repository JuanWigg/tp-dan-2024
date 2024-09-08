'use client'
import PedidoItem from '@/components/PedidoItem'
import EditPedidoModal from '@/components/EditPedidoModal'
import DeleteModal from '@/components/DeleteModal'
import SearchBar from "@/components/SearchBar"
import { useState, useEffect } from 'react'
import CreatePedidoModal from '@/components/CreatePedidoModal'
import LoadingScreen from '@/components/LoadingScreen'



function PedidosPage() {
  const [pedidos, setPedidos] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [pedidoEdicion, setPedidoEdicion] = useState({})
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [pedidoEliminar, setPedidoEliminar] = useState(null)
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false)
  const [filters, setFilters] = useState({ cliente: '', estado: '' })


  const estadosPedido = ['Cualquiera', 'Aceptado', 'En preparacion', 'Entregado', 'Cancelado', 'Rechazado'];
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(estadosPedido[0]);

  const handleEstadoChange = (e) => {
    setEstadoSeleccionado(e.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      estado: e.target.value
    }))
  };

  useEffect(() => {
    fetch('/api/pedidos')
        .then((res) => res.json())
        .then((data) => {
            setPedidos(data)
            setLoading(false)
        })
  }, [])

  useEffect(() => {
    setFilters({ ...filters, estado: estadoSeleccionado })
  }, [])

  const onEditPedido = (pedido) => {
    console.log(pedido)
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
    const pedidoObject = pedidos.filter((p) => p.numeroPedido === pedido)[0]
    console.log('Pedido eliminado: ', pedidoObject)
    fetch(`/api/pedidos/${pedidoObject.id}`, {
        method: 'DELETE'
    }).then((res) => {
        console.log(pedidos)
        const pedidosActualizados = pedidos.filter((p) => p.id !== pedidoObject.id)
        console.log(pedidosActualizados)
        setPedidos(pedidosActualizados)
        setDeleteModalIsOpen(false)
    })
  }

  const onCancelDelete = () => {
    setDeleteModalIsOpen(false)
  }

  const onCancelCreate = () => {
    setCreateModalIsOpen(false)
  }

  const onSavePedido = (pedido) => {
    console.log('Pedido guardado: ', pedido)
    fetch('/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    }).then((res) => res.json())
      .then((data) => {
        setPedidos([...pedidos, data])
        setCreateModalIsOpen(false)
    })
  }

  const handleCreatePedido = () => {
    setCreateModalIsOpen(true)
  }

  const handleSearchBarChange = (e) => {
    const { value } = e.target
    console.log(value)
    setFilters((prevFilters) => ({
      ...prevFilters,
      cliente: value
    }))
  }

  const onBuscar = () => {
    const estadoFormatted = estadoSeleccionado.toUpperCase().replace(' ', '_')
    const queryParams = new URLSearchParams({ cliente: filters.cliente, estado: estadoFormatted })
    fetch(`/api/pedidos?${queryParams.toString()}`)
        .then((res) => res.json())
        .then((data) => {
            setPedidos(data)
        })
  }

  if (isLoading) return <LoadingScreen />
  return (
    <div className='h-screen bg-gray-900 pt-3'>
        <div className='bg-gray-800 p-3 mb-4 rounded-lg'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <SearchBar placeholderText='Buscar por cliente...' onChange={handleSearchBarChange}/>
                    <select
                        className='ml-4 p-2 border rounded-md'
                        value={estadoSeleccionado}
                        onChange={handleEstadoChange}
                    >
                        {estadosPedido.map((estado, index) => (
                            <option key={index} value={estado}>
                                {estado}
                            </option>
                        ))}
                    </select>
                    <button className='bg-blue-500 text-white p-2 rounded-md ml-4' onClick={onBuscar}>
                        Buscar
                    </button>
                </div>
                <button className='bg-green-500 text-white p-2 rounded-md' onClick={handleCreatePedido}>
                    Nuevo Pedido
                </button>
            </div>
        </div>  
        <div className='bg-gray-800 p-4 rounded-lg'>
            <table className='table-auto w-full'>
                <thead>
                    <tr className='text-slate-400 text-2xl text-center'>
                        <th className="max-w-28">Numero de Pedido</th>
                        <th>Fecha</th>
                        <th>Usuario</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                {
                    pedidos.length === 0 ? 
                    <tbody className='text-center'>
                        <tr>
                            <td colSpan='5' className='text-2xl text-white'>No hay pedidos</td>
                        </tr>
                    </tbody> :
                    <tbody className='text-center'>
                        {pedidos.map(pedido => (
                            <PedidoItem key={pedido.numeroPedido} pedido={pedido} onEdit={onEditPedido} onDelete={onDeletePedido} />
                        ))}
                    </tbody>
                }
            </table>
        </div>

        <CreatePedidoModal isOpen={createModalIsOpen} onClose={onCancelCreate} onSave={onSavePedido}/>
        <EditPedidoModal pedido={pedidoEdicion} isOpen={editModalIsOpen} onClose={onCloseEditModal} onSave={onSaveEditModal}/>
        <DeleteModal entidad='pedido' isOpen={deleteModalIsOpen} onDelete={() => onConfirmDelete(pedidoEliminar)} onClose={onCancelDelete}/>
    </div>
  )
}

export default PedidosPage
