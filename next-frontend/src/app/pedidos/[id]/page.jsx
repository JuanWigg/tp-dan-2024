'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DeleteModal from '@/components/DeleteModal'
import moment from 'moment';
import 'moment/locale/es'
import LoadingScreen from '@/components/LoadingScreen'
import HistorialEstados from '@/components/HistorialEstados';

function PedidoPage({ params }) {
    const router = useRouter()
    const [pedido, setPedido] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const formattedDateWithTime = moment(pedido.fecha).format('LLL')

    const getEstadoClass = (estado) => {
        switch (estado) {
            case "RECHAZADO":
            case "CANCELADO":
                return "text-red-500";
            case "EN_PREPARACION":
                return "text-yellow-500";
            case "ACEPTADO":
            case "RECIBIDO":
                return "text-blue-500";
            case "ENTREGADO":
                return "text-green-500";
            default:
                return "text-gray-100";
        }
    }

    const getEstadoText = (estado) => {
        switch (estado) {
            case "RECHAZADO":
                return "Rechazado";
            case "CANCELADO":
                return "Cancelado";
            case "EN_PREPARACION":
                return "En preparación";
            case "ACEPTADO":
                return "Aceptado";
            case "RECIBIDO":
                return "Recibido";
            case "ENTREGADO":
                return "Entregado";
            default:
                return "Desconocido";
        }
    }

    useEffect(() => {
        moment.locale('es')
        fetch(`/api/pedidos/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setPedido(data)
                setLoading(false)
            })
    }, [params.id])

    const onCancelDelete = () => {
        setDeleteModalIsOpen(false)
    }

    const onConfirmDelete = (pedido) => {
        fetch(`/api/pedidos/${pedido.id}`, {
            method: 'DELETE'
        }).then((res) => {
            setDeleteModalIsOpen(false)
            router.push('/pedidos')
        })
    }

    const handleDeletePedido = () => {
        setDeleteModalIsOpen(true)
    }

    if (isLoading) return <LoadingScreen />

    return (
        <section className='p-4 max-w-7xl mx-auto bg-gray-900 min-h-screen h-full'>
            <div className='flex justify-between items-center bg-slate-800 rounded-lg p-4 mb-6'>
                <h1 className='text-bold text-teal-400 text-3xl'>Pedido {pedido.numeroPedido} - {pedido.id}</h1>
                <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={handleDeletePedido}>
                    Eliminar Pedido
                </button>
            </div>
            <div className='bg-slate-700 rounded-lg p-4 mb-6'>
                <div className='flex justify-between'>
                    <div className='flex flex-col justify-between h-full'>
                    <h4 className='text-xl text-teal-400 font-semibold mb-4'>Datos del Cliente</h4>
                    <p className='text-teal-500'><b className='text-slate-300'>Nombre:</b> {pedido.cliente?.nombre}</p>
                    <p className='text-teal-500'><b className='text-slate-300'>Correo:</b> {pedido.cliente?.correoElectronico}</p>
                    <p className='text-teal-500'><b className='text-slate-300'>CUIT:</b> {pedido.cliente?.cuit}</p>
                    </div>
                    <div className='flex flex-col justify-between h-full'>
                    <h4 className='text-xl text-teal-400 font-semibold mb-4'>Obra</h4>
                    <p className='text-teal-500'><b className='text-slate-300'>Dirección:</b> {pedido.obra?.direccion}</p>
                    <p className='text-teal-500'><b className='text-slate-300'>¿Remodelación?</b> {pedido.obra?.esRemodelacion ? 'Sí' : 'No'}</p>
                    </div>
                </div>
            </div>

            <div className='bg-slate-700 rounded-lg p-4 mb-6'>
                <h3 className='text-2xl text-teal-400 font-semibold mb-4'>Productos del Pedido</h3>
                <div className='space-y-4'>
                    {pedido.detalle?.map((item, index) => (
                        <div key={index} className='flex justify-between bg-slate-600 p-4 rounded-md'>
                            <div>
                                <p className='text-teal-500'><b className='text-slate-300'>Producto:</b> {item.producto.nombre}</p>
                                <p className='text-teal-500'><b className='text-slate-300'>Descripción:</b> {item.producto.descripcion}</p>
                            </div>
                            <div className='text-right'>
                                <p className='text-teal-500'><b className='text-slate-300'>Cantidad:</b> {item.cantidad}</p>
                                <p className='text-teal-500'><b className='text-slate-300'>Total:</b> ${item.total}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-slate-700 rounded-lg p-4'>
                <h3 className='text-2xl text-teal-400 font-semibold mb-4'>Información del Pedido</h3>
                <p className='text-teal-500'><b className='text-slate-300'>Estado:</b> <span className={getEstadoClass(pedido.estado)}>{getEstadoText(pedido.estado)}</span></p>
                <p className='text-teal-500'><b className='text-slate-300'>Fecha:</b> {formattedDateWithTime}</p>
                <p className='text-teal-500'><b className='text-slate-300'>Usuario:</b> {pedido.usuario}</p>
                <p className='text-teal-500'><b className='text-slate-300'>Observaciones:</b> {pedido.observaciones || 'Sin observaciones'}</p>
                <p className='text-teal-500'><b className='text-slate-300'>Total:</b> ${pedido.total}</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 mt-4">
                <h3 className="text-2xl text-teal-400 font-semibold mb-4">Historial de Cambios</h3>
                <HistorialEstados historialEstados={pedido.historialEstados} />
            </div>
            <DeleteModal entidad='pedido' isOpen={deleteModalIsOpen} onDelete={() => onConfirmDelete(pedido)} onClose={onCancelDelete} />
        </section>
    )
}

export default PedidoPage;
