import { Router } from "express";
import { getProducts, createProduct } from "../controllers/product.controller.js";
import { uploader } from "../utils/uploader.js";

const router = Router();

router.get('/', getProducts);   // ruta GET /api/products
router.post('/', uploader.single('image'), createProduct); // ruta POST /api/products

export default router;