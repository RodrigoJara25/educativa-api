export default class DistribuidorDTO {
    constructor(doc) {
        this.id = doc._id;
        this.nombre = doc.nombre;
        this.ruc_dni = doc.ruc_dni;
        this.username = doc.username;
        this.celular = doc.celular;

        // Datos de Envío (Opcionales)
        this.departamento = doc.departamento || "";
        this.provincia = doc.provincia || "";
        this.distrito = doc.distrito || "";
        this.direccion = doc.direccion || "";
        this.agencia = doc.agencia || "";
        this.referencia = doc.referencia || "";

        this.email = doc.email;
        this.role = doc.role;
        this.activo = doc.activo;

        // Vendedor que lo administra (Populate)
        if (doc.vendedor_asignado && typeof doc.vendedor_asignado === 'object') {
            this.vendedorAsignado = {
                id: doc.vendedor_asignado._id,
                nombre: doc.vendedor_asignado.nombre,
                email: doc.vendedor_asignado.email
            };
        } else {
            this.vendedorAsignado = doc.vendedor_asignado || null;
        }

        this.orders = doc.orders;
        this.createdAt = doc.createdAt;
        this.updatedAt = doc.updatedAt;
    }
}
