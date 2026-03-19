import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// 1 - Configuramos Cloudinary con datos del .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// 2 - Definimos donde y como se van a guardar las imagenes en Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'productos_educativa', // nombre de la carpeta en cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
    }
})

export const uploader = multer({ storage });

export const deleteImageFromCloudinary = async (imageUrl) => {
    if (!imageUrl) return;
    try {
        const urlArray = imageUrl.split('/');
        const folderName = 'productos_educativa';
        const folderIndex = urlArray.findIndex(path => path === folderName);
        if (folderIndex !== -1) {
            const publicIdWithExtension = urlArray.slice(folderIndex).join('/');
            const publicId = publicIdWithExtension.split('.')[0];
            await cloudinary.uploader.destroy(publicId);
            console.log(`Imagen eliminada de Cloudinary: ${publicId}`);
        }
    } catch (error) {
        console.error('Error al eliminar imagen de Cloudinary:', error);
    }
};