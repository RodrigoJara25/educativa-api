import mongoose from "mongoose";

const collection = 'categories';

const categorySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true,
        default: ''
    },
    tipo: {
        type: String,
        required: true,
        enum: ['LIBRO', 'LAMINA']
    },
    foto: {
        type: String,
        default: null
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

const CategoryModel = mongoose.model(collection, categorySchema);

export default CategoryModel;