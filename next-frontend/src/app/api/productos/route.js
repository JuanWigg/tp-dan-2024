import { NextResponse } from 'next/server'

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    console.log(searchParams.toString())
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/productos?${searchParams.toString()}`)
    const data = await response.json()
    return NextResponse.json(data)
}

export async function POST(request){
    const producto = await request.json()
    console.log(producto)
    const productoFormatted = {
        ...producto,
        stockActual: parseInt(producto.stockActual, 10),
        stockMinimo: parseInt(producto.stockMinimo, 10),
        precio: parseFloat(producto.precio),
        descuento: producto.descuento? parseFloat(producto.descuento): null,
        categoria: {
            id: parseInt(producto.categoria.id),
            nombre: producto.categoria.nombre
        }
    };
    console.log("Recibido POST de Producto con: ", productoFormatted)
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/productos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoFormatted)
    })
    const data = await response.json()
    return NextResponse.json(data)
}
