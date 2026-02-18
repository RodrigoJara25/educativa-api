import SubcategoryModel from '../models/subcategory.model.js';

export default class SubcategoryMongo {
    constructor() { }

    get = async (filter = {}) => {
        try {
            const subcategories = await SubcategoryModel
                .find(filter)
                .populate('categoria', 'nombre tipo')
                .sort({ orden: 1, nombre: 1 })
                .lean();
            return subcategories;
        } catch (error) {
            console.error(`Error al recuperar las subcategorías: ${error.message}`);
            return null;
        }
    }

    getById = async (id) => {
        try {
            const subcategory = await SubcategoryModel
                .findById(id)
                .populate('categoria', 'nombre tipo')
                .lean();
            return subcategory;
        } catch (error) {
            console.error(`Error al recuperar la subcategoría por ID: ${error.message}`);
            return null;
        }
    }

    create = async (data) => {
        try {
            const newSubcategory = await SubcategoryModel.create(data);
            return newSubcategory;
        } catch (error) {
            console.error(`Error al crear la subcategoría: ${error.message}`);
            return null;
        }
    }

    update = async (id, data) => {
        try {
            const updatedSubcategory = await SubcategoryModel.findByIdAndUpdate(
                id,
                data,
                { new: true, runValidators: true }
            ).populate('categoria', 'nombre tipo').lean();
            return updatedSubcategory;
        } catch (error) {
            console.error(`Error al actualizar la subcategoría: ${error.message}`);
            return null;
        }
    }

    delete = async (id) => {
        try {
            const deletedSubcategory = await SubcategoryModel.findByIdAndDelete(id).lean();
            return deletedSubcategory;
        } catch (error) {
            console.error(`Error al eliminar la subcategoría: ${error.message}`);
            return null;
        }
    }
}