import ProductDTO from "../dao/dto/product.dto.js";

export default class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getProducts = async (filter = {}) => {
        const rawProducts = await this.dao.get(filter)
        if (!rawProducts) return [];
        // convertimos los productos crudos a DTOs
        const products = rawProducts.map(p => new ProductDTO(p));
        return products;
    };

    createProduct = async (data) => {
        const result = await this.dao.create(data);
        return result ? new ProductDTO(result) : null;  // si result existe lo convertimos a DTO antes de retornarlo, si no retornamos null
    };
}