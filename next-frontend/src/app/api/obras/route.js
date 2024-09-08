import { NextResponse } from 'next/server'

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/obras?${searchParams.toString()}`)
    const data = await response.json()
    return NextResponse.json(data)
}

export async function POST(request){
    const obra = await request.json()
    const obraFormatted = {
        ...obra,
        esRemodelacion: obra.esRemodelacion === true,
        lat: parseFloat(obra.lat),
        lng: parseFloat(obra.lng),
        presupuesto: parseFloat(obra.presupuesto),
        cliente: {
            id: parseInt(obra.cliente.id),
            nombre: obra.cliente.nombre
        },
    };
    console.log("Recibido POST de Obra con: ", obraFormatted)
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/obras`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obraFormatted)
    })
    const data = await response.json()
    return NextResponse.json(data)
}

