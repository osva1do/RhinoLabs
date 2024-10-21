import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Icon from "../icon/icon";
import {
  faCircleChevronRight,
  faCouch,
  faMicroscope,
  faVial,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = (props) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleSubMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <div className="side-title-container">
        <img src="/img/logo-tesci.png" alt="LOGO" />
        <h1>SGIIL</h1>
      </div>
      <div>
        <div
          onClick={() => toggleSubMenu("submenu1")}
          className={`menu-item ${activeMenu === "submenu1" ? "active" : ""}`}
        >
          <span
            className={`menu-text ${activeMenu === "submenu1" ? "active" : ""}`}
          >
            <Icon css="side-icon" icon={faVial} />
            Reactivos
            <Icon css="side-icon2" icon={faCircleChevronRight} />
          </span>
        </div>
        <div className={`submenu ${activeMenu === "submenu1" ? "open" : ""}`}>
          <Link to="/submenu1-1" className="submenu-item">
            Submenu 1.1
          </Link>
          <Link to="/submenu1-2" className="submenu-item">
            Submenu 1.2
          </Link>
        </div>
      </div>

      <div>
        <div
          onClick={() => toggleSubMenu("submenu2")}
          className={`menu-item ${activeMenu === "submenu2" ? "active" : ""}`}
        >
          <span
            className={`menu-text ${activeMenu === "submenu2" ? "active" : ""}`}
          >
            <Icon css="side-icon" icon={faWrench} />
            Herramientas
            <Icon css="side-icon2" icon={faCircleChevronRight} />
          </span>
        </div>
        <div className={`submenu ${activeMenu === "submenu2" ? "open" : ""}`}>
          <Link to="/submenu2-1" className="submenu-item">
            Submenu 2.1
          </Link>
          <Link to="/submenu2-2" className="submenu-item">
            Submenu 2.2
          </Link>
        </div>
      </div>

      <div>
        <div
          onClick={() => toggleSubMenu("submenu3")}
          className={`menu-item ${activeMenu === "submenu3" ? "active" : ""}`}
        >
          <span
            className={`menu-text ${activeMenu === "submenu3" ? "active" : ""}`}
          >
            <Icon css="side-icon" icon={faMicroscope} />
            Laboratorios
            <Icon css="side-icon2" icon={faCircleChevronRight} />
          </span>
        </div>
        <div className={`submenu ${activeMenu === "submenu3" ? "open" : ""}`}>
          <Link to="/submenu3-1" className="submenu-item">
            Submenu 1.1
          </Link>
          <Link to="/submenu3-2" className="submenu-item">
            Submenu 1.2
          </Link>
        </div>
      </div>

      <div>
        <div
          onClick={() => toggleSubMenu("submenu4")}
          className={`menu-item ${activeMenu === "submenu4" ? "active" : ""}`}
        >
          <span
            className={`menu-text ${activeMenu === "submenu4" ? "active" : ""}`}
          >
            <Icon css="side-icon" icon={faCouch} />
            Utilería
            <Icon css="side-icon2" icon={faCircleChevronRight} />
          </span>
        </div>
        <div className={`submenu ${activeMenu === "submenu4" ? "open" : ""}`}>
          <Link to="/submenu4-1" className="submenu-item">
            Submenu 1.1
          </Link>
          <Link to="/submenu4-2" className="submenu-item">
            Submenu 1.2
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
