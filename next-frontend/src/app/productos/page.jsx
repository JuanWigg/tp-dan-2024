'use client'

import CreateProductoModal from '@/components/CreateProductoModal'
import DeleteModal from '@/components/DeleteModal'
import EditProductoModal from '@/components/EditProductoModal'
import LoadingScreen from '@/components/LoadingScreen'
import ProductoItem from '@/components/ProductoItem'
import SearchBar from '@/components/SearchBar'
import { useState, useEffect } from 'react'

function ProductosPage() {
  const [isLoading, setLoading] = useState(true)
  const [productos, setProductos] = useState([])
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [productoEdicion, setProductoEdicion] = useState({})
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [productoEliminar, setProductoEliminar] = useState(null)
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false)
  const [filters, setFilters] = useState({ nombre: '', stockMin: '', stockMax: '', priceMin: '', priceMax: '' })

  useEffect(() => {
    fetch('/api/productos')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data)
        setLoading(false)
      })
  }, [])

  const handleCreateProducto = () => setCreateModalIsOpen(true)

  const onEditProducto = (producto) => {
    setProductoEdicion(producto)
    setEditModalIsOpen(true)
  }

  const onCloseEditModal = () => setEditModalIsOpen(false)

  const onSaveEditModal = (producto) => {
    fetch(`/api/productos/${producto.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    }).then(() => {
      setProductos((prevProductos) => 
        prevProductos.map((p) => (p.id === producto.id ? producto : p))
      )
    })
    setEditModalIsOpen(false)
  }

  const onDeleteProducto = (idProducto) => {
    setProductoEliminar(idProducto)
    setDeleteModalIsOpen(true)
  }

  const onConfirmDelete = (producto) => {
    fetch(`/api/productos/${producto}`, {
      method: 'DELETE',
    }).then(() => {
      setProductos((prevProductos) => prevProductos.filter((p) => p.id !== producto))
    })
    setDeleteModalIsOpen(false)
  }

  const onCancelDelete = () => setDeleteModalIsOpen(false)

  const onCloseCreateModal = () => setCreateModalIsOpen(false)

  const onSaveCreateModal = (producto) => {
    fetch('/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    })
      .then((res) => res.json())
      .then((data) => setProductos([...productos, data]))
    setCreateModalIsOpen(false)
  }

  const handleFilterChange = (e) => {
    const { id, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }))
  }

  const handleSearchBarChange = (e) => {
    const { value } = e.target
    setFilters((prevFilters) => ({ ...prevFilters, nombre: value }))
  }

  const onBuscar = () => {
    const queryParams = new URLSearchParams(filters)
    fetch(`/api/productos?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
  }

  if (!productos.length) return <p>No se encontraron productos</p>

  return (
    <div className='h-screen p-5 bg-gray-900'>
      <div className='bg-gray-800 p-4 rounded-md mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center gap-4'>
            <SearchBar placeholderText='Buscar productos...' onChange={handleSearchBarChange} />
            <button className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md' onClick={onBuscar}>
              Buscar
            </button>
          </div>
          <button
            className='bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md'
            onClick={handleCreateProducto}
          >
            Agregar Producto
          </button>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div>
            <label htmlFor='stockMin' className='text-sm text-gray-200'>Stock Min</label>
            <input
              type='number'
              id='stockMin'
              className='w-full p-2 border border-gray-300 rounded-md text-sm'
              placeholder='Mínimo'
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label htmlFor='stockMax' className='text-sm text-gray-200'>Stock Max</label>
            <input
              type='number'
              id='stockMax'
              className='w-full p-2 border border-gray-300 rounded-md text-sm'
              placeholder='Máximo'
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label htmlFor='priceMin' className='text-sm text-gray-200'>Precio Min</label>
            <input
              type='number'
              id='priceMin'
              className='w-full p-2 border border-gray-300 rounded-md text-sm'
              placeholder='Mínimo'
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label htmlFor='priceMax' className='text-sm text-gray-200'>Precio Max</label>
            <input
              type='number'
              id='priceMax'
              className='w-full p-2 border border-gray-300 rounded-md text-sm'
              placeholder='Máximo'
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
      <div className='bg-gray-800 p-4 rounded-md'>
        <table className='table-auto w-full text-gray-200'>
          <thead>
            <tr className='text-center text-gray-400'>
              <th className='p-2'>Nombre</th>
              <th className='p-2'>Descripción</th>
              <th className='p-2'>Categoría</th>
              <th className='p-2'>Stock Actual</th>
              <th className='p-2'> </th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {productos.map((producto) => (
              <ProductoItem key={producto.id} producto={producto} onEdit={onEditProducto} onDelete={onDeleteProducto} />
            ))}
          </tbody>
        </table>
      </div>

      <EditProductoModal producto={productoEdicion} isOpen={editModalIsOpen} onSave={onSaveEditModal} onClose={onCloseEditModal} />
      <DeleteModal entidad='producto' isOpen={deleteModalIsOpen} onDelete={() => onConfirmDelete(productoEliminar)} onClose={onCancelDelete} />
      <CreateProductoModal isOpen={createModalIsOpen} onClose={onCloseCreateModal} onSave={onSaveCreateModal} />
    </div>
  )
}

export default ProductosPage
