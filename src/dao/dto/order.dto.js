export default class OrderDTO {
    constructor(doc) {
        this.id = doc._id;
        this.tipoPedido = doc.tipo_pedido;

        // Identificamos quién es el comprador (soporta populate)
        this.comprador = {
            id: doc.comprador_id?._id || doc.comprador_id,
            nombre: doc.comprador_id?.nombre || "N/A",
            email: doc.comprador_id?.email || "N/A",
            tipo: doc.onModel
        };

        // Identificamos quién es el vendedor asignado
        if (doc.vendedor_id) {
            this.vendedor = {
                id: doc.vendedor_id._id || doc.vendedor_id,
                nombre: doc.vendedor_id.nombre || "N/A",
                email: doc.vendedor_id.email || "N/A"
            };
        } else {
            this.vendedor = null;
        }

        // Formateamos los productos
        this.productos = doc.productos.map(p => ({
            id: p.producto_id?._id || p.producto_id,
            nombre: p.producto_id?.nombre || "Producto desconocido",
            cantidad: p.cantidad,
            precioUnitario: p.precio_unitario,
            subtotal: p.cantidad * p.precio_unitario
        }));

        this.montoTotal = doc.monto_total;
        this.estado = doc.estado;
        this.fecha = doc.createdAt;
    }
}