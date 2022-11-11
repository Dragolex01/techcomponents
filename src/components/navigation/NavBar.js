import { connect } from "react-redux";

import { Link } from "react-router-dom";



function NavBar() {

    return (
        // <nav className="header__contenedorCentral--contenedorMenu">
        //     <ul>
        //         <li><Link to="/" >Inicio</Link></li>
        //         <li><Link to="/lista" >Ordenadores</Link></li>
        //         <li><Link to="/lista" >Móviles</Link></li>
        //         <li><Link to="/lista" >Tablets</Link></li>
        //         <li><Link to="/contacto" >Contacto</Link></li>
        //     </ul>
        // </nav>
        <nav className="header__contenedorCentral__contenedorMenu">
            <ul>
                <li><Link to="/" >Inicio</Link></li>
                <li><Link to="/lista" id="linkArticulos" >Artículos</Link></li>
                <li><Link to="/" >Otra cosa</Link></li>
                <li><Link to="/informacion" >Sobre nosotros</Link></li>
                <li><Link to="/contactanos" >Contactanos</Link></li>
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