import { verifyToken } from "../utils/token.js";

/**
 * Middleware para proteger rutas (verifica que el usuario esté logueado)
 */
export const protect = (req, res, next) => {
    // 1. Obtener el token del header (formato: "Bearer TOKEN")
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ msg: "No autorizado, falta el token" });
    }

    try {
        // 2. Verificar el token y extraer el payload ({ id, role })
        const decoded = verifyToken(token);

        // 3. Inyectar la info del usuario en el objeto `req` para usarla luego
        req.user = decoded;

        next(); // Continuar al siguiente middleware o controlador
    } catch (err) {
        return res.status(401).json({ msg: "Token inválido o expirado" });
    }
};

/**
 * Middleware para autorizar roles específicos (ej: ADMIN)
 */
export const authorize = (...roles) => {
    return (req, res, next) => {
        // req.user viene del middleware anterior `protect`
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ msg: "No tienes permiso para acceder a esta ruta" });
        }
        next();
    };
};