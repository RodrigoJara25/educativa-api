// src/controllers/user.controller.js
import userService from "../services/user.service.js";

/**
 * POST /api/users
 * Crea un usuario nuevo (Admin puede asignarle rol de Vendedor directamente)
 */
export const createUser = async (req, res) => {
    try {
        const user = await userService.crearUsuario(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

/**
 * GET /api/users
 * Lista todos los usuarios (solo para admin)
 */
export const listUsers = async (req, res) => {
    try {
        const users = await userService.listarUsuarios();
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

/**
 * GET /api/users/:id
 * Obtiene un usuario por su _id
 */
export const getUser = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ msg: err.message });
    }
};

/**
 * PUT /api/users/:id
 * Actualiza datos del usuario (password se hashará en AuthService si lo envías)
 */
export const updateUser = async (req, res) => {
    try {
        const updated = await userService.updateUser(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

/**
 * DELETE /api/users/:id
 * Soft‑delete (marca activo = false)
 */
export const deleteUser = async (req, res) => {
    try {
        const deleted = await userService.delete(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};
