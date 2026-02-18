import CategoryMongo from '../dao/mongo/category.mongo.js';
import CategoryDTO from '../dao/dto/category.dto.js';

export default class CategoryRepository {
    constructor() {
        this.dao = new CategoryMongo();
    }

    getCategories = async (filter = {}) => {
        try {
            const categories = await this.dao.get(filter);
            if (!categories) return null;
            return categories.map(category => new CategoryDTO(category));
        } catch (error) {
            console.error(`Error en el repositorio al obtener categorías: ${error.message}`);
            return null;
        }
    }

    getCategoryById = async (id) => {
        try {
            const category = await this.dao.getById(id);
            if (!category) return null;
            return new CategoryDTO(category);
        } catch (error) {
            console.error(`Error en el repositorio al obtener categoría por ID: ${error.message}`);
            return null;
        }
    }

    createCategory = async (data) => {
        try {
            const newCategory = await this.dao.create(data);
            if (!newCategory) return null;
            return new CategoryDTO(newCategory);
        } catch (error) {
            console.error(`Error en el repositorio al crear categoría: ${error.message}`);
            return null;
        }
    }

    updateCategory = async (id, data) => {
        try {
            const updatedCategory = await this.dao.update(id, data);
            if (!updatedCategory) return null;
            return new CategoryDTO(updatedCategory);
        } catch (error) {
            console.error(`Error en el repositorio al actualizar categoría: ${error.message}`);
            return null;
        }
    }

    deleteCategory = async (id) => {
        try {
            const deletedCategory = await this.dao.delete(id);
            if (!deletedCategory) return null;
            return new CategoryDTO(deletedCategory);
        } catch (error) {
            console.error(`Error en el repositorio al eliminar categoría: ${error.message}`);
            return null;
        }
    }
}