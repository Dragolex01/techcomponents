import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';


function CartItem({ item, setReload, reload, update_item, remove_item }) {

    const [formData, setFormData] = useState({
        item_count: 1
    });
    const { item_count } = formData;
    
    useEffect(() => {
        if (item.count){
            setFormData({ ...formData, item_count: item.count });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item.count]);

    const onChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value })
        handleItemQuantity(e.target.value)
    }

    async function removeItemHandler(){
        await remove_item(item)
        setReload(!reload)
    }

    // function updateItemQuantity(e){
    //     e.preventDefault()
    //     handleItemQuantity()
    // }

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

    function setNumberOptions(){
        const elementos = []

        for(let n = 1; n <= item.product.quantity; n++){
            elementos.push(<option id="item_count" key={n}>{n}</option>)
        }
        return elementos
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
                    {/* <form onSubmit={(e) => updateItemQuantity(e)}> */}
                    <form>
                        <label htmlFor="item_count">Cantidad: </label>
                        {/* <select name="item_count" onChange={(e) => onChange(e)} value={item_count}>
                            {setNumberOptions()}
                        </select> */}
                        <input type="number" id="item_count" name="item_count" defaultValue="1" min="0" max={item.product.quantity} onChange={(e) => onChange(e)}/>
                        {/* <button type="submit">Update</button> */}
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