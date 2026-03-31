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

// 2. Solo Admin o Vendedor deberían poder ver TODOS los pedidos
router.get("/", authorize("ADMIN", "VENDEDOR"), listOrders);

// 3. Ver, actualizar o borrar un pedido específico (Solo para Admin por ahora)
router.get("/:id", authorize("ADMIN", "VENDEDOR"), getOrder);
router.put("/:id", authorize("ADMIN", "VENDEDOR"), updateOrder);
router.delete("/:id", authorize("ADMIN"), deleteOrder);

export default router;
