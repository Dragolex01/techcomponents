import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faWrench, faEnvelope, faPerson, faHouse, faDirections } from '@fortawesome/free-solid-svg-icons';

import Layout from '../../hocs/Layout';

import { update_user_profile } from '../../redux/actions/profile';

function Profile({ isAuthenticated, user, profile, update_user_profile }){
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!isAuthenticated){
            navigate("/login")
        }
    }, [isAuthenticated])

    function get_type_account(){
        return user && user.is_staff === false ? ' cliente' : ' admin'
    }

    // Editar informacion

    const [formData, setFormData] = useState({
        gender: '',
        region: '',
        city: '',
        province: '',
        address: '',
        postal_code: ''
    })

    const {
        gender,
        region,
        city,
        province,
        address,
        postal_code
    } = formData;

    function change_field_value(e){
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function update_profile(e){
        e.preventDefault();
        update_user_profile(region, city, province, address, postal_code)
        window.scrollTo(0, 0);
    }

    return(
        <Layout>
            <section className="seccionUser">
                <div className="seccionUser__contenedor">
                    <div className="seccionUser__contenedor__contImg"></div>
                    <h1>{user && user.get_full_name}</h1>
                    <form onSubmit={e => update_profile(e)} className="seccionUser__contenedor__contInfo">
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faWrench} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Tipo de cuenta: </label>
                                {get_type_account()}
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Correo: </label>
                                {user && user.email}
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faPerson} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Sexo: </label>
                                <label>H</label>
                                <input type="radio" name="gender" value="male" onChange={(e) => change_field_value(e)}/>
                                <label>M</label>
                                <input type="radio" name="gender" value="female" onChange={(e) => change_field_value(e)}/>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDirections} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Código postal: </label>
                                <input type="text" name="postal_code" placeholder={profile && profile.postal_code} value={postal_code} onChange={(e) => change_field_value(e)}/>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faHouse} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">País/Región: </label>
                                <select id="region" name="region">
                                    <option value="españa">España</option>
                                    <option value="estados_unidos">Estados Unidos</option>
                                </select>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDirections} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Ciudad: </label>
                                <input type="text" name="city" placeholder={profile && profile.city} value={city} onChange={(e) => change_field_value(e)}/>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDirections} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Provincia: </label>
                                <input type="text" name="province" placeholder={profile && profile.province} value={province} onChange={(e) => change_field_value(e)}/>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDirections} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Direccion: </label>
                                <input type="text" name="address" placeholder={profile && profile.address} value={address} onChange={(e) => change_field_value(e)}/>
                            </li>
                        </ul>
                        <button type="subtmit" onClick={update_profile}>Guardar</button>
                    </form>
                </div>
            </section>
        </Layout>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    profile: state.Profile.profile
})

export default connect(mapStateToProps, {
    update_user_profile
}) (Profile);




//Tipo de cuenta
//Correo
//Genero
//Direccion
//País/Región
//Ciudad
//Provincia
//Codigo postal
//Telefono