import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/icon/icon";
import {
  faBackward,
  faEnvelope,
  faIdCard,
  faUnlockAlt,
  faUser,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../../components/input/input";
import ShadowButton from "../../../components/shadow-button/shadow-button";
import "../style.css";

// Expresiones regulares para validación
const regexEmail = /^[a-zA-Z0-9._%+-]+@(cuautitlan\.)?tecnm\.mx$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
const lettersRegex = /^[A-Za-zÀ-ÿ\s]+$/;
const letters_numbersRegex = /^[A-Za-z0-9À-ÿ\s]+$/;

// Mensajes de error 
const errorMessages = {
  control: [
    "Este número de identificación es tan válido como un billete de Monopoly. ¡Intenta otra vez!",
    "¡Ups! Ese número de identificación no está en nuestra lista de invitados. ¡Intenta con otro!",
    "Error: este ID es tan real como un unicornio.",
    "Ese ID está tan perdido como tus llaves.",
  ],
  name: [
    "El nombre debe contener solo letras.",
    "Oops, ¿un nombre con números? Eso no es parte del plan.",
    "Ese nombre intenta ser un rompecabezas. Aquí solo aceptamos letras.",
  ],
  ap1: [
    "El apellido paterno debe contener solo letras.",
    "¿Buscas ser original? Los números no son parte del juego aquí.",
    "Este apellido necesita un 'reboot'—solo letras, por favor.",
  ],
  ap2: [
    "El apellido materno debe contener solo letras.",
    "¡Alto ahí! Tu apellido tiene un exceso de matemáticas.",
    "¿Un apellido con números? Eso suena más a clave Wi-Fi.",
  ],
  email: [
    "Parece que tu dirección de correo es un poco... creativa. ¿Puedes revisarla?",
    "Dirección de correo no válida. Tal vez deberías probar con el correo institucional",
    "Oops, este correo no pasa la prueba. ¿Un poco de tesci, tal vez?",
  ],
  password: [
    "La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula y un número",
  ],
  confirm_password: [
    "Hmm... esta contraseña tiene menos coincidencias que un cactus en un jacuzzi.",
    "Contraseña no coincide. Intentaste usar la contraseña de tu vecino, ¿verdad?",
    "Esa contraseña no cuadra. Tal vez la escribiste con los ojos cerrados.",
    "Esta contraseña no coincide. Quizás la escribió un pulpo con guantes.",
  ],
};

function Register() {
  const [control, setControl] = useState("");
  const [name, setName] = useState("");
  const [ap1, setAp1] = useState("");
  const [ap2, setAp2] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPsw] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [control, name, ap1, ap2, email, password, confirm_password]);

  const validateInputs = () => {
    const newErrors = {};

    if (!control) {
      newErrors.control = "El número de identificación no puede estar vacío.";
    } else if (!letters_numbersRegex.test(control)) {
      newErrors.control = getRandomError("control");
    }

    if (!name) {
      newErrors.name = "El nombre no puede estar vacío.";
    } else if (!lettersRegex.test(name)) {
      newErrors.name = getRandomError("name");
    }

    if (!ap1) {
      newErrors.ap1 = "El apellido paterno no puede estar vacío.";
    } else if (!lettersRegex.test(ap1)) {
      newErrors.ap1 = getRandomError("ap1");
    }

    if (!ap2) {
      newErrors.ap2 = "El apellido materno no puede estar vacío.";
    } else if (!lettersRegex.test(ap2)) {
      newErrors.ap2 = getRandomError("ap2");
    }

    if (!email) {
      newErrors.email = "El campo de correo electrónico no puede estar vacío.";
    } else if (!regexEmail.test(email)) {
      newErrors.email = getRandomError("email");
    }

    if (!password) {
      newErrors.password = "La contraseña no puede estar vacía.";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = getRandomError("password");
    }

    if (!confirm_password) {
      newErrors.confirm_password =
        "Confirmación de contraseña no puede estar vacía.";
    } else if (password !== confirm_password) {
      newErrors.confirm_password = getRandomError("confirm_password");
    }

    return newErrors;
  };

  const getRandomError = (field) => {
    const messages = errorMessages[field];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Aquí puedes manejar el envío del formulario
    console.log("Formulario enviado con éxito:", {
      control,
      name,
      ap1,
      ap2,
      email,
      password,
    });
  };

  return (
    <div className="container">
      <div className="inner">
        <form onSubmit={handleSubmit} noValidate>
          <div className="titles-container">
            <Link to="/">
              <Icon css="btn-back" icon={faBackward} />
            </Link>
            <h3>Empieza Gratis</h3>
            <h1>
              Crea una
              <br />
              cuenta nueva
            </h1>
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/iniciar-sesion">Inicia Sesión</Link>
            </p>
          </div>

          <div className="inputs-container">
            <Input
              type="text"
              id="control"
              name="control"
              label="No. Identificación"
              icon={faIdCard}
              value={control}
              onChange={(e) => setControl(e.target.value)}
              onFocus={() => handleFocus("control")}
            />
            {errors.control && (
              <p className="error-message">
                {" "}
                <Icon css="error-icon" icon={faCircleExclamation} />{" "}
                {errors.control}
              </p>
            )}

            <Input
              type="text"
              id="name"
              name="name"
              label="Nombre"
              icon={faUser}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => handleFocus("name")}
            />
            {errors.name && (
              <p className="error-message">
                <Icon css="error-icon" icon={faCircleExclamation} />
                {errors.name}
              </p>
            )}

            <Input
              type="text"
              id="ap1"
              name="ap1"
              label="Apellido Paterno"
              icon={faUser}
              value={ap1}
              onChange={(e) => setAp1(e.target.value)}
              onFocus={() => handleFocus("ap1")}
            />
            {errors.ap1 && (
              <p className="error-message">
                <Icon css="error-icon" icon={faCircleExclamation} />
                {errors.ap1}
              </p>
            )}

            <Input
              type="text"
              id="ap2"
              name="ap2"
              label="Apellido Materno"
              icon={faUser}
              value={ap2}
              onChange={(e) => setAp2(e.target.value)}
              onFocus={() => handleFocus("ap2")}
            />
            {errors.ap2 && (
              <p className="error-message">
                <Icon css="error-icon" icon={faCircleExclamation} />
                {errors.ap2}
              </p>
            )}

            <Input
              type="text"
              id="email"
              name="email"
              label="Correo Institucional"
              icon={faEnvelope}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleFocus("email")}
            />
            {errors.email && (
              <p className="error-message">
                <Icon css="error-icon" icon={faCircleExclamation} />
                {errors.email}
              </p>
            )}

            <Input
              type="password"
              id="password"
              name="password"
              label="Crea una contraseña"
              icon={faUnlockAlt}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleFocus("password")}
            />
            {errors.password && (
              <p className="error-message">
                <Icon css="error-icon" icon={faCircleExclamation} />
                {errors.password}
              </p>
            )}

            <Input
              type="password"
              id="confirm_password"
              name="confirm_password"
              label="Confirma la contraseña"
              icon={faUnlockAlt}
              value={confirm_password}
              onChange={(e) => setConfirmPsw(e.target.value)}
              onFocus={() => handleFocus("confirm_password")}
            />
            {errors.confirm_password && (
              <p className="error-message">
                <Icon css="error-icon" icon={faCircleExclamation} />
                {errors.confirm_password}
              </p>
            )}
          </div>

          <ShadowButton text="Regístrate" type="submit" />
        </form>

        <div className="image-container">
          <img src="/img/labs.jpeg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Register;
