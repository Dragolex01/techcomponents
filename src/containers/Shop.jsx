import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import ClipLoader from 'react-spinners/ClipLoader';

import { get_categories } from '../redux/actions/categories';
import { get_products } from '../redux/actions/products';
import { sortBy } from '../helpers/functions';

import Layout from '../hocs/Layout';
import Card from '../components/product/Card';

function Shop({ get_categories, categories, get_products, products }) {

  // const [isLoading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)

    // setLoading(true)
    get_categories()
    get_products()
    // setLoading(false)
  }, []);

  const [sortKey, setSortKey] = useState('')

  function handleShort(sortKey, isReverse = false){
    // setSort({
    //   sortKey,
    //   isReverse: sortKey === sort.sortKey ? !sort.isReverse : false
    // })
  }

  return (
    <Layout>
      <section className="seccionLista">
        <div className="seccionLista__contTitulo">
          <h2>Listado articulos: {products && products.length} Articulos</h2>
          <input type="search" className="seccionLista__contTitulo--buscador" placeholder="¿Qué buscas?" onChange={(e) => setSearchTerm(e.target.value)} />
          <button onClick={() => setSortKey('price')}>Precio +</button>
          <button onClick={() => setSortKey('price')}>Precio -</button>
          <button onClick={() => setSortKey('name')}>Nombre Asc.</button>
          <button onClick={() => setSortKey('name')}>Nombre Desc.</button>
          <select className="seccionLista__contTitulo--ordenacion">
            <option>Sort</option>
          </select>
        </div>
        <div className="seccionLista__contTienda">
          <div className="seccionLista__contTienda__contFiltros">
            <form className="seccionLista__contTienda__contFiltros--form">
                {/* {categories &&
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
                  })} */}
                  <ul>
                    <h3>Productos</h3>
                    <li>
                        <input type="checkbox" name="" value="" />
                        <label>Portatiles</label>
                    </li>
                    <li>
                        <input type="checkbox" name="" value="" />
                        <label>Monitores</label>
                    </li>
                    <li>
                        <input type="checkbox" name="" value="" />
                        <label>Móviles</label>
                    </li>
                    <li>
                        <input type="checkbox" name="" value="" />
                        <label>Tablets</label>
                    </li>
                  </ul>
                  <ul>
                    <h3>Precio</h3>
                    <li></li>
                  </ul>
                  <ul>
                    <h3>Stock</h3>
                    <li></li>
                  </ul>
            </form>
          </div>
          <div className="seccionLista__contTienda__contArticulos">
            {products &&
              products !== null &&
              products !== undefined &&
              sortKey === '' ?
              products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => {
                return (
                  <div className="contProducto" key={product.id}> 
                    <Card product={product} />
                  </div>
                );
              }) :
              sortBy(products, sortKey, true).filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => {
                return (
                  <div className="contProducto" key={product.id}> 
                    <Card product={product} />
                  </div>
                );
              })
            }
          </div>
        </div>
      </section>
    </Layout>
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