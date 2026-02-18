import { Router } from 'express';
import SubcategoryController from '../controllers/subcategory.controller.js';

const router = Router();
const controller = new SubcategoryController();

// GET /api/subcategories               → Obtener todas las subcategorías (opcional: ?categoria=ID)
// GET /api/subcategories/:id           → Obtener una subcategoría por ID
// POST /api/subcategories              → Crear una nueva subcategoría
// PUT /api/subcategories/:id           → Actualizar una subcategoría
// DELETE /api/subcategories/:id        → Eliminar una subcategoría

router.get('/', controller.getSubcategories);
router.get('/:id', controller.getSubcategoryById);
router.post('/', controller.createSubcategory);
router.put('/:id', controller.updateSubcategory);
router.delete('/:id', controller.deleteSubcategory);

export default router;