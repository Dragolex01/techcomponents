import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import Layout from "../../hocs/Layout";

import { validarFormulario } from "../../helpers/functions";

function Login() {

    useEffect(() => {
        window.scrollTo(0,0) //Ir al inicio de la página al pulsar un Link
    })

    const [formData, setFormData] = useState({
        email: '',
        password:''
    })

    const {
        email,
        password
    } = formData;

    function onChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
        // validarFormulario(e.target.name, e.target.value); -------------> NO FUNCIONA (functions.js)
    }

    function onSubmit(e){
        e.preventDefault();
        console.log(formData)
    }

    return (
        <Layout>
            <div className="seccionPerfil">
                <form onSubmit={(e) => onSubmit(e)} className="seccionPerfil__contenedorFormulario" id="formulario">
                    <h3>INICIA SESIÓN</h3>
                    <div className="seccionPerfil__contenedorFormulario__contenedorInput" id="grupo__email">
                        <label htmlFor="email">Correo electrónico: </label>
                        <input type="email" name="email" value={email} required onChange={(e) => onChange(e)} />
                        <FontAwesomeIcon icon={faCheckCircle} className="icon_validacion" />
                        <p className="infoError">El correo solo puede contener letras, números, puntos, guiones y aguión bajo.</p>
                    </div>
                    <div className="seccionPerfil__contenedorFormulario__contenedorInput" id="grupo__password">
                        <label htmlFor="password">Contraseña: </label>
                        <input type="password" name="password" value={password} required onChange={(e) => onChange(e)} />
                        <FontAwesomeIcon icon={faCheckCircle} className="icon_validacion" />
                        <p className="infoError">La contraseña debe ser de 4 a 12 dígitos.</p>
                    </div>
                    {/* <Link to="/perfil/registrarse" className="seccionPerfil__contenedorFormulario--link" >¿Aún no tienes cuenta? Registrate</Link> */}
                    <button type="submit" className="seccionPerfil__contenedorFormulario--boton">Iniciar sesión</button>
                </form>
            </div>
        </Layout>
    )
}

export default Login;



//Al validar formulario, añadir imagen de tick verde (correcto) o cruz roja (incorrecto)
//Validar si estan vacios
//¿Has olvidado tu contraseña?