const { ProductModel } = require("../models/product.model");
const { UserModel } = require('../models/user.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getCartTotal = async (req, res) => {
    try {
        const userId = req.userId; // ID del usuario autenticado obtenido del token JWT
        // Buscar al usuario por su ID
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        let total = 0;
        for (const item of user.Card) {
            const product = await ProductModel.findById(item.product);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            const subtotal = product.price * item.quantity;
            total += subtotal;
        }
        let tax = total*0.15;
        // Devolver el total del carrito como respuesta
        return res.status(200).json({ total: total, tax: tax });
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

editToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userId;
        // Verificar si el usuario existe
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Crear el objeto de la tarjeta con el producto y la cantidad proporcionada
        const cardItem = {
            product: productId,
            quantity: quantity 
        };
        // Buscar si ya hay un producto con la misma ID en el carrito del usuario
        const existingProductIndex = user.Card.findIndex(item => item.product === productId);
        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            // console.log(quantity);
            if (quantity == 0) {
                user.Card.splice(existingProductIndex, 1);
            } else {
                user.Card[existingProductIndex].quantity = quantity ; 
            }
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
        // user.$__skipValidation = true;
        const updatedUser = await user.save({ validateBeforeSave: false });
        return res.status(200).json({ cart: user.Card });
    } catch (error) {
        console.error('Error:  ', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userId;
        // Verificar si el usuario existe
        // console.log(`ID: ${userId}`);
        const user = await UserModel.findById(userId);
        // console.log(`valido?: ${user}`);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // const product = await ProductModel.findById(productId);
        // if (!product) {
        //     return res.status(404).json({ error: 'Product not found' });
        // }
        // Crear el objeto de la tarjeta con el producto y la cantidad proporcionada
        const cardItem = {
            product: productId,
            quantity: quantity || 1 // Utiliza la cantidad proporcionada, o 1 si no se proporciona
        };
        // Busca si ya hay un producto con la misma ID en el carrito del usuario
        const existingProductIndex = user.Card.findIndex(item => item.product === productId);
        // console.log(existingProductIndex);
        // console.log(productId);
        // console.log(existingProductIndex);
        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            // console.log("si esta");
            user.Card[existingProductIndex].quantity += quantity || 1; // Incrementa la cantidad por la cantidad proporcionada, o 1 si no se proporciona
            
        } else {
            // Si el producto no está en el carrito, agrégalo
            user.Card.push(cardItem);
        }
        user.$__skipValidation = true;
        const updatedUser = await user.save({ validateBeforeSave: false });
        return res.status(200).json({ message: 'Product added to cart successfully', user: updatedUser });
    } catch (error) {
        console.error('Error:  ', error);
        return res.status(500).json({ error: 'Internal error' });
    }
};
const getCart = async (req, res) => {
    try {
        const userId = req.userId; // ID del usuario autenticado obtenido del token JWT
        // Buscar al usuario por su ID
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // console.log(user.Card);
        // Devolver el carrito del usuario en formato JSON
        return res.status(200).json({ cart: user.Card });
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getCartTotal,
    addToCart,
    getCart,
    editToCart,

    register: (req, res) => {
        req.body.role ='user';
        const user = new UserModel(req.body);
        user
            .save()
            .then(() => {
                res.json({ msg: "success!", user: user });
            })
            .catch(err => res.json(err));
    },
    logout: (req, res) => {
        // clear the cookie from the response
        res.clearCookie("usertoken");
        res.status(200).json({
            message: "You have successfully logged out of our system",
        });
    },
    login: (req, res) => {
        UserModel.findOne({ email: req.body.email })
            .then(user => {
                if (user === null) {
                    res.status(400).json({ msg: "invalid login attempt user" });
                } else {
                    if (req.body.password === undefined) {
                        res.status(400).json({ msg: "invalid login attempt password" });
                    }
                    console.log(req.body)
                    if (req.body.password === user.password) {
                        const userInfo = {
                            _id: user._id,
                            role: user.role,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                        };
                        console.log("userInfo: ", userInfo);
    /*************************************************************************************************************************/
                        const newJWT = jwt.sign(userInfo, process.env.JWT_SECRET)
                        console.log("newJWT: ", newJWT);
                        res
                            .status(200)
                            .cookie("usertoken", newJWT, {
                                httpOnly: true,
                                expires: new Date(Date.now() + 900000000),
                            })
                            .json({ msg: "success!", user: userInfo, newJWT });
                    } else {
                        res.status(401).json({ msg: "invalid login attempt" });
                    }
                }
            })
            .catch(err => res.status(401).json({ error: err }));
    },
    
    
}
