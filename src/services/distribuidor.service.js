import distribuidorRepository from "../repositories/distribuidor.repository.js";
import DistribuidorDTO from "../dao/dto/distribuidor.dto.js";
import { createHash } from "../utils/password.js";

class DistribuidorService {
    async listarDistribuidores(filter = {}) {
        const distribuidores = await distribuidorRepository.listarDistribuidores(filter);
        return distribuidores.map(d => new DistribuidorDTO(d));
    }

    async crearDistribuidor(data) {
        if (data.password) {
            data.password = createHash(data.password);
        }
        const distribuidor = await distribuidorRepository.create(data);
        return new DistribuidorDTO(distribuidor);
    }

    async getById(id) {
        const distribuidor = await distribuidorRepository.findById(id);
        if (!distribuidor) throw new Error("Distribuidor no encontrado");
        return new DistribuidorDTO(distribuidor);
    }

    async getByEmail(email) {
        const distribuidor = await distribuidorRepository.findByEmail(email);
        if (!distribuidor) throw new Error("Distribuidor no encontrado");
        return new DistribuidorDTO(distribuidor);
    }

    async update(id, data) {
        if (data.password) {
            data.password = createHash(data.password);
        }
        const updated = await distribuidorRepository.update(id, data);
        if (!updated) throw new Error("No se pudo actualizar");
        return new DistribuidorDTO(updated);
    }

    async delete(id) {
        const deleted = await distribuidorRepository.delete(id);
        if (!deleted) throw new Error("No se pudo eliminar");
        return new DistribuidorDTO(deleted);
    }
}

export default new DistribuidorService();