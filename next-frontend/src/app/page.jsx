import Link from "next/link";

export default function Home() {
  return (
    <div className='p-5 h-screen'> 
       <section>
        <h1 className='text-3xl font-bold text-slate-300'>Home</h1>
        <p className='text-slate-300 p-2 mb-4'>Bienvenido a la aplicación de gestión de pedidos</p>
        <hr></hr>
        <h2 className='text-3xl font-bold text-zinc-300 my-6 text-center bg-violet-800 p-2 rounded-md'> Funcionalidades </h2>
        <ul className='text-xl text-slate-300 p-1 flex justify-between align-middle text-center'>
          <Link href='/clientes'>
            <div className='bg-indigo-700 rounded-md p-4 text-xl'>
              <li className='p-2'>Gestión de Clientes</li>
            </div>
          </Link>
          <Link href='/productos'>
            <div className='bg-indigo-700 rounded-md p-4 text-xl'>
              <li className='p-2'>Gestión de Productos</li>
            </div>
          </Link>
          <Link href='/pedidos'>
            <div className='bg-indigo-700 rounded-md p-4 text-xl'>
              <li className='p-2'>Gestión de Pedidos</li>
            </div>
          </Link>
        </ul>
       </section>
    </div>
  );
}
