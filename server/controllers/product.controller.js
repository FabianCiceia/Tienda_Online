const { ProductModel } = require("../models/product.model");
const json =  async (req, res) => {
    try {
        // Verifica que el cuerpo de la solicitud contenga productos
        if (!req.body || !Array.isArray(req.body.products)) {
            return res.status(400).json({ message: 'Formato de datos incorrecto, se esperaba un array de productos.' });
        }

        // Extrae los productos desde el cuerpo de la solicitud
        const products = req.body.products;

        // Valida y guarda cada producto en la base de datos
        const savedProducts = [];
        for (const productData of products) {
            const product = new ProductModel(productData);
            const savedProduct = await product.save();
            savedProducts.push(savedProduct);
        }

        // Responde con los productos guardados
        return res.status(201).json({ message: 'Productos importados exitosamente', products: savedProducts });

    } catch (error) {
        // Maneja cualquier error durante el proceso
        console.error(error);
        return res.status(500).json({ message: 'Error al importar los productos', error: error.message });
    }
}
module.exports = {
    json,
    getOneProductById: (req, res) => {
        ProductModel.findOne({ _id: req.params.id })
            .then((oneSingleProduct) => res.status(200).json({ product: oneSingleProduct }))
            .catch((err) =>
                res.status(400).json({ message: "Something went wrong", error: err })
            );
    },
    searchProducts: (req, res) => {
        const searchTerm = req.query.searchTerm; // Término de búsqueda
        const category = req.query.categories ? req.query.categories.split(',') : []; // Lista de categorías
        const costMin = parseFloat(req.query.costMin); // Costo mínimo del producto
        const costMax = parseFloat(req.query.costMax); // Costo máximo del producto
        const page = parseInt(req.query.page) || 1; // Número de página, por defecto 1
        const pageSize = parseInt(req.query.pageSize) || 20; // Tamaño de página (número de resultados por página)
        const query = {};
    
        // Verifica si se proporcionó un término de búsqueda y agrega filtro
        if (searchTerm && searchTerm.trim() !== '') {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } }, // Búsqueda insensible a mayúsculas y minúsculas en el campo de nombre
                { description: { $regex: searchTerm, $options: 'i' } } // Búsqueda insensible a mayúsculas y minúsculas en el campo de descripción
            ];
        }
    
        // Verifica si se proporcionó una categoría y agrega filtro

    
        // Realiza la búsqueda de productos con los filtros proporcionados para obtener costMin y costMax
        ProductModel.find(query)
            .then(products => {
                // Encuentra el costo mínimo y el costo máximo de la lista de productos
                const priceMin = Math.min(...products.map(product => product.price));
                const priceMax = Math.max(...products.map(product => product.price));
                const categories = [...new Set(products.map(product => product.category))];
                // Construye la consulta principal usando costMin y costMax
                if (!isNaN(costMin)) {
                    query.price = { $gte: costMin };
                }
                if (!isNaN(costMax)) {
                    if (query.price) {
                        query.price.$lte = costMax;
                    } else {
                        query.price = { $lte: costMax };
                    }
                }
                if (category.length > 0) {
                    query.category = { $in: category }; // Filtra por categorías que estén en la lista proporcionada
                }
                // if (category && category.trim() !== '') {
                //     query.category = category.trim();
                // }
                // Realiza la búsqueda de productos con los filtros proporcionados y los filtros de precio
                return ProductModel.find(query)
                    .then(filteredProducts => {
                        // Calcula el total de páginas en función del total de productos encontrados
                        const totalPages = Math.ceil(filteredProducts.length / pageSize);
    
                        // Calcula el índice de inicio y el límite de resultados para la página actual
                        const startIndex = (page - 1) * pageSize;
                        const endIndex = page * pageSize;
    
                        // Obtén solo los productos para la página actual
                        const currentProducts = filteredProducts.slice(startIndex, endIndex);
    
                        // Encuentra las categorías únicas de los productos encontrados
                        
    
                        // Envía los productos encontrados y la información de paginación como respuesta al cliente
                        res.status(200).json({ 
                            products: currentProducts, 
                            currentPage: page, 
                            totalPages: totalPages, 
                            priceMin: priceMin, 
                            priceMax: priceMax, 
                            categories: categories 
                        });
                    });
            })
            .catch(err => {
                // Maneja los errores de la base de datos
                res.status(500).json({ message: "Error searching products", error: err });
            });
    },
    
    

    
    getAllProducts: (req, res) => {
        ProductModel.find()
            .then((allProducts) => res.status(200).json(allProducts))
            .catch((err) =>
                res.status(400).json({ message: "Something went wrong", error: err })
            );
    },


// En tu módulo de controlador de productos

    getProductsByCategory: (req, res) => {
        const category = req.params.category; // Obtiene la categoría del parámetro de la solicitud
        const page = req.query.page || 1; // Obtiene el número de página de la consulta (valor predeterminado: 1)
        const perPage = 15; // Define la cantidad de productos por página

        // Calcula el desplazamiento basado en el número de página
        const offset = (page - 1) * perPage;

        // Busca los productos que pertenecen a la categoría especificada, con paginación
        ProductModel.find({ category: category })
            .skip(offset) // Salta los resultados anteriores al desplazamiento
            .limit(perPage) // Limita la cantidad de resultados devueltos
            .then(products => {
                // Verifica si se encontraron productos en la categoría
                if (products.length === 0) {
                    return res.status(404).json({ message: `No products found in category '${category}'` });
                }
                // Si se encontraron productos, los envía como respuesta al cliente
                res.status(200).json({ products: products });
            })
            .catch(err => {
                // Maneja los errores de la base de datos
                res.status(500).json({ message: "Error retrieving products", error: err });
            });
    },

    // En tu módulo de controlador de productos


    getNewestProducts: (req, res) => {
        // Busca los 4 productos más nuevos, ordenados por fecha de creación de manera descendente
        ProductModel.find()
            .sort({ createdAt: -1 }) // Ordena por fecha de creación en orden descendente (los más recientes primero)
            .limit(4) // Limita la cantidad de resultados devueltos a 4
            .then(products => {
                // Envía los productos más nuevos como respuesta al cliente
                res.status(200).json({ products: products });
            })
            .catch(err => {
                // Maneja los errores de la base de datos
                res.status(500).json({ message: "Error retrieving newest products", error: err });
            });
    },


    getAllCategories: (req, res) => {
        ProductModel.distinct('category')
            .then(categories => {
                res.status(200).json(categories);
            })
            .catch(err => {
                res.status(400).json({ message: "Something went wrong", error: err });
            });
    },
    createNewProduct: (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
        }
        const imageName = req.file.filename;
        const newProduct = new ProductModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            imageUrl: `${imageName}` // Asignar el nombre de la imagen a req.body.imageUrl
        });
        // console.log(newProduct);
        ProductModel.create(newProduct)
            .then((newlyCreatedProduct) => res.status(201).json({ product: newlyCreatedProduct }))
            .catch((err) =>
                res.status(400).json({ message: "Something went wrong", error: err })
            );
    },
    getProductImage: (req, res) => {
        try {
            // Obtener el nombre de la imagen solicitada desde los parámetros de la URL
            const imageName = req.params.imageName;
            // Ruta completa de la imagen
            const imagePath = path.join(__dirname, '..', 'storage', 'imgs', imageName);
            // Verificar si la imagen existe
            if (!fs.existsSync(imagePath)) {
                return res.status(404).json({ message: 'La imagen no fue encontrada' });
            }
            // Devolver la imagen como una respuesta
            res.sendFile(imagePath);
        } catch (error) {
            console.error('Error fetching image:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    updateOneProductById: (req, res) => {
        ProductModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then((updatedProduct) => res.status(200).json({ product: updatedProduct }))
            .catch((err) =>
                res.status(400).json({ message: "Something went wrong", error: err })
            );
    },
    deleteOneProductById: (req, res) => {
        ProductModel.deleteOne({ _id: req.params.id })
            .then((result) => res.status(200).json({ result: result }))
            .catch((err) =>
                res.status(400).json({ message: "Something went wrong", error: err })
            );
    },
    
}