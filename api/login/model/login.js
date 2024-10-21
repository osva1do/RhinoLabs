import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { promisify } from "util";
import { config } from "dotenv";
import connection from "../../configs/db.js";

config();

const roleMap = {
  root: "/root",
  administrador: "/admin",
  docente: "/docente",
  alumno: "/alumno",
};

export const errorsMap = {
  FIELDS_EMPTY:
    "¡Ups! Olvidaste ingresar tu correo y/o contraseña. Asegúrate de no estar escribiendo en el aire",
  USER_NOT_FOUND:
    "¡Eureka! No encontramos ese usuario. ¿Tal vez ha cambiado de nombre y no nos avisó?",
  INVALID_CREDENTIALS:
    "La contraseña está incorrecta. ¿Estás seguro de que no estás escribiendo tu contraseña de Wi-Fi por error?",
  EXISTING_USER:
    "Este usuario ya ha sido registrado, revisa tus datos e intenta nuevamente",
  EXISTING_EMAIL:
    "Este correo ya ha sido registrado, revisa e intenta nuevamente",
};

// Inicio de sesion y redireccion de pagina dependiendo el rol
export const login = async (data) => {
  try {
    const { username, password } = data;

    if (!username || !password) {
      throw { code: "FIELDS_EMPTY" };
    }

    // Verificar si el usuario existe en la BD
    const [results] = await connection.query(
      "SELECT * FROM usuarios WHERE correo = ?",
      [username]
    );

    if (results.length === 0) {
      throw { code: "USER_NOT_FOUND" };
    }

    const user = results[0];

    const passMatch = await bcryptjs.compare(password, user.contrasena);

    if (!passMatch) {
      throw { code: "INVALID_CREDENTIALS" };
    }

    // Inicio de sesión exitoso
    const token = jwt.sign(
      { id: user.num_identificacion },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION_TIME || "1h",
      }
    );

    const cookieOptions = {
      expires: new Date(
        Date.now() +
          (process.env.JWT_COOKIE_EXPIRATION || 7) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true, // Evita que la cookie sea accesible desde el cliente
      secure: process.env.NODE_ENV === "production", // Asegura que la cookie solo se envíe a través de HTTPS en producción
      sameSite: "Strict", // Protege contra ataques CSRF (Cross-Site Request Forgery)
    };

    return {
      token,
      cookieOptions,
      role: user.rol,
    };
  } catch (error) {
    throw error;
  }
};

// Comprobar la autenticacion del usuario con el token
export const isAuthenticated = async (token) => {
  if (token) {
    try {
      // Verificar el token JWT
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      // Consultar si el usuario existe en la base de datos
      const [results] = await connection.query(
        "SELECT * FROM usuarios WHERE num_identificacion = ?",
        [decoded.id]
      );

      if (results.length === 0) {
        return {
          authenticated: false,
          user: null,
          error: "Usuario no encontrado",
        };
      }

      // Devolver el usuario si la autenticación es exitosa
      return { authenticated: true, user: results[0], error: null };
    } catch (error) {
      console.error("Error en la verificación del token:", error);
      return {
        authenticated: false,
        user: null,
        error: "Error en la verificación del token",
      };
    }
  } else {
    return { authenticated: false, user: null, error: "No hay una autenticacion válida" };
  }
};

// Registrar usuarios nuevos
export const register = async (data, filePath) => {
  try {
    const { control_number, name, ap1, ap2, email, career, password } = data;
    const hashedPassword = await bcryptjs.hash(password, 12);
    const role = assignRole(control_number);

    const [existingUser] = await connection.query(
      "SELECT * FROM usuarios WHERE num_identificacion = ?",
      [control_number]
    );

    if (existingUser.length > 0) {
      const error = new Error();
      error.code = "EXISTING_USER";
      throw error;
    }

    const [existingEmail] = await connection.query(
      "SELECT * FROM usuarios WHERE correo = ?",
      [email]
    );

    if (existingEmail.length > 0) {
      const error = new Error();
      error.code = "EXISTING_EMAIL";
      throw error;
    }

    const [result] = await connection.query("INSERT INTO usuarios SET ?", {
      num_identificacion: control_number,
      nombre: name,
      ap1: ap1,
      ap2: ap2,
      carrera: career,
      correo: email,
      contrasena: hashedPassword,
      rol: role,
      foto: filePath,
    });

    console.log("USUARIO REGISTRADO CON ÉXITO");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

function assignRole(controlNumber) {
  if (controlNumber.length === 4) return "docente";

  return "alumno";
}
