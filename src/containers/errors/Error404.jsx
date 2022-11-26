import Layout from "../../hocs/Layout";
import { Link } from 'react-router-dom';

function Error404(){
    return(
        <Layout>
            <section className="seccionPageNotFound">
                <div className="seccionPageNotFound__contMensaje">
                    <h1>Error 404</h1>
                    <Link to="/">Volver al menu</Link>
                </div>
            </section>
        </Layout>
    )
}

export default Error404;