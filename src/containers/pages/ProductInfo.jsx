import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader';

import { get_product } from '../../redux/actions/products';
import {
    get_items,
    get_item_total,
    add_item,
    get_total
} from '../../redux/actions/cart';


import Layout from '../../hocs/Layout';

function ProductInfo({ isAuthenticated, get_product, product, get_items, get_item_total, add_item, get_total }){
   
    const params = useParams()
    const productId = params.productId

    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0,0)

        get_product(productId)
    }, [])

    const link_img = product && "http://localhost:8000" + product.get_image;

    const [formData, setFormData] = useState({
        item_count: 1
    });
    const { item_count } = formData;

    const onChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value })
        // handleItemQuantity(e.target.value)
    }

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

    // async function handleItemQuantity(count){
    //     try{
    //         if (item.product.quantity >= count) {
    //             await update_item(item, count)
    //         }else{
    //             console.log("error") // Cambiar
    //         }
    //         setReload(!reload)
    //     }catch(err){
    //         console.log("Error", err) // Cambiar
    //     }
    // }

    function setNumberOptions(){
        const elementos = []

        for(let n = 1; n <= product.quantity; n++){
            elementos.push(<option key={n}>{n}</option>)
        }
        return elementos
    }

    return(
        <Layout>
            <div className="seccionProducto">
                <div className="seccionProducto__contInfo">
                    <div className="seccionProducto__contInfo__contIzq">
                        <img src={link_img} alt="" />
                    </div>
                    <div className="seccionProducto__contInfo__contDer">
                        <div className="seccionProducto__contInfo__contDer__contInfo">
                            <h1>{product && product.name}</h1>
                            <p className="seccionProducto__contInfo__contDer__contInfo--precio">{product && product.price}€</p>
                        </div>
                        <form>
                            <label htmlFor="item_count">Cantidad: </label>
                            <select id="item_count" name="item_count" onChange={(e) => onChange(e)}>
                                {product && setNumberOptions()}
                            </select>
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
    get_items,
    get_item_total,
    add_item,
    get_total
}) (ProductInfo)