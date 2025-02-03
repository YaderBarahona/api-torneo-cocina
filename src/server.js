import app from "../src/app.js";
import { AppDataSource } from "../src/config/database.js";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada con éxito");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Documentación corriendo en http://localhost:${PORT}/api-docs`);

    });
  })
  .catch((error) => console.error("Error al conectar la base de datos:", error));
