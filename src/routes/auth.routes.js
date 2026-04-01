import { Router } from "express";
import { login, register, loginDistribuidor } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);   // POST /api/auth/register
router.post("/login", login);         // POST /api/auth/login
router.post("/login-distribuidor", loginDistribuidor);

export default router;
