import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config();

const connection = createPool({
  port: process.env.BD_PUERTO,
  host: process.env.BD_HOST,
  user: process.env.BD_USUARIO,
  password: process.env.BD_CONTRASENA,
  database: process.env.BD_NOMBRE,
});

export default connection;
