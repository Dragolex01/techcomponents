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

  const [sortList, setSortList] = useState({
    sortKey: 'none',
    isReverse: false
  });
  const {
    sortKey,
    isReverse
  } = sortList;

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
        sortProducts().filter(product => (product.name.toLowerCase().includes(searchTerm.toLowerCase())) && (categoryFilter.includes(product.category.toString())) && (product.price >= min_price && product.price <= max_price)).map((product, i) => {
          return (
            <div className="contProducto" key={product.id}> 
              <Card product={product} />
            </div>
          );
        })
      )
    }else{
      return(
        sortProducts().filter(product => (product.name.toLowerCase().includes(searchTerm.toLowerCase())) && (product.price >= min_price && product.price <= max_price)).map((product, i) => {
          return (
            <div className="contProducto" key={product.id}> 
              <Card product={product} />
            </div>
          );
        })
      )
    }
  }

  function sortProducts(){
    if(sortKey !== 'none'){
      return sortBy(products, sortKey, isReverse)
    }else{
      return products
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

  function handleSort(value){
    switch(value){
      case 'price_asc':
        setSortList({sortKey: 'price', isReverse: true})
        break;
      case 'price_des':
        setSortList({sortKey: 'price', isReverse: false})
        break;
      case 'name_asc':
        setSortList({sortKey: 'name', isReverse: false})
        break;
      case 'name_des':
        setSortList({sortKey: 'name', isReverse: true})
        break;
      default:
        setSortList({sortKey: 'none'})
        break;
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


  return (
    <Layout>
      <section className="seccionLista">
        <div className="seccionLista__contTitulo">
          {
            (() => {
              if(listProducts.length > 1){
                return <h2>{listProducts.length} productos encontrados</h2>
              }else if(listProducts.length === 1){
                return <h2>{listProducts.length} producto encontrado</h2>
              }else{
                return <h2>Ningun producto encontrado</h2>
              }
            })()
          }
          <input type="search" className="seccionLista__contTitulo--buscador" placeholder="¿Qué buscas?" onChange={(e) => setSearchTerm(e.target.value, e.target.checked)} />
          {/* <button onClick={() => setSortList({sortKey: 'price', isReverse: true})}>Precio +</button>
          <button onClick={() => setSortList({sortKey: 'price', isReverse: false})}>Precio -</button>
          <button onClick={() => setSortList({sortKey: 'name', isReverse: true})}>Nombre Asc.</button>
          <button onClick={() => setSortList({sortKey: 'name', isReverse: false})}>Nombre Desc.</button> */}
          <select className="seccionLista__contTitulo--ordenacion" onChange={(e) => handleSort(e.target.value)}>
            <option value="none">Cualquiera</option>
            <option value="price_asc">Precio Asc.</option>
            <option value="price_des">Precio Des.</option>
            <option value="name_asc">Nombre A-Z</option>
            <option value="name_des">Nombre Z-A</option>
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
                      <input type="number" placeholder="€ Min" onChange={(e) => setFilterData({min_price: e.target.value})}/>
                    </li>
                    <li>
                      <input type="number" placeholder="€ Max" onChange={(e) => setFilterData({max_price: e.target.value})} />
                    </li>
                  </ul>
            </form>
          </div>
          <div className="seccionLista__contTienda__contArticulos">
            {
              products && products !== null && products !== undefined &&
              listProducts
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