import mongoose from "mongoose";

const distribuidorCollection = 'distribuidores';

const distribuidorSchema = new mongoose.Schema({

    // Datos Personales
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    ruc_dni: {
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

    // Datos de Ubicación y Envío (Opcionales)
    departamento: {
        type: String,
        trim: true
    },
    provincia: {
        type: String,
        trim: true
    },
    distrito: {
        type: String,
        trim: true
    },
    direccion: {
        type: String,
        trim: true
    },
    agencia: {
        type: String,
        trim: true
    },
    referencia: {
        type: String,
        trim: true
    },

    // Datos de Acceso y Seguridad
    activo: {
        type: Boolean,
        default: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
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
    role: {     // Rol fijo del distribuidor
        type: String,
        default: 'DISTRIBUIDOR'
    },

    // Datos de Historial
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders'
    }],

    // Relación de Cartera (A qué Vendedor le pertenece)
    vendedor_asignado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: false // Opcional por si el admin los crea primero y luego los asigna
    }

}, { timestamps: true })

const DistribuidorModel = mongoose.model(distribuidorCollection, distribuidorSchema);

export default DistribuidorModel;