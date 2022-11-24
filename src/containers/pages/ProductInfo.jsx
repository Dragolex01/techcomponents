import { useParams } from "react-router-dom";
import { connect } from 'react-redux'

import { get_product } from '../../redux/actions/products';
import { useEffect } from "react";

import Layout from '../../hocs/Layout';

import imgPrueba from '../../img/imgMundial.jpg';

function ProductInfo({ get_product, product }){
    const params = useParams()
    const productId = params.productId

    useEffect(() => {
        window.scrollTo(0,0)
        get_product(productId)
    }, [])

    return(
        <Layout>
            <div className="seccionProducto">
                <div className="seccionProducto__contInfo">
                    <div className="seccionProducto__contInfo__contIzq">
                        <img src={imgPrueba} alt="" />
                    </div>
                    <div className="seccionProducto__contInfo__contDer">
                        <h1>{product && product.name}</h1>
                        <h2>{product && product.price}</h2>
                        <p>{product && product.description}</p>
                        <button className="seccionProducto__contInfo__contDer--boton">Boton</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    product: state.Products.product
})

export default connect(mapStateToProps, {
    get_product
}) (ProductInfo)