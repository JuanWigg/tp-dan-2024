import { NextResponse } from 'next/server'
export async function DELETE(request, { params }){
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/productos/${params.id}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        return NextResponse.error({ message: 'Error al eliminar el producto' }, { status: response.status })
    }
    return new NextResponse({ message: 'Producto eliminado correctamente' })
}

export async function GET(request, { params }) {
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/productos/${params.id}`)
    const data = await response.json()
    return NextResponse.json(data)
}

export async function PUT(request, { params }){
    const producto = await request.json()
    const productoFormatted = {
        ...producto,
        id: parseInt(params.id),
        stockActual: parseInt(producto.stockActual, 10),
        stockMinimo: parseInt(producto.stockMinimo, 10),
        precio: parseFloat(producto.precio),
        descuento: producto.descuento? parseFloat(producto.descuento): 0,
        categoria: {
            id: parseInt(producto.categoria.id),
            nombre: producto.categoria.nombre
        }
    };
    console.log("Recibido PUT de Producto con: ", productoFormatted)
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/productos/${params.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoFormatted)
    })
    if (!response.ok) {
        return NextResponse.error({ message: 'Error al editar el producto' }, { status: response.status })
    }
    return new NextResponse({ message: 'Producto editado correctamente' })
}