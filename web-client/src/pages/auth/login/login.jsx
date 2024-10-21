import { Link, useNavigate } from "react-router-dom";
import {
  faBackward,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../components/icon/icon";
import Input from "../../../components/input/input";
import ShadowButton from "../../../components/shadow-button/shadow-button";
import "../style.css";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setErrors] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:10001/login",
        { username, password },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { role } = response.data;
        // Mapa de redirecciones según rol
        const roleRedirectMap = new Map([
          ["root", "/root"],
          ["admin", "/admin"],
          ["docente", "/docente"],
        ]);

        const redirectTo = roleRedirectMap.get(role) || "/";
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrors(err.response.data.error);
      } else {
        setErrors("Error en el servidor");
      }
    }
  };

  return (
    <div className="container">
      <div className="inner">
        <form onSubmit={handleSubmit}>
          <div className="titles-container">
            <Link to="/">
              <Icon css="btn-back" icon={faBackward} />
            </Link>
            <h3>Empieza Gratis</h3>
            <h1>
              Inicia
              <br />
              Sesión
            </h1>
            <p>
              ¿No tienes una cuenta? <Link to="/iniciar-sesion">Crea una</Link>
            </p>
          </div>
          <Input
            type="text"
            id="email"
            name="email"
            label="Correo institucional"
            icon={faEnvelope}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <Input
            type="password"
            id="password"
            name="password"
            label="Contraseña"
            icon={faLock}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <ShadowButton text="Acceder" type="submit" />

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

        <div className="image-container">
          <img src="/img/labs.jpeg" alt="" />
        </div>
      </div>
    </div>
  );
};
export default Login;
