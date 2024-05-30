// import React, { useState } from 'react';
// import axios from 'axios';
// import '../../styles/add.css'

// const baseURL = "http://localhost:8000/api/product";

// const ProductForm = () => {
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     stock: '',
//     image: null // Nuevo estado para almacenar el archivo de imagen
//   });

//   const handleChange = (e) => {
//     if (e.target.name === 'image') {
//       setFormData({
//         ...formData,
//         image: e.target.files[0] // Guardar el archivo de imagen
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [e.target.name]: e.target.value
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validación de campos obligatorios
//     if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock || !formData.image) {
//       console.error('Todos los campos son obligatorios');
//       setError('Todos los campos son obligatorios')
//       return;
//     }

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('stock', formData.stock);
//       formDataToSend.append('image', formData.image); // Agregar la imagen al FormData

//       const response = await axios.post(baseURL, formDataToSend, { withCredentials: true });
//       console.log('Product created:', response.data);
//       setError("Producto creado");
//     } catch (error) {
//       console.error('Error creating product:', error);
//     }
//   };

//   return (
//     <div className='add'>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Nombre del producto"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Descripción del producto"
//           value={formData.description}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Precio"
//           value={formData.price}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="category"
//           placeholder="Categoría"
//           value={formData.category}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           name="stock"
//           placeholder="Stock"
//           value={formData.stock}
//           onChange={handleChange}
//         />
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={handleChange}
//         />
//         <div>{error}</div>
//         <button type="submit">Crear Producto</button>
//       </form>
//     </div>
//   );
// };
// export default ProductForm;
// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');

    // Función para manejar el archivo seleccionado
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Función para enviar el archivo JSON al backend
    const handleFileUpload = async () => {
        if (!file) {
            setUploadMessage('Por favor, selecciona un archivo JSON.');
            return;
        }

        // Leer el archivo JSON usando FileReader
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                // Parsear el contenido JSON
                const jsonData = JSON.parse(reader.result);

                // Enviar el JSON al backend con Axios
                const response = await axios.post('http://localhost:8000/api/product/import-products', { products: jsonData.products });
                setUploadMessage(`Respuesta del servidor: ${response.data.message}`);
            } catch (error) {
                console.error('Error al subir el archivo:', error);
                setUploadMessage(`Error al subir el archivo: ${error.message}`);
            }
        };

        // Leer el archivo como texto
        reader.readAsText(file);
    };

    return (
        <div>
            <h2>Subir Archivo JSON</h2>
            <input type="file" accept=".json" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Subir</button>
            {uploadMessage && <p>{uploadMessage}</p>}
        </div>
    );
};

export default FileUpload;
