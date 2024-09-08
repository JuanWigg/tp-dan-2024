import { NextResponse } from 'next/server'


export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/clientes?${searchParams.toString()}`)
    if(!response.ok){
        return NextResponse.error()
    }
    const data = await response.json()
    return NextResponse.json(data)
}

export async function POST(request){
    const cliente = await request.json()
    const clienteFormatted = {
        ...cliente,
        maximoDescubierto: parseFloat(cliente.maximoDescubierto),
        maximoObrasEjecucion: parseInt(cliente.maximoObrasEjecucion)
    }
    console.log("Recibido POST de Producto con: ", clienteFormatted)
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/clientes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteFormatted)
    })
    if (!response.ok) {
        return NextResponse.error()
    }
    const data = await response.json()
    return NextResponse.json(data)
}