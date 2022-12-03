import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function CartItem({ item, setReload, reload, remove_item }) {

    async function removeItemHandler(){
        await remove_item(item)
        setReload(!reload)
    }

    return (
        <>
            <div className="seccionCarrito__contenedor__contItems__item--img">
                <img src="#" />
            </div>
            <div className="seccionCarrito__contenedor__contItems__item--info">
                <div>
                    <div>
                        <h2>{item.product.name}</h2>
                        <p>Precio: {item.product.price}</p>
                    </div>
                    <form>
                        {/* <select>
                            <option></option>
                        </select> */}
                        <p>Cantidad: {item.product.quantity}</p>
                    </form>
                </div>
            </div>
            <div className="seccionCarrito__contenedor__contItems__item__contBoton">
                <button onClick={removeItemHandler} className="seccionCarrito__contenedor__contItems__item__contBoton--boton">
                    <FontAwesomeIcon icon={faX} className="seccionCarrito__contenedor__contItems__item__contBoton--imgBoton" />
                </button>
            </div>
        </>
    )
}

export default CartItem;