import ProductMongo from '../dao/mongo/product.mongo.js';
import ProductDTO from '../dao/dto/product.dto.js';

export default class ProductRepository {
    constructor() {
        this.dao = new ProductMongo();
    }

    getProducts = async (filter = {}) => {
        const rawProducts = await this.dao.get(filter);
        if (!rawProducts) return [];
        return rawProducts.map(p => new ProductDTO(p));
    }

    getProductById = async (id) => {
        const product = await this.dao.getById(id);
        if (!product) return null;
        return new ProductDTO(product);
    }

    createProduct = async (data) => {
        const result = await this.dao.create(data);
        return result ? new ProductDTO(result) : null;
    }

    updateProduct = async (id, data) => {
        const result = await this.dao.update(id, data);
        return result ? new ProductDTO(result) : null;
    }

    deleteProduct = async (id) => {
        const result = await this.dao.delete(id);
        return result ? new ProductDTO(result) : null;
    }
}