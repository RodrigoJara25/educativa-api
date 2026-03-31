import userService from "./user.service.js";
import userRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/password.js";
import { generateToken } from "../utils/token.js";
import UserDTO from "../dao/dto/user.dto.js";

class AuthService {
    /** Registro de usuario */
    async register(data) {
        // La validación y el hash ahora están delegados al UserService
        // para mantener una arquitectura de capas limpia.
        const user = await userService.crearUsuario(data);
        return user;
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