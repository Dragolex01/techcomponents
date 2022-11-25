import { NavLink } from "react-router-dom";

function Footer(){
    return (
        <div className="seccionFooter">
            <div className="seccionFooter__contenedor">
                <h1>Sobre Nosotros</h1>
                <div className="seccionFooter__contenedor__contTexto">
                    <p>Reprehenderit velit amet minim duis minim ut Lorem voluptate excepteur eiusmod. Et non enim amet elit dolor sit. Consequat in ex cupidatat sunt. Incididunt ad sunt veniam pariatur veniam deserunt deserunt dolor do. Esse occaecat sunt aliquip tempor do cillum magna cupidatat sint ut Lorem Lorem. Nulla consectetur dolore tempor magna in ea Lorem id exercitation non. Deserunt magna labore cupidatat cupidatat enim labore amet deserunt duis.</p>
                </div>
            </div>
            <div className="seccionFooter__contenedor">
                <h1>Contacto</h1>
                <div className="seccionFooter__contenedor__contTexto">
                    <div className="seccionFooter__contenedor__contTexto--info">
                        <h4>Dirección:</h4>
                        <p>Madrid, España</p>
                    </div>
                    <div className="seccionFooter__contenedor__contTexto--info">
                        <h4>Email:</h4>
                        <p>techcomponents@example.com</p>
                    </div>
                    <div className="seccionFooter__contenedor__contTexto--info">
                        <h4>Teléfono:</h4>
                        <p>+34 666 66 66 66</p>
                    </div>
                    <nav className="seccionFooter__contenedor__contTexto__contBoton">
                        <NavLink to="/contactanos" className="seccionFooter__contenedor__contTexto--boton">¿Quieres saber más?</NavLink>
                    </nav>
                </div>
            </div>
            <div className="seccionFooter__contenedor">
                <h1>Links</h1>
                <div className="seccionFooter__contenedor__contTexto">
                    <nav className="seccionFooter__contenedor__contTexto--nav">
                        <ul>
                            <li><NavLink to="/" className="seccionFooter__contenedor__contTexto--boton">Inicio</NavLink></li>
                            <li><NavLink to="/lista" className="seccionFooter__contenedor__contTexto--boton">Ordenadores</NavLink></li>
                            <li><NavLink to="/lista" className="seccionFooter__contenedor__contTexto--boton">Móviles</NavLink></li>
                            <li><NavLink to="/lista" className="seccionFooter__contenedor__contTexto--boton">Tablets</NavLink></li>
                            <li><NavLink to="/contact" className="seccionFooter__contenedor__contTexto--boton">Contacto</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Footer;