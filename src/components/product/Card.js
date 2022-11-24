import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

function Card({ product, id }){

    return(
        <div className="contenedorProducto" key={id}>
            <div className="contenedorProducto__contenedorImg">
                <img src={product.get_image} className="contenedorProducto__contenedorImg--img" alt=""/>
            </div>
            <div className="contenedorProducto__contenedorInfo">
                <div className="contenedorProducto__contenedorInfo__subcontenedor">
                    <h3 className="contenedorProducto__contenedorInfo__subcontenedor--titulo"><Link to={`/product/${product.id}`} >{product.name}</Link></h3>
                    <p className="contenedorProducto__contenedorInfo__subcontenedor--precio">{product.price}€</p>
                </div>
                <p className="contenedorProducto__contenedorInfo--info">{product.description}</p>
            </div>
        </div>
    )
}

export default Card;