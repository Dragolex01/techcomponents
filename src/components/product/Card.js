import { Link } from "react-router-dom";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

function Card({ product }){
    const link_img = "http://localhost:8000" + product.get_image;

    return(
        <>
            <div className="contProducto__contImg">
                <img src={link_img} className="contProducto__contImg--img" alt="imgProduct"/>
            </div>
            <div className="contProducto__contInfo">
                <div className="contProducto__contInfo__subcontenedor">
                    <h3 className="contProducto__contInfo__subcontenedor--titulo"><Link to={`/product/${product.id}`} >{product.name}</Link></h3>
                    <p className="contProducto__contInfo__subcontenedor--precio">{product.price}€</p>
                </div>
                {/* <p className="contProducto__contInfo--info">{product.description}</p> */}
                {
                    product.quantity > 0 ?
                        <p className="contProducto__contInfo--info">Stock</p> :
                        <p className="contProducto__contInfo--info">Sin stock</p>
                }
            </div>
        </>
    )
}

export default Card;