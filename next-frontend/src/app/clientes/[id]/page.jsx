'use client'
import DeleteModal from "@/components/DeleteModal"
import LoadingScreen from "@/components/LoadingScreen"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import EditClienteModal from "@/components/EditClienteModal"

function ClientePage({ params }) {
  const router = useRouter()
  const [cliente, setCliente] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

  useEffect(() => {
    fetch(`/api/clientes/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
            setCliente(data)
            setLoading(false)
        })
  }, [])

  const onSaveEditModal = (cliente) => {
    fetch(`/api/clientes/${cliente.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    }).then(() => {
      setCliente(cliente)
      setEditModalIsOpen(false)
    })
  }

  const onCloseEditModal = () => {
    setEditModalIsOpen(false)
  }

  const handleEditCliente = () => {
    setEditModalIsOpen(true)
  }

  const onCancelDelete = () => {
    setDeleteModalIsOpen(false)
  }

  const onConfirmDelete = (cliente) => {
    fetch(`/api/clientes/${cliente.id}`, {
        method: 'DELETE'
    }).then(() => {
      setDeleteModalIsOpen(false)
      router.push('/clientes')
    })
  }

  const handleDeleteCliente = () => {
    setDeleteModalIsOpen(true)
  }
  
  if (isLoading) return <LoadingScreen />
  return (
    <section className='p-6 h-screen bg-gray-900 text-slate-100'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-bold text-white'>{cliente.nombre}</h1>
        <div className='flex gap-4'>
          <button className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-all shadow-lg'>
            Editar Cliente
          </button>
          <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all shadow-lg' onClick={handleDeleteCliente}>
            Eliminar Cliente
          </button>
        </div>
      </div>

      <hr className='border-slate-600 mb-6'/>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-gray-800 p-5 rounded-lg shadow-lg'>
          <h3 className='text-2xl font-semibold mb-3 text-teal-400'>Información del Cliente</h3>
          <p className='mb-2'><span className='font-bold text-slate-300'>Nombre:</span> {cliente.nombre}</p>
          <p className='mb-2'><span className='font-bold text-slate-300'>Correo Electrónico:</span> {cliente.correoElectronico}</p>
          <p className='mb-2'><span className='font-bold text-slate-300'>CUIT:</span> {cliente.cuit}</p>
          <p className='mb-2'><span className='font-bold text-slate-300'>Máximo descubierto:</span> {cliente.maximoDescubierto}</p>
          <p className='mb-2'><span className='font-bold text-slate-300'>Máximo de obras en ejecución:</span> {cliente.maximoObrasEjecucion}</p>
        </div>
      </div>

      <EditClienteModal isOpen={editModalIsOpen} onClose={onCloseEditModal} onSave={onSaveEditModal} cliente={cliente}/>
      <DeleteModal entidad='cliente' mensajeAdicional='Cuidado, esto también eliminará todas las obras del cliente' isOpen={deleteModalIsOpen} onDelete={() => onConfirmDelete(cliente)} onClose={onCancelDelete}/>
    </section>
  )
}

export default ClientePage
