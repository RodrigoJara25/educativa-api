export default class CategoryDTO {
    constructor(category) {
        this._id = category._id;
        this.nombre = category.nombre;
        this.descripcion = category.descripcion;
        this.tipo = category.tipo;
        this.foto = category.foto;
        this.activo = category.activo;
        this.orden = category.orden;
        this.createdAt = category.createdAt;
        this.updatedAt = category.updatedAt;
    }
}