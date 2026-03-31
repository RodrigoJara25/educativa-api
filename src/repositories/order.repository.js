import orderModel from "../dao/models/order.model.js";

class OrderRepository {
    /** 
     * Crea un pedido 
     */
    async createOrder(data) {
        return await orderModel.create(data);
    }

    /** 
     * Obtiene todos los pedidos con su info poblada
     */
    async getOrders(filter = {}) {
        return await orderModel.find(filter)
            .populate('comprador_id') // Obtiene nombre/email del comprador
            .populate('productos.producto_id'); // Obtiene nombre/foto del producto
    }

    /** 
     * Obtiene un pedido por ID
     */
    async getOrderById(id) {
        return await orderModel.findById(id)
            .populate('comprador_id')
            .populate('productos.producto_id');
    }

    /** 
     * Actualiza el pedido (cambiar estado o precio)
     */
    async updateOrder(id, data) {
        return await orderModel.findByIdAndUpdate(id, data, { new: true })
            .populate('comprador_id')
            .populate('productos.producto_id');
    }

    /** 
     * Elimina el pedido
     */
    async deleteOrder(id) {
        return await orderModel.findByIdAndDelete(id);
    }
}

export default new OrderRepository();