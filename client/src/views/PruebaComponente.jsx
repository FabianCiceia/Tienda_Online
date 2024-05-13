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
