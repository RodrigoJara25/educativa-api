import orderRepository from "../repositories/order.repository.js";
import distribuidorRepository from "../repositories/distribuidor.repository.js";
import OrderDTO from "../dao/dto/order.dto.js";

class OrderService {
    /** 
     * Crea un pedido nuevo.
     * Si no trae precio_unitario, lo pone en 0 (caso Distribuidor).
     */
    async createOrder(data) {
        // Magia B2B: Extraemos e inyectamos el vendedor si es un distribuidor
        if (data.tipo_pedido === 'DISTRIBUIDOR') {
            const distribuidor = await distribuidorRepository.findById(data.comprador_id);
            if (distribuidor && distribuidor.vendedor_asignado) {
                data.vendedor_id = distribuidor.vendedor_asignado;
            }
        }

        const order = await orderRepository.createOrder(data);
        return new OrderDTO(order);
    }

    /** 
     * Lista todos los pedidos con filtro opcional 
     */
    async listOrders(filter = {}) {
        const orders = await orderRepository.getOrders(filter);
        return orders.map(order => new OrderDTO(order));
    }

    /** 
     * Obtiene un pedido detallado 
     */
    async getOrderById(id) {
        const order = await orderRepository.getOrderById(id);
        if (!order) throw new Error("Pedido no encontrado");
        return new OrderDTO(order);
    }

    /** 
     * Actualizar pedido (para que el Admin le ponga los precios y cambie el estado) 
     */
    async updateOrder(id, data) {
        // En tu Dashboard Admin, cuando el vendedor asigne precios, 
        // aquí es donde actualizarías el `monto_total` y el `estado` a 'COTIZADO'.
        const updated = await orderRepository.updateOrder(id, data);
        if (!updated) throw new Error("No se pudo actualizar el pedido");
        return new OrderDTO(updated);
    }

    /** 
     * Eliminar un pedido 
     */
    async deleteOrder(id) {
        const deleted = await orderRepository.deleteOrder(id);
        if (!deleted) throw new Error("No se pudo eliminar el pedido");
        return { msg: "Pedido eliminado correctamente" };
    }
}

export default new OrderService();