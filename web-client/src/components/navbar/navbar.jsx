import { Link } from "react-router-dom";
import './style.css'
const Navbar = () => {
  
  return (
    <header className="navbar">
      <img src="/img/logo.png" alt="Logo" />
      <nav>
        <Link to='/'>Inicio</Link>
        <Link to='/'>Inicio</Link>
        <Link to='/'>Inicio</Link>
        <Link to='/'>Inicio</Link>
      </nav>
    </header>
  );
};
export default Navbar;