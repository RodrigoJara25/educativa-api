import mongoose from "mongoose";

const collection = 'subcategories';

const subcategorySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true,
        default: ''
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    },
    orden: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Índice único: no puede haber dos subcategorías con el mismo nombre en la misma categoría
subcategorySchema.index({ nombre: 1, categoria: 1 }, { unique: true });

const SubcategoryModel = mongoose.model(collection, subcategorySchema);

export default SubcategoryModel;