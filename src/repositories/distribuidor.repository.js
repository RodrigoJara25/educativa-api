import DistribuidorModel from "../dao/models/distribuidor.model.js";

class DistribuidorRepository {
    async findByEmail(email) {
        return await DistribuidorModel.findOne({ email });
    }

    async findById(id) {
        return await DistribuidorModel.findById(id);
    }

    async create(data) {
        const distribuidor = new DistribuidorModel(data);
        return await distribuidor.save();
    }

    async update(id, data) {
        return await DistribuidorModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await DistribuidorModel.findByIdAndUpdate(id, { activo: false }, { new: true });
    }

    async listarDistribuidores(filter = {}) {
        return await DistribuidorModel.find(filter);
    }
}

export default new DistribuidorRepository();