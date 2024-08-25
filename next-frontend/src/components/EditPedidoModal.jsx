function EditPedidoModal({ pedido, isOpen, onClose, onSave }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Editar Pedido</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="numeroPedido" className="block text-gray-700">
              Número de Pedido:
            </label>
            <input
              id="numeroPedido"
              type="text"
              defaultValue={pedido.numeroPedido}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fecha" className="block text-gray-700">
              Fecha:
            </label>
            <input
              id="fecha"
              type="text"
              defaultValue={pedido.fecha}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="usuario" className="block text-gray-700">
              Usuario:
            </label>
            <input
              id="usuario"
              type="text"
              defaultValue={pedido.usuario}
              className="border border-gray-300 rounded p-2 w-full"
            />
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