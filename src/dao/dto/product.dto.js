export default class ProductDTO {
    constructor(product) {
        // Transformación clave: de _id (Mongo) a id (JS estándar)
        this.id = product._id;
        this.tipo = product.tipo;
        this.categoria = product.categoria;

        // Usamos lógica condicional para limpiar los campos según el tipo
        if (product.tipo === 'LIBRO') {
            this.titulo = product.titulo;
            this.fotoPortada = product.fotoPortada;
            this.fotosInterior = product.fotosInterior || [];
        } else if (product.tipo === 'LAMINA') {
            this.subcategoria = product.subcategoria;
            this.fotoLamina = product.fotoLamina;
        }

        // Si usaste timestamps en el modelo, puedes pasarlos aquí también
        this.fechaCreacion = product.createdAt;
    }
}