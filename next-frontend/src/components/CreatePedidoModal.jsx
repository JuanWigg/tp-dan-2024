'use client';

import React, { useState, useEffect } from 'react';
import SelectProductModal from '@/components/SelectProductoModal';

function CreatePedidoModal({ isOpen, onClose, onSave }) {
    const [selectedCliente, setSelectedCliente] = useState('');
    const [selectedObra, setSelectedObra] = useState('');
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [obras, setObras] = useState([]);
    const [formData, setFormData] = useState({
        observaciones: "",
        cliente: { id: "", nombre: "" },
        obra: { id: "", direccion: "" },
        detalle: []
    })
    const [isSelectProductModalOpen, setIsSelectProductModalOpen] = useState(false);

    useEffect(() => {
        fetch('/api/clientes')
        .then((res) => res.json())
        .then((data) => {
            setClientes(data)
        })
    }, []);

    useEffect(() => {
        if (selectedCliente) {
            const selectedClientName = clientes.find(cliente => cliente.id.toString() === selectedCliente).nombre;
            const queryParams = new URLSearchParams({ cliente: selectedClientName });
            fetch(`/api/obras?${queryParams.toString()}`)
                .then((res) => res.json())
                .then((data) => {
                    setObras(data)
                })
        } else {
            setObras([]);
        }
    }, [selectedCliente]);

    const handleRemoveProduct = (id) => {
        setProductos(productos.filter((producto) => producto.id !== id));
        setFormData((prevData) => ({
            ...prevData,
            detalle: prevData.detalle.filter((detalle) => detalle.producto.id !== id)
        }));
    };

    const handleObservacionesChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            observaciones: e.target.value
        }));
        console.log(formData);
    }

    const handleClientChange = (e) => {
        const selectedClientId = e.target.value;
        const selectedClient = clientes.find(cliente => cliente.id.toString() === selectedClientId);
        setSelectedCliente(selectedClientId);
        if (selectedClient) {
            setFormData((prevData) => ({
                ...prevData,
                cliente: selectedClient
            }));
        }
    };

    const handleObraChange = (e) => {
        const selectedObraId = e.target.value;
        const selectedObra = obras.find(obra => obra.id.toString() === selectedObraId);
        setSelectedObra(selectedObraId);
        if (selectedObra) {
            setFormData((prevData) => ({
                ...prevData,
                obra: selectedObra
            }));
        }
    }

    const handleSave = () => {
        onSave(formData);
    };

    const handleAddProductClick = () => {
        setIsSelectProductModalOpen(true);
    };

    const handleAddProduct = ({ producto, cantidad }) => {
        setProductos([...productos, { id: producto.id, nombre: producto.nombre, cantidad }]);
        setFormData((prevData) => ({
            ...prevData,
            detalle: [...prevData.detalle, { producto, cantidad }]
        }));
        setIsSelectProductModalOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Crear Pedido</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Observaciones</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        rows="3"
                        value={formData.observaciones}
                        onChange={handleObservacionesChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Cliente</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={selectedCliente}
                        onChange={handleClientChange}
                    >
                        { !selectedCliente ? <option value="">Seleccione un cliente</option> : null}
                        {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Obra</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={selectedObra}
                        onChange={handleObraChange}
                        disabled={!selectedCliente}
                    >
                        { !selectedObra ? <option value="">Seleccione una obra</option> : null } 
                        {obras.map((obra) => (
                            <option key={obra.id} value={obra.id}>
                                {obra.direccion}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Detalle - Productos */}
                <h3 className="text-lg font-semibold mb-2">Detalle del Pedido</h3>
                <div className="flex-grow overflow-y-auto max-h-[200px]"> {/* Ajusta max-h según sea necesario */}
                    {productos.map((producto) => (
                        <div key={producto.id} className="flex items-center mb-2">
                            <span className="flex-grow p-2">{producto.nombre}</span>
                            <span className="w-24 p-2">{producto.cantidad}</span>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveProduct(producto.id)}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    <button
                        className="text-blue-500 hover:text-blue-700 mb-4"
                        onClick={handleAddProductClick}
                    >
                        + Añadir Producto
                    </button>
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded mr-2"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            selectedCliente && productos.length !== 0 && selectedObra ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                        onClick={handleSave}
                        disabled={!selectedCliente || !selectedObra || productos.length === 0}
                    >
                        Guardar
                    </button>
                </div>
            </div>
            <SelectProductModal
                isOpen={isSelectProductModalOpen}
                onClose={() => setIsSelectProductModalOpen(false)}
                onAddProduct={handleAddProduct}
            />
        </div>
    );
}

export default CreatePedidoModal;
