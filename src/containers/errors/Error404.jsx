import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

import Layout from '../../hocs/Layout';


function Error404(){
    const navigate = useNavigate()

    return(
        <Layout>
            <section className="seccionPageNotFound">
                <div className="seccionPageNotFound__contMensaje">
                    <h1>404</h1>
                    <div className="seccionPageNotFound__contMensaje--info">
                        <h2>Página no encontrada</h2>
                        <p>La dirección URL no existe o no esta disponible</p>
                    </div>
                </div>
                <div className="seccionPageNotFound__contBoton">
                    <button onClick={() => navigate("/")}><FontAwesomeIcon icon={faLeftLong} className="seccionPageNotFound__contBoton--icono" /> Volver al menu</button>
                </div>
            </section>
        </Layout>
    )
}

export default Error404;