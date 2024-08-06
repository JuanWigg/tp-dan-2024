import Link from "next/link"

function ClienteCard({ cliente }) {
  return (
    <div>
        <Link href={`/clientes/${cliente.id}`}>
            <div className='p-4 bg-blue-800 text-slate-300 rounded-md'>
                <h3 className='text-xl font-bold'>{cliente.name}</h3>
                <p className='text-sm'>{cliente.email}</p>
                <p className='text-sm'>{cliente.phone}</p>
            </div>
        </Link>
    </div>
  )
}

export default ClienteCard