'use client'

import CreateObraModal from '@/components/CreateObraModal'
import ObraCard from '@/components/ObraCard'
import SearchBar from '@/components/SearchBar'
import LoadingScreen from '@/components/LoadingScreen'
import { useState, useEffect } from 'react'

function ObrasPage() {
    const [obras, setObras] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filters, setFilters] = useState({ cliente: '', direccion: ''})
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false)

    useEffect(() => {
        fetch('/api/obras')
            .then((res) => res.json())
            .then((data) => {
                setObras(data)
                setIsLoading(false)
            })
    }, [])

    const handleCreateModal = () => {
        setCreateModalIsOpen(true)
    }

    const onCloseCreateModal = () => {
        setCreateModalIsOpen(false)
    }

    const onSaveCreateModal = (obra) => {
        fetch('/api/obras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obra)
        }).then((res) => res.json())
        .then((data) => {
            setObras([...obras, data])
        })
        setCreateModalIsOpen(false)
    }

    const handleSearchBarChange = (e) => {
        const { value } = e.target
        setFilters((prevFilters) => ({
          ...prevFilters,
          cliente: value
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
        fetch(`/api/obras?${queryParams.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                setObras(data)
            })
    }

    if (isLoading) return <LoadingScreen />

    return (
        <div className="min-h-screen bg-gray-900 p-5">
            <div className='flex justify-between items-center mb-6'>
                <div className='flex flex-col gap-2 w-full md:w-1/2 max-w-md'>
                    <div className='flex items-center gap-3'>
                        <SearchBar placeholderText='Buscar por cliente...' onChange={handleSearchBarChange} />
                        <button className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md' onClick={onBuscar}>Buscar</button>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div>
                            <label htmlFor='direccion' className='text-sm text-gray-200'>Dirección</label>
                            <input
                                type='text'
                                id='direccion'
                                className='w-full p-2 border border-gray-300 rounded-md text-sm'
                                placeholder=''
                                onChange={handleFilterChange}
                            />
                        </div>
                    </div>
                </div>
                <button 
                    className='bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md'
                    onClick={handleCreateModal}
                >
                    Agregar Obra
                </button>
            </div>

            <section className='grid grid-cols-1 gap-4'>
                {obras.map(obra => <ObraCard key={obra.id} obra={obra} />)}
            </section>

            <CreateObraModal isOpen={createModalIsOpen} onClose={onCloseCreateModal} onSave={onSaveCreateModal} />
        </div>
    )
}

export default ObrasPage
