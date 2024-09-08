import { useState, useEffect } from 'react'

function EditClienteModal({cliente, isOpen, onClose, onSave}) {
    const [formData, setFormData] = useState({
        id: "",
        nombre: "",
        correoElectronico: "",
        cuit: "",
        maximoDescubierto: "",
        maximoObrasEjecucion: ""
    });
    
    useEffect(() => {
        if (cliente) {
            setFormData({
                id: cliente.id,
                nombre: cliente.nombre,
                correoElectronico: cliente.correoElectronico,
                cuit: cliente.cuit,
                maximoDescubierto: cliente.maximoDescubierto,
                maximoObrasEjecucion: cliente.maximoObrasEjecucion
            });
        }
    }, [cliente]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
            <div className="flex justify-between">
                <h2 className="text-2xl mb-4">Editar Cliente</h2>
                <h2 className="text-2xl mb-4 text-gray-500"> ID: {cliente.id} </h2>
            </div>
                <form>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-gray-700">
                            Nombre:
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="correoElectronico" className="block text-gray-700">
                            Correo Electrónico:
                        </label>
                        <input
                            id="correoElectronico"
                            type="text"
                            value={formData.correoElectronico}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    <div className='flex justify-between gap-3'>
                        <div className="mb-4">
                            <label htmlFor="cuit" className="block text-gray-700">
                                CUIT:
                            </label>
                            <input
                                id="cuit"
                                type="text"
                                value={formData.cuit}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="maximoDescubierto" className="block text-gray-700">
                                Maximo descubierto:
                            </label>
                            <input
                                id="maximoDescubierto"
                                type="number"
                                value={formData.maximoDescubierto}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between gap-3">
                        <div className="mb-4">
                            <label htmlFor="maximoObrasEjecucion" className="block text-gray-700">
                                Máximo de obras en ejecución:
                            </label>
                            <input
                                id="maximoObrasEjecucion"
                                type="number"
                                value={formData.maximoObrasEjecucion}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={handleSave}
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                            onClick={() => onClose()}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default EditClienteModal;
