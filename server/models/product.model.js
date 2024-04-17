const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del producto es requerido"],
        minlength: [3, "El nombre del producto debe tener al menos 3 caracteres"],
    },
    description: {
        type: String,
        required: [true, "La descripción del producto es requerida"],
    },
    price: {
        type: Number,
        required: [true, "El precio del producto es requerido"],
        min: [0, "El precio del producto no puede ser negativo"],
    },
    category: {
        type: String,
        required: [true, "La categoría del producto es requerida"],
    },
    stock: { 
        type: Number,
        required: [true, "El stock del producto es requerido"],
        min: [0, "El stock del producto no puede ser negativo"],
    },
    imageUrl: {
        type: String,
        required: true, 
    }
}, { timestamps: true });

module.exports.ProductModel = mongoose.model('Product', ProductSchema);