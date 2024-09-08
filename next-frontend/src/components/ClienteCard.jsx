import Link from "next/link"

function ClienteCard({ cliente }) {
  return (
    <Link href={`/clientes/${cliente.id}`}>
      <div className='bg-gray-800 text-gray-300 rounded-lg shadow-lg p-4 hover:bg-gray-700 transition-colors'>
        <h3 className='text-xl font-semibold mb-1'>{cliente.nombre}</h3>
        <p className='text-sm mb-1'>{cliente.correoElectronico}</p>
        <p className='text-sm'>{cliente.cuit}</p>
      </div>
    </Link>
  )
}

export default ClienteCard
