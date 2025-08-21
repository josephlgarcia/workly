# Bitacora Backend

---
- ## Creating city models, controllers, endpoints and conection to the database (21 de agosto 2025)
### Implementaciones
#### Dependencias instaladas:
- **Express:** El framework principal para crear el servidor.
- **Cors:** Permite que el frontend se comunique con el backend.
- **dotenv:** Maneja variables de entorno de forma segura.
- **mysql2:** El cliente de MySQL para conectarnos a la base de datos.

Se añadió el campo "Gender" como enum a la entidad "employees".

Se creó la conexion a la base de datos dentro de models ```db.js```.

Se creó la logica de las rutas en src ```server.js```.

#### Se creó una carpeta de src y dentro de esta las siguientes:
- **Controllers:** Aqui van los archivos que contienen la logica para manejar solicitudes (request) y enviar las respuestas (response).
- **Models:** En esta carpeta se define como interactuar con la base de dartos (queries, tablas, etc.).
- **Routes:** Contiene los archivos que definen las URL de nuestra API (ej. /employee, /city).
#### Modelo de ciudades:
Este modelo contiene las 4 queries necesarias para la funcionalidad del crud.
* **GetAll** cities = SELECT * FROM cities;
* **GetById** = SELECT * FROM cities WHERE id_city = ?;
* **Create** = INSERT INTO cities (name) VALUES (?);
* **Update** = UPDATE cities SET name = ? WHERE id_city = ?;
* **Delete** = DELETE FROM cities WHERE id_city = ?;

#### Controlador de ciudades:
Este controlador contiene las funciones del crud llamando las queries que tenemos en el modelo correspondiente.
- **GetAll** = City.getAll();
- **GetById** = City.getById(req.params.id);
- **Create** = City.create(req.body);
- **Update** = City.update(id, req.body);
- **Delete** = City.delete(id);
*- EndPoints:*
Los endpoints se manejan con la siguiente ruta ```/api/v1/```, las cities se ven en la siguiente ruta ```http://localhost:3001/api/v1/city```