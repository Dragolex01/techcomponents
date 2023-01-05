import { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import { get_categories } from '../redux/actions/categories';
import { get_products, get_filtered_products } from '../redux/actions/products';
import { sortBy } from '../helpers/functions';

import Layout from '../hocs/Layout';
import Card from '../components/product/Card';
import Filter from '../components/product/Filter';


function Shop({ get_categories, categories, get_products, products, get_filtered_products, filtered_products }) {

  const [isLoading, setLoading] = useState(false)
  const [filtered, setFiltered] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [filterData, setFilterData] = useState({
    category_id: '0',
    min_price: 0,
    max_price: 2000,
    stock: 'all',
    sortBy: 'created',
    order: 'des',
  })
  const { category_id, min_price, max_price, stock, sortBy, order } = filterData;

  
  useEffect(() => {
    get_categories()
    getProducts()
  }, [])

  async function getProducts(){
    setLoading(true)
    await get_products()
    setLoading(false)
  }
  
  useEffect(() => {
    if(filtered){
      get_filtered_products(category_id, min_price, max_price, stock, sortBy, order)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData, filtered])


  function showProducts(){
    // let results = [];
    let display = [];

    if(filtered_products && filtered_products !== null && filtered_products !== undefined && filtered){
      filtered_products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => {
        return display.push(
          <div className="contProducto" key={product.id}> 
            <Card product={product} />
          </div>
        )
      })
    }else if(products && products !== null && products !== undefined && !filtered){
      products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => {
        return display.push(
          <div className="contProducto" key={product.id}> 
            <Card product={product} />
          </div>
        )
      })
    }

    // for (let i = 0; i < display.length; i += 3) {
    //   results.push(
    //     <div key={i} className="grid md:grid-cols-3 ">
    //       {display[i] ? display[i] : <div className=""></div>}
    //       {display[i + 1] ? display[i + 1] : <div className=""></div>}
    //       {display[i + 2] ? display[i + 2] : <div className=""></div>}
    //     </div>
    //   );
    // }

    return display;
  }

  function showNumberProducts(){ // Codigo repetido solucionar
    
    if(filtered_products && filtered_products !== null && filtered_products !== undefined && filtered){
      if(filtered_products.length > 1){
        return <h2>{filtered_products.length} productos encontrados</h2>
      }else if(filtered_products.length === 1){
        return <h2>{filtered_products.length} producto encontrado</h2>
      }else{
        return <h2>Ningun producto encontrado</h2>
      }
    }else if(products && products !== null && products !== undefined && !filtered){
      if(products.length > 1){
        return <h2>{products.length} productos encontrados</h2>
      }else if(products.length === 1){
        return <h2>{products.length} producto encontrado</h2>
      }else{
        return <h2>Ningun producto encontrado</h2>
      }
    }
  }


  function sortProducts(value){
    let valores = value.split('_')

    setFilterData({ ...filterData, sortBy: valores[0], order: valores[1]})
  }


  return (
    <Layout>
      <section className="seccionLista">
        <div className="seccionLista__contTitulo">
          {
            products && showNumberProducts()
          }
          <input type="search" className="seccionLista__contTitulo--buscador" placeholder="¿Qué buscas?" onChange={(e) => setSearchTerm(e.target.value, e.target.checked)} />
          <select className="seccionLista__contTitulo--ordenacion" onChange={(e) => {
            sortProducts(e.target.value)
            setFiltered(true)
            }}>
            <option value="none_des">Ordenar</option>
            <option value="name_asc">Nombre A-Z</option>
            <option value="name_des">Nombre Z-A</option>
            <option value="price_des">Precio +</option>
            <option value="price_asc">Precio -</option>
          </select>
        </div>
        <div className="seccionLista__contTienda">
          <Filter categories={categories} setFilterData={setFilterData} filterData={filterData} setFiltered={setFiltered} />
          <div className="seccionLista__contTienda__contArticulos">
            {
              // products && showProducts()
            }
            {
              isLoading
                ? <ClipLoader color="#36d7b7" />
                : <div className="seccionLista__contTienda__contArticulos--cont">{showProducts()}</div>
            }
          </div>
        </div>
        <div>
          {/* <button onClick={() => handlePage('anterior')}>Anterior</button>
          <button onClick={() => handlePage('siguiente')}>Posterior</button> */}
        </div>
      </section>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  categories: state.Categories.categories,
  products: state.Products.products,
  filtered_products: state.Products.filtered_products,
});

export default connect(mapStateToProps, {
  get_categories,
  get_products,
  get_filtered_products
})(Shop);