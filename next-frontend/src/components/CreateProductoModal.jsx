import { useState, useEffect } from 'react'

function CreateProductoModal({isOpen, onClose, onSave}) {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        categoria: { id: "", nombre: "" },
        stockActual: "",
        stockMinimo: "",
        precio: "",
        descuento: ""
    });

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch('/api/categorias', { cache: 'no-cache'})
            .then((res) => res.json())
            .then((data) => {
                setCategorias(data);
                if (data.length > 0) {
                    setFormData((prevData) => ({
                        ...prevData,
                        categoria: {
                            id: data[0].id,
                            nombre: data[0].nombre
                        }
                    }));
                }
            });
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        const selectedCategory = categorias[parseInt(selectedCategoryId) - 1];
        console.log(selectedCategory);
        setFormData((prevData) => ({
            ...prevData,
            categoria: selectedCategory
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-2xl mb-4">Nuevo Producto</h2>
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
                        <label htmlFor="descripcion" className="block text-gray-700">
                            Descripción:
                        </label>
                        <input
                            id="descripcion"
                            type="text"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    <div className='flex justify-between gap-3'>
                        <div className="mb-4">
                            <label htmlFor="stockActual" className="block text-gray-700">
                                Stock Actual:
                            </label>
                            <input
                                id="stockActual"
                                type="number"
                                value={formData.stockActual}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="stockMinimo" className="block text-gray-700">
                                Stock Mínimo:
                            </label>
                            <input
                                id="stockMinimo"
                                type="number"
                                value={formData.stockMinimo}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between gap-3">
                        <div className="mb-4">
                            <label htmlFor="precio" className="block text-gray-700">
                                Precio:
                            </label>
                            <input
                                id="precio"
                                type="number"
                                value={formData.precio}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="descuento" className="block text-gray-700">
                                Descuento (opcional):
                            </label>
                            <input
                                id="descuento"
                                type="number"
                                value={formData.descuento}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="categoria" className="block text-gray-700">
                            Categoría:
                        </label>
                        <select
                            id="categoria"
                            value={formData.categoria.id}
                            onChange={handleCategoryChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        >
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
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

export default CreateProductoModal;