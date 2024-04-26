import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/add.css'
import { useParams } from 'react-router-dom';
import Axios from "../../hooks/useAxios"
const baseURL = "http://localhost:8000/api/product";

const ProductForm = () => {
    const { id } = useParams(); 
    const [messageError, setMessageError] = useState('');



    const { data, isLoading, error, setData } = Axios(`http://localhost:8000/api/product/${id}`);

    if (error){
        return(
            console.error("error")
        )
    }
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: null // Nuevo estado para almacenar el archivo de imagen
    });

    const handleChange = (e) => {
        if (e.target.name === 'image') {
        setFormData({
            ...formData,
            image: e.target.files[0] // Guardar el archivo de imagen
        });
        } else {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validación de campos obligatorios
        if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock ) {
        console.error('Todos los campos son obligatorios');
        setMessageError('Todos los campos son obligatorios')
        return;
        }
        try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('stock', formData.stock);
        formDataToSend.append('image', formData.image); // Agregar la imagen al FormData
        const response = await axios.post(baseURL, formDataToSend, { withCredentials: true });
        console.log('Product created:', response.data);
        setMessageError("Producto creado");
        } catch (error) {
        console.error('Error creating product:', error);
        }
    };

    return (
        <div className='add'>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="name"
                placeholder="Nombre del producto"
                value={formData.name}
                onChange={handleChange}
                />
                <input
                type="text"
                name="description"
                placeholder="Descripción del producto"
                value={formData.description}
                onChange={handleChange}
                />
                <input
                type="number"
                name="price"
                placeholder="Precio"
                value={formData.price}
                onChange={handleChange}
                />
                <input
                type="text"
                name="category"
                placeholder="Categoría"
                value={formData.category}
                onChange={handleChange}
                />
                <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                />
                <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                />
                <div>{messageError}</div>
                <button type="submit">Editar Producto</button>
            </form>
        </div>
    );
};
export default ProductForm;