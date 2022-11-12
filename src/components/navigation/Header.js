import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons';

import NavBar from './NavBar.js';
import { logout } from '../../redux/actions/auth';



import '../../styles/dropdown.css'; //Temporal


function Header({ isAuthenticated, user, logout }) {

  const [redirect, setRedirect] = useState(false)

  function logoutHandler(){
    logout()
    setRedirect(true)
  }

  if(redirect ){
    return <Navigate to='/' />
  }

  // function selectUrl(){
  //   return user === null ? "/perfil/iniciar_sesion" : "perfil/usuario"
  // }

  const authLinks = (
    <>
      <div className="action">
        <div className="profile" onClick={menuToggle}>
          <FontAwesomeIcon icon={faUserCircle} className="header__contenedorLateral--icono" />
        </div>
        <div className="menu">
          <ul>
            <li>
              <a href="#">My profile</a>
            </li>
            <li>
              <form method='POST' action='#'>
                <button onClick={logoutHandler}>Cerrar sesión</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </>
  )

  const guestLinks = (
    <>
      <div className="action">
        <div className="profile" onClick={menuToggle}>
          <FontAwesomeIcon icon={faUserCircle} className="header__contenedorLateral--icono" />
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/login">Iniciar sesión</Link>
            </li>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )

  function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
  }

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

          {/* <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li> */}
          <li>{isAuthenticated ? authLinks : guestLinks}</li>
        </ul>
      </nav>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
})

export default connect(mapStateToProps, {
  logout
})(Header)
