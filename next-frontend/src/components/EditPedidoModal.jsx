'use client'

import { useState, useEffect } from 'react';

function EditPedidoModal({ pedido, isOpen, onClose, onSave }) {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('ENTREGADO');

  const handleChangeEstadoSeleccionado = (e) => {
    setEstadoSeleccionado(e.target.value);
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Editar estado de Pedido</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="numeroPedido" className="block text-gray-700">
              Número de Pedido:
            </label>
            <input
              id="numeroPedido"
              type="text"
              defaultValue={pedido.numeroPedido}
              disabled={true}
              className="border border-gray-400 rounded p-2 w-full text-gray-400"
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="estado" className="block text-gray-700">
              Estado:
            </label>
            <select
              id="estado"
              defaultValue={pedido.estado}
              className="border border-gray-400 rounded p-2 w-full"
              onChange={handleChangeEstadoSeleccionado}
            >
              <option value="ENTREGADO">Entregado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>
          {/* Agrega más campos según sea necesario */}
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              // Lógica para guardar los cambios
              onSave(pedido); // Esta función puede recibir los valores editados
              onClose(); // Cerrar modal después de guardar
            }}
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            onClick={onClose}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPedidoModal;