import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import Layout from '../../hocs/Layout';

import { login } from '../../redux/actions/auth';
import Alert from '../../components/alert';
import { regularExpressionsForm, validateInput, validateEmpty } from '../../helpers/functions';

function Login({ login, isAuthenticated, loading }) {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        if(isAuthenticated){
            navigate("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

    const inputEmail = useRef('');
    const inputPassword = useRef('');

    function validateIsEmpty(){
        validateEmpty(inputEmail.current.value, 'email');
        validateEmpty(inputPassword.current.value, 'password');

        login(inputEmail.current.value, inputPassword.current.value)
    }

    function validateForm(name) {
        switch (name) {
          case 'email':
            validateInput(regularExpressionsForm.email, inputEmail.current.value, name);
            break;
    
          case 'password':
            validateInput(regularExpressionsForm.password, inputPassword.current.value, name);
            break;
            
          default:
            throw new Error('Error! Validadar formulario tipo erroneo');
        }
    }

    return (
        <Layout>
            <section className="seccionPerfil">
                <h2>Iniciar sesión</h2>
                <div className="titleDivider" />
                <form className="seccionPerfil__contForm">
                    <div className="seccionPerfil__contForm__contInputs">
                        <div className="seccionPerfil__contForm__contInputs--input" id="grupo__email">
                            <label htmlFor="email">Correo electrónico: </label>
                            <input type="email" name="email" ref={inputEmail} onChange={(e) => validateForm(e.target.name)} required/>
                            <p className="infoError">El correo solo puede contener letras, números, puntos, guiones y aguión bajo.</p>
                        </div>
                        <div className="seccionPerfil__contForm__contInputs--input" id="grupo__password">
                            <label htmlFor="password">Contraseña: </label>
                            <input type="password" name="password" ref={inputPassword} onChange={(e) => validateForm(e.target.name)} required/>
                            <p className="infoError">La contraseña debe ser de 4 a 20 dígitos.</p>
                        </div>
                    </div>
                    <div className="seccionPerfil__contForm__contBoton">
                        {
                            loading
                            ? <ClipLoader color="#36d7b7" />
                            : <button type="submit" onClick={validateIsEmpty}>Iniciar sesión</button>
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