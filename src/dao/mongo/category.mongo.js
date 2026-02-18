import CategoryModel from '../models/category.model.js';

export default class CategoryMongo {
    constructor() { }

    get = async (filter = {}) => {
        try {
            const categories = await CategoryModel.find(filter).sort({ orden: 1, nombre: 1 }).lean();
            return categories;
        } catch (error) {
            console.error(`Error al recuperar las categorías: ${error.message}`);
            return null;
        }
    }

    getById = async (id) => {
        try {
            const category = await CategoryModel.findById(id).lean();
            return category;
        } catch (error) {
            console.error(`Error al recuperar la categoría por ID: ${error.message}`);
            return null;
        }
    }

    create = async (data) => {
        try {
            const newCategory = await CategoryModel.create(data);
            return newCategory;
        } catch (error) {
            console.error(`Error al crear la categoría: ${error.message}`);
            return null;
        }
    }

    update = async (id, data) => {
        try {
            const updatedCategory = await CategoryModel.findByIdAndUpdate(
                id,
                data,
                { new: true, runValidators: true }
            ).lean();
            return updatedCategory;
        } catch (error) {
            console.error(`Error al actualizar la categoría: ${error.message}`);
            return null;
        }
    }

    delete = async (id) => {
        try {
            const deletedCategory = await CategoryModel.findByIdAndDelete(id).lean();
            return deletedCategory;
        } catch (error) {
            console.error(`Error al eliminar la categoría: ${error.message}`);
            return null;
        }
    }
}