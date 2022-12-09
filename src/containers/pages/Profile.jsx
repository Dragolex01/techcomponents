import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../../hocs/Layout';

function Profile({ user, isAuthenticated }){
    const navigate = useNavigate()

    useEffect(() => {
        if(!isAuthenticated){
            navigate("/login")
        }
    }, [isAuthenticated])

    function get_type_account(){
        return user && user.is_staff === false ? ' cliente' : ' admin'
    }

    return(
        <Layout>
            <section className="seccionUser">
                <div className="seccionUser__contenedor">
                    <div className="seccionUser__contenedor__contImg"></div>
                    <h1>{user && user.get_full_name}</h1>
                    <div className="seccionUser__contenedor__contInfo">
                        <ul>
                            <li>Tipo de cuenta: {get_type_account()}</li>
                            <li>Correo: {user && user.email}</li>
                            <li>Sexo: No especificado</li> {/* Opcional */}
                            <li>Fecha de nacimiento: No especificado</li> {/* Opcional */}
                        </ul>
                        <ul>
                            <li>Ubicación: No especificado</li> {/* Opcional */}
                            <li>Direccion: No especificado</li>
                            <li>Fecha de registro: No especificado</li>
                        </ul>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
const mapStateToProps = (state) => ({
    user: state.Auth.user,
    isAuthenticated: state.Auth.isAuthenticated
})

export default connect(mapStateToProps, {
    
}) (Profile);