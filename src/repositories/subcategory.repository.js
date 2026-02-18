import SubcategoryMongo from '../dao/mongo/subcategory.mongo.js';
import SubcategoryDTO from '../dao/dto/subcategory.dto.js';

export default class SubcategoryRepository {
    constructor() {
        this.dao = new SubcategoryMongo();
    }

    getSubcategories = async (filter = {}) => {
        try {
            const subcategories = await this.dao.get(filter);
            if (!subcategories) return null;
            return subcategories.map(subcategory => new SubcategoryDTO(subcategory));
        } catch (error) {
            console.error(`Error en el repositorio al obtener subcategorías: ${error.message}`);
            return null;
        }
    }

    getSubcategoryById = async (id) => {
        try {
            const subcategory = await this.dao.getById(id);
            if (!subcategory) return null;
            return new SubcategoryDTO(subcategory);
        } catch (error) {
            console.error(`Error en el repositorio al obtener subcategoría por ID: ${error.message}`);
            return null;
        }
    }

    createSubcategory = async (data) => {
        try {
            const newSubcategory = await this.dao.create(data);
            if (!newSubcategory) return null;
            return new SubcategoryDTO(newSubcategory);
        } catch (error) {
            console.error(`Error en el repositorio al crear subcategoría: ${error.message}`);
            return null;
        }
    }

    updateSubcategory = async (id, data) => {
        try {
            const updatedSubcategory = await this.dao.update(id, data);
            if (!updatedSubcategory) return null;
            return new SubcategoryDTO(updatedSubcategory);
        } catch (error) {
            console.error(`Error en el repositorio al actualizar subcategoría: ${error.message}`);
            return null;
        }
    }

    deleteSubcategory = async (id) => {
        try {
            const deletedSubcategory = await this.dao.delete(id);
            if (!deletedSubcategory) return null;
            return new SubcategoryDTO(deletedSubcategory);
        } catch (error) {
            console.error(`Error en el repositorio al eliminar subcategoría: ${error.message}`);
            return null;
        }
    }
}