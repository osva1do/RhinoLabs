import { z } from "zod";
import multer from "multer";
import path from "path";

// Importar el modelo de autenticacion
import { login, errorsMap, register, isAuthenticated } from "../model/login.js";

import { userScheme } from "../schema/user.js";

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile-img/"); // Carpeta de destino
  },
  filename: function (req, file, cb) {
    cb(null, "USUARIO-" + Date.now());
  },
});

export const upload = multer({ storage: storage });

export const loginC = async (req, res) => {
  try {
    const result = await login(req.body);

    res.cookie("Sesion", result.token, result.cookieOptions);
    res.status(200).json({ token: result.token, role: result.role });
  } catch (error) {
    const errorMessage =
      errorsMap[error.code] ||
      res.status(500).send("ERROR EN EL SERVIDOR INTERNO");

    res.status(400).json({ error: errorMessage });
    console.log(error);
  }
};

export const registerC = async (req, res) => {
  try {
    const data = userScheme.parse(req.body);
    const filePath = req.file
      ? `/uploads/profile-img/${req.file.filename}`
      : "/uploads/default-profile.png"; // agregar una imagen por defecto si no se selecciona alguna

    const result = await register(data, filePath);

    res.status(200).json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => err.message);
      res.status(400).json({ error: errorMessages });
    } else if (error instanceof Error && error.code) {
      const errorMessage =
        errorsMap[error.code] || "ERROR EN EL SERVIDOR INTERNO";
      res.status(400).json({ error: errorMessage });
      console.error("Error del modelo:", error);
    } else {
      res.status(500).json({ error: "ERROR EN EL SERVIDOR INTERNO" });
      console.error("Error inesperado:", error);
    }
  }
};

// Verificacion de usuario autenticado
export const Authenticated = async (req, res, next) => {
  try {
    const token = req.cookies["Sesion"];
    const authResult = await isAuthenticated(token);

    if (!authResult.authenticated) {
      return res.status(401).json({ status: false });
    }

    req.user = authResult.user;
    delete req.user.contrasena;
    console.log(req.user);
    next();
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Verificacion del rol de usuario
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Verifica los roles de lo contrario redirecciona a una pagina de error
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.render("error");
    }
    next();
  };
};

// Cierre de sesion
export const logout = (req, res) => {
  res.clearCookie("Sesion", {
    httpOnly: true, // La cookie no es accesible desde el frontend
    secure: process.env.NODE_ENV === "production", // La cookie solo se envia a traves de HTTPS en producción
    sameSite: "Strict", // Protege contra ataques CSRF (Cross-Site Request Forgery)
  });

  // Redirigir al usuario a la página principal o de inicio
};
