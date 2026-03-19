import ProductRepository from '../repositories/product.repository.js';
import CategoryRepository from '../repositories/category.repository.js';
import SubcategoryRepository from '../repositories/subcategory.repository.js';
import { deleteImageFromCloudinary } from '../utils/uploader.js';

export default class ProductService {
    constructor() {
        this.repository = new ProductRepository();
        this.categoryRepository = new CategoryRepository();
        this.subcategoryRepository = new SubcategoryRepository();
    }

    getProducts = async (filter = {}) => {
        try {
            const products = await this.repository.getProducts(filter);
            return products;
        } catch (error) {
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }

    getProductById = async (id) => {
        try {
            const product = await this.repository.getProductById(id);
            if (!product) throw new Error('Producto no encontrado');
            return product;
        } catch (error) {
            throw new Error(`Error al obtener el producto: ${error.message}`);
        }
    }

    createProduct = async (data) => {
        try {
            // 1. Verificar que la categoría existe
            const category = await this.categoryRepository.getCategoryById(data.categoria);
            if (!category) throw new Error('La categoría no existe');

            // 2. Validar item
            if (!data.item) throw new Error('item es requerido');

            // 3. Validar campos según el tipo de la categoría
            if (category.tipo === 'LAMINA') {
                if (!data.subcategoria) throw new Error('subcategoria es requerida para láminas');
                if (!data.fotoLamina) throw new Error('fotoLamina es requerida para láminas');

                // 3. Verificar que la subcategoría existe y pertenece a la categoría
                const subcategory = await this.subcategoryRepository.getSubcategoryById(data.subcategoria);
                if (!subcategory) throw new Error('La subcategoría no existe');
                if (subcategory.categoria._id.toString() !== data.categoria) {
                    throw new Error('La subcategoría no pertenece a la categoría seleccionada');
                }

                // Limpiar campos de libro
                delete data.titulo;
                delete data.fotoPortada;
                delete data.fotosInterior;

            } else if (category.tipo === 'LIBRO') {
                if (!data.titulo) throw new Error('titulo es requerido para libros');
                if (!data.fotoPortada) throw new Error('fotoPortada es requerida para libros');
                if (!data.fotosInterior) data.fotosInterior = [];

                // Limpiar campos de lámina
                delete data.subcategoria;
                delete data.fotoLamina;
            }

            const newProduct = await this.repository.createProduct(data);
            if (!newProduct) throw new Error('No se pudo crear el producto');
            return newProduct;
        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    updateProduct = async (id, data) => {
        try {
            // Verificar que el producto existe
            const existingProduct = await this.getProductById(id);

            // Determinar la categoría (la nueva si se cambia, o la actual)
            const categoriaId = data.categoria || existingProduct.categoria._id.toString();
            const category = await this.categoryRepository.getCategoryById(categoriaId);
            if (!category) throw new Error('La categoría no existe');

            // Validar campos según el tipo
            if (category.tipo === 'LAMINA') {
                if (data.subcategoria) {
                    const subcategory = await this.subcategoryRepository.getSubcategoryById(data.subcategoria);
                    if (!subcategory) throw new Error('La subcategoría no existe');
                    if (subcategory.categoria._id.toString() !== categoriaId) {
                        throw new Error('La subcategoría no pertenece a la categoría seleccionada');
                    }
                }
                // Limpiar campos de libro
                delete data.titulo;
                delete data.fotoPortada;
                delete data.fotosInterior;

            } else if (category.tipo === 'LIBRO') {
                // Limpiar campos de lámina
                delete data.subcategoria;
                delete data.fotoLamina;
            }

            // Eliminar de Cloudinary si subimos una foto nueva en su campo correspondiente
            if (data.fotoLamina && existingProduct.fotoLamina && data.fotoLamina !== existingProduct.fotoLamina) {
                await deleteImageFromCloudinary(existingProduct.fotoLamina);
            }
            if (data.fotoPortada && existingProduct.fotoPortada && data.fotoPortada !== existingProduct.fotoPortada) {
                await deleteImageFromCloudinary(existingProduct.fotoPortada);
            }

            const updatedProduct = await this.repository.updateProduct(id, data);
            if (!updatedProduct) throw new Error('No se pudo actualizar el producto');
            return updatedProduct;
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }

    deleteProduct = async (id) => {
        try {
            const existingProduct = await this.getProductById(id);
            const deletedProduct = await this.repository.deleteProduct(id);
            if (!deletedProduct) throw new Error('No se pudo eliminar el producto');

            // Eliminar de Cloudinary las fotos del producto eliminado
            if (existingProduct.fotoLamina) await deleteImageFromCloudinary(existingProduct.fotoLamina);
            if (existingProduct.fotoPortada) await deleteImageFromCloudinary(existingProduct.fotoPortada);
            if (existingProduct.fotosInterior && existingProduct.fotosInterior.length > 0) {
                for (const foto of existingProduct.fotosInterior) {
                    await deleteImageFromCloudinary(foto);
                }
            }

            return deletedProduct;
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }
}