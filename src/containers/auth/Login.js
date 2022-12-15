import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmericanSignLanguageInterpreting, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Layout from '../../hocs/Layout';

import { login } from '../../redux/actions/auth';

// import { validarFormulario } from '../../helpers/functions';

function Login({ login, isAuthenticated }) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {
        email,
        password
    } = formData;

    function onChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // validarFormulario(e.target.name, e.target.value); -------------> NO FUNCIONA (functions.js)
    }

    function onSubmit(e) {
        e.preventDefault();
        login(email, password);
        
        // isAuthenticated ? navigate("/") : alert('no') //ERROR
    }

    return (
        <Layout>
            <section className="seccionPerfil">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={(e) => onSubmit(e)} className="seccionPerfil__contForm">
                    <div className="seccionPerfil__contForm__contInputs">
                        <div className="seccionPerfil__contForm__contInputs--input">
                            <label htmlFor="email">Correo electrónico: </label>
                            <input type="email" name="email" value={email} required onChange={(e) => onChange(e)} />
                            <FontAwesomeIcon icon={faCheckCircle} className="icon_validacion" />
                            <p className="infoError">El correo solo puede contener letras, números, puntos, guiones y aguión bajo.</p>
                        </div>
                        <div className="seccionPerfil__contForm__contInputs--input">
                            <label htmlFor="password">Contraseña: </label>
                            <input type="password" name="password" value={password} required onChange={(e) => onChange(e)} />
                            <FontAwesomeIcon icon={faCheckCircle} className="icon_validacion" />
                            <p className="infoError">La contraseña debe ser de 4 a 12 dígitos.</p>
                        </div>
                    </div>
                    <div className="seccionPerfil__contForm__contBoton">
                        <button type="submit" className="seccionPerfil__contForm__contBoton--boton">Iniciar sesión</button>
                        <Link to="/register">¿Aún no tienes cuenta? Registrate</Link>
                    </div>
                </form>
            </section>
        </Layout>
    )
}

const mapStateToProps = state => ({
    loading: state.Auth.loading,
    isAuthenticated: state.Auth.isAuthenticated
})

export default connect(mapStateToProps, {
    login
})(Login)



    //Al validar formulario, añadir imagen de tick verde (correcto) o cruz roja (incorrecto)
    //Validar si estan vacios
    //¿Has olvidado tu contraseña?













    // <div div className = "seccionPerfil" >
    //     <form onSubmit={(e) => onSubmit(e)} className="seccionPerfil__contenedorFormulario" id="formulario">
    //         <h3>INICIA SESIÓN</h3>
    //         <div className="seccionPerfil__contenedorFormulario__contenedorInput" id="grupo__email">
    //             <label htmlFor="email">Correo electrónico: </label>
    //             <input type="email" name="email" value={email} required onChange={(e) => onChange(e)} />
    //             <FontAwesomeIcon icon={faCheckCircle} className="icon_validacion" />
    //             <p className="infoError">El correo solo puede contener letras, números, puntos, guiones y aguión bajo.</p>
    //         </div>
    //         <div className="seccionPerfil__contenedorFormulario__contenedorInput" id="grupo__password">
    //             <label htmlFor="password">Contraseña: </label>
    //             <input type="password" name="password" value={password} required onChange={(e) => onChange(e)} />
    //             <FontAwesomeIcon icon={faCheckCircle} className="icon_validacion" />
    //             <p className="infoError">La contraseña debe ser de 4 a 12 dígitos.</p>
    //         </div>
    //         {/* <Link to="/perfil/registrarse" className="seccionPerfil__contenedorFormulario--link" >¿Aún no tienes cuenta? Registrate</Link> */}
    //         <button type="submit" className="seccionPerfil__contenedorFormulario--boton">Iniciar sesión</button>
    //     </form>
    //         </div >