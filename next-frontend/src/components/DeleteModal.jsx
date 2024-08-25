function DeleteModal({ entidad, isOpen, onDelete, onClose}) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-2xl mb-4">Eliminar {entidad}</h2>
                <p>¿Estás seguro de que deseas eliminar este {entidad}?</p>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={onDelete}
                    >
                        Sí, eliminar
                    </button>
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;