import { NextResponse } from 'next/server'
export async function DELETE(request, { params }){
    console.log("Eliminando cliente con id: ", params.id)
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/clientes/${params.id}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        return NextResponse.error({ message: 'Error al eliminar el cliente' }, { status: response.status })
    }
    return new NextResponse({ message: 'Cliente eliminado correctamente' })
}

export async function GET(request, { params }) {
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/clientes/${params.id}`)
    const data = await response.json()
    return NextResponse.json(data)
}

export async function PUT(request, { params }){
    const cliente = await request.json()
    const clienteFormatted = {
        ...cliente,
        id: parseInt(params.id),
        maximoDescubierto: parseFloat(cliente.maximoDescubierto),
        maximoObrasEjecucion: parseInt(cliente.maximoObrasEjecucion)
    };
    console.log("Recibido PUT de Producto con: ", clienteFormatted)
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/clientes/${params.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteFormatted)
    })
    if (!response.ok) {
        return NextResponse.error({ message: 'Error al editar el cliente' }, { status: response.status })
    }
    return new NextResponse({ message: 'Producto editado correctamente' })
}