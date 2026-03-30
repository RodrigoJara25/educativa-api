import jwt from "jsonwebtoken";

export const generateToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET no está definido en .env");
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET no está definido en .env");
    }
    return jwt.verify(token, process.env.JWT_SECRET);
};
