import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import Layout from '../../hocs/Layout';

import { connect } from 'react-redux';
import { signup } from '../../redux/actions/auth';
import Alert from '../../components/alert';

import { firstLetterUppercase, regularExpressionsForm, validateInput, validateEmpty } from '../../helpers/functions';

function Signup({ signup, loading, alert }) {

    const navigate = useNavigate()

    const [accountCreated, setAccountCreated] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)

        if(accountCreated && alert && alert.alertType === 'green'){
            navigate("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountCreated, alert])


    const inputFirstName = useRef('');
    const inputLastName = useRef('');
    const inputEmail = useRef('');
    const inputPassoword = useRef('');
    const inputRePassoword = useRef('');

    function validateIsEmpty(){
        validateEmpty(inputFirstName.current.value, 'firstName');
        validateEmpty(inputLastName.current.value, 'lastName');
        validateEmpty(inputEmail.current.value, 'email');
        validateEmpty(inputPassoword.current.value, 'password');
        validateEmpty(inputRePassoword.current.value, 'rePassword');

        signup(firstLetterUppercase(inputFirstName.current.value), firstLetterUppercase(inputLastName.current.value), inputEmail.current.value, inputPassoword.current.value, inputRePassoword.current.value);
        setAccountCreated(true);
    }

    function validateForm(name) {
        switch (name) {
            case 'firstName':
                validateInput(regularExpressionsForm.name, inputFirstName.current.value, name);
                break;

            case 'lastName':
                validateInput(regularExpressionsForm.name, inputLastName.current.value, name);
                break;

            case 'email':
                validateInput(regularExpressionsForm.email, inputEmail.current.value, name);
                break;
        
            case 'password':
                validateInput(regularExpressionsForm.password, inputPassoword.current.value, name);
                break;

            case 'rePassword':
                validateInput(regularExpressionsForm.password, inputRePassoword.current.value, name);
                break;
                
            default:
                throw new Error('Error! Validadar formulario tipo erroneo');
        }
    }

    return (
        <Layout>
            <section className="seccionPerfil">
                <h2>Registrarse</h2>
                <div className="titleDivider" />
                <form className="seccionPerfil__contForm">
                    <div className="seccionPerfil__contForm__contInputs">
                        <div className="seccionPerfil__contForm__contInputs__contNombre">
                            <div className="seccionPerfil__contForm__contInputs__contNombre--input" id="grupo__firstName">
                                <label htmlFor="firstName">Nombre: </label>
                                <input type="text" name="firstName" ref={inputFirstName} onChange={(e) => validateForm(e.target.name)} required />
                                <p className="infoError">No se permiten caracteres especiales y números.</p>
                            </div>
                            <div className="seccionPerfil__contForm__contInputs__contNombre--input" id="grupo__lastName">
                                <label htmlFor="lastName">Apellido: </label>
                                <input type="text" name="lastName" ref={inputLastName} onChange={(e) => validateForm(e.target.name)} required />
                                <p className="infoError">No se permiten caracteres especiales y números.</p>
                            </div>
                        </div>
                        <div className="seccionPerfil__contForm__contInputs--input" id="grupo__email">
                            <label htmlFor="email">Correo electrónico: </label>
                            <input type="email" name="email" ref={inputEmail} onChange={(e) => validateForm(e.target.name)} required />
                            <p className="infoError">El correo solo puede contener letras, números, puntos, guiones y aguión bajo.</p>
                        </div>
                        <div className="seccionPerfil__contForm__contInputs--input" id="grupo__password">
                            <label htmlFor="password">Contraseña: </label>
                            <input type="password" name="password" ref={inputPassoword} onChange={(e) => validateForm(e.target.name)} required />
                            <p className="infoError">La contraseña debe ser de 4 a 20 dígitos.</p>
                        </div>
                        <div className="seccionPerfil__contForm__contInputs--input" id="grupo__rePassword">
                            <label htmlFor="rePassword">Vuelva a introducir una contraseña: </label>
                            <input type="password" name="rePassword" ref={inputRePassoword} onChange={(e) => validateForm(e.target.name)} required />
                            <p className="infoError">La contraseña debe ser de 4 a 20 dígitos.</p>
                        </div>
                    </div>
                    <div className="seccionPerfil__contForm__contBoton">
                        {
                            loading
                            ? <ClipLoader color="#36d7b7" />
                            : <button type="submit" onClick={validateIsEmpty}>Registrarse</button>
                        }
                        <Link to="/login">¿Ya tienes una cuenta? Inicia Sesión</Link>
                    </div>
                </form>
                <Alert />
            </section>
        </Layout>
    )
}

const mapStateToProps = state => ({
    loading: state.Auth.loading,
    alert: state.Alert.alert
})

export default connect(mapStateToProps, {
    signup
})(Signup);