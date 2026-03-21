import mongoose from "mongoose"

const orderCollection = 'orders'

const orderSchema = new mongoose.Schema({
    // 1. ¿QUIÉN HIZO EL PEDIDO Y CÓMO?
    tipo_pedido: {
        type: String,
        enum: ['USER', 'DISTRIBUIDOR', 'VENDEDOR'],
        required: true
    },

    // Si fue de un cliente normal o vendedor, es de la coleccion 'users'
    // Si fue de un distribuidor, es de la coleccion 'distribuidores'
    // Mongoose permite tener "refPaths" dinámicos, o puedes guardar simplemente el ID y tú sabes de dónde viene por el 'tipo_pedido'.
    comprador_id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel',
        required: true
    },
    onModel: {
        type: String,
        required: true,
        enum: ['users', 'distribuidores']
    },

    // Opcional: Solo si el pedido fue creado por un Vendedor para su cliente externo
    vendedor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },

    // 2. EL CARRITO 
    productos: [{
        producto_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        cantidad: {
            type: Number,
            required: true
        },
        precio_unitario: {  // Para DISTRIBUIDORES se llena despues
            type: Number,
            default: 0
        }
    }],

    total_pedido: { type: Number, default: 0 },

    // 3. EL ESTADO DEL PEDIDO (La clave de tu lógica)
    estado: {
        type: String,
        enum: [
            'CANCELADO',
            'EN PROCESO',
            'EXITOSO'
        ],
        default: 'EN PROCESO'
    }
}, { timestamps: true });

const orderModel = mongoose.model(orderCollection, orderSchema);

export default orderModel;