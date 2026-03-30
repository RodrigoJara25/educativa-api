export default class UserDTO {
    constructor(userDoc) {
        this.id = userDoc._id;
        this.nombre = userDoc.nombre;
        this.apellidos = userDoc.apellidos;
        this.email = userDoc.email;
        this.dni = userDoc.dni;
        this.celular = userDoc.celular;
        this.role = userDoc.role;
        this.activo = userDoc.activo;
        this.createdAt = userDoc.createdAt;
        this.updatedAt = userDoc.updatedAt;
    }
}
