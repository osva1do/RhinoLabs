import { z } from "zod";

// Definir una expresión regular personalizada para el correo electrónico
const regexEmail = /^[a-zA-Z0-9._%+-]+@(cuautitlan\.)?tecnm\.mx$/;

// Definir una expresion regular para la contrasena
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

const lettersRegex = /^[A-Za-zÀ-ÿ\s]+$/;
const letters_numbersRegex = /^[A-Za-z0-9À-ÿ\s]+$/;

// Define los valores permitidos para las carreras
const allowedValues = [
  "Ing. Quimica",
  "Ing. en Administracion",
  "Contador Publico",
  "Ing. en Gestion Empresarial",
  "Ing. Industrial",
  "Ing. en Logistica",
  "Ing. Electronica y Mecatronica",
  "Ing. en Sistemas Computacionales",
  "Ing. Informatica y TICs",
];

export const loginScheme = z.object({
  email: z
    .string()
    .email("El correo electrónico no es válido")
    .regex(regexEmail, "Ingresa tu correo institucional"),
});

export const userScheme = z.object({
  control_number: z
    .string()
    .min(1, "Ingresa tu numero de identificacion")
    .regex(
      letters_numbersRegex,
      "El numero de identificacion solo puede contener letras o numeros"
    ),
  name: z
    .string()
    .min(1, "Ingresa un nombre")
    .regex(lettersRegex, "El nombre solo puede contener letras"),
  ap1: z
    .string()
    .min(1, "Ingresa tu apellido Paterno")
    .regex(lettersRegex, "El apellido paterno solo puede contener letras"),
  ap2: z
    .string()
    .min(1, "Ingresa tu apellido Materno")
    .regex(lettersRegex, "El apellido materno solo puede contener letras"),
  career: z.string().refine((value) => allowedValues.includes(value), {
    message: "El valor seleccionado no es válido",
  }),
  email: z.string().regex(regexEmail, "Ingresa tu correo institucional"),
  password: z
    .string()
    .min(8, "La contrasena debe tener por lo menos 8 caracteres")
    .regex(
      passwordRegex,
      "La contrasena debe incluir por lo menos una letra mayuscula, una letra minuscula y un numero"
    ),
});
