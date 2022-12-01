import { useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../hocs/Layout';
import { get_items, get_item_total, get_total } from '../../redux/actions/cart';

function Cart({
  get_items,
  get_item_total,
  get_total,
  isAuthenticated,
  items,
  amount,
  total_items,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    get_items();
    get_item_total();
    get_total();
  }, []);

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
                      <div className="seccionCarrito__contenedor__contItems__item--img">
                        <img src="#" />
                      </div>
                      <div className="seccionCarrito__contenedor__contItems__item--info">
                        <div>
                          <div>
                            <h2>{items[i].product.name}</h2>
                            <p>Precio: {items[i].product.price}</p>
                          </div>
                          <div>
                            <p>Cantidad: {items[i].product.quantity}</p>
                          </div>
                        </div>
                      </div>
                      <div className="seccionCarrito__contenedor__contItems__item--boton">
                        a
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <div className="seccionCarrito__contenedor__contInfoCompra">
            <div className="seccionCarrito__contenedor__contInfo--info">
                <h2>Resumen</h2>
                <div>
                    <h3>Precio total: </h3>
                    <p>83€</p>
                </div>
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
})(Cart);
