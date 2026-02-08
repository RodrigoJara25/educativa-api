import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL;
        await mongoose.connect(url);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}