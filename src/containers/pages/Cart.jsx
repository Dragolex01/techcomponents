import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Layout from '../../hocs/Layout';
import CartItem from '../../components/product/CartItem';

import { get_items, get_item_total, get_total, remove_item } from '../../redux/actions/cart';


function Cart({
  get_items,
  get_item_total,
  get_total,
  remove_item,
  isAuthenticated,
  items,
  amount,
  total_items,
}) {

  const [reload, setReload] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        get_items()
        get_total()
        get_item_total()
    }, [reload])

  const showItems = () => {
    return (
      <section className="seccionCarrito">
        <h1>Tu carrito tiene {total_items} productos</h1>
        <div className="seccionCarrito__contenedor">
          <div className="seccionCarrito__contenedor__contItems">
            {items && items !== null && items !== undefined && items.length > 0
              ? items.map((item, i) => {
                  return (
                    <div className="seccionCarrito__contenedor__contItems__item" key={i}>
                      <CartItem item={items[i]} setReload={setReload} reload={reload} remove_item={remove_item} />
                    </div>
                  );
                })
              : <p>No hay productos.</p>
            }

            <button>Vaciar carrito</button>
          </div>
          <div className="seccionCarrito__contenedor__contInfoCompra">
            <div className="seccionCarrito__contenedor__contInfoCompra__contInfo">
                <h2>Resumen</h2>
                <div className="seccionCarrito__contenedor__contInfoCompra__contInfo--cont1">
                  {/* <div>
                    <h3>Productos totales: </h3>
                    <p>{total_items}</p>
                  </div> */}
                  <div>
                    <h3>Subtotal: </h3>
                    <p>{amount.toFixed(2)}€</p>
                  </div>
                    <div>
                      <h3>Descuento: </h3>
                      <p>0.00</p>
                    </div>
                </div>
                <hr/>
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
  remove_item
})(Cart);
