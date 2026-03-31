// src/services/user.service.js
import userRepository from "../repositories/user.repository.js";
import UserDTO from "../dao/dto/user.dto.js";
import { createHash } from "../utils/password.js";

class UserService {
    /** Lista usuarios (opcional filtro) */
    async listarUsuarios(filter = {}) {
        const users = await userRepository.listarUsuarios(filter);
        return users.map(u => new UserDTO(u));
    }

    /** Crea un nuevo usuario y hashea su contraseña */
    async crearUsuario(data) {
        // 1. Verificar si el email existe
        const exists = await userRepository.findByEmail(data.email);
        if (exists) throw new Error("El email ya está registrado");

        // 2. Hashear password
        if (data.password) {
            data.password = createHash(data.password);
        }

        const user = await userRepository.create(data);
        return new UserDTO(user);
    }

    /** Obtiene un usuario por su _id */
    async getById(id) {
        const user = await userRepository.findById(id);
        if (!user) throw new Error("Usuario no encontrado");
        return new UserDTO(user);
    }

    /** Obtiene un usuario por email (útil para AuthService) */
    async getByEmail(email) {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error("Usuario no encontrado");
        return new UserDTO(user);
    }

    /** Actualiza datos (hash de password lo hace AuthService) */
    async updateUser(id, data) {
        // Si el Admin envía una nueva contraseña, la hasheamos
        if (data.password) {
            data.password = createHash(data.password);
        }
        const updated = await userRepository.update(id, data);
        if (!updated) throw new Error("No se pudo actualizar");
        return new UserDTO(updated);
    }

    /** Soft‑delete (marca activo = false) */
    async delete(id) {
        const deleted = await userRepository.delete(id);
        if (!deleted) throw new Error("No se pudo eliminar");
        return new UserDTO(deleted);
    }
}

export default new UserService();
