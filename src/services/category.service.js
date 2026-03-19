import CategoryRepository from '../repositories/category.repository.js';
import { deleteImageFromCloudinary } from '../utils/uploader.js';

export default class CategoryService {
    constructor() {
        this.repository = new CategoryRepository();
    }

    getCategories = async (tipo = null) => {
        try {
            const filter = {};

            // Filtrar por tipo si se proporciona
            if (tipo) {
                filter.tipo = tipo;
            }

            const categories = await this.repository.getCategories(filter);

            if (!categories) {
                throw new Error('No se pudieron obtener las categorías');
            }

            return categories;
        } catch (error) {
            throw new Error(`Error en el servicio al obtener categorías: ${error.message}`);
        }
    }

    getCategoryById = async (id) => {
        try {
            const category = await this.repository.getCategoryById(id);

            if (!category) {
                throw new Error('Categoría no encontrada');
            }

            return category;
        } catch (error) {
            throw new Error(`Error en el servicio al obtener categoría: ${error.message}`);
        }
    }

    createCategory = async (data) => {
        try {
            // Validaciones
            if (!data.nombre || !data.tipo) {
                throw new Error('Nombre y tipo son campos requeridos');
            }

            if (!['LIBRO', 'LAMINA'].includes(data.tipo)) {
                throw new Error('El tipo debe ser LIBRO o LAMINA');
            }

            const newCategory = await this.repository.createCategory(data);

            if (!newCategory) {
                throw new Error('No se pudo crear la categoría');
            }

            return newCategory;
        } catch (error) {
            throw new Error(`Error en el servicio al crear categoría: ${error.message}`);
        }
    }

    updateCategory = async (id, data) => {
        try {
            // Verificar que la categoría existe
            const existingCategory = await this.getCategoryById(id);

            // Si se está subiendo una foto nueva, eliminamos la anterior de Cloudinary
            if (data.foto && existingCategory.foto && data.foto !== existingCategory.foto) {
                await deleteImageFromCloudinary(existingCategory.foto);
            }
            if (data.fotoPortada && existingCategory.fotoPortada && data.fotoPortada !== existingCategory.fotoPortada) {
                await deleteImageFromCloudinary(existingCategory.fotoPortada);
            }

            // Validar tipo si se está actualizando
            if (data.tipo && !['LIBRO', 'LAMINA'].includes(data.tipo)) {
                throw new Error('El tipo debe ser LIBRO o LAMINA');
            }

            const updatedCategory = await this.repository.updateCategory(id, data);

            if (!updatedCategory) {
                throw new Error('No se pudo actualizar la categoría');
            }

            return updatedCategory;
        } catch (error) {
            throw new Error(`Error en el servicio al actualizar categoría: ${error.message}`);
        }
    }

    deleteCategory = async (id) => {
        try {
            // Verificar que la categoría existe
            const existingCategory = await this.getCategoryById(id);

            const deletedCategory = await this.repository.deleteCategory(id);

            if (!deletedCategory) {
                throw new Error('No se pudo eliminar la categoría');
            }

            // Eliminar la imagen asociada en Cloudinary si existe
            if (existingCategory.foto) {
                await deleteImageFromCloudinary(existingCategory.foto);
            }
            if (existingCategory.fotoPortada) {
                await deleteImageFromCloudinary(existingCategory.fotoPortada);
            }

            return deletedCategory;
        } catch (error) {
            throw new Error(`Error en el servicio al eliminar categoría: ${error.message}`);
        }
    }
}