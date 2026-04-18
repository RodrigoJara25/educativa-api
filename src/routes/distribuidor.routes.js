import { Router } from "express";
import {
    listDistribuidores,
    getDistribuidor,
    updateDistribuidor,
    deleteDistribuidor,
    createDistribuidor,
} from "../controllers/distribuidor.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);
// Solo Admin o Vendedor pueden gestionar lista de distribuidores
router.get("/", authorize("ADMIN", "VENDEDOR"), listDistribuidores);
router.post("/", authorize("ADMIN", "VENDEDOR"), createDistribuidor);
router.get("/:id", authorize("ADMIN", "VENDEDOR"), getDistribuidor);
router.put("/:id", authorize("ADMIN", "VENDEDOR"), updateDistribuidor);
router.delete("/:id", authorize("ADMIN"), deleteDistribuidor);

export default router;
