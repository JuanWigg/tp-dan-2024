'use client'

import DeleteModal from "@/components/DeleteModal"
import EditProductoModal from "@/components/EditProductoModal"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoadingScreen from '@/components/LoadingScreen'

function ProductoPage({ params }) {
  const router = useRouter()
  const [producto, setProducto] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

  useEffect(() => {
    fetch(`/api/productos/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
            setProducto(data)
            setLoading(false)
        })
  }, [])

  const onSaveEditModal = (producto) => {
    const response = fetch(`/api/productos/${producto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    }).then((res) => {
      setProducto(producto)
      setEditModalIsOpen(false)
    })
  }

  const onCloseEditModal = () => {
    setEditModalIsOpen(false)
  }

  const handleEditProducto = () => {
    setEditModalIsOpen(true)
  }

  const onCancelDelete = () => {
    setDeleteModalIsOpen(false)
  }

  const onConfirmDelete = (producto) => {
    fetch(`/api/productos/${producto.id}`, {
        method: 'DELETE'
    }).then((res) => {
      setDeleteModalIsOpen(false)
      router.push('/productos')
    })
  }

  const handleDeleteProducto = () => {
    setDeleteModalIsOpen(true)
  }

  if (isLoading) return <LoadingScreen />

  return (
    <section className='p-6 h-screen bg-gray-900 text-white'>
        <div className='flex justify-between items-center bg-gray-800 p-5 rounded-lg shadow-md'>
            <h1 className='font-bold text-4xl text-teal-400'> {producto.nombre} </h1>
            <div className='flex gap-3'>
                <button className='bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-lg' onClick={handleEditProducto}>
                    Editar Producto
                </button>
                <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-lg' onClick={handleDeleteProducto}>
                    Eliminar Producto
                </button>
            </div>
        </div>

        <hr className='my-6 border-gray-600' />

        <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
            <h3 className='text-3xl font-semibold text-teal-400 mb-5'>Detalles del Producto</h3>
            <div className='space-y-1'>
                <p><span className='font-semibold text-gray-400'>ID:</span> {producto.id}</p>
                <p><span className='font-semibold text-gray-400'>Descripción:</span> {producto.descripcion}</p>
                <p><span className='font-semibold text-gray-400'>Categoría:</span> {producto.categoria?.nombre}</p>
                <p><span className='font-semibold text-gray-400'>Precio:</span> ${producto.precio}</p>
                <p><span className='font-semibold text-gray-400'>Stock Actual:</span> {producto.stockActual}</p>
                <p><span className='font-semibold text-gray-400'>Stock Mínimo:</span> {producto.stockMinimo}</p>
                <p><span className='font-semibold text-gray-400'>Descuento:</span> {producto.descuento || 0}%</p>
            </div>
        </div>

        <EditProductoModal producto={producto} isOpen={editModalIsOpen} onSave={onSaveEditModal} onClose={onCloseEditModal} />
        <DeleteModal entidad='producto' isOpen={deleteModalIsOpen} onDelete={() => onConfirmDelete(producto)} onClose={onCancelDelete} />
    </section>
  )
}

export default ProductoPage
