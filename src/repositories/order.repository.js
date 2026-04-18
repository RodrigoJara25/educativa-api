import orderModel from "../dao/models/order.model.js";

class OrderRepository {
    /** 
     * Crea un pedido 
     */
    async createOrder(data) {
        const order = await orderModel.create(data);
        return await order.populate([
            'comprador_id',
            'vendedor_id',
            {
                path: 'productos.producto_id',
                populate: [
                    { path: 'categoria' },
                    { path: 'subcategoria' }
                ]
            }
        ]);
    }

    /** 
     * Obtiene todos los pedidos con su info poblada
     */
    async getOrders(filter = {}) {
        return await orderModel.find(filter)
            .populate([
                'comprador_id',
                'vendedor_id',
                {
                    path: 'productos.producto_id',
                    populate: [
                        { path: 'categoria' },
                        { path: 'subcategoria' }
                    ]
                }
            ]);
    }

    /** 
     * Obtiene un pedido por ID
     */
    async getOrderById(id) {
        return await orderModel.findById(id)
            .populate([
                'comprador_id',
                'vendedor_id',
                {
                    path: 'productos.producto_id',
                    populate: [
                        { path: 'categoria' },
                        { path: 'subcategoria' }
                    ]
                }
            ]);
    }

    /** 
     * Actualiza el pedido (cambiar estado o precio)
     */
    async updateOrder(id, data) {
        return await orderModel.findByIdAndUpdate(id, data, { new: true })
            .populate([
                'comprador_id',
                'vendedor_id',
                {
                    path: 'productos.producto_id',
                    populate: [
                        { path: 'categoria' },
                        { path: 'subcategoria' }
                    ]
                }
            ]);
    }

    /** 
     * Elimina el pedido
     */
    async deleteOrder(id) {
        return await orderModel.findByIdAndDelete(id);
    }
}

export default new OrderRepository();