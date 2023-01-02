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
      // window.scrollTo(0, 0);
      get_items()
      get_total()
      get_item_total()
  }, [reload])

  //   const onSubmit = e => {
  //     e.preventDefault()
  // }

    async function emptyCart(){
      // if(product && product !== null && product !== undefined && product.quantity > 0){
      //     await add_item(product)
      //     await get_items()
      //     await get_item_total()
      //     await get_total()

      //     navigate("/cart") //Quitar mejor
      // }
      if(total_items > 0){
        setLoading(true)
        await empty_cart()
        setLoading(false)
        navigate("/cart")
      }else{
        alert("El carrito ya esta vacio")
      }
  }

  const showItems = () => {
    return (
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
                  {items && items !== null && items !== undefined && items.length > 0
                    ? items.map((item, i) => {
                        return (
                          <div className="seccionCarrito__contenedor__contItems__item" key={i}>
                            <CartItem item={items[i]} reload={reload} setReload={setReload} update_item={update_item} remove_item={remove_item} />
                          </div>
                        );
                      })
                    : <p>No hay productos.</p>
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
                  {/* <div>
                    <h3>Productos totales: </h3>
                    <p>{total_items}</p>
                  </div> */}
                  {/* <div>
                    <h3>Subtotal: </h3>
                    <p>{amount.toFixed(2)}€</p>
                  </div> */}
                    {/* <div>
                      <h3>Descuento: </h3>
                      <p>0.00</p>
                    </div> */}
                  {
                    items && items.map((item, i) => {
                      return(
                        <div key={i}>
                          <h3>{item.product.name} x{item.count}</h3>
                          <p>{item.product.price * item.count}</p>
                        </div>
                      )
                    })
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
    );
  };

  return (
    <Layout>
      <div>{showItems()}</div>
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
