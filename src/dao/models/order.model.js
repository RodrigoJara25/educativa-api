import mongoose from "mongoose";

const orderCollection = 'orders';

const orderSchema = new mongoose.Schema({
    // 1 - ORIGEN DEL PEDIDO
    tipo_pedido: {
        type: String,
        enum: ['DISTRIBUIDOR', 'CLIENTE_FINAL', 'VENDEDOR'],
        required: true
    },

    // Quién compra (dinámico: busca en 'users' o en 'distribuidores')
    comprador_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['users', 'distribuidores']
    },

    // 2 - PRODUCTOS COMPRADOS
    productos: [{
        producto_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: [1, 'La cantidad mínima es 1']
        },
        // El precio unitario puede ser 0 al inicio para el MAYORISTA
        precio_unitario: {
            type: Number,
            default: 0
        }
    }],

    // 3 - DATOS DE PAGO Y SUMAS
    monto_total: {
        type: Number,
        default: 0
    },

    // 4 - EL ESTADO DEL PEDIDO
    estado: {
        type: String,
        enum: [
            'PENDIENTE_PRECIO', // Para cuando el Mayorista hace el pedido sin precios
            'COTIZADO',         // Admin ya le puso precios, espera confirmación
            'PAGADO',           // Pedido confirmado y pagado
            'ENTREGADO'        // Cliente ya lo tiene
        ],
        default: 'PENDIENTE_PRECIO'
    }
}, { timestamps: true });

const orderModel = mongoose.model(orderCollection, orderSchema);

export default orderModel;