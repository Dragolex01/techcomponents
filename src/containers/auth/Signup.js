import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import Layout from '../../hocs/Layout';

import { connect } from 'react-redux';
import { signup } from '../../redux/actions/auth';
import Alert from '../../components/alert';

import { firstLetterUppercase } from '../../helpers/functions';

// import { validarFormulario } from '../../helpers/functions';

function Signup({ signup }) {

    const navigate = useNavigate()

    const [accountCreated, setAccountCreated] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)

        if(accountCreated && alert !== null){
            navigate("/")
        }
    }, [accountCreated])

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    })

    const {
        first_name,
        last_name,
        email,
        password,
        re_password
    } = formData;

    function onChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // validarFormulario(e.target.name, e.target.value); -------------> NO FUNCIONA (functions.js)
    }

    function onSubmit(e) {
        e.preventDefault();
        signup(firstLetterUppercase(first_name), firstLetterUppercase(last_name), email, password, re_password);

        if(alert !== null){
            setAccountCreated(true);
        }
    }

    return (
        <Layout>
            <section className="seccionPerfil">
                <h2>Registrarse</h2>
                <form onSubmit={(e) => onSubmit(e)} className="seccionPerfil__contForm">
                    <div className="seccionPerfil__contForm__contInputs">
                        <div className="seccionPerfil__contForm__contInputs__contNombre">
                            <div className="seccionPerfil__contForm__contInputs__contNombre--input">
                                <label htmlFor="first_name">Nombre: </label>
                                <input type="text" name="first_name" value={first_name} required onChange={(e) => onChange(e)} />
                            </div>
                            <div className="seccionPerfil__contForm__contInputs__contNombre--input">
                                <label htmlFor="last_name">Apellido: </label>
                                <input type="text" name="last_name" value={last_name} required onChange={(e) => onChange(e)} />
                            </div>
                        </div>
                        <div className="seccionPerfil__contForm__contInputs--input">
                            <label htmlFor="email">Correo electrónico: </label>
                            <input type="email" name="email" value={email} required onChange={(e) => onChange(e)} />
                        </div>
                        <div className="seccionPerfil__contForm__contInputs--input">
                            <label htmlFor="password">Contraseña: </label>
                            <input type="password" name="password" value={password} required onChange={(e) => onChange(e)} />
                        </div>
                        <div className="seccionPerfil__contForm__contInputs--input">
                            <label htmlFor="re_password">Vuelva a introducir una contraseña: </label>
                            <input type="password" name="re_password" value={re_password} required onChange={(e) => onChange(e)} />
                        </div>
                    </div>
                    <div className="seccionPerfil__contForm__contBoton">
                        <button type="submit" className="seccionPerfil__contForm__contBoton--boton" >Registrarse</button>
                        <Link to="/login">¿Ya tienes una cuenta? Inicia Sesión</Link>
                    </div>
                </form>
                <Alert />
            </section>
        </Layout>

        // <Layout>
        //     <div className="seccionPerfil">
        //         <form onSubmit={(e) => onSubmit(e)} className="seccionPerfil__contenedorFormulario">
        //             <h3>REGISTRARSE</h3>
        //             <div className="seccionPerfil__contenedorFormulario__contenedorNombre">
        //                 <div className="seccionPerfil__contenedorFormulario__contenedorInput">
        //                     <label htmlFor="first_name">Nombre: </label>
        //                     <input type="text" name="first_name" value={first_name} onChange={(e) => onChange(e)} required />
        //                 </div>
        //                 <div className="seccionPerfil__contenedorFormulario__contenedorInput">
        // <label htmlFor="last_name">Apellido: </label>
        // <input type="text" name="last_name" value={last_name} onChange={(e) => onChange(e)} required />
        //                 </div>
        //             </div>
        //             <div className="seccionPerfil__contenedorFormulario__contenedorInput">
        //                 <label htmlFor="email">Correo electrónico: </label>
        //                 <input type="email" name="email" value={email} required onChange={(e) => onChange(e)} />
        //             </div>
        //             <div className="seccionPerfil__contenedorFormulario__contenedorInput">
        // <label htmlFor="password">Contraseña: </label>
        // <input type="password" name="password" value={password} required onChange={(e) => onChange(e)} />
        //             </div>
        //             <div className="seccionPerfil__contenedorFormulario__contenedorInput">
        // <label htmlFor="re_password">Vuelva a introducir una contraseña: </label>
        // <input type="password" name="re_password" value={re_password} required onChange={(e) => onChange(e)} />
        //             </div>
        // <button type="submit" className="seccionPerfil__contenedorFormulario--boton" >Registrarse</button>
        //         </form>
        //     </div>
        // </Layout>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {
    signup
})(Signup);


//Remember me (Cookies)
//Que las dos contraseñas coincidan