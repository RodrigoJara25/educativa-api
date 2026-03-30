// src/routes/user.routes.js
import { Router } from "express";
import {
    listUsers,
    getUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);
router.use(authorize("ADMIN"));

router.get("/", listUsers);          // GET  /api/users
router.get("/:id", getUser);        // GET  /api/users/:id
router.put("/:id", updateUser);     // PUT  /api/users/:id
router.delete("/:id", deleteUser);  // DELETE /api/users/:id

export default router;