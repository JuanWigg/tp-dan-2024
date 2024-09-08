'use client'

import ClienteCard from "@/components/ClienteCard"
import CreateClienteModal from "@/components/CreateClienteModal"
import LoadingScreen from "@/components/LoadingScreen"
import SearchBar from "@/components/SearchBar"
import { useState, useEffect } from 'react'

function ClientesPage() {
  const [clientes, setClientes] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false)
  const [filters, setFilters] = useState({ nombre: '', cuit: '', correoElectronico: ''})

  useEffect(() => {
    fetch('/api/clientes')
        .then((res) => res.json())
        .then((data) => {
            setClientes(data)
            setLoading(false)
        })
  }, [])

  const handleCreateCliente = () => {
    setCreateModalIsOpen(true)
  }

  const onCloseCreateModal = () => {
    setCreateModalIsOpen(false)
  }

  const onSaveCreateModal = (cliente) => {
    fetch('/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cliente)
    }).then((res) => res.json())
      .then((data) => {
        setClientes([...clientes, data])
      })
    
    setCreateModalIsOpen(false)
  }

  const handleSearchBarChange = (e) => {
    const { value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      nombre: value
    }))
  }

  const handleFilterChange = (e) => {
    const { id, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value
    }))
  }

  const onBuscar = () => {
    const queryParams = new URLSearchParams(filters)
    fetch(`/api/clientes?${queryParams.toString()}`)
        .then((res) => res.json())
        .then((data) => {
            setClientes(data)
        })
  }

  if (isLoading) return <LoadingScreen />
  return (
    <div className="min-h-screen p-5 bg-gray-900">
      <div className='flex justify-between items-start mb-6'>
        <div className='flex flex-col gap-4 w-full md:w-1/2 max-w-md'>
          <div className='flex items-center gap-3'>
            <SearchBar placeholderText='Buscar clientes...' onChange={handleSearchBarChange}/>
            <button className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md' onClick={onBuscar}>Buscar</button>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label htmlFor='cuit' className='text-sm text-gray-200'>CUIT</label>
              <input
                type='text'
                id='cuit'
                className='w-full p-2 border border-gray-300 rounded-md text-sm'
                placeholder=''
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label htmlFor='correoElectronico' className='text-sm text-gray-200'>E-Mail</label>
              <input
                type='text'
                id='correoElectronico'
                className='w-full p-2 border border-gray-300 rounded-md text-sm'
                placeholder=''
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
        <button 
          className='bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md'
          onClick={handleCreateCliente}
        >
          Agregar Cliente
        </button>
      </div>

      <section className='flex flex-wrap gap-4'>
        {clientes.map(cliente => (
          <div key={cliente.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
            <ClienteCard cliente={cliente} />
          </div>
        ))}
      </section>

      <CreateClienteModal isOpen={createModalIsOpen} onClose={onCloseCreateModal} onSave={onSaveCreateModal}/>
    </div>
  )
}

export default ClientesPage
