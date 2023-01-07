import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import Layout from '../../hocs/Layout';
import CartItem from '../../components/product/CartItem';

import { get_items, get_item_total, get_total, update_item, remove_item, empty_cart } from '../../redux/actions/cart';


function Cart({ get_items, get_item_total, get_total, update_item, remove_item, empty_cart, items, amount, total_items}) {
  
  const navigate = useNavigate()
  
  const [reload, setReload] = useState(false);
  const [isLoading, setLoading] = useState(false);
  
  useEffect(() => {
    get_items()
    get_total()
    get_item_total()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  
  // Vaciar carrito
  async function emptyCart(){
    if(total_items > 0){
      setLoading(true)
      await empty_cart()
      setLoading(false)
      navigate("/cart")
    }else{
      alert("El carrito ya esta vacio")
    }
  }

  // Mostrar productos
  function showItems(){
    let display = []

    items && items !== null && items !== undefined && items.length > 0
      ? items.map((item, i) => {
          return (
            display.push(
              <div className="seccionCarrito__contenedor__contItems__item" key={i}>
                <CartItem item={item} reload={reload} setReload={setReload} update_item={update_item} remove_item={remove_item} />
              </div>
            )
          );
        })
      : <p>No hay productos.</p>

    return display;
  }


  // Mostrar información compra
  function showInfoProducts(){
    let display = []

    if(total_items > 0){
      items && items.map((item, i) => {
        return(
          display.push(
            <div key={i}>
              <h3>{item.product.name} x{item.count}</h3>
              <p>{item.product.price * item.count}</p>
            </div>
          )
        )
      })
    }else{
      return <p>Sin productos</p>
    }

    return display;
  }

  return (
    <Layout>
      <section className="seccionCarrito">
        { 
          (() => {
            if(total_items > 1){
              return <h1>Carrito: {total_items} productos</h1>
            }else if(total_items === 1){
              return <h1>Carrito: {total_items} producto</h1>
            }else{
              return <h1>Sin productos</h1>
            }
          })()
        }
        <div className="seccionCarrito__contenedor">
          {
            isLoading
              ? <ClipLoader color="#36d7b7" />
              : <div className="seccionCarrito__contenedor__contItems">
                  {
                    showItems()
                  }
                  {
                    total_items > 0
                      ? <button onClick={emptyCart} className="seccionCarrito__contenedor__contItems--boton" >Vaciar carrito</button>
                      : null
                  }
                </div>
          }
          <div className="seccionCarrito__contenedor__contInfoCompra">
            <div className="seccionCarrito__contenedor__contInfoCompra__contInfo">
                <h2>Resumen</h2>
                <div className="titleDivider" />
                <div className="seccionCarrito__contenedor__contInfoCompra__contInfo--cont1">
                    { 
                      showInfoProducts()
                    }
                </div>
                <div className="seccionCarrito__contenedor__contInfoCompra__contInfo--cont2">
                    <h3>Precio total: </h3>
                    <p>{amount.toFixed(2)}€</p>
                </div>
                <button>Finalizar compra</button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  items: state.Cart.items,
  amount: state.Cart.amount,
  total_items: state.Cart.total_items,
});

export default connect(mapStateToProps, {
  get_items,
  get_item_total,
  get_total,
  update_item,
  remove_item,
  empty_cart
})(Cart);
