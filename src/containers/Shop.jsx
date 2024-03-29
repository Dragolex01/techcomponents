import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong, faRightLong, faSearch } from '@fortawesome/free-solid-svg-icons';

import { get_categories } from '../redux/actions/categories';
import { get_products, get_filtered_products } from '../redux/actions/products';

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
    max_price: 8000,
    stock: 'all',
    sortBy: 'created',
    order: 'des',
  })
  const { category_id, min_price, max_price, stock, sortBy, order } = filterData;

  const [page, setPage] = useState(2)
  const productPerPage = 6
  var totalPages = calculateTotalPages()

  
  useEffect(() => {
    get_categories()
    getProducts()
    setPage(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // Obtener productos
  async function getProducts(){
    setLoading(true)
    await get_products()
    setLoading(false)
  }
  
  // Obtener productos filtrados
  useEffect(() => {
    if(filtered){
      get_filtered_products(category_id, min_price, max_price, stock, sortBy, order)
      setPage(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData, filtered])


  // Calcular paginas totales
  function calculateTotalPages(){
    if(!filtered && products && products !== null){
      totalPages = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).length / productPerPage;
    }else if(filtered && filtered_products && filtered_products !== null){
      totalPages = filtered_products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).length / productPerPage;
    }else{
      totalPages = 0;
    }
    
    return Math.ceil(totalPages)
  }

  // Cambiar pagina
  function handlePage(action){
    if(action === 'next'){
      if(page < totalPages - 1){
        setPage(page + 1)
      }
    }else if(action === 'previous'){
      if(page !== 0){
        setPage(page - 1)
      }
    }
    window.scrollTo(0, 0)
  }


  // Mostrar productos
  function showProducts(){
    var display = [];
    var minProduct = 0;
    var maxProduct = 0;

    if(page > 0){
      minProduct = page * productPerPage;
    }else{
      minProduct = page;
    }
    maxProduct = page * productPerPage + productPerPage - 1;

    if(filtered_products && filtered_products !== null && filtered_products !== undefined && filtered){
      filtered_products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product, i) => {
        if(i >= minProduct && i <= maxProduct){
          return display.push(
            <div className="contProducto" key={product.id}> 
              <Card product={product} />
            </div>
          )
        }else{
          return null
        }
      })
    }else if(products && products !== null && products !== undefined && !filtered){
      products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product, i) => {
        if(i >= minProduct && i <= maxProduct){
          return display.push(
            <div className="contProducto" key={product.id}> 
              <Card product={product} />
            </div>
          )
        }else{
          return null
        }
      })
    }

    return display;
  }


  // Mostrar número productos encontrados
  function showNumberProducts(){ // Codigo repetido solucionar
    if(filtered_products && filtered){
      let filtered_products_search = filtered_products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      
      if(filtered_products_search.length > 1){
        return <h2>{filtered_products_search.length} productos encontrados</h2>
      }else if(filtered_products_search.length === 1){
        return <h2>{filtered_products_search.length} producto encontrado</h2>
      }else{
        return <h2>Ningun producto encontrado</h2>
      }
    }else if(products && !filtered){
      let products_search = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      
      if(products_search.length > 1){
        return <h2>{products_search.length} productos encontrados</h2>
      }else if(products_search.length === 1){
        return <h2>{products_search.length} producto encontrado</h2>
      }else{
        return <h2>Ningun producto encontrado</h2>
      }
    }else if(filtered_products === null || products === null){
      return <h2>Ningun producto encontrado</h2>
    }
  }


  // Mostrar botones paginación
  function showPaginationButtons(){
    let display = []

    for(let i = 1; i <= totalPages; i++){
      if(page === i - 1){
        display.push(
          <button onClick={() => {
            setPage(i - 1)
            window.scrollTo(0, 0)
          }} className="seccionLista__contPaginacion__paginacionCentral--botonActual" key={i}>{i}</button>
        )
      }else{
        display.push(
          <button onClick={() => {
            setPage(i - 1)
            window.scrollTo(0, 0)
          }} key={i}>{i}</button>
        )
      }
      
    }

    return display;
  }


  // Establecer metodo de ordenación en filtro
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
          <div className="seccionLista__contTitulo__contBuscador">
            <FontAwesomeIcon icon={faSearch} className="" />
            <input type="search" placeholder="¿Qué buscas?" onChange={(e) => {
                setSearchTerm(e.target.value, e.target.checked)
                setPage(0)
              }} />
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
        </div>
        <div className="seccionLista__contTienda">
          <Filter categories={categories} setFilterData={setFilterData} filterData={filterData} setFiltered={setFiltered} />
          <div className="seccionLista__contTienda__contArticulos">
            {
              isLoading
                ? <ClipLoader color="#36d7b7" />
                : <div className="seccionLista__contTienda__contArticulos--cont">
                    {
                      showProducts().length > 0
                        ? showProducts()
                        : <p id="sinProductos">No se han encontrado productos.</p>
                    }
                  </div>
            }
          </div>
        </div>
        <div className="seccionLista__contPaginacion">
          <button onClick={() => handlePage('previous')}>
            <FontAwesomeIcon icon={faLeftLong} className="seccionLista__contPaginacion--icono" />
            Anterior
          </button>
          <div className="seccionLista__contPaginacion__paginacionCentral">
            {
              showPaginationButtons()
            }
          </div>
          <button onClick={() => handlePage('next')}>
            Posterior
            <FontAwesomeIcon icon={faRightLong} className="seccionLista__contPaginacion--icono" />
          </button>
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