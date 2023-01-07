import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faWrench, faEnvelope, faPhone, faHouse, faDirections } from '@fortawesome/free-solid-svg-icons';

import Layout from '../../hocs/Layout';

import { update_user_profile, update_user_photo } from '../../redux/actions/profile';


function Profile({ isAuthenticated, user, profile, update_user_profile, update_user_photo }){
    const navigate = useNavigate()

    const [profileData, setProfileData] = useState({
        phone_number: '',
        region: '',
        city: '',
        province: '',
        address: '',
        postal_code: ''
    })


    const {
        phone_number,
        region,
        city,
        province,
        address,
        postal_code
    } = profileData;


    useEffect(() => {
        if(isAuthenticated === false){
            navigate("/login")
        }else{
            if(profile && profile !== null && profile !== undefined){
                setProfileData({
                    phone_number: profile.phone_number,
                    region: '',
                    city: profile.city,
                    province: profile.province,
                    address: profile.address,
                    postal_code: profile.postal_code
                })

                if(profile.region !== null && profile.region !== ""){
                    document.getElementById(`option__${profile.region}`).removeAttribute('selected', 'selected')
                    document.getElementById(`option__${profile.region}`).setAttribute('selected', 'selected')
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, profile])

    function get_type_account(){
        return user && user.is_staff === false ? ' cliente' : ' admin'
    }

    // Editar informacion



    function change_field_value(name, value){
        setProfileData({ ...profileData, [name]: value });
    }

    function update_profile(e){
        e.preventDefault();
        update_user_profile(phone_number, region, city, province, address, postal_code)
        // window.scrollTo(0, 0);
    }


    const avatares = {
        default: '/users/avatares/default_avatar.jpg',
        avatar1: '/users/avatares/avatar1.png',
        avatar2: '/users/avatares/avatar2.png',
        avatar3: '/users/avatares/avatar3.jpg'
    }

    function changeAvatarMenu(){
        const contAvatares = document.getElementById('contAvatares')

        if(contAvatares.classList.contains('menuVisible')){
            contAvatares.classList.remove('menuVisible')
        }else{
            contAvatares.classList.add('menuVisible')
        }
    }

    function visualizarAvatares(){
        let listAvatares = []
        
        Object.entries(avatares).forEach(([key, value]) => {
                listAvatares.push(<img src={`http://localhost:8000/media${value}`} name={key} key={key} alt="img_user" onClick={(e) => update_user_photo(avatares[e.target.name])} />)
        })
        return listAvatares
    }

    return(
        <Layout>
            <section className="seccionUser">
                <div className="seccionUser__contenedor">
                    <div className="seccionUser__contenedor__contImg">
                        {
                            profile && <img src={`http://localhost:8000${profile.photo}`} alt="img_user" />
                        }
                        <button type="button" onClick={changeAvatarMenu}><FontAwesomeIcon icon={faPen} className="seccionUser__contenedor__contImg--icon" /></button>
                    </div>
                    <div className="seccionUser__contenedor__contAvatares" id="contAvatares">
                        {
                            visualizarAvatares()
                        }
                    </div>
                    <h1>{user && user.get_full_name}</h1>
                    <form onSubmit={(e) => update_profile(e)} className="seccionUser__contenedor__contInfo">
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
                                <FontAwesomeIcon icon={faPhone} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Telefono: </label>
                                <input type="tel" name="phone_number" defaultValue={phone_number} onChange={(e) => change_field_value(e.target.name, e.target.value)}/>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDirections} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Código postal: </label>
                                <input type="text" name="postal_code" defaultValue={postal_code} onChange={(e) => change_field_value(e.target.name, e.target.value)}/>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faHouse} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">País/Región: </label>
                                <select id="region" defaultValue={region} name="region" onChange={(e) => change_field_value(e.target.name, e.target.value)}> {/*No funciona*/}
                                    <option value="">--Selecciona--</option>
                                    <option id="option__españa" value="españa">España</option>
                                    <option id="option__estados_unidos" value="estados_unidos">Estados Unidos</option>
                                </select>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDirections} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Ciudad: </label>
                                <input type="text" name="city" defaultValue={city} onChange={(e) => change_field_value(e.target.name, e.target.value)}/>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDirections} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Provincia: </label>
                                <input type="text" name="province" defaultValue={province} onChange={(e) => change_field_value(e.target.name, e.target.value)}/>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDirections} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Direccion: </label>
                                <input type="text" name="address" defaultValue={address} onChange={(e) => change_field_value(e.target.name, e.target.value)}/>
                            </li>
                        </ul>
                        <button type="subtmit">Guardar</button>
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
    update_user_profile,
    update_user_photo
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