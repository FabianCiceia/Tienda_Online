const express = require("express");
const ProductController = require("../controllers/product.controller");
const { authenticate } = require("../config/jwt.config");
const { whitelist } = require("../config/whitelist");
const ProductRouter = express.Router();

// Establece las rutas y aplica los middleware
ProductRouter.post("/", authenticate, whitelist, ProductController.createNewProduct);
ProductRouter.get("/", ProductController.getAllProducts);
ProductRouter.get("/newest", ProductController.getNewestProducts);
ProductRouter.get("/category/:category", ProductController.getProductsByCategory); // Maneja solicitudes para obtener productos por categoría
ProductRouter.get("/list/category", ProductController.getAllCategories);
ProductRouter.get('/search', ProductController.searchProducts);
ProductRouter.get("/:id", ProductController.getOneProductById); // Maneja solicitudes para obtener un producto por su ID



// ProductRouter.put("/:id", authenticate, ProductController.updateOneProductById);
// ProductRouter.patch("/:id/:game", authenticate, ProductController.updateGamesProductById);
// ProductRouter.delete("/:id", authenticate, ProductController.deleteOneProductById);

// Exporta el enrutador
module.exports = ProductRouter;
