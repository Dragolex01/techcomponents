import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmericanSignLanguageInterpreting, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Layout from '../../hocs/Layout';

import { login } from '../../redux/actions/auth';
import Alert from '../../components/alert';

// import { validarFormulario } from '../../helpers/functions';

function Login({ login, isAuthenticated, loading }) {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        if(isAuthenticated){
            navigate("/")
        }
    }, [isAuthenticated])

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
        
        // navigate("/")
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
                        {
                            loading
                            ? <ClipLoader color="#36d7b7" />
                            : <button type="submit" className="seccionPerfil__contForm__contBoton--boton">Iniciar sesión</button>
                        }
                        <Link to="/register">¿Aún no tienes cuenta? Registrate</Link>
                    </div>
                </form>
                <Alert />
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