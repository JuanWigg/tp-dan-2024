import Link from "next/link"

function ObraCard({ obra }) {
    const getEstadoClass = (estado) => {
        switch (estado) {
            case "PENDIENTE":
                return "text-yellow-400";
            case "HABILITADA":
                return "text-blue-400";
            case "FINALIZADA":
                return "text-green-400";
            default:
                return "text-gray-300";
        }
    }

    return (
        <div>
            <Link href={`/obras/${obra.id}`}>
                <div className='p-4 bg-gray-800 text-gray-200 rounded-md shadow-md flex items-center justify-between'>
                    <div>
                        <h3 className='text-lg font-semibold'>Dirección: {obra.direccion}</h3>
                        <p className='text-sm'>Cliente: <b>{obra.cliente.nombre}</b></p>
                    </div>
                    <div>
                        <p className={`text-sm ${getEstadoClass(obra.estado)} font-semibold`}>
                            {obra.estado}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ObraCard
