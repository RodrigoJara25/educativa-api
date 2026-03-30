import 'dotenv/config';
import express from 'express';
// import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

import productRouter from './routes/product.routes.js';
import categoryRouter from './routes/category.routes.js';
import subcategoryRouter from './routes/subcategory.routes.js';
import userRouter from './routes/user.routes.js';
import distribuidorRouter from './routes/distribuidor.routes.js';
import authRouter from './routes/auth.routes.js';

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());    // para que el front no tenga problemas de CORS
app.use(express.json());

// Rutas 
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/subcategories', subcategoryRouter);
app.use('/api/users', userRouter);
app.use('/api/distribuidores', distribuidorRouter);
app.use('/api/auth', authRouter);
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