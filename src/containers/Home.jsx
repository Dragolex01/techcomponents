import { useEffect } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faMobile, faTablet } from '@fortawesome/free-solid-svg-icons';

import { get_products } from '../redux/actions/products';
import { sortBy } from '../helpers/functions';

import Layout from '../hocs/Layout';
import Card from '../components/product/Card';

import imgBanner from '../img/imgBanner4.jpg';

function Home({ get_products, products }){
  
    useEffect(() => {
        // window.scrollTo(0, 0)

        get_products();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const novedades = () => {
        return(
            <>
                {
                    sortBy(products, 'date_created', true).map((product, i) => {
                        return i < 10 ? (
                            <div className="contProducto" key={product.id}>
                                <Card product={product} />
                                {/* <p>{product.date_created}</p> */}
                            </div>
                        )
                        : null;
                    })
                }
            </>
        )
    }

    const ventas = () => {
        return(
            <>
                {
                    sortBy(products, 'sold', true).map((product, i) => {
                        return i < 5 ? (
                            <div className="contProducto" key={product.id}>
                                <Card product={product} />
                                {/* <p>{product.sold}</p> */}
                            </div>
                        )
                        : null
                    })
                }
            </>
        )
    }

    return(
        <Layout>
            <div className="seccionHome">
                {/* <div className="seccionHome__contInfo">
                    <div className="seccionHome__contInfo--img">
                        <img src={imgMundial} />
                    </div>
                    <div className="seccionHome__contInfo--info">
                        <h2>¿QUIÉNES SOMOS?</h2>
                        <p>Est eiusmod cupidatat ut sunt eiusmod. Minim velit Lorem id nulla velit dolore mollit exercitation quis. Pariatur dolore laboris est laboris proident enim laboris consectetur veniam enim cillum quis. Sint nostrud sint duis aute aute ea occaecat in aute officia est aliquip labore laboris. Mollit mollit anim mollit mollit nulla magna non. Sit enim sunt id pariatur aliqua labore incididunt.</p>
                    </div>
                </div> */}
                <div className="seccionHome__contInfo">
                        <img src={imgBanner} alt="imgBanner" />
                </div>
                <div className="seccionHome__contProducto">
                    <div className="seccionHome__contProducto__producto">
                        <FontAwesomeIcon icon={faLaptop} className="seccionHome__contProducto__producto--icon" />
                        <div className="seccionHome__contProducto__producto--info">
                            <h2>Ordenador</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                        </div>
                        <button>Comprar</button>
                    </div>
                    <div className="seccionHome__contProducto__producto">
                        <FontAwesomeIcon icon={faMobile} className="seccionHome__contProducto__producto--icon" />
                        <div className="seccionHome__contProducto__producto--info">
                            <h2>Movil</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                        </div>
                        <button>Comprar</button>
                    </div>
                    <div className="seccionHome__contProducto__producto">
                        <FontAwesomeIcon icon={faTablet} className="seccionHome__contProducto__producto--icon" />
                        <div className="seccionHome__contProducto__producto--info">
                            <h2>Tablet</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                        </div>
                        <button>Comprar</button>
                    </div>
                </div>
                {
                    products && products.length > 0
                    ?   <>
                            <div className="seccionHome__contDestacados">
                                <h1>Novedades</h1>
                                <div className="titleDivider" />
                                <div className="seccionHome__contDestacados--contProductos">
                                    <div className="seccionHome__contDestacados--contProductos--slider">
                                        {
                                            novedades()
                                        }
                                    </div>
                                </div>
                                <button>Comprar</button>

                                <h1>Más vendidos</h1>
                                <div className="titleDivider" />
                                <div className="seccionHome__contDestacados--contProductos">
                                    {
                                        ventas()
                                    }
                                </div>
                                <button>Comprar</button>
                            </div>
                        </>
                    : null
                }
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    products: state.Products.products
})

export default connect(mapStateToProps, {
    get_products
}) (Home);