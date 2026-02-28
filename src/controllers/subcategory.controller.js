import SubcategoryService from '../services/subcategory.service.js';

export default class SubcategoryController {
    constructor() {
        this.service = new SubcategoryService();
    }

    getSubcategories = async (req, res) => {
        try {
            const { categoria } = req.query;
            const subcategories = await this.service.getSubcategories(categoria);
            res.status(200).json(subcategories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getSubcategoryById = async (req, res) => {
        try {
            const { id } = req.params;
            const subcategory = await this.service.getSubcategoryById(id);
            res.status(200).json(subcategory);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    createSubcategory = async (req, res) => {
        try {
            const subcategoryData = req.body;
            if (req.file) {
                subcategoryData.foto = req.file.path;
            }
            const newSubcategory = await this.service.createSubcategory(subcategoryData);
            res.status(201).json(newSubcategory);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    updateSubcategory = async (req, res) => {
        try {
            const { id } = req.params;
            const subcategoryData = req.body;
            if (req.file) {
                subcategoryData.foto = req.file.path;
            }
            const updatedSubcategory = await this.service.updateSubcategory(id, subcategoryData);
            res.status(200).json(updatedSubcategory);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    deleteSubcategory = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedSubcategory = await this.service.deleteSubcategory(id);
            res.status(200).json({ message: 'Subcategoría eliminada exitosamente', subcategory: deletedSubcategory });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}