'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoadingScreen from '@/components/LoadingScreen'
import DeleteModal from '@/components/DeleteModal'
import EditObraModal from '@/components/EditObraModal'

function ObraPage({ params }) {
    const router = useRouter()
    const [obra, setObra] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const [editModalIsOpen, setEditModalIsOpen] = useState(false)

    useEffect(() => {
        fetch(`/api/obras/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setObra(data)
                setLoading(false)
            })
    }, [params.id])

    const onCancelDelete = () => {
        setDeleteModalIsOpen(false)
    }

    const onConfirmDelete = (obra) => {
        fetch(`/api/obras/${obra.id}`, {
            method: 'DELETE'
        }).then(() => {
            setDeleteModalIsOpen(false)
            router.push('/obras')
        })
    }

    const onOpenDelete = () => {
        setDeleteModalIsOpen(true)
    }

    const onCancelEdit = () => {
        setEditModalIsOpen(false)
    }

    const onConfirmEdit = (obra) => {
        fetch(`/api/obras/${obra.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obra)
        }).then(() => {
            setObra(obra)
            setEditModalIsOpen(false)
        })
    }

    const onOpenEdit = () => {
        setEditModalIsOpen(true)
    }

    if (isLoading) return <LoadingScreen />

    return (
        <section className='p-6 max-w-7xl mx-auto h-screen bg-gray-900'>
            <div className='flex justify-between items-center bg-slate-800 rounded-lg p-4 mb-6'>
                <h1 className='text-bold text-slate-300 text-3xl'>Obra: {obra.direccion}</h1>
                <div className='flex gap-4'>
                    <button className='bg-orange-500 text-white px-4 py-2 rounded-md' onClick={onOpenEdit}>Editar Obra</button>
                    <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={onOpenDelete}>Eliminar Obra</button>
                </div>
            </div>
            <div className='bg-slate-700 rounded-lg p-6 mb-6'>
                <div className='flex justify-between'>
                    <div>
                        <h4 className='text-xl text-teal-400 font-semibold mb-4'>Datos de la Obra</h4>
                        <p className='text-teal-500'><b className='text-slate-300'>Dirección:</b> {obra.direccion}</p>
                        <p className='text-teal-500'><b className='text-slate-300'>Latitud:</b> {obra.lat}</p>
                        <p className='text-teal-500'><b className='text-slate-300'>Longitud:</b> {obra.lng}</p>
                        <p className='text-teal-500'><b className='text-slate-300'>Presupuesto:</b> ${obra.presupuesto}</p>
                        <p className='text-teal-500'><b className='text-slate-300'>Estado:</b> {obra.estado}</p>
                        <p className='text-teal-500'><b className='text-slate-300'>{obra.esRemodelacion ? 'Es una remodelación' : 'No es una remodelación'}</b></p>
                    </div>
                    <div>
                        <h4 className='text-xl text-teal-400 font-semibold mb-4'>Datos del Cliente</h4>
                        <p className='text-teal-500'><b className='text-slate-300'>Nombre:</b> {obra.cliente?.nombre}</p>
                        <p className='text-teal-500'><b className='text-slate-300'>Correo Electrónico:</b> {obra.cliente?.correoElectronico}</p>
                        <p className='text-teal-500'><b className='text-slate-300'>CUIT:</b> {obra.cliente?.cuit}</p>
                        <p className='text-teal-500'><b className='text-slate-300'>Máximo Descubierto:</b> ${obra.cliente?.maximoDescubierto}</p>
                        <p className='text-teal-500'><b className='text-slate-300'>Máximo Obras en Ejecución:</b> {obra.cliente?.maximoObrasEjecucion}</p>
                    </div>
                </div>
            </div>
            <EditObraModal obra={obra} isOpen={editModalIsOpen} onClose={onCancelEdit} onSave={onConfirmEdit} />
            <DeleteModal entidad='obra' trato='esta' isOpen={deleteModalIsOpen} onDelete={() => onConfirmDelete(obra)} onClose={onCancelDelete} />
        </section>
    )
}

export default ObraPage;
