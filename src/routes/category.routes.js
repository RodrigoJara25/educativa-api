import { Router } from 'express';
import CategoryController from '../controllers/category.controller.js';

const router = Router();
const controller = new CategoryController();

// GET /api/categories          → Obtener todas las categorías (opcional: ?tipo=LIBRO o ?tipo=LAMINA)
// GET /api/categories/:id      → Obtener una categoría por ID
// POST /api/categories         → Crear una nueva categoría
// PUT /api/categories/:id      → Actualizar una categoría
// DELETE /api/categories/:id   → Eliminar una categoría

router.get('/', controller.getCategories);
router.get('/:id', controller.getCategoryById);
router.post('/', controller.createCategory);
router.put('/:id', controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

export default router;