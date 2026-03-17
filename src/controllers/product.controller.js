import ProductService from '../services/product.service.js';

export default class ProductController {
    constructor() {
        this.service = new ProductService();
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.service.getProducts(req.query);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getProductById = async (req, res) => {
        try {
            const { id } = req.params;
            const product = await this.service.getProductById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    createProduct = async (req, res) => {
        try {
            const productData = req.body;

            // Si viene un archivo subido, asignarlo al campo correcto
            if (req.file) {
                productData.fotoPortada = req.file.path;
                productData.fotoLamina = req.file.path;
                // El service limpiará el que no corresponda según el tipo de categoría
            }

            const newProduct = await this.service.createProduct(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const productData = req.body;

            // Al igual que en createProduct, si viene un archivo, actualizamos las fotos.
            // El service limpiará el que no corresponda.
            if (req.file) {
                productData.fotoPortada = req.file.path;
                productData.fotoLamina = req.file.path;
            }

            const updatedProduct = await this.service.updateProduct(id, productData);
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedProduct = await this.service.deleteProduct(id);
            res.status(200).json({ message: 'Producto eliminado exitosamente', product: deletedProduct });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}