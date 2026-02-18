import SubcategoryRepository from '../repositories/subcategory.repository.js';
import CategoryRepository from '../repositories/category.repository.js';

export default class SubcategoryService {
    constructor() {
        this.repository = new SubcategoryRepository();
        this.categoryRepository = new CategoryRepository();
    }

    getSubcategories = async (categoriaId = null) => {
        try {
            const filter = {};

            // Filtrar por categoría si se proporciona
            if (categoriaId) {
                filter.categoria = categoriaId;
            }

            const subcategories = await this.repository.getSubcategories(filter);

            if (!subcategories) {
                throw new Error('No se pudieron obtener las subcategorías');
            }

            return subcategories;
        } catch (error) {
            throw new Error(`Error en el servicio al obtener subcategorías: ${error.message}`);
        }
    }

    getSubcategoryById = async (id) => {
        try {
            const subcategory = await this.repository.getSubcategoryById(id);

            if (!subcategory) {
                throw new Error('Subcategoría no encontrada');
            }

            return subcategory;
        } catch (error) {
            throw new Error(`Error en el servicio al obtener subcategoría: ${error.message}`);
        }
    }

    createSubcategory = async (data) => {
        try {
            // Validaciones
            if (!data.nombre || !data.categoria) {
                throw new Error('Nombre y categoría son campos requeridos');
            }

            // Verificar que la categoría existe y es de tipo LAMINA
            const category = await this.categoryRepository.getCategoryById(data.categoria);

            if (!category) {
                throw new Error('La categoría no existe');
            }

            if (category.tipo !== 'LAMINA') {
                throw new Error('Solo se pueden crear subcategorías para categorías de tipo LAMINA');
            }

            const newSubcategory = await this.repository.createSubcategory(data);

            if (!newSubcategory) {
                throw new Error('No se pudo crear la subcategoría');
            }

            return newSubcategory;
        } catch (error) {
            throw new Error(`Error en el servicio al crear subcategoría: ${error.message}`);
        }
    }

    updateSubcategory = async (id, data) => {
        try {
            // Verificar que la subcategoría existe
            await this.getSubcategoryById(id);

            // Si se está cambiando la categoría, verificar que sea de tipo LAMINA
            if (data.categoria) {
                const category = await this.categoryRepository.getCategoryById(data.categoria);

                if (!category) {
                    throw new Error('La categoría no existe');
                }

                if (category.tipo !== 'LAMINA') {
                    throw new Error('Solo se pueden asignar subcategorías a categorías de tipo LAMINA');
                }
            }

            const updatedSubcategory = await this.repository.updateSubcategory(id, data);

            if (!updatedSubcategory) {
                throw new Error('No se pudo actualizar la subcategoría');
            }

            return updatedSubcategory;
        } catch (error) {
            throw new Error(`Error en el servicio al actualizar subcategoría: ${error.message}`);
        }
    }

    deleteSubcategory = async (id) => {
        try {
            // Verificar que la subcategoría existe
            await this.getSubcategoryById(id);

            const deletedSubcategory = await this.repository.deleteSubcategory(id);

            if (!deletedSubcategory) {
                throw new Error('No se pudo eliminar la subcategoría');
            }

            return deletedSubcategory;
        } catch (error) {
            throw new Error(`Error en el servicio al eliminar subcategoría: ${error.message}`);
        }
    }
}