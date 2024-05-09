const mongoose = require("mongoose");
const Products = new mongoose.Schema(
    {
        product: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1 // Cantidad predeterminada
        }
    }
);
const CartSchema = new mongoose.Schema({
	idUser: String,
	Products: Products
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;