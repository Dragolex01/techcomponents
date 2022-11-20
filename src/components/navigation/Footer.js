import { NavLink } from "react-router-dom";

function Footer(){
    return (
        <div className="contenedorFooter">
            <div className="contenedorFooter__contenedor">
                <div className="contenedorFooter__contenedor--titulo"><h3>Sobre Nosotros</h3></div>
                <div className="contenedorFooter__contenedor__contenedorTexto">
                    <p>Reprehenderit velit amet minim duis minim ut Lorem voluptate excepteur eiusmod. Et non enim amet elit dolor sit. Consequat in ex cupidatat sunt. Incididunt ad sunt veniam pariatur veniam deserunt deserunt dolor do. Esse occaecat sunt aliquip tempor do cillum magna cupidatat sint ut Lorem Lorem. Nulla consectetur dolore tempor magna in ea Lorem id exercitation non. Deserunt magna labore cupidatat cupidatat enim labore amet deserunt duis.</p>
                </div>
            </div>
            <div className="contenedorFooter__contenedor">
                <div className="contenedorFooter__contenedor--titulo"><h3>Contacto</h3></div>
                <div className="contenedorFooter__contenedor__contenedorTexto">
                    <div className="contenedorFooter__contenedor__contenedorTexto--info">
                        <h4>Dirección:</h4>
                        <p>Madrid, España</p>
                    </div>
                    <div className="contenedorFooter__contenedor__contenedorTexto--info">
                        <h4>Email:</h4>
                        <p>techcomponents@example.com</p>
                    </div>
                    <div className="contenedorFooter__contenedor__contenedorTexto--info">
                        <h4>Teléfono:</h4>
                        <p>+34 666 66 66 66</p>
                    </div>
                    <nav className="contenedorFooter__contenedor__contenedorTexto__contenedorBoton">
                        <NavLink to="/contactanos" className="contenedorFooter__contenedor__contenedorTexto--boton" >¿Quieres saber más?</NavLink>
                    </nav>
                </div>
            </div>
            <div className="contenedorFooter__contenedor">
                <div className="contenedorFooter__contenedor--titulo"><h3>Links</h3></div>
                <div className="contenedorFooter__contenedor__contenedorTexto">
                    <nav className="contenedorFooter__contenedor__contenedorTexto--nav">
                        <ul>
                            <li><NavLink to="/" className="contenedorFooter__contenedor__contenedorTexto--boton" >Inicio</NavLink></li>
                            <li><NavLink to="/lista" className="contenedorFooter__contenedor__contenedorTexto--boton" >Ordenadores</NavLink></li>
                            <li><NavLink to="/lista" className="contenedorFooter__contenedor__contenedorTexto--boton" >Móviles</NavLink></li>
                            <li><NavLink to="/lista" className="contenedorFooter__contenedor__contenedorTexto--boton" >Tablets</NavLink></li>
                            <li><NavLink to="/contact" className="contenedorFooter__contenedor__contenedorTexto--boton" >Contacto</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Footer;

//input type email para introducir el correo y que le lleguen ofertas y novedades. OPCIONAL para rellenar (Sucede al registrarse también)