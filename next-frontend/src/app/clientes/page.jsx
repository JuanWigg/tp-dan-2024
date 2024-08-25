import ClienteCard from "@/components/ClienteCard"
import SearchBar from "@/components/SearchBar"

async function getClients() {
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/clientes`)
    const data = await response.json()
    console.log(data)
    return data
}

async function ClientesPage() {
  const clients = await getClients()
  return (
    <div>
        <div className='flex align-middle p-3'> 
            <SearchBar placeholderText='Buscar cliente...'/>
            <button className='bg-green-500 text-white p-2 rounded-md'>Agregar Cliente</button>
        </div>
        <section className='p-3 flex flex-col gap-3'>
            {clients.map(client => <ClienteCard key={client.id} cliente={client}/>)}
        </section>
    </div>
  )
}

export default ClientesPage