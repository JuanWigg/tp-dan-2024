async function getClientData(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const data = await response.json()
    return data

}

async function ClientePage({ params }) {
  const client = await getClientData(params.id)
  return (
    <section className='p-2 h-screen'>
        <div className='flex justify-between p-3'>
            <h1 className='text-bold text-slate-200 text-3xl p-3'> {client.name} </h1>
            <div className='flex justify-between gap-2'>
                <button className='bg-orange-500 text-white p-2 rounded-md'>Editar Cliente</button>
                <button className='bg-red-500 text-white p-2 rounded-md'>Eliminar Cliente</button>
            </div>
        </div>
        
        <hr></hr>
        <h3 className='text-2xl text-slate-300 text-bold p-3'> Datos del Cliente </h3>
        <div className='p-3'>
            <p className='text-slate-300'> <span className='text-bold'>Nombre de usuario:</span> {client.username} </p>
            <p className='text-slate-300'> <span className='text-bold'>Email:</span> {client.email} </p>
            <p className='text-slate-300'> <span className='text-bold'>Teléfono:</span> {client.phone} </p>
            <p className='text-slate-300'> <span className='text-bold'>Sitio Web:</span> {client.website} </p>  
        </div>
    </section>
  )
}

export default ClientePage