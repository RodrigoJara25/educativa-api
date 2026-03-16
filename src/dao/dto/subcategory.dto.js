export default class SubcategoryDTO {
    constructor(subcategory) {
        this._id = subcategory._id;
        this.nombre = subcategory.nombre;
        this.categoria = subcategory.categoria;  // Vendrá populado con { _id, nombre, tipo }
        this.foto = subcategory.foto;
        this.orden = subcategory.orden;
        this.createdAt = subcategory.createdAt;
        this.updatedAt = subcategory.updatedAt;
    }
}