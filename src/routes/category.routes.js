import { Router } from 'express';
import CategoryController from '../controllers/category.controller.js';
import { uploader } from '../utils/uploader.js';

const router = Router();
const controller = new CategoryController();

// GET /api/categories          → Obtener todas las categorías (opcional: ?tipo=LIBRO o ?tipo=LAMINA)
// GET /api/categories/:id      → Obtener una categoría por ID
// POST /api/categories         → Crear una nueva categoría (body: multipart/form-data con campo 'image')
// PUT /api/categories/:id      → Actualizar una categoría (body: multipart/form-data con campo 'image')
// DELETE /api/categories/:id   → Eliminar una categoría

router.get('/', controller.getCategories);
router.get('/:id', controller.getCategoryById);
router.post('/', uploader.fields([{ name: 'image', maxCount: 1 }, { name: 'fotoPortada', maxCount: 1 }]), controller.createCategory);
router.put('/:id', uploader.fields([{ name: 'image', maxCount: 1 }, { name: 'fotoPortada', maxCount: 1 }]), controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

export default router;