import { NextResponse } from 'next/server'

export async function GET() {
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/categorias`)
    const data = await response.json()
    return NextResponse.json(data)
}