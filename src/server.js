import app from "../src/app.js";
import { AppDataSource } from "../src/config/database.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0"; 

AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada con éxito");

    app.listen(PORT, HOST, () => {
      console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
      console.log(`Documentación disponible en http://${HOST}:${PORT}/api-docs`);
    });
    
  })
  .catch((error) => console.error("Error al conectar la base de datos:", error));
