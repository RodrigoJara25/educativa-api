// src/repositories/user.repository.js
import UserModel from "../dao/models/user.model.js";

class UserRepository {
    /** Busca un usuario por su email */
    async findByEmail(email) {
        return await UserModel.findOne({ email });
    }

    /** Busca un usuario por su id */
    async findById(id) {
        return await UserModel.findById(id);
    }

    /** Crea un nuevo usuario */
    async create(data) {
        const user = new UserModel(data);
        return await user.save();
    }

    /** Actualiza un usuario (por id) */
    async update(id, data) {
        return await UserModel.findByIdAndUpdate(id, data, { new: true });
    }

    /** Elimina (soft‑delete) un usuario */
    async delete(id) {
        return await UserModel.findByIdAndUpdate(id, { activo: false }, { new: true });
    }

    /** Lista todos los usuarios (opcional filtro) */
    async listarUsuarios(filter = {}) {
        return await UserModel.find(filter);
    }
}

export default new UserRepository();