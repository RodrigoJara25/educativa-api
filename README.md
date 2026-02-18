# 📚 Educativa API

API REST para la gestión de productos educativos (libros y láminas), categorías y subcategorías.

## 🚀 Configuración

### Variables de entorno (`.env`)
```env
PORT=8080
MONGO_URL=mongodb://localhost:27017/educativa
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### Iniciar el servidor
```bash
npm run dev
```

**Base URL:** `http://localhost:8080/api`

---

## 📐 Arquitectura de Datos

```
Category (tipo: LIBRO | LAMINA)
    │
    ├── Si es LAMINA → tiene Subcategories
    │       │
    │       └── Product (con subcategoria + fotoLamina)
    │
    └── Si es LIBRO → sin Subcategories
            │
            └── Product (con titulo + fotoPortada + fotosInterior)
```

> ⚠️ El **tipo** del producto se determina automáticamente según la categoría elegida. No se envía manualmente.

---

## 🗂️ CATEGORÍAS

### `GET /api/categories`
Obtiene todas las categorías.

**Query params opcionales:**
- `?tipo=LIBRO` → solo categorías de libros
- `?tipo=LAMINA` → solo categorías de láminas

**Response:**
```json
[
    {
        "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
        "nombre": "Cuentos Clasicos",
        "descripcion": "",
        "tipo": "LIBRO",
        "activo": true,
        "orden": 0,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
    }
]
```

---

### `GET /api/categories/:id`
Obtiene una categoría por ID.

**Response:** objeto categoría (mismo formato que arriba)

---

### `POST /api/categories`
Crea una nueva categoría.

