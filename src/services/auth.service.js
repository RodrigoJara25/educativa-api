// src/services/auth.service.js
import User from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/password.js";
import { generateToken, verifyToken } from "../utils/token.js";

/**
 * --------------------------------------------------------------
 *  Registro de nuevo usuario
 * --------------------------------------------------------------
 * @param {Object} data  - { nombre, apellidos, email, password, … }
 * @throws  Error si el email ya está registrado o falla la validación.
 * @returns {Object} usuario creado (sin el campo password)
 */
export const register = async (data) => {
    // 1️⃣ Verificar que el email no exista ya en la base
    const existent = await User.findOne({ email: data.email });
    if (existent) {
        throw new Error("El email ya está registrado");
    }

    // 2️⃣ Generar hash de la contraseña (aunque el modelo tiene hook,
    //    lo hacemos explícito para mayor claridad)
    const hashedPwd = createHash(data.password);

    // 3️⃣ Crear el usuario
    const user = await User.create({ ...data, password: hashedPwd });

    // 4️⃣ Quitar el hash antes de devolver el objeto al cliente
    const { password, ...safeUser } = user.toObject();
    return safeUser;
};

/**
 * --------------------------------------------------------------
 *  Login – validar credenciales y devolver JWT
 * --------------------------------------------------------------
 * @param {string} email
 * @param {string} password
 * @returns {{ token:string, user:Object }}
 */
export const login = async (email, password) => {
    // 1️⃣ Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Credenciales inválidas");
    }

    // 2️⃣ Comparar la contraseña recibida con el hash almacenado
    const valid = isValidPassword(password, user.password);
    if (!valid) {
        throw new Error("Credenciales inválidas");
    }

    // 3️⃣ Generar JWT (payload mínimo: id y role)
    const token = generateToken({ id: user._id, role: user.role });

    // 4️⃣ Devolver token + datos del usuario (sin password)
    const { password: pwd, ...safeUser } = user.toObject();
    return { token, user: safeUser };
};

/**
 * --------------------------------------------------------------
 *  Refresh token (esqueleto – implementar cuando lo necesites)
 * --------------------------------------------------------------
 * @param {string} refreshToken
 * @throws  Error siempre por ahora (no implementado)
 */
export const refresh = async (refreshToken) => {
    // Ejemplo de uso futuro:
    // const payload = verifyToken(refreshToken);
    // const newToken = generateToken({ id: payload.id, role: payload.role });
    // return newToken;

    throw new Error("Refresh token no implementado");
};
