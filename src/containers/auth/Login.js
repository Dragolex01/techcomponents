import { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import Layout from "../../hocs/Layout";

import { regularExpressionsForm, validarCampo } from "../../helpers/functions";

function Login() {

    const inputCorreo = useRef("");
    const inputPassword = useRef("");

    function validarFormulario(e) {
        switch (e.target.name) {
            case "correo":
                validarCampo(regularExpressionsForm.correo, inputCorreo, 'correo');
                break;
            case "password":
                validarCampo(regularExpressionsForm.password, inputPassword, 'password')
                break;
            default:
                throw new Error('Error! Validadar formulario tipo erroneo');
        }
    }


    return (
        <Layout>
            <div className="seccionPerfil">
                <form className="seccionPerfil__contenedorFormulario" id="formulario">
                    <h3>INICIA SESIÓN</h3>
                    <div className="seccionPerfil__contenedorFormulario__contenedorInput" id="grupo__correo">
                        <label htmlFor="email">Correo electrónico: </label>
                        <input type="email" name="correo" required ref={inputCorreo} onChange={validarFormulario} />
                        <FontAwesomeIcon icon={faCheckCircle} className="icon_validacion" />
                        {/* {
                    document.querySelector('#grupo__correo').classList.contains('validacion-incorrecto') ?
                        <FontAwesomeIcon icon={faTimesCircle} className="icon_validacion" /> :
                        null
                }
                {
                    document.querySelector('#grupo__correo').classList.contains('validacion-correcto') ?
                    <FontAwesomeIcon icon={faCheckCircle} className="icon_validacion" /> :
                        null
                } */}
                        <p className="infoError">El correo solo puede contener letras, números, puntos, guiones y aguión bajo.</p>
                    </div>
                    <div className="seccionPerfil__contenedorFormulario__contenedorInput" id="grupo__password">
                        <label htmlFor="password">Contraseña: </label>
                        <input type="password" name="password" required ref={inputPassword} onChange={validarFormulario} />
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