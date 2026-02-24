import CategoryService from '../services/category.service.js';

export default class CategoryController {
    constructor() {
        this.service = new CategoryService();
    }

    getCategories = async (req, res) => {
        try {
            const { tipo } = req.query;
            const categories = await this.service.getCategories(tipo);
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getCategoryById = async (req, res) => {
        try {
            const { id } = req.params;
            const category = await this.service.getCategoryById(id);
            res.status(200).json(category);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    createCategory = async (req, res) => {
        try {
            const categoryData = req.body;

            // Si viene un archivo subido, asignarlo al campo foto
            if (req.file) {
                categoryData.foto = req.file.path;
            }

            const newCategory = await this.service.createCategory(categoryData);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    updateCategory = async (req, res) => {
        try {
            const { id } = req.params;
            const categoryData = req.body;

            // Si viene un archivo subido, actualizar el campo foto
            if (req.file) {
                categoryData.foto = req.file.path;
            }

            const updatedCategory = await this.service.updateCategory(id, categoryData);
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    deleteCategory = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCategory = await this.service.deleteCategory(id);
            res.status(200).json({ message: 'Categoría eliminada exitosamente', category: deletedCategory });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}