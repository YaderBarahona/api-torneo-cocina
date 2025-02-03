# 🎯 API RESTful - Torneo de Cocina

## 📌 Tabla de Contenidos
- [Descripción](#-descripción)
- [Características Principales](#-características-principales)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Cómo Probar la API](#-cómo-probar-la-api)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Endpoints Principales](#-endpoints-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Herramientas para Visualizar la Base de Datos](#-herramientas-para-visualizar-la-base-de-datos)
- [Comandos Útiles](#-comandos-útiles)

---

## 📌 Descripción
Esta API gestiona un torneo de cocina en el que participan chefs profesionales. Permite registrar chefs, torneos y sus resultados, además de consultar un ranking de los mejores participantes.

## 🚀 Características Principales
- Gestión de chefs y torneos de cocina.
- Registro de chefs en torneos con validaciones.
- Asignación de categorías a torneos.
- Registro de puntajes y cálculo del ranking.
- Autenticación con JWT.
- Validaciones con **Zod**.
- Documentación con **Swagger**.
- Base de datos con **SQLite y TypeORM**.

---

## 📌 Requisitos Previos
Antes de instalar el proyecto, asegúrate de tener lo siguiente instalado en tu sistema:
- **Node.js** (versión 16 o superior)
- **NPM** (versión 7 o superior)
- **Git**

---

## ⚙️ Instalación y Configuración
### 📌 1. Clonar el repositorio
```sh
$ git clone https://github.com/tuusuario/api-torneo-cocina.git
$ cd api-torneo-cocina
```

### 📌 2. Instalar dependencias
```sh
$ npm install
```

### 📌 3. Configurar variables de entorno
Crear un archivo **`.env`** en la raíz del proyecto y definir las siguientes variables:
```
PORT=3000
TOKEN_SECRET=tu_secreto_para_jwt
DATABASE_URL=sqlite://./src/database/db.sqlite
```

### 📌 4. Ejecutar las migraciones
```sh
$ npx typeorm migration:run -d ./src/config/database.js
```

### 📌 5. Iniciar el servidor
```sh
$ npm start
```

El servidor correrá en: **http://localhost:3000** 🚀

---

## 🔍 Cómo Probar la API
### 📌 Opción 1: Mediante Swagger UI
La API incluye documentación con **Swagger**. Para acceder:
- Inicia el servidor con `npm start`
- Abre un navegador y accede a: **`http://localhost:3000/api-docs`**

### 📌 Opción 2: Usando Postman o cURL
Ejemplo de solicitud con **cURL** para registrar un chef:
```sh
curl -X POST http://localhost:3000/api/chefs \ 
     -H "Content-Type: application/json" \ 
     -d '{"name": "María López", "specialty": "Cocina Mediterránea", "experienceYears": 5}'
```

---

## 📂 Estructura del Proyecto
```
src/
├── config/        # Configuración de la base de datos y variables de entorno
├── controllers/   # Controladores que manejan la lógica de las rutas
├── database/      # Definición de entidades y conexión con TypeORM
├── docs/          # Documentación (Swagger)
├── errors/        # Manejador de errores personalizados
├── libs/          # Librerías auxiliares (ej. manejo de JWT)
├── middlewares/   # Middlewares (ej. autenticación JWT, logs)
├── routes/        # Definición de rutas de la API
├── services/      # Capa de servicios para la lógica de negocio
├── validation/    # Esquemas de validación con Zod
├── app.js         # Configuración principal de Express
├── server.js      # Archivo de inicio del servidor
```

---

## 🛠️ Endpoints Principales
### 📌 Chefs
- `POST /api/chefs` → Registrar un nuevo chef
- `GET /api/chefs` → Obtener todos los chefs

### 📌 Torneos
- `POST /api/tournaments` → Crear un torneo
- `GET /api/tournaments` → Listar torneos
- `POST /api/tournaments/:id/register` → Inscribir un chef en un torneo
- `POST /api/tournaments/:id/submit` → Registrar el puntaje de un chef
- `GET /api/tournaments/:id/ranking` → Consultar el ranking del torneo
- `POST /api/tournaments/:id/categories` → Asignar categorías a un torneo

### 📌 Categorías
- `POST /api/categories` → Crear una nueva categoría
- `GET /api/categories` → Obtener todas las categorías

### 📌 Autenticación
- `POST /api/auth/login` → Iniciar sesión
- `POST /api/auth/register` → Registrar usuario

---

## Herramientas para Visualizar la Base de Datos

Si deseas inspeccionar directamente la base de datos y sus tablas, puedes utilizar herramientas gráficas como [DB Browser for SQLite](https://sqlitebrowser.org/).

### Pasos para abrir la base de datos:
1. Descarga e instala DB Browser for SQLite desde su [sitio oficial](https://sqlitebrowser.org/dl/).
2. Abre la aplicación y selecciona **"Open Database"**.
3. Navega hasta el archivo de la base de datos, ubicado en:
   ```bash
   src/database/data/database.sqlite
   ```
4. Explora las tablas, realiza consultas o verifica los datos almacenados.

Esto puede ser útil para depuración o para asegurarte de que las migraciones y los seeders funcionen correctamente.

---

## 🛠️ Tecnologías Utilizadas
- **Node.js** con **Express**
- **SQLite** y **TypeORM** para la base de datos
- **Zod** para validaciones
- **JWT** para autenticación
- **Swagger** para documentación

---

## 🛠️ Comandos Útiles
| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Ejecuta el servidor en modo desarrollo |
| `npm start` | Inicia el servidor en producción |
| `npx typeorm migration:run` | Ejecuta las migraciones |
| `npx typeorm migration:generate -d ./src/config/database.js -n InitDatabase` | Genera una nueva migración |
| `npx typeorm migration:revert` | Revierte la última migración |

