import { productService } from '../services/index.js';

export const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts(req.query);
        res.json({status: 'success', payload: products});
    } catch (error) {
        res.status(500).json({status: 'error', message: error.message});
    }
}

export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        if (req.file) {
            if (productData.tipo === 'LIBRO') {
                productData.fotoPortada = req.file.path;
            } else if (productData.tipo === 'LAMINA') {
                productData.fotoLamina = req.file.path;
            }
        }
        const result = await productService.createProduct(productData);
        res.status(201).json({status: 'success', payload: result});
    } catch (error) {
        res.status(500).json({status: 'error', message: error.message});
    }
}