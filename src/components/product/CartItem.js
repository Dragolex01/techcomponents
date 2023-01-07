import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';


function CartItem({ item, setReload, reload, update_item, remove_item }) {

    // Update count
    function changeCount(value){
        if(value > 0 && value <= item.product.quantity){
            handleItemQuantity(value)
        }
    }

    async function handleItemQuantity(count){
        try{
            if (item.product.quantity >= count) {
                await update_item(item, count)
            }else{
                throw new Error("Error! No hay productos suficientes.")
            }
            setReload(!reload)
        }catch(err){
            throw new Error("Error! No se ha podido actualizar la cantidad del producto.")
        }
    }

    // Delete item
    async function removeItemHandler(){
        await remove_item(item)
        setReload(!reload)
    }


    return (
        <>
            <div className="seccionCarrito__contenedor__contItems__item--img">
                <img src={`http://localhost:8000${item.product.get_image}`} alt="imgProduct" />
            </div>
            <div className="seccionCarrito__contenedor__contItems__item--info">
                <div>
                    <div>
                        <h2>{item.product.name}</h2>
                        <p>Precio: {item.product.price}</p>
                    </div>
                    <form>
                        <label htmlFor="item_count">Cantidad: </label>
                        <input type="number" id="item_count" name="item_count" defaultValue={item.count} min="1" max={item.product.quantity} onChange={(e) => changeCount(e.target.value)}/>
                        <p>Quedan en stock: {item.product.quantity}</p>
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