const { ProductModel } = require("../models/product.model");

module.exports = {
    getOneProductById: (req, res) => {
        ProductModel.findOne({ _id: req.params.id })
            .then((oneSingleProduct) => res.status(200).json({ product: oneSingleProduct }))
            .catch((err) =>
                res.status(400).json({ message: "Something went wrong", error: err })
            );
    },

    searchProducts: (req, res) => {
        const searchTerm = req.query.searchTerm; // Obtiene el término de búsqueda del parámetro de consulta de la solicitud
    
        // Verifica si se proporcionó un término de búsqueda
        if (!searchTerm || searchTerm.trim() === '') {
            return res.status(400).json({ message: "Search term is required" });
        }
    
        // Realiza la búsqueda de productos en tiempo real utilizando una expresión regular para buscar en el campo de nombre o descripción
        ProductModel.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } }, // Búsqueda insensible a mayúsculas y minúsculas en el campo de nombre
                { description: { $regex: searchTerm, $options: 'i' } } // Búsqueda insensible a mayúsculas y minúsculas en el campo de descripción
            ]
        })
        .sort({ relevanceScore: -1 }) // Ordena los resultados por relevancia en orden descendente
        .limit(15) // Limita la cantidad de resultados devueltos a 15
        .then(products => {
            // Envía los productos encontrados como respuesta al cliente
            res.status(200).json({ products: products });
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
        const perPage = 10; // Define la cantidad de productos por página

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
        ProductModel.create(req.body)
            .then((newlyCreatedProduct) => res.status(201).json({ product: newlyCreatedProduct }))
            .catch((err) =>
                res.status(400).json({ message: "Something went wrong", error: err })
            );
    },
    updateOneProductById: (req, res) => {
        ProductModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then((updatedProduct) => res.status(200).json({ product: updatedProduct }))
            .catch((err) =>
                res.status(400).json({ message: "Something went wrong", error: err })
            );
    },
    // updateGamesProductById: (req, res) => {
    //     ProductModel.findOne({ _id: req.params.id })
    //     .then((oneSingleProduct) => {

    //         console.log("GAME:", req.params.game) // 0
    //         console.log("BODY",  req.body) //{ status: 'Playing' }

    //         oneSingleProduct.games[req.params.game] = req.body.status
    //         oneSingleProduct.save()

    //         return res.status(200).json({ product: oneSingleProduct })
    //     })
    //     .catch((err) =>
    //         res.status(400).json({ message: "Something went wrong", error: err })
    //     );
    // },
    deleteOneProductById: (req, res) => {
        ProductModel.deleteOne({ _id: req.params.id })
            .then((result) => res.status(200).json({ result: result }))
            .catch((err) =>
                res.status(400).json({ message: "Something went wrong", error: err })
            );
    },
}