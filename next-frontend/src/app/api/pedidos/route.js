import { NextResponse } from 'next/server'


export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/pedidos?${searchParams.toString()}`)
    if(!response.ok){
        return NextResponse.error()
    }
    const data = await response.json()
    return NextResponse.json(data)
}

export async function POST(request){
    const pedido = {...await request.json(), usuario: 'Hardcoded User' }
    console.log("Recibido POST de Pedido con: ", pedido)
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/pedidos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    })
    if (!response.ok) {
        return NextResponse.error()
    }
    const data = await response.json()
    return NextResponse.json(data)
}