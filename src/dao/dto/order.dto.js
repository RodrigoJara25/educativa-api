export default class OrderDTO {
    constructor(doc) {
        this.id = doc._id;
        this.tipoPedido = doc.tipo_pedido;

        // Identificamos quién es el comprador (Full Data)
        if (doc.comprador_id && typeof doc.comprador_id === 'object') {
            const { password, ...buyerData } = doc.comprador_id._doc || doc.comprador_id;
            this.comprador = {
                id: doc.comprador_id._id,
                tipo: doc.onModel,
                ...buyerData
            };
        } else {
            this.comprador = { id: doc.comprador_id, tipo: doc.onModel, nombre: "N/A" };
        }

        // Identificamos quién es el vendedor asignado (Full Data)
        if (doc.vendedor_id && typeof doc.vendedor_id === 'object') {
            const { password, ...sellerData } = doc.vendedor_id._doc || doc.vendedor_id;
            this.vendedor = {
                id: doc.vendedor_id._id,
                ...sellerData
            };
        } else {
            this.vendedor = doc.vendedor_id ? { id: doc.vendedor_id } : null;
        }

        // Formateamos los productos (Aplanado para fácil acceso en Frontend)
        this.productos = doc.productos.map(p => {
            const productInfo = (p.producto_id && typeof p.producto_id === 'object')
                ? (p.producto_id._doc || p.producto_id)
                : {};

            return {
                id: p.producto_id?._id || p.producto_id,
                ...productInfo, // Trae item, titulo, fotoLamina, categoria, subcategoria, etc.
                cantidad: p.cantidad,
                precioUnitario: p.precio_unitario,
                subtotal: p.cantidad * p.precio_unitario
            };
        });

        this.montoTotal = doc.monto_total;
        this.estado = doc.estado;
        this.fecha = doc.createdAt;
    }
}