import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import ClipLoader from 'react-spinners/ClipLoader';

import { get_categories } from '../redux/actions/categories';
import { get_products } from '../redux/actions/products';
import { sortBy } from '../helpers/functions';

import Layout from '../hocs/Layout';
import Card from '../components/product/Card';
import { GET_CATEGORIES_FAIL } from '../redux/actions/types';

function Shop({ get_categories, categories, get_products, products }) {

  // const [isLoading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  // const [productsList, setProductsList] = useState([])
  const [categoryFilter, setCategoryFilter] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // setLoading(true)
    get_categories()
    get_products()
    // setLoading(false)
  }, []);

  const [sortData, setSortData] = useState({
    sortKey: '',
    isReverse: false
  });
  const {
    sortKey,
    isReverse
  } = sortData;

  const [filterData, setFilterData] = useState({
    min_price: 100,
    max_price: 1000
  });
  const {
    min_price,
    max_price
  } = filterData;

  // console.log(min_price)
  // console.log(max_price)


  const listProducts = filterProducts();

  function filterProducts(){
    if(categoryFilter.length !== 0){
      return(
        products.filter(product => (product.name.toLowerCase().includes(searchTerm.toLowerCase())) && (categoryFilter.includes(product.category.toString())) && (product.price >= min_price && product.price <= max_price)).map((product, i) => {
          return (
            <div className="contProducto" key={product.id}> 
              <Card product={product} />
            </div>
          );
        })
      )
    }else{
      return(
        products.filter(product => (product.name.toLowerCase().includes(searchTerm.toLowerCase())) && (product.price >= min_price && product.price <= max_price)).map((product, i) => {
          return (
            <div className="contProducto" key={product.id}> 
              <Card product={product} />
            </div>
          );
        })
      )
    }
  }  

  // function rellenarProductos(){ // No esta terminado
  //   let lista = []
    
  //   products.map((product, i) => {
  //     if(product.id >= page && product <= page * 2){
  //       lista.push(product)
  //     }
  //   })

  //   setProductsList(lista)
  // }

  function handlePage(method){ // No esta terminado
    if(method === 'pre'){
      
    }else if(method === 'pos'){
      setPage(page + 1)
    }
  }

  function handleCategory(value, checked){
    if(checked){
      setCategoryFilter(pre => [...pre, value])
    }else{
      setCategoryFilter(pre => {
        return [...pre.filter(cat => cat !== value)]
      })
    }
  }

  return (
    <Layout>
      <section className="seccionLista">
        <div className="seccionLista__contTitulo">
          <h2>Listado articulos: {products && products.length} Articulos</h2>
          <input type="search" className="seccionLista__contTitulo--buscador" placeholder="¿Qué buscas?" onChange={(e) => setSearchTerm(e.target.value, e.target.checked)} />
          <button onClick={() => setSortData({sortKey: 'price', isReverse: true})}>Precio +</button>
          <button onClick={() => setSortData({sortKey: 'price', isReverse: false})}>Precio -</button>
          <button onClick={() => setSortData({sortKey: 'name', isReverse: true})}>Nombre Asc.</button>
          <button onClick={() => setSortData({sortKey: 'name', isReverse: false})}>Nombre Desc.</button>
          <select className="seccionLista__contTitulo--ordenacion">
            <option>Sort</option>
          </select>
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
                          <input type="checkbox" name="category_id" value={category.id.toString()} onChange={(e) => handleCategory(e.target.value, e.target.checked)}/>
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
                                    <input type="checkbox" name="category_id" value={sub_category.id.toString()} onChange={(e) => handleCategory(e.target.value, e.target.checked)} />
                                    <label>{sub_category.name}</label>
                                  </li>
                                )
                              })
                            }
                        </ul>
                      )
                    }
                  })}
                  <ul>
                    <h3>Precio</h3>
                    <li>
                      <label>Min: </label>
                      <input type="number" onChange={(e) => setFilterData({min_price: e.target.value})}/>
                    </li>
                    <li>
                      <label>Max: </label>
                      <input type="number" onChange={(e) => setFilterData({max_price: e.target.value})} />
                    </li>
                  </ul>
            </form>
          </div>
          <div className="seccionLista__contTienda__contArticulos">
            {
              products && products !== null && products !== undefined &&
              sortKey === ''
              ? listProducts
              : null
              // products && sortBy(products, sortKey, isReverse).filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => {
              //   return (
              //     <div className="contProducto" key={product.id}> 
              //       <Card product={product} />
              //     </div>
              //   );
              // })
            }
          </div>
        </div>
          <div>
            <button onClick={() => handlePage('pre')}>Anterior</button>
            <button onClick={() => handlePage('pos')}>Posterior</button>
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