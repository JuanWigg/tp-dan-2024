'use client'

import DeleteModal from "@/components/DeleteModal"
import EditProductoModal from "@/components/EditProductoModal"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
    console.log('Producto editado: ', producto)
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

  if (isLoading) return <p>Loading...</p>
  return (
    <section className='p-2 h-screen'>
        <div className='flex justify-between p-3'>
            <h1 className='text-bold text-slate-200 text-3xl p-3'> {producto.nombre} </h1>
            <div className='flex justify-between gap-2'>
                <button className='bg-orange-500 text-white p-2 rounded-md' onClick={handleEditProducto}>Editar Producto</button>
                <button className='bg-red-500 text-white p-2 rounded-md' onClick={handleDeleteProducto}>Eliminar Producto</button>
            </div>
        </div>
        
        <hr></hr>
        <h3 className='text-2xl text-slate-300 text-bold p-3'> Datos del Producto </h3>
        <div className='p-3'>
            <p className='text-slate-300'>ID: {producto.id}</p>
            <p className='text-slate-300'>Descripcion: {producto.descripcion}</p>
            <p className='text-slate-300'> <span className='text-bold'>Categoria:</span> {producto.categoria.nombre} </p>
            <p className='text-slate-300'> <span className='text-bold'>Precio:</span> ${producto.precio} </p>
            <p className='text-slate-300'> <span className='text-bold'>Stock:</span> {producto.stockActual} </p>
            <p className='text-slate-300'> <span className='text-bold'>Stock Minimo:</span> {producto.stockMinimo} </p>
            <p className='text-slate-300'> <span className='text-bold'>Descuento:</span> {producto.descuento} </p>
        </div>
        <EditProductoModal producto={producto} isOpen={editModalIsOpen} onSave={onSaveEditModal} onClose={onCloseEditModal}/>
        <DeleteModal entidad='producto' isOpen={deleteModalIsOpen} onDelete={() => onConfirmDelete(producto)} onClose={onCancelDelete}/>
    </section>
  )
}

export default ProductoPage