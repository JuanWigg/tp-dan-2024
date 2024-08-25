import Link from "next/link"

function ClienteCard({ cliente }) {
  return (
    <div>
        <Link href={`/clientes/${cliente.id}`}>
            <div className='p-4 bg-blue-800 text-slate-300 rounded-md'>
                <h3 className='text-xl font-bold'>{cliente.nombre}</h3>
                <p className='text-sm'>{cliente.correoElectronico}</p>
                <p className='text-sm'>{cliente.cuit}</p>
            </div>
        </Link>
    </div>
  )
}

export default ClienteCard