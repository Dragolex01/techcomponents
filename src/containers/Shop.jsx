import { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
// import ClipLoader from 'react-spinners/ClipLoader';

import { get_categories } from '../redux/actions/categories';
import { get_products, get_products_by_page } from '../redux/actions/products';
import { sortBy } from '../helpers/functions';

import Layout from '../hocs/Layout';
import Card from '../components/product/Card';
import Filter from '../components/product/Filter';



const initialProductsState = {
  products: []
}

const productsReducer = (state = initialProductsState, action) => {
  switch(action.type){
      case "rellenar":
        return{
          ...state,
          products: action.payload
        }
      case "sortProducts":
          return{
              ...state,
              products: action.payload
          }
        
      case "filterProductsCategory":
        return{
          ...state,
          products: action.payload
        }

      case "filterProductsPrice":
        return{
          ...state,
          products: action.payload
        }

      default:
          throw Error("Action products Error!")
  }
}


function Shop({ get_categories, categories, get_products, get_products_by_page, products, products_by_page, total_pages }) {

  const [page, setPage] = useState(1)

  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState([])
  const [priceFilter, setPriceFilter] = useState({
    minPrice: 0,
    maxPrice: 2000
  })

  const {
    minPrice,
    maxPrice
  } = priceFilter

  const [productsState, dispatchProducts] = useReducer(
    productsReducer,
    initialProductsState
  )

  
  useEffect(() => {
    // window.scrollTo(0, 0)
    get_categories()
    get_products()
    get_products_by_page(page)
  }, [page])

  useEffect(() => {
    if(products){
      if(categoryFilter.length === 0){
        dispatchProducts({
          type: 'rellenar',
          payload: products_by_page
        })
      }else{
        dispatchProducts({
          type: 'filterProductsCategory',
          payload: productsState.products.filter(product => categoryFilter.includes(product.category.toString()))
        })
      }
    }
  }, [products, categoryFilter])

  // useEffect(() => {
  //   if(products){
  //     dispatchProducts({
  //       type: 'filterProductsPrice',
  //       payload: productsState.products.filter(product => product.price >= minPrice && product.price <= maxPrice)
  //     })
  //   }
  // }, [priceFilter])


  function handleSort(value){
    switch(value){
      case 'price_asc':
        dispatchProducts({
          type: 'sortProducts',
          payload: sortBy(productsState.products, 'price', true)
        })
        break;

      case 'price_des':
        dispatchProducts({
          type: 'sortProducts',
          payload: sortBy(productsState.products, 'price', false)
        })
        break;

      case 'name_asc':
        dispatchProducts({
          type: 'sortProducts',
          payload: sortBy(productsState.products, 'name', false)
        })
        break;

      case 'name_des':
        dispatchProducts({
          type: 'sortProducts',
          payload: sortBy(productsState.products, 'name', true)
        })
        break;

      default:
        dispatchProducts({
          type: 'sortProducts',
          payload: products
        })
        break;
    }
  }

  function handlePage(method){
    if(method === 'anterior'){
      if(page > 1){
        setPage(page - 1)
      }
    }else if(method === 'siguiente'){
      if(page < total_pages){
        setPage(page + 1)
      }
    }
  }
  

  return (
    <Layout>
      <section className="seccionLista">
        <div className="seccionLista__contTitulo">
          {products_by_page && products_by_page !== null && products_by_page !== undefined 
            ? (() => {
              if(productsState.products.length > 1){ // No sincronizado con searchterm
                return <h2>{productsState.products.length} productos encontrados</h2>
              }else if(productsState.products.length === 1){
                return <h2>{productsState.products.length} producto encontrado</h2>
              }else{
                return <h2>Ningun producto encontrado</h2>
              }
            })()
            : null
          }
          {/* {products_by_page && products_by_page !== null && products_by_page !== undefined 
            ? (() => {
              if(Object.values(productsState.products).length > 1){ // No sincronizado con searchterm
                return <h2>{Object.values(productsState.products).length} productos encontrados</h2>
              }else if(Object.values(productsState.products).length === 1){
                return <h2>{Object.values(productsState.products).length} producto encontrado</h2>
              }else{
                return <h2>Ningun producto encontrado</h2>
              }
            })()
            : null
          } */}
          <input type="search" className="seccionLista__contTitulo--buscador" placeholder="¿Qué buscas?" onChange={(e) => setSearchTerm(e.target.value, e.target.checked)} />
          <select className="seccionLista__contTitulo--ordenacion" onChange={(e) => handleSort(e.target.value)}>
            <option value="none">Ordenar</option>
            <option value="name_asc">Nombre A-Z</option>
            <option value="name_des">Nombre Z-A</option>
            <option value="price_asc">Precio +</option>
            <option value="price_des">Precio -</option>
          </select>
        </div>
        <div className="seccionLista__contTienda">
          <Filter categories={categories} setCategoryFilter={setCategoryFilter} setPriceFilter={setPriceFilter} priceFilter={priceFilter} />
          <div className="seccionLista__contTienda__contArticulos">
            {
              productsState.products.length > 0
                ? productsState.products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => {
                    return(
                      <div className="contProducto" key={product.id}> 
                        <Card product={product} />
                      </div>
                    )
                  })
                : "No se han encontrado productos"
            }
          </div>
        </div>
        <div>
          <button onClick={() => handlePage('anterior')}>Anterior</button>
          <button onClick={() => handlePage('siguiente')}>Posterior</button>
        </div>
      </section>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  categories: state.Categories.categories,
  products: state.Products.products,
  products_by_page: state.Products.products_by_page,
  total_pages: state.Products.total_pages,
  page: state.Products.page
});

export default connect(mapStateToProps, {
  get_categories,
  get_products,
  get_products_by_page
})(Shop);