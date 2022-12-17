import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUser, faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import NavBar from './NavBar.js';
import { logout } from '../../redux/actions/auth';



import '../../styles/otros/dropdown.css'; //Temporal


function Header({ isAuthenticated, user, logout }) { //Redirect crea bucle

  // const [redirect, setRedirect] = useState(false)

  function logoutHandler(){
    logout()
    //setRedirect(true)
  }

  // if(redirect){
  //   return <Navigate to='/' />
  // }

  // function selectUrl(){
  //   return user === null ? "/perfil/iniciar_sesion" : "perfil/usuario"
  // }

  const authLinks = (
    <div className="action">
      <div className="profile" onClick={menuToggle}>
        <FontAwesomeIcon icon={faUserCircle} className="profileimg" />
      </div>
      <div className="menu">
        <ul>
          <li>
            <FontAwesomeIcon icon={faUser} className="icon" />
            <Link to="/profile">Mi perfil</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faShoppingCart} className="icon" />
            <Link to="/cart">Carrito</Link>
          </li>
          <li>
            <form method="POST" action="#">
              <FontAwesomeIcon icon={faArrowLeft} className="icon" />
              <button type="button" className="botonLogout" onClick={logoutHandler}>Cerrar sesión</button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  )

  const guestLinks = (
    <div className="action">
      <div className="profile" onClick={menuToggle}>
        <FontAwesomeIcon icon={faUserCircle} className="profileimg" />
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
  )

  function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
  }

  return (
    <div className="seccionHeader">
      <div className="seccionHeader__contCentral">
        <h1>TechComponents</h1>
        <hr />
        <NavBar />
      </div>
      <nav className="seccionHeader__contLateral">
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
      {/*
      
      <ul>
          <li><Link to="/carrito" ><FontAwesomeIcon icon={faShoppingCart} className="header__contenedorLateral--icono"/></Link></li>
          <li><Link to={selectUrl()} ><FontAwesomeIcon icon={faUserCircle} className="header__contenedorLateral--icono"/></Link></li>

          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      */}
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
