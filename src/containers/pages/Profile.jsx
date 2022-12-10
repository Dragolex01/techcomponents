import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faWrench, faEnvelope, faPerson, faHouse, faDirections } from '@fortawesome/free-solid-svg-icons';

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
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} className="seccionUser__contenedor__contInfo--icon" />
                                Correo: {user && user.email}
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDirections} className="seccionUser__contenedor__contInfo--icon" />
                                Direccion: No especificado
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faPerson} className="seccionUser__contenedor__contInfo--icon" />
                                Sexo: No especificado
                            </li> {/* Opcional */}
                            {/* <li>
                                <FontAwesomeIcon icon={faUserCircle} className="seccionUser__contenedor__contInfo--icon" />
                                Fecha de nacimiento: No especificado
                            </li> Opcional */}
                        </ul>
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faWrench} className="seccionUser__contenedor__contInfo--icon" />
                                Tipo de cuenta: {get_type_account()}
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faHouse} className="seccionUser__contenedor__contInfo--icon" />
                                Ubicación: No especificado
                            </li> {/* Opcional */}
                            <li>
                                <FontAwesomeIcon icon={faUserCircle} className="seccionUser__contenedor__contInfo--icon" />
                                Fecha de registro: No especificado
                            </li>
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