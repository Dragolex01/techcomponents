import { useState, useEffect } from "react";

import Layout from "../../hocs/Layout";

import { validarFormulario } from "../../helpers/functions";

function Signup() {

    useEffect(() => {
        window.scrollTo(0,0) //Ir al inicio de la página al pulsar un Link
    })

    const [accountCreated, setAccountCreated] = useState(false)

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password:'',
        re_password: ''
    })

    const {
        first_name,
        last_name,
        email,
        password,
        re_password
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
                <form onSubmit={(e) => onSubmit(e)} className="seccionPerfil__contenedorFormulario">
                    <h3>REGISTRARSE</h3>
                    <div className="seccionPerfil__contenedorFormulario__contenedorNombre">
                        <div className="seccionPerfil__contenedorFormulario__contenedorInput">
                            <label htmlFor="first_name">Nombre: </label>
                            <input type="text" name="first_name" value={first_name} onChange={(e) => onChange(e)} required />
                        </div>
                        <div className="seccionPerfil__contenedorFormulario__contenedorInput">
                            <label htmlFor="last_name">Apellido: </label>
                            <input type="text" name="last_name" value={last_name} onChange={(e) => onChange(e)} required />
                        </div>
                    </div>
                    <div className="seccionPerfil__contenedorFormulario__contenedorInput">
                        <label htmlFor="email">Correo electrónico: </label>
                        <input type="email" name="email" value={email} required onChange={(e) => onChange(e)} />
                    </div>
                    <div className="seccionPerfil__contenedorFormulario__contenedorInput">
                        <label htmlFor="password">Contraseña: </label>
                        <input type="password" name="password" value={password} required onChange={(e) => onChange(e)} />
                    </div>
                    <div className="seccionPerfil__contenedorFormulario__contenedorInput">
                        <label htmlFor="re_password">Vuelva a introducir una contraseña: </label>
                        <input type="password" name="re_password" value={re_password} required onChange={(e) => onChange(e)} />
                    </div>
                    <button type="submit" className="seccionPerfil__contenedorFormulario--boton" >Registrarse</button>
                </form>
            </div>
        </Layout>
    )
}

export default Signup;


//Remember me (Cookies)
//Que las dos contraseñas coincidan