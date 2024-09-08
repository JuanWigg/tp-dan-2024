'use client'

import React, { useState, useEffect } from 'react';

function SelectProductModal({ isOpen, onClose, onAddProduct }) {
    const [productosDisponibles, setProductosDisponibles] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [cantidad, setCantidad] = useState('');

    useEffect(() => {
        fetch('/api/productos')
            .then((res) => res.json())
            .then((data) => {
                setProductosDisponibles(data);
            });
    }, []);

    const handleAdd = () => {
        const producto = productosDisponibles.find(p => p.id.toString() === selectedProduct);
        if (producto) {
            onAddProduct({ producto, cantidad });
            onClose();
        }
    };

    const handleCantidadChange = (e) => {
        const value = e.target.value;
        if (value === '') {
            setCantidad('');
        } else if (!isNaN(value) && Number(value) > 0) {
            setCantidad(Number(value));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Seleccionar Producto</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Producto</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                        { !selectedProduct ? <option value="">Seleccione un producto</option> : null }
                        {productosDisponibles.map((producto) => (
                            <option key={producto.id} value={producto.id}>
                                {producto.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Cantidad</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded"
                        value={cantidad}
                        onChange={handleCantidadChange}
                        min="1"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded mr-2"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            selectedProduct && cantidad !== '' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                        onClick={handleAdd}
                        disabled={!selectedProduct || cantidad === ''}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SelectProductModal;
