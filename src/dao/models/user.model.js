import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({

    // Datos Personales
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    },
    dni: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    celular: {
        type: String,
        required: true,
        trim: true
    },

    // Datos de Acceso y Seguridad
    activo: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['USER', 'VENDEDOR', 'ADMIN'],
        default: 'USER'
    },

    // Datos de Compra
    cart: {     // Carrito de compras del usuario
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    orders: [{  // Historial de pedidos del usuario (por eso es un array [ ])
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders'
    }]

}, { timestamps: true })

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;