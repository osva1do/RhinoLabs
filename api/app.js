import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { corsMiddleware } from "./configs/cors.js";

//import de rutas para los distintos roles
import MainRouter from "./routers/main.js";

const app = express();

// Para el uso de las variables de entorno
config();

// Uso de morgan para verificar los status de los request
app.use(morgan("dev"));

// Configuracion para cors
app.use(corsMiddleware());

// Configuracion para multer
const upload = multer({ dest: "uploads/" });

// Usar las carpetas con archivos estaticos
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Procesar los datos enviados desde el formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Para trabajar las cookies
app.use(cookieParser());

// Rutas para cada nivel de usuario
app.use("/", MainRouter);

// Evitar que el usuario regrese a la sesion anterior con el boton back
app.use(function (req, res, next) {
  if (!req.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

export default app;
