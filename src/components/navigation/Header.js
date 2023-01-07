import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import NavBar from './NavBar.js';
import { logout } from '../../redux/actions/auth';



import '../../styles/otros/dropdown.css'; //Temporal


function Header({ isAuthenticated, profile, logout }) {

  // Menu logueado

  const authLinks = (
    <div className="action">
      <div className="profile" onClick={menuToggle}>
        {
          profile && isAuthenticated
          ? <img src={`http://localhost:8000${profile.photo}`} className="profileimg" alt="img_user" />
          : <img src="http://localhost:8000/media/users/avatares/default_avatar.jpg" className="profileimg" alt="img_user" />
        }
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
              <button type="button" className="botonLogout" onClick={() => logout()}>Cerrar sesión</button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  )

  // Menu sin loguear

  const guestLinks = (
    <div className="action">
      <div className="profile" onClick={menuToggle}>
        {
          profile && isAuthenticated
          ? <img src={`http://localhost:8000${profile.photo}`} className="profileimg" alt="img_user" />
          : <img src="http://localhost:8000/media/users/avatares/default_avatar.jpg" className="profileimg" alt="img_user" />
        }
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

  // Cambiar estado menu
  
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
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  profile: state.Profile.profile
})

export default connect(mapStateToProps, {
  logout
})(Header)
