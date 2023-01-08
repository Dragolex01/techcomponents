import { Link } from 'react-router-dom';

function Card({ product }){

    return(
        <>
            <div className="contProducto__contImg">
                <img src={`http://localhost:8000${product.get_image}`} className="contProducto__contImg--img" alt="imgProduct"/>
            </div>
            {/* <div className="contProducto__contInfo">
                <div className="contProducto__contInfo__subcontenedor">
                    <h3 className="contProducto__contInfo__subcontenedor--titulo"><Link to={`/product/${product.id}`} >{product.name}</Link></h3>
                    <p className="contProducto__contInfo__subcontenedor--precio">{product.price}€</p>
                </div>
                {
                    product.quantity > 0
                        ? <p className="contProducto__contInfo--info" style={{color: "green"}}>Stock</p>
                        : <p className="contProducto__contInfo--info" style={{color: "red"}}>Sin stock</p>
                }
            </div> */}
             <div className="contProducto__contInfo">
                <h3 className="contProducto__contInfo--titulo"><Link to={`/product/${product.id}`} >{product.name}</Link></h3>
                <div className="contProducto__contInfo__subcontenedor">
                {
                    product.quantity > 0
                        ? <p className="contProducto__contInfo__subcontenedor--info" style={{color: "green"}}>Stock</p>
                        : <p className="contProducto__contInfo__subcontenedor--info" style={{color: "red"}}>Sin stock</p>
                }
                    <p className="contProducto__contInfo__subcontenedor--precio">{product.price}€</p>
                </div>
            </div>
        </>
    )
}

export default Card;