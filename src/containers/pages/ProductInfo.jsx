import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader';

import { get_product, get_products } from '../../redux/actions/products';
import {
    get_items,
    get_item_total,
    add_item,
    get_total
} from '../../redux/actions/cart';

import Layout from '../../hocs/Layout';


function ProductInfo({ isAuthenticated, get_product, product, get_items, get_item_total, add_item, get_total, get_products }){
   
    const params = useParams()
    const productId = params.productId

    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0,0)
        get_product(productId)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [formData, setFormData] = useState({
        item_count: 1
    });
    const { item_count } = formData;

    const onChange = (e) => { // Cambiar
        e.preventDefault()
        if(e.target.value > 0 && e.target.value <= product.quantity){
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }else if(e.target.value > 0){
            setFormData({ ...formData, [e.target.name]: product.quantity })
        }else{
            setFormData({ ...formData, [e.target.name]: 1 })
        }
        // handleItemQuantity(e.target.value)
    }

    // Añadir al carrito
    async function addToCart(){
        if(isAuthenticated){
            if(product && product !== null && product !== undefined && product.quantity > 0){
                setLoading(true)
                await add_item(product, item_count)
                await get_items()
                await get_item_total()
                await get_total()
                setLoading(false)
    
                navigate("/cart")
            }
        }else{
            navigate("/login")
        }
    }

    return(
        <Layout>
            <div className="seccionProducto">
                <div className="seccionProducto__contInfo">
                    <div className="seccionProducto__contInfo__contIzq">
                        <img src={`http://localhost:8000${product && product.get_image}`} alt="imgProduct" />
                    </div>
                    <div className="seccionProducto__contInfo__contDer">
                        <div className="seccionProducto__contInfo__contDer__contInfo">
                            <h1>{product && product.name}</h1>
                            <p className="seccionProducto__contInfo__contDer__contInfo--precio">{product && product.price}€</p>
                        </div>
                        <form>
                            <label htmlFor="item_count">Cantidad: </label>
                            <input type="number" id="item_count" name="item_count" defaultValue="1" min="0" max={product && product.quantity} onChange={(e) => onChange(e)}/>
                        </form>
                        <h2>Descripción</h2>
                        <p className="seccionProducto__contInfo__contDer--descripcion">{product && product.description}</p>
                        {
                            product && product !== null && product !== undefined && product.quantity > 0 ?
                            <p style={{color: "green"}}>En stock</p> : <p style={{color: "red"}}>Sin stock</p>
                        }
                        {
                            isLoading
                                ? <ClipLoader color="#36d7b7" />
                                : <button onClick={addToCart} className="seccionProducto__contInfo__contDer--boton">Agregar al carrito</button>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    product: state.Products.product
})

export default connect(mapStateToProps, {
    get_product,
    get_products,
    get_items,
    get_item_total,
    add_item,
    get_total
}) (ProductInfo)