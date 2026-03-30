export default class DistribuidorDTO {
    constructor(doc) {
        this.id = doc._id;
        this.nombre = doc.nombre;
        this.ruc_dni = doc.ruc_dni;
        this.celular = doc.celular;
        this.email = doc.email;
        this.role = doc.role;
        this.activo = doc.activo;
        this.orders = doc.orders;
        this.createdAt = doc.createdAt;
        this.updatedAt = doc.updatedAt;
    }
}
