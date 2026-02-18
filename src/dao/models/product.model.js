import mongoose from "mongoose";

const collection = 'products';

const productSchema = new mongoose.Schema({
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    subcategoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategories',
        default: null
    },
    titulo: {
        type: String,
        trim: true,
        default: null
    },
    fotoPortada: {
        type: String,
        default: null
    },
    fotoLamina: {
        type: String,
        default: null
    },
    fotosInterior: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const ProductModel = mongoose.model(collection, productSchema);

export default ProductModel;