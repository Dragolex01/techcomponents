import { Link } from "react-router-dom";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

function Card({ product }){

    return(
        <>
            <div className="contProducto__contImg">
                <img src={product.get_image} alt=""/>
            </div>
            <div className="contProducto__contInfo">
                <div className="contProducto__contInfo__subcontenedor">
                    <h3 className="contProducto__contInfo__subcontenedor--titulo"><Link to={`/product/${product.id}`} >{product.name}</Link></h3>
                    <p className="contProducto__contInfo__subcontenedor--precio">{product.price}€</p>
                </div>
                <p className="contProducto__contInfo--info">{product.description}</p>
            </div>
        </>
    )
}

export default Card;