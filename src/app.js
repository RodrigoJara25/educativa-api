import 'dotenv/config';
import express from 'express';
// import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

import productRouter from './routes/product.routes.js';

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());    // para que el front no tenga problemas de CORS
app.use(express.json());    

// Rutas 
app.use('/api/products', productRouter);
// Manejar ruta no encontrada
app.use((req, res, next) => {
    res.status(404).json({ status: 'error', message: 'Ruta no encontrada' });
});

// Conectar a la base de datos e inciar servidor
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    })
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
})