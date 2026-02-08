export default class ProductService {
    constructor(repository) {
        this.repository = repository;
    }

    getProducts = async (query = {}) => {
        const products = await this.repository.getProducts(query);
        return products;
    }

    createProduct = async (dataProduct) => {
        if (dataProduct.tipo === 'LIBRO' && !dataProduct.fotosInterior) {
            dataProduct.fotosInterior = [];
        }
        const newProduct = await this.repository.createProduct(dataProduct);
        return newProduct;
    }
}