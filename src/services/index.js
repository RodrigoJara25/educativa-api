import ProductMongo from "../dao/mongo/product.mongo.js";
import ProductRepository from "../repositories/product.repository.js";
import ProductService from "./product.service.js";

const productDAO = new ProductMongo();
const productRepository = new ProductRepository(productDAO);
export const productService = new ProductService(productRepository);
