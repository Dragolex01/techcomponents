import { useEffect } from 'react';
import { connect } from 'react-redux';

import { get_categories } from '../redux/actions/categories';
import { get_products } from '../redux/actions/products';

import Layout from '../hocs/Layout';
import Card from '../components/product/Card';

function Shop({ get_categories, categories, get_products, products }) {
  useEffect(() => {
    window.scrollTo(0, 0);

    get_categories();
    get_products();
  }, []);

  return (
    <Layout>
      <section className="seccionLista">
        <div className="seccionLista__contTitulo">
          <h2>Listado articulos</h2>
        </div>
        <div className="seccionLista__contTienda">
          <div className="seccionLista__contTienda__contFiltros">
            <form className="seccionLista__contTienda__contFiltros--form">
              
                {categories &&
                  categories !== null &&
                  categories !== undefined &&
                  categories.map((category) => {
                    if (category.sub_categories.length === 0) {
                      return (
                      <ul key={category.name}>
                        <li key={category.id}>
                          <input type="checkbox" name="category_id" value={category.id.toString()} />
                          <label>{category.name}</label>
                        </li>
                      </ul>
                      );
                    } else {
                      return(
                        <ul key={category.name}>
                          <h3>{category.name}</h3>
                            {
                              category.sub_categories.map((sub_category) => {
                                return(
                                  <li key={sub_category.id}>
                                    <input type="checkbox" name="category_id" value={sub_category.id.toString()}/>
                                    <label>{sub_category.name}</label>
                                  </li>
                                )
                              })
                            }
                        </ul>
                      )
                    }
                  })}
            </form>
          </div>
          <div className="seccionLista__contTienda__contArticulos">
            {products &&
              products !== null &&
              products !== undefined &&
              products.map((product) => {
                return (
                  <div className="contProducto" key={product.id}> 
                    <Card product={product} />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </Layout>

    // <Layout>
    //   <section className="seccionLista">
    //     <div className="seccionLista__contenedorLateral">
    //       <form className="contenedorFiltro">
    //         <div className="contenedorFiltro__contenedorBuscador">
    //           {/* <label>Buscador</label> */}
    //           <input
    //             type="search"
    //             className="contenedorFiltro__contenedorBuscador--buscador"
    //             placeholder="Introduce tu búsqueda..."
    //           />
    //           {/* <button className="seccionLista__contenedorLateral__contenedorBuscador--boton">Buscar</button> */}
    //         </div>
    //         <ul>
    //           <h3>Ordenar por:</h3>
    //           <li>
    //             <ul className="contenedorFiltro__sublista">
    //               <li className="contenedorFiltro__sublista--li">
    //                 <input
    //                   type="radio"
    //                   id="input_default"
    //                   name="ordenacion"
    //                   value="default"
    //                 />
    //                 <label htmlFor="input_default">Por defecto</label>
    //               </li>
    //               <li className="contenedorFiltro__sublista--li">
    //                 <input
    //                   type="radio"
    //                   id="input_precio"
    //                   name="ordenacion"
    //                   value="precio"
    //                 />
    //                 <label htmlFor="input_precio">Precio</label>
    //               </li>
    //               <li className="contenedorFiltro__sublista--li">
    //                 <input
    //                   type="radio"
    //                   id="input_novedad"
    //                   name="ordenacion"
    //                   value="valoracion"
    //                 />
    //                 <label htmlFor="input_valoracion">Valoración</label>
    //               </li>
    //               <li className="contenedorFiltro__sublista--li">
    //                 <input
    //                   type="radio"
    //                   id="input_nombre"
    //                   name="ordenacion"
    //                   value="nombre"
    //                 />
    //                 <label htmlFor="input_nombre">Nombre</label>
    //               </li>
    //             </ul>
    //           </li>
    //           <h3>Tipo de artículo:</h3>{' '}
    //           {/* Seleccionar el que no quieres que aparezca */}
    //           <li>
    //             <ul className="contenedorFiltro__sublista">
    //               <li className="contenedorFiltro__sublista--li">
    //                 <input
    //                   type="checkbox"
    //                   id="input_ordenadores"
    //                   name="filtro"
    //                   value="ordenadores"
    //                 />
    //                 <label htmlFor="inputOrdenadores">Ordenadores</label>
    //               </li>
    //               <li className="contenedorFiltro__sublista--li">
    //                 <input
    //                   type="checkbox"
    //                   id="input_moviles"
    //                   name="filtro"
    //                   value="moviles"
    //                 />
    //                 <label htmlFor="inputMoviles">Móviles</label>
    //               </li>
    //               <li className="contenedorFiltro__sublista--li">
    //                 <input
    //                   type="checkbox"
    //                   id="input_tablets"
    //                   name="filtro"
    //                   value="tablets"
    //                 />
    //                 <label htmlFor="inputTablets">Tablets</label>
    //               </li>
    //             </ul>
    //           </li>
    //           <h3>Precio:</h3>
    //           <li>
    //             <ul className="contenedorFiltro__sublista">
    //               <li className="contenedorFiltro__sublista--li">
    //                 <input
    //                   type="range"
    //                   min="0"
    //                   max="1000"
    //                   id="inputPrecio"
    //                   list="listaPrecio"
    //                 />
    //                 <datalist id="listaPrecio">
    //                   <option value="0" label="0%" />
    //                   <option value="500" label="50%" />
    //                   <option value="1000" label="100%" />
    //                 </datalist>
    //               </li>
    //             </ul>
    //           </li>
    //           <h3>Valoración:</h3>
    //           <li>
    //             <ul className="contenedorFiltro__sublista">
    //               <li className="contenedorFiltro__sublista--li">
    //                 <input
    //                   type="range"
    //                   min="0"
    //                   max="5"
    //                   id="inputValoracion"
    //                   list="listaValoracion"
    //                 />
    //                 <datalist id="listaValoracion">
    //                   <option value="0" />
    //                   <option value="1" />
    //                   <option value="2" />
    //                   <option value="3" />
    //                   <option value="4" />
    //                   <option value="5" />
    //                 </datalist>
    //               </li>
    //             </ul>
    //           </li>
    //           <button
    //             type="reset"
    //             className="contenedorFiltro--boton"
    //             onClick={() => {
    //               // setSearchTerm("");
    //               // handleShort('NONE');
    //               // changeFilter([]);
    //               // setValuePrice(500); //Ejemplo
    //             }}
    //           >
    //             Reiniciar
    //           </button>
    //         </ul>
    //       </form>
    //     </div>
    //     <div className="seccionLista__contenedorLista">a</div>

    //     {/* <ToBuy /> */}
    //   </section>
    // </Layout>
  );
}

const mapStateToProps = (state) => ({
  categories: state.Categories.categories,
  products: state.Products.products,
});

export default connect(mapStateToProps, {
  get_categories,
  get_products,
})(Shop);




{/* <h3>Categoria1</h3> */}
              {/* <ul>
                {categories &&
                  categories !== null &&
                  categories !== undefined &&
                  categories.map((category) => {
                    if (category.sub_categories.length === 0) {
                      return (
                        <div key={category.id}>
                          <input type="radio" name={category.id} />
                          <label>{category.name}</label>
                        </div>
                      );
                    } else {
                      let result = [];

                      result.push(
                        <div key={category.id}>
                          <input type="radio" name={category.id} />
                          <label>{category.name}</label>
                        </div>
                      );

                      category.sub_categories.map((sub_category) => {
                        result.push(
                          <div key={sub_category.id}>
                            <input type="radio" name={sub_category.id} />
                            <label>{sub_category.name}</label>
                          </div>
                        );
                      });

                      return result;
                    }
                  })}
              </ul> */}



// let result = [];

// result.push(
//     <h3>{category.name}</h3>
// );

// category.sub_categories.map((sub_category) => {
//   result.push(
//     <li key={sub_category.id}>
//       <input type="radio" name="category_id" value={sub_category.id.toString()}/>
//       <label>{sub_category.name}</label>
//     </li>
//   );
// });

// return result;