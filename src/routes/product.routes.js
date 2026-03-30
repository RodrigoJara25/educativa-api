import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import { uploader } from '../utils/uploader.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = Router();
const controller = new ProductController();

// GET /api/products            → Obtener todos los productos
// GET /api/products/:id        → Obtener un producto por ID
// POST /api/products           → Crear un nuevo producto
// PUT /api/products/:id        → Actualizar un producto
// DELETE /api/products/:id     → Eliminar un producto

/* --- RUTAS PÚBLICAS (Cualquiera puede entrar) --- */
router.get('/', controller.getProducts);
router.get('/:id', controller.getProductById);

/* --- RUTAS PROTEGIDAS (Solo ADMIN puede modificar) --- */
router.use(protect);
router.use(authorize("ADMIN"));

router.post('/', uploader.single('image'), controller.createProduct);
router.put('/:id', uploader.single('image'), controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

export default router;