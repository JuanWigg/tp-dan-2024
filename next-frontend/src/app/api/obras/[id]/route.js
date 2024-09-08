import { NextResponse } from 'next/server'
export async function DELETE(request, { params }){
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/obras/${params.id}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        return NextResponse.error({ message: 'Error al eliminar la obra' }, { status: response.status })
    }
    return new NextResponse({ message: 'Obra eliminada correctamente' })
}

export async function GET(request, { params }) {
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/obras/${params.id}`)
    const data = await response.json()
    return NextResponse.json(data)
}

export async function PUT(request, { params }){
    const obra = await request.json()
    const obraFormatted = {
        ...obra,
        esRemodelacion: obra.esRemodelacion === 'true',
        lat: parseFloat(obra.lat),
        lng: parseFloat(obra.lng),
        presupuesto: parseFloat(obra.presupuesto),
        cliente: {
            id: parseInt(obra.cliente.id),
            nombre: obra.cliente.nombre
        },
    };
    console.log("Recibido PUT de Obra con: ", obraFormatted)
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/obras/${params.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obraFormatted)
    })
    if (!response.ok) {
        return NextResponse.error({ message: 'Error al editar la obra' }, { status: response.status })
    }
    return new NextResponse({ message: 'Obra editada correctamente' })
}