// src/routes/order.routes.js
import { Router } from "express";
import {
    createOrder,
    listOrders,
    getOrder,
    updateOrder,
    deleteOrder
} from "../controllers/order.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// Todas las rutas de pedidos necesitan estar logueado
router.use(protect);

// 1. Quien sea puede crear un pedido (Usuario o Distribuidor)
router.post("/", createOrder);

// 2. Todos pueden ver lista de pedidos (Filtrado inteligentemente por rol en el controlador)
router.get("/", authorize("ADMIN", "VENDEDOR", "DISTRIBUIDOR"), listOrders);

// 3. Ver, actualizar o borrar un pedido específico
router.get("/:id", authorize("ADMIN", "VENDEDOR", "DISTRIBUIDOR"), getOrder);
router.put("/:id", authorize("ADMIN", "VENDEDOR"), updateOrder);
router.delete("/:id", authorize("ADMIN"), deleteOrder);

export default router;