**Body (JSON):**
```json
{
    "nombre": "Cuentos Clasicos",
    "tipo": "LIBRO",
    "descripcion": "Descripción opcional",
    "orden": 1
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `nombre` | String | ✅ | Nombre único de la categoría |
| `tipo` | String | ✅ | `"LIBRO"` o `"LAMINA"` |
| `descripcion` | String | ❌ | Descripción opcional |
| `orden` | Number | ❌ | Orden de aparición (default: 0) |

**Response (201):** objeto categoría creada

---

### `PUT /api/categories/:id`
Actualiza una categoría existente.

**Body (JSON):** cualquier campo a actualizar
```json
{
    "nombre": "Nuevo nombre",
    "orden": 2
}
```

**Response (200):** objeto categoría actualizada

---

### `DELETE /api/categories/:id`
Elimina una categoría.

**Response (200):**
```json
{
    "message": "Categoría eliminada exitosamente",
    "category": { ... }
}
```

---

## 🏷️ SUBCATEGORÍAS

> ⚠️ Las subcategorías **solo aplican a categorías de tipo LAMINA**.

### `GET /api/subcategories`
Obtiene todas las subcategorías.

**Query params opcionales:**
- `?categoria=ID` → filtra por categoría (muy útil en el frontend)

**Response:**
```json
[
    {
        "_id": "65f1a2b3c4d5e6f7a8b9c0d2",
        "nombre": "Animales",
        "categoria": {
            "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
            "nombre": "Laminas Grandes",
            "tipo": "LAMINA"
        },
        "orden": 1,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
    }
]
```

---

### `GET /api/subcategories/:id`
Obtiene una subcategoría por ID.

---

### `POST /api/subcategories`
Crea una nueva subcategoría.

**Body (JSON):**
```json
{
    "nombre": "Animales",
    "categoria": "ID_DE_CATEGORIA_LAMINA",
    "orden": 1
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `nombre` | String | ✅ | Nombre de la subcategoría |
| `categoria` | ObjectId | ✅ | ID de una categoría de tipo LAMINA |
| `orden` | Number | ❌ | Orden de aparición (default: 0) |

> ❌ Si se intenta crear una subcategoría para una categoría de tipo LIBRO, devolverá error.

**Response (201):** objeto subcategoría creada

---

### `PUT /api/subcategories/:id`
Actualiza una subcategoría.

**Body (JSON):** cualquier campo a actualizar
```json
{
    "nombre": "Nuevo nombre",
    "orden": 2
}
```

---

### `DELETE /api/subcategories/:id`
Elimina una subcategoría.

**Response (200):**
```json
{
    "message": "Subcategoría eliminada exitosamente",
    "subcategory": { ... }
}
```

---

## 📦 PRODUCTOS

### `GET /api/products`
Obtiene todos los productos con categoría y subcategoría populadas.

**Response:**
```json
[
    {
        "id": "65f1a2b3c4d5e6f7a8b9c0d3",
        "categoria": {
            "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
            "nombre": "Laminas Grandes",
            "tipo": "LAMINA"
        },
        "subcategoria": {
            "_id": "65f1a2b3c4d5e6f7a8b9c0d2",
            "nombre": "Animales"
        },
        "fotoLamina": "https://res.cloudinary.com/...",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
        "id": "65f1a2b3c4d5e6f7a8b9c0d4",
        "categoria": {
            "_id": "65f1a2b3c4d5e6f7a8b9c0d5",
            "nombre": "Cuentos Clasicos",
            "tipo": "LIBRO"
        },
        "titulo": "Caperucita Roja",
        "fotoPortada": "https://res.cloudinary.com/...",
        "fotosInterior": [
            "https://res.cloudinary.com/...",
            "https://res.cloudinary.com/..."
        ],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
    }
]
```

---

### `GET /api/products/:id`
Obtiene un producto por ID.

---

### `POST /api/products` — Crear LÁMINA
Usar `multipart/form-data` si se sube imagen, o `application/json` si se envía URL.

**Opción A — Con archivo (multipart/form-data):**
```
categoria:    ID_CAT_LAMINA
subcategoria: ID_SUBCAT
image:        [archivo de imagen]
```

**Opción B — Con URL (application/json):**
```json
{
    "categoria": "ID_CAT_LAMINA",
    "subcategoria": "ID_SUBCAT",
    "fotoLamina": "https://url-de-la-imagen.com/foto.jpg"
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `categoria` | ObjectId | ✅ | ID de categoría tipo LAMINA |
| `subcategoria` | ObjectId | ✅ | ID de subcategoría de esa categoría |
| `fotoLamina` | String/File | ✅ | URL o archivo de imagen |

---

### `POST /api/products` — Crear LIBRO
**Opción A — Con archivo (multipart/form-data):**
```
categoria:    ID_CAT_LIBRO
titulo:       Caperucita Roja
image:        [archivo de imagen para portada]
```

**Opción B — Con URL (application/json):**
```json
{
    "categoria": "ID_CAT_LIBRO",
    "titulo": "Caperucita Roja",
    "fotoPortada": "https://url-de-la-portada.com/foto.jpg",
    "fotosInterior": [
        "https://url-pagina1.com/foto.jpg",
        "https://url-pagina2.com/foto.jpg"
    ]
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `categoria` | ObjectId | ✅ | ID de categoría tipo LIBRO |
| `titulo` | String | ✅ | Título del libro |
| `fotoPortada` | String/File | ✅ | URL o archivo de imagen de portada |
| `fotosInterior` | String[] | ❌ | Array de URLs de fotos interiores |

---

### `PUT /api/products/:id`
Actualiza un producto. Mismos campos que el POST, todos opcionales.

> ⚠️ Si se cambia la `categoria`, el sistema revalidará los campos según el nuevo tipo.

---

### `DELETE /api/products/:id`
Elimina un producto.

**Response (200):**
```json
{
    "message": "Producto eliminado exitosamente",
    "product": { ... }
}
```

---

## 🎨 FLUJO RECOMENDADO PARA EL FRONTEND

### Formulario de creación de producto:

```
1. GET /api/categories          → cargar todas las categorías en un dropdown

2. Usuario selecciona categoría
   → si category.tipo === 'LAMINA':
       GET /api/subcategories?categoria=ID  → cargar subcategorías
       Mostrar: dropdown subcategorías + campo fotoLamina

   → si category.tipo === 'LIBRO':
       Mostrar: campo titulo + campo fotoPortada + campo fotosInterior

3. Submit → POST /api/products con los datos correspondientes
```

---

## ❌ Errores comunes

| Error | Causa |
|-------|-------|
| `"La categoría no existe"` | El ID de categoría no existe en BD |
| `"subcategoria es requerida para láminas"` | Falta el campo subcategoria en una lámina |
| `"fotoLamina es requerida para láminas"` | Falta la foto en una lámina |
| `"titulo es requerido para libros"` | Falta el título en un libro |
| `"fotoPortada es requerida para libros"` | Falta la foto de portada en un libro |
| `"La subcategoría no pertenece a la categoría seleccionada"` | Subcategoría de otra categoría |
| `"Solo se pueden crear subcategorías para categorías de tipo LAMINA"` | Intentar crear subcategoría para un LIBRO |

---

## 🗄️ Subida de imágenes

Las imágenes se suben a **Cloudinary** automáticamente.

- **Campo en el form:** `image`
- **Formatos permitidos:** `jpg`, `jpeg`, `png`
- **Tamaño máximo:** 1000x1000px (se redimensiona automáticamente)
- **Carpeta en Cloudinary:** `productos_educativa`

---

## 📋 Resumen de endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categories` | Listar categorías |
| GET | `/api/categories?tipo=LIBRO` | Filtrar por tipo |
| GET | `/api/categories/:id` | Obtener categoría |
| POST | `/api/categories` | Crear categoría |
| PUT | `/api/categories/:id` | Actualizar categoría |
| DELETE | `/api/categories/:id` | Eliminar categoría |
| GET | `/api/subcategories` | Listar subcategorías |
| GET | `/api/subcategories?categoria=ID` | Filtrar por categoría |
| GET | `/api/subcategories/:id` | Obtener subcategoría |
| POST | `/api/subcategories` | Crear subcategoría |
| PUT | `/api/subcategories/:id` | Actualizar subcategoría |
| DELETE | `/api/subcategories/:id` | Eliminar subcategoría |
| GET | `/api/products` | Listar productos |
| GET | `/api/products/:id` | Obtener producto |
| POST | `/api/products` | Crear producto |
| PUT | `/api/products/:id` | Actualizar producto |
| DELETE | `/api/products/:id` | Eliminar producto |
