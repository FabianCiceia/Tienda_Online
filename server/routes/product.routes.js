const express = require("express");
const ProductController = require("../controllers/product.controller");
const { authenticate } = require("../config/jwt.config");
const { whitelist } = require("../config/whitelist");
const upload = require('../libs/storage')
const ProductRouter = express.Router();

ProductRouter.post("/",authenticate, whitelist, upload.single('image'), ProductController.createNewProduct);

ProductRouter.get("/", ProductController.getAllProducts);
ProductRouter.get("/newest", ProductController.getNewestProducts);
ProductRouter.get("/category/:category", ProductController.getProductsByCategory); 
ProductRouter.get("/list/category", ProductController.getAllCategories);
ProductRouter.get('/search', ProductController.searchProducts);
ProductRouter.get("/:id", ProductController.getOneProductById); 
ProductRouter.delete("/delete/:id",authenticate, whitelist, ProductController.deleteOneProductById);

ProductRouter.post('/import-products',authenticate, whitelist,ProductController.json);


module.exports = ProductRouter;
