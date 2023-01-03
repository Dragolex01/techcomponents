import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faWrench, faEnvelope, faPerson, faHouse, faDirections } from '@fortawesome/free-solid-svg-icons';

import Layout from '../../hocs/Layout';

import { update_user_profile, update_user_photo } from '../../redux/actions/profile';


function Profile({ isAuthenticated, user, profile, update_user_profile, update_user_photo }){
    const navigate = useNavigate()
    const form = useRef();
    useEffect(() => {
        if(isAuthenticated === false){
            navigate("/login")
        }
    }, [isAuthenticated])

    function get_type_account(){
        return user && user.is_staff === false ? ' cliente' : ' admin'
    }

    // Editar informacion

    const [formData, setFormData] = useState({
        // gender: '',
        region: '',
        city: '',
        province: '',
        address: '',
        postal_code: ''
    })

    const {
        // gender,
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


    const avatares = {
        default: '/users/avatares/default_avatar.jpg',
        avatar1: '/users/avatares/avatar1.png',
        avatar2: '/users/avatares/avatar2.png',
        avatar3: '/users/avatares/avatar3.jpg'
    }

    function update_photo(avatar){
        update_user_photo(avatares[avatar])
       
        window.scrollTo(0, 0);
    }

    function changeAvatarMenu(){
        const contAvatares = document.getElementById('contAvatares')

        if(contAvatares.classList.contains('menuVisible')){
            document.getElementById('contAvatares').classList.remove('menuVisible')
        }else{
            document.getElementById('contAvatares').classList.add('menuVisible')
        }
    }

    function visualizarAvatares(){
        let listAvatares = []
        
        Object.entries(avatares).forEach(([key, value]) => {
                listAvatares.push(<img src={`http://localhost:8000/media${value}`} name={key} key={key} alt="img_user" onClick={(e) => update_photo(e.target.name)} />)
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

                        {/* {
                            avatares.map(avatar => {
                                <img src={`http://localhost:8000/media/users/avatares/default_avatar.jpg`} name="" alt="img_user" onClick={(e) => update_photo(e.target.name)} />
                            })
                        } */}
                        {
                            visualizarAvatares()
                        }
                        {/* <img src={`http://localhost:8000/media/users/avatares/default_avatar.jpg`} name="default" alt="img_user" onClick={(e) => update_photo(e.target.name)} /> */}
                    </div>
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
                                {/* <label>H</label>
                                <input type="radio" name="gender" value="male" onChange={(e) => change_field_value(e)}/>
                                <label>M</label>
                                <input type="radio" name="gender" value="female" onChange={(e) => change_field_value(e)}/> */}
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDirections} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Código postal: </label>
                                <input type="text" name="postal_code" defaultValue={profile && profile.postal_code} onChange={(e) => change_field_value(e)}/>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faHouse} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">País/Región: </label>
                                <select id="region" name="region" onChange={(e) => change_field_value(e)}> {/*No funciona*/}
                                    <option value="españa">España</option>
                                    <option value="estados_unidos">Estados Unidos</option>
                                </select>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDirections} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Ciudad: </label>
                                <input type="text" name="city" defaultValue={profile && profile.city} onChange={(e) => change_field_value(e)}/>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDirections} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Provincia: </label>
                                <input type="text" name="province" defaultValue={profile && profile.province} onChange={(e) => change_field_value(e)}/>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDirections} className="seccionUser__contenedor__contInfo--icon" />
                                <label className="seccionUser__contenedor__contInfo--label">Direccion: </label>
                                <input type="text" name="address" defaultValue={profile && profile.address} onChange={(e) => change_field_value(e)}/>
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