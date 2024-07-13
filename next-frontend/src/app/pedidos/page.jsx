import SearchBar from "@/components/SearchBar"

function PedidosPage() {
  return (
    <div>
        <div className='flex align-middle p-3'> 
            <SearchBar placeholderText='Buscar pedido...'/>
            <button className='bg-green-500 text-white p-2 rounded-md'>Nuevo Pedido</button>
        </div>
        <section className='p-3 flex flex-col gap-3'>
            <div className='text-white'> Algun pedido </div>
        </section>
    </div>
  )
}

export default PedidosPage