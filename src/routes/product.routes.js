import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import { uploader } from '../utils/uploader.js';

const router = Router();
const controller = new ProductController();

// GET /api/products            → Obtener todos los productos
// GET /api/products/:id        → Obtener un producto por ID
// POST /api/products           → Crear un nuevo producto
// PUT /api/products/:id        → Actualizar un producto
// DELETE /api/products/:id     → Eliminar un producto

router.get('/', controller.getProducts);
router.get('/:id', controller.getProductById);
router.post('/', uploader.single('image'), controller.createProduct);
router.put('/:id', uploader.single('image'), controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

export default router;