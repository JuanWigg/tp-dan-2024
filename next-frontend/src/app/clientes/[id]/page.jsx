async function getClientData(id) {
    const response = await fetch(`${process.env.GATEWAY_BASE_URL}/clientes/${id}`)
    const data = await response.json()
    console.log(data)
    return data

}

async function ClientePage({ params }) {
  const client = await getClientData(params.id)
  return (
    <section className='p-2 h-screen'>
        <div className='flex justify-between p-3'>
            <h1 className='text-bold text-slate-200 text-3xl p-3'> {client.nombre} </h1>
            <div className='flex justify-between gap-2'>
                <button className='bg-orange-500 text-white p-2 rounded-md'>Editar Cliente</button>
                <button className='bg-red-500 text-white p-2 rounded-md'>Eliminar Cliente</button>
            </div>
        </div>
        
        <hr></hr>
        <h3 className='text-2xl text-slate-300 text-bold p-3'> Datos del Cliente </h3>
        <div className='p-3'>
            <p className='text-slate-300'> <span className='text-bold'>Nombre de usuario:</span> {client.nombre} </p>
            <p className='text-slate-300'> <span className='text-bold'>Email:</span> {client.correoElectronico} </p>
            <p className='text-slate-300'> <span className='text-bold'>CUIT:</span> {client.cuit} </p>
            <p className='text-slate-300'> <span className='text-bold'>Maximo descubierto:</span> {client.maximoDescubierto} </p>  
        </div>
    </section>
  )
}

export default ClientePage