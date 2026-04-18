// src/controllers/order.controller.js
import orderService from "../services/order.service.js";

export const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

export const listOrders = async (req, res) => {
    try {
        let filter = {};

        // Si es Vendedor, ve solo sus pedidos asignados
        if (req.user && req.user.role === 'VENDEDOR') {
            filter = { vendedor_id: req.user.id };
        }

        // Si es Distribuidor, ve solo sus propios pedidos
        if (req.user && req.user.role === 'DISTRIBUIDOR') {
            filter = { comprador_id: req.user.id };
        }

        const orders = await orderService.listOrders(filter);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getOrder = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.json(order);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const updated = await orderService.updateOrder(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const deleted = await orderService.deleteOrder(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};
