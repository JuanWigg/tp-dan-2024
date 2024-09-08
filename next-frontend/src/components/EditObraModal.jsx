import { useState, useEffect } from 'react'

function EditObraModal({obra, isOpen, onClose, onSave}) {
    const [formData, setFormData] = useState({
        direccion: "",
        esRemodelacion: false,
        lat: "",
        lng: "",
        presupuesto: "",
        cliente: { id: "", nombre: "" },
    });

    useEffect(() => {
        if (obra) {
            setFormData({
                id: obra.id,
                direccion: obra.direccion,
                esRemodelacion: obra.esRemodelacion,
                lat: obra.lat,
                lng: obra.lng,
                presupuesto: obra.presupuesto,
                cliente: { id: obra.cliente.id, nombre: obra.cliente.nombre },
            });
        }
    }, [obra]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: checked
        }));
    };

    const handleClientChange = (e) => {
        const selectedClientId = e.target.value;
        const selectedClient = clientes.find(cliente => cliente.id.toString() === selectedClientId);
        if (selectedClient) {
            setFormData((prevData) => ({
                ...prevData,
                cliente: selectedClient
            }));
        }
    };

    const handleSave = () => {
        onSave(formData);
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-2xl mb-4">Nueva Obra</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="direccion" className="block text-gray-700">
                            Dirección:
                        </label>
                        <input
                            id="direccion"
                            type="text"
                            value={formData.direccion}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label htmlFor="esRemodelacion" className="block text-gray-700 mr-5">
                            ¿Es una remodelación?
                        </label>
                        <input
                            type="checkbox"
                            id="esRemodelacion"
                            name="esRemodelacion"
                            checked={formData.esRemodelacion}
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                    </div>
                    <div className='flex justify-between gap-3'>
                        <div className="mb-4">
                            <label htmlFor="lat" className="block text-gray-700">
                                Latitud:
                            </label>
                            <input
                                id="lat"
                                type="number"
                                value={formData.lat}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lng" className="block text-gray-700">
                                Longitud:
                            </label>
                            <input
                                id="lng"
                                type="number"
                                value={formData.lng}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between gap-3">
                        <div className="mb-4">
                            <label htmlFor="presupuesto" className="block text-gray-700">
                                Presupuesto:
                            </label>
                            <input
                                id="presupuesto"
                                type="number"
                                value={formData.presupuesto}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cliente" className="block text-gray-700">
                            Cliente:
                        </label>
                        <select
                            id="cliente"
                            value={formData.cliente.id}
                            onChange={handleClientChange}
                            disabled={true}
                            className="border border-gray-300 rounded p-2 w-full"
                        >
                                <option key={obra.cliente.id} value={obra.cliente.id}>
                                    {obra.cliente.nombre}
                                </option>

                        </select>
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

export default EditObraModal;