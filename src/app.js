import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import setupSwagger from "./config/swagger.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",  
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));

app.use(loggerMiddleware);

app.use("/api", routes);

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("API de Torneos de Cocina funcionando... Puedes probar la API en la ruta /api-docs/");
});

export default app;
