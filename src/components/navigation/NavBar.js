import { Link } from 'react-router-dom';

function NavBar() {

    return (
        <nav className="seccionHeader__contCentral__contMenu">
            <ul>
                <li><Link to="/" id="linkHeader" >Inicio</Link></li>
                <li><Link to="/shop" id="linkHeader" >Artículos</Link></li>
                <li><Link to="/about_us" id="linkHeader" >Sobre nosotros</Link></li>
                <li><Link to="/contact" id="linkHeader" >Contactanos</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;
