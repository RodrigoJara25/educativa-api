import userService from "./user.service.js";
import userRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/password.js";
import { generateToken } from "../utils/token.js";
import UserDTO from "../dao/dto/user.dto.js";

class AuthService {
    /** Registro de usuario */
    async register(data) {
        // 1️⃣ Verificar que el email no exista
        const exists = await userRepository.findByEmail(data.email);
        if (exists) throw new Error("El email ya está registrado");

        // 2️⃣ Hashear password
        const hashed = createHash(data.password);

        // 3️⃣ Crear usuario vía userService
        const user = await userService.crearUsuario({ ...data, password: hashed });

        return user; // ya es un UserDTO (sin password)
    }

    /** Login de usuario */
    async login(email, password) {
        // 1️⃣ Buscar usuario (necesitamos el hash, por eso usamos repository)
        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error("Credenciales inválidas");

        // 2️⃣ Comparar password
        const valid = isValidPassword(password, user.password);
        if (!valid) throw new Error("Credenciales inválidas");

        // 3️⃣ Generar JWT
        const token = generateToken({ id: user._id, role: user.role });

        // 4️⃣ Devolver token + DTO (sin password)
        return { token, user: new UserDTO(user) };
    }
}

export default new AuthService();