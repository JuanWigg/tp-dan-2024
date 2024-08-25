'use client'

import CreateProductoModal from '@/components/CreateProductoModal'
import DeleteModal from '@/components/DeleteModal'
import EditProductoModal from '@/components/EditProductoModal'
import ProductoItem from '@/components/ProductoItem'
import SearchBar from '@/components/SearchBar'
import { useState, useEffect } from 'react'


function ProductosPage() {
      const [isLoading, setLoading] = useState(true)
      const [productos, setProductos] = useState([])
      const [editModalIsOpen, setEditModalIsOpen] = useState(false)
      const [productoEdicion, setProductoEdicion] = useState({ id: '', nombre: '', descripcion: '', categoria: { id: '', nombre: '' }, stockActual: '', stockMinimo: '', precio: '', descuento: '' })
      const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
      const [productoEliminar, setProductoEliminar] = useState(null)
      const [createModalIsOpen, setCreateModalIsOpen] = useState(false)

      const [filters, setFilters] = useState({ nombre: '', stockMin: '', stockMax: '', priceMin: '', priceMax: ''})

      useEffect(() => {
        fetch('/api/productos')
            .then((res) => res.json())
            .then((data) => {
                setProductos(data)
                setLoading(false)
            })
            console.log(productos)
      }, [])

      const handleCreateProducto = () => {
        setCreateModalIsOpen(true)
      }
    
      const onEditProducto = (producto) => {
        setProductoEdicion(producto)
        setEditModalIsOpen(true)
      }
    
      const onCloseEditModal = () => {
        setEditModalIsOpen(false)
      }
    
      const onSaveEditModal = (producto) => {
        console.log('Producto editado: ', producto)
        const response = fetch(`/api/productos/${producto.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        }).then((res) => {
          const productosActualizados = productos.map((p) => {
            if (p.id === producto.id) {
              return producto
            }
            return p
          })
          setProductos(productosActualizados)
        })
        setEditModalIsOpen(false)
      }
    
      const onDeleteProducto = (idProducto) => {
        setProductoEliminar(idProducto)
        setDeleteModalIsOpen(true)
      }
    
      const onConfirmDelete = (producto) => {
        console.log('Producto eliminado: ', producto)
        const response = fetch(`/api/productos/${producto}`, {
            method: 'DELETE'
        }).then((res) => {
          const productosAnteriores = productos.filter((p) => p.id !== producto)
          setProductos(productosAnteriores)
        })
        setDeleteModalIsOpen(false)
      }
    
      const onCancelDelete = () => {
        setDeleteModalIsOpen(false)
      }

      const onCloseCreateModal = () => {
        setCreateModalIsOpen(false)
      }

      const onSaveCreateModal = (producto) => {
        console.log("Guardando producto: ", producto)
        const response = fetch('/api/productos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(producto)
        }).then((res) => res.json())
        .then((data) => {
          setProductos([...productos, data])
        })
        
        setCreateModalIsOpen(false)
      }
    
      const handleFilterChange = (e) => {
        const { id, value } = e.target
        setFilters((prevFilters) => ({
          ...prevFilters,
          [id]: value
        }))
      }

      const handleSearchBarChange = (e) => {
        const { value } = e.target
        console.log(value)
        setFilters((prevFilters) => ({
          ...prevFilters,
          nombre: value
        }))
      }

      const onBuscar = () => {
        const queryParams = new URLSearchParams(filters)
        fetch(`/api/productos?${queryParams.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                setProductos(data)
            })
      }
      
    if (isLoading) return <p>Loading...</p>
    if (!productos) return <p>No se encontraron productos</p>
    return (
      <div className='h-screen'>
        <div className='flex justify-between items-center p-3'> 
          <div className='flex flex-col gap-2 w-1/2 max-w-md'>
            <div className='flex items-center gap-2'>
              <SearchBar placeholderText='Buscar productos...' onChange={handleSearchBarChange}/>
              <button className='bg-blue-500 text-white p-2 rounded-md h-10' onClick={onBuscar}>Buscar</button>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div className=''>
                <label htmlFor='stockMin' className='text-white text-sm mr-2'>Stock Min</label>
                <input
                  type='number'
                  id='stockMin'
                  className='border border-gray-300 rounded p-1 text-sm w-32'
                  placeholder='Mínimo'
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label htmlFor='stockMax' className='text-white text-sm mr-2'>Stock Max</label>
                <input
                  type='number'
                  id='stockMax'
                  className='border border-gray-300 rounded p-1 text-sm w-32'
                  placeholder='Máximo'
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label htmlFor='priceMin' className='text-white text-sm mr-1'>Precio Min</label>
                <input
                  type='number'
                  id='priceMin'
                  className='border border-gray-300 rounded p-1 text-sm w-32'
                  placeholder='Mínimo'
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label htmlFor='priceMax' className='text-white text-sm mr-1 '>Precio Max</label>
                <input
                  type='number'
                  id='priceMax'
                  className='border border-gray-300 rounded p-1 text-sm w-32'
                  placeholder='Máximo'
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>

          <button 
            className='bg-green-500 text-white p-2 rounded-md h-full'
            onClick={handleCreateProducto}
          >
            Agregar Producto
          </button>
        </div>
          <table className='table-auto w-screen mt-5'>
          <thead>
            <tr className='text-slate-400 text-2xl border border-gray-200'>
              <th className="max-w-28"> Nombre </th>
              <th> Descripcion </th>
              <th> Categoria </th>
              <th> Stock Actual </th>
              <th>        </th>
            </tr>
          </thead>
          <tbody className='text-center'>
            { productos.map(producto => <ProductoItem key={producto.id} producto={producto} onEdit={onEditProducto} onDelete={onDeleteProducto}/>)}
          </tbody>
        </table>
        <EditProductoModal producto={productoEdicion} isOpen={editModalIsOpen} onSave={onSaveEditModal} onClose={onCloseEditModal}/>
        <DeleteModal entidad='producto' isOpen={deleteModalIsOpen} onDelete={() => onConfirmDelete(productoEliminar)} onClose={onCancelDelete}/>
        <CreateProductoModal isOpen={createModalIsOpen} onClose={onCloseCreateModal} onSave={onSaveCreateModal}/>
      </div>
    )
}

export default ProductosPage