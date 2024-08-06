import Link from "next/link"

function Navbar() {
  return (
    <div className='px-4 bg-violet-800 text-xl font-bold text-slate-300 flex justify-between'> 
            <div>
                <Link href='/'>
                    <span className='inline-block p-4'>Home</span>
                </Link>
            </div>
            <div>
                <Link href='/clientes'>
                    <span className='inline-block p-4'>Clientes</span>
                </Link>
                <Link href='/productos'>
                    <span className='inline-block p-4'>Productos</span>
                </Link>
                <Link href='/pedidos'>
                    <span className='inline-block p-4'>Pedidos</span>
                </Link>
            </div>
    </div>
  )
}

export default Navbar