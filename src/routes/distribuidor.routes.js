import { Router } from "express";
import {
    listDistribuidores,
    getDistribuidor,
    updateDistribuidor,
    deleteDistribuidor,
} from "../controllers/distribuidor.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);
router.use(authorize("ADMIN"));
router.get("/", listDistribuidores);
router.get("/:id", getDistribuidor);
router.put("/:id", updateDistribuidor);
router.delete("/:id", deleteDistribuidor);

export default router;
