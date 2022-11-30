import { useNavigate, useParams } from "react-router-dom";
import { connect } from 'react-redux'

import { get_product } from '../../redux/actions/products';
import {
    get_items,
    get_item_total,
    add_item,
    get_total
} from '../../redux/actions/cart';
import { useEffect } from "react";

import Layout from '../../hocs/Layout';

import imgPrueba from '../../img/imgMundial.jpg';

function ProductInfo({ get_product, product, get_items, get_item_total, add_item, get_total }){
    const params = useParams()
    const productId = params.productId

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0,0)
        get_product(productId)
    }, [])

    async function addToCart(){
        if(product && product !== null && product !== undefined && product.quantity > 0){
            await add_item(product)
            await get_items()
            await get_item_total()
            await get_total()

            navigate("/cart")
        }
    }

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
                        {
                            product && product !== null && product !== undefined && product.quantity > 0 ?
                            <p>En stock</p> : <p>Sin stock</p>
                        }
                        <button onClick={addToCart} className="seccionProducto__contInfo__contDer--boton">Agregar al carrito</button>
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
    get_product,
    get_items,
    get_item_total,
    add_item,
    get_total
}) (ProductInfo)