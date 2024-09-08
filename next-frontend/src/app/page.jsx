import Link from "next/link";

export default function Home() {
  return (
    <div className='p-5 h-screen bg-gray-900'> 
       <section>
        <h1 className='text-4xl font-bold text-slate-300 mb-4'>Sistema de Gestión de Pedidos de Construcción</h1>
        <p className="mt-2 text-slate-200 text-lg tracking-wide">Monitorea y gestiona pedidos de construcción</p>
        <hr className='border-gray-600 my-6'/>

        <h2 className='text-3xl font-bold text-zinc-300 my-6 text-center bg-gray-800 p-4 rounded-md'>
          Funcionalidades
        </h2>

        <ul className='grid grid-cols-2 gap-4 text-xl text-slate-300 p-1'>
          <Link href='/clientes'>
            <div className='bg-indigo-700 hover:bg-indigo-600 rounded-md p-4 text-center transition-all duration-300'>
              <li className='p-2'>Gestión de Clientes</li>
            </div>
          </Link>

          <Link href='/productos'>
            <div className='bg-indigo-700 hover:bg-indigo-600 rounded-md p-4 text-center transition-all duration-300'>
              <li className='p-2'>Gestión de Productos</li>
            </div>
          </Link>

          <Link href='/pedidos'>
            <div className='bg-indigo-700 hover:bg-indigo-600 rounded-md p-4 text-center transition-all duration-300'>
              <li className='p-2'>Gestión de Pedidos</li>
            </div>
          </Link>

          <Link href='/obras'>
            <div className='bg-indigo-700 hover:bg-indigo-600 rounded-md p-4 text-center transition-all duration-300'>
              <li className='p-2'>Gestión de Obras</li>
            </div>
          </Link>
        </ul>
       </section>
    </div>
  );
}
