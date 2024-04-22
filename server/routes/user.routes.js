const { authenticate } = require("../config/jwt.config");
const express = require("express");
const UserController = require("../controllers/user.controller");
const UserRouter = express.Router();

///api/auth
UserRouter.post("/register", UserController.register);
UserRouter.post("/login", UserController.login);
UserRouter.post("/logout", UserController.logout);
UserRouter.post("/cart", authenticate, UserController.addToCart);
UserRouter.post("/cart/edit", authenticate, UserController.editToCart);
UserRouter.get('/cart/list', authenticate, UserController.getCart);
UserRouter.get('/cart/total', authenticate, UserController.getCartTotal);
module.exports = UserRouter
