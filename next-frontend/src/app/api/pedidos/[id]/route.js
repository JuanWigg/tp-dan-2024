import { NextResponse } from 'next/server'
export async function DELETE(request, { params }){
    console.log("Eliminando pedido con id: ", params.id)
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/pedidos/${params.id}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        return NextResponse.error({ message: 'Error al eliminar el pedido' }, { status: response.status })
    }
    return new NextResponse({ message: 'Pedido eliminado correctamente' })
}

export async function GET(request, { params }) {
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/pedidos/${params.id}`)
    const data = await response.json()
    return NextResponse.json(data)
}

export async function PUT(request, { params }) {
    const body = await request.json()
    console.log("Actualizando pedido con id: ", params.id)
    console.log(JSON.stringify(body))
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/pedidos/${params.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    return NextResponse.json(data)
}