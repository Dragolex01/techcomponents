import { connect } from 'react-redux';

import { Link } from 'react-router-dom';



function NavBar() {

    return (
        <nav className="seccionHeader__contCentral__contMenu">
            <ul>
                <li><Link to="/" id="linkHeader" >Inicio</Link></li>
                <li><Link to="/shop" id="linkHeader" >Artículos</Link></li>
                {/* <li><Link to="/" >Otra cosa</Link></li> */}
                <li><Link to="/about_us" id="linkHeader" >Sobre nosotros</Link></li>
                <li><Link to="/contact" id="linkHeader" >Contactanos</Link></li>
            </ul>
            {/* <div className="header__contenedorCentral__contenedorMenu__subcontenedor">
                <ul>
                    <li>Prueba</li>
                    <li>Prueba</li>
                </ul>
            </div> */}
        </nav>
    )
}

export default NavBar;




//Hacer menú desplegable de artículos
//Pensar que 5 opción poner (Cambiar en footer)