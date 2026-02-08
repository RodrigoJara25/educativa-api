import mongoose from "mongoose";

const collection = 'products';  

const productSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        enum: ['LIBRO', 'LAMINA']
    },
    categoria: {
        type: String,
        required: true,
        enum: ['Laminas Grandes', 'Laminas Souvenir', 'Diccionarios', 'Cuentos Clasicos', 'Obras Literarias', 'Cuentos Selectos', 'Cuentos Ecologicos', 'Cuentos Plan Lector', 'Cuentos Infantiles']
    },
    subcategoria: {
        type: String,
        required: function() { return this.tipo === 'LAMINA'; }
    },
    titulo: {
        type: String,
        required: function() { return this.tipo === 'LIBRO'; },
        trim: true
    },
    fotoPortada: {
        type: String,
        required: function() { return this.tipo === 'LIBRO'; }
    },
    fotoLamina: {
        type: String,
        required: function() { return this.tipo === 'LAMINA'; }
    },
    fotosInterior: {    // array de fotos
        type: [String],
        default: [],
        required: function() { return this.tipo === 'LIBRO'; }
    }
}, { timestamps: true });

const ProductModel = mongoose.model(collection, productSchema);

export default ProductModel;