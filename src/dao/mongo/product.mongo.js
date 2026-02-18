import ProductModel from '../models/product.model.js';

export default class ProductMongo {
    constructor() { }

    get = async (filter = {}) => {
        try {
            const products = await ProductModel
                .find(filter)
                .populate('categoria', 'nombre tipo')
                .populate('subcategoria', 'nombre')
                .lean();
            return products;
        } catch (error) {
            console.error(`Error al recuperar los productos: ${error.message}`);
            return null;
        }
    }

    getById = async (id) => {
        try {
            const product = await ProductModel
                .findById(id)
                .populate('categoria', 'nombre tipo')
                .populate('subcategoria', 'nombre')
                .lean();
            return product;
        } catch (error) {
            console.error(`Error al recuperar el producto por ID: ${error.message}`);
            return null;
        }
    }

    create = async (data) => {
        try {
            const newProduct = await ProductModel.create(data);
            return newProduct;
        } catch (error) {
            console.error(`Error al crear el producto: ${error.message}`);
            return null;
        }
    }

    update = async (id, data) => {
        try {
            const updatedProduct = await ProductModel.findByIdAndUpdate(
                id,
                data,
                { new: true, runValidators: true }
            )
                .populate('categoria', 'nombre tipo')
                .populate('subcategoria', 'nombre')
                .lean();
            return updatedProduct;
        } catch (error) {
            console.error(`Error al actualizar el producto: ${error.message}`);
            return null;
        }
    }

    delete = async (id) => {
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(id).lean();
            return deletedProduct;
        } catch (error) {
            console.error(`Error al eliminar el producto: ${error.message}`);
            return null;
        }
    }
}