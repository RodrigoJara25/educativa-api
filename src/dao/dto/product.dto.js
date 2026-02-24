export default class ProductDTO {
    constructor(product) {
        this.id = product._id;
        this.item = product.item;
        this.categoria = product.categoria;  // Objeto populado: { _id, nombre, tipo }

        // Determinamos el tipo desde la categoría populada
        const tipo = product.categoria?.tipo;

        if (tipo === 'LIBRO') {
            this.titulo = product.titulo;
            this.fotoPortada = product.fotoPortada;
            this.fotosInterior = product.fotosInterior || [];
        } else if (tipo === 'LAMINA') {
            this.subcategoria = product.subcategoria;  // Objeto populado: { _id, nombre }
            this.fotoLamina = product.fotoLamina;
        }

        this.createdAt = product.createdAt;
        this.updatedAt = product.updatedAt;
    }
}