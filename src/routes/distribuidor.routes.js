import { Router } from "express";
import {
    listDistribuidores,
    getDistribuidor,
    updateDistribuidor,
    deleteDistribuidor,
} from "../controllers/distribuidor.controller.js";

const router = Router();

router.get("/", listDistribuidores);
router.get("/:id", getDistribuidor);
router.put("/:id", updateDistribuidor);
router.delete("/:id", deleteDistribuidor);

export default router;
