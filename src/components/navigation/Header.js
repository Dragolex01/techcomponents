import { Link } from "react-router-dom";
import NavBar from './NavBar.js';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUserCircle } from "@fortawesome/free-solid-svg-icons";



function Header({ user }) {

  // function selectUrl(){
  //   return user === null ? "/perfil/iniciar_sesion" : "perfil/usuario"
  // }

  return (
    <div className="header">
      <div className="header__contenedorCentral">
        <h1>TechComponents</h1>
        <hr />
        <NavBar />
      </div>
      <nav className="header__contenedorLateral">
          <ul>
              {/* <li><Link to="/carrito" ><FontAwesomeIcon icon={faShoppingCart} className="header__contenedorLateral--icono"/></Link></li>
              <li><Link to={selectUrl()} ><FontAwesomeIcon icon={faUserCircle} className="header__contenedorLateral--icono"/></Link></li> */}
              <li><Link to="register">Register</Link></li>
              <li><Link to="login">Login</Link></li>
          </ul>
      </nav>
    </div>
  );
}

export default Header;
