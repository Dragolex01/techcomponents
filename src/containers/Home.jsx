import { useEffect, useState } from 'react';
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
        products && handleResize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    function handleResize(){ //Cambiar
        
    }
    // const handleResize = () => {
    //     var count = 0;
    //     var inc = 0;
    //     var margin = 0;
        
    //     var slider = document.getElementsByClassName("seccionHome__contDestacados--contProductos__slider")[0]
    //     var itemDisplay = 0;

    //     if(window.screen.width > 990){
    //         itemDisplay = document.getElementsByClassName("seccionHome__contDestacados--contProductos")[0].getAttribute("item-display-d")
    //         margin = itemDisplay * 5
    //     }
    //     if(window.screen.width > 700 && window.screen.width < 990){
    //         itemDisplay = document.getElementsByClassName("seccionHome__contDestacados--contProductos")[0].getAttribute("item-display-t")
    //         margin = itemDisplay * 6.8
    //     }
    //     if(window.screen.width > 280 && window.screen.width < 700){
    //         itemDisplay = document.getElementsByClassName("seccionHome__contDestacados--contProductos")[0].getAttribute("item-display-m")
    //         margin = itemDisplay * 20
    //     }

    //     var item = document.getElementsByClassName("contProducto")
    //     var itemleft = item.length % itemDisplay
    //     var itemSlide = Math.floor(item.length / itemDisplay)

    //     for(let i = 0; i < item.length; i++){
    //         // item[i].style.width = (window.screen.width / itemDisplay) - margin + "px"
    //         item[i].style.marginLeft = ((window.screen.width / (itemDisplay*24))/2) - margin + "px";
    //         item[i].style.marginRight = ((window.screen.width / (itemDisplay*24))/2) - margin + "px";
    //     }
    //   }
    
    //   useEffect(() => {
    //   window.addEventListener("resize", handleResize, false);
    // }, []);




    const novedades = () => {
        return(
            <>
                {
                    sortBy(products, 'date_created', true).map((product, i) => {
                        return i < 5 ? (
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

    function moveSlider(){
        // var count = 0;
        // var inc = 0;
        // var margin = 0;
        
        // var slider = document.getElementsByClassName("seccionHome__contDestacados--contProductos__slider")[0]
        // var itemDisplay = 0;

        // if(window.screen.width > 990){
        //     itemDisplay = document.getElementsByClassName("seccionHome__contDestacados--contProductos")[0].getAttribute("item-display-d")
        //     margin = itemDisplay * 5
        // }
        // if(window.screen.width > 700 && window.screen.width < 990){
        //     itemDisplay = document.getElementsByClassName("seccionHome__contDestacados--contProductos")[0].getAttribute("item-display-t")
        //     margin = itemDisplay * 6.8
        // }
        // if(window.screen.width > 280 && window.screen.width < 700){
        //     itemDisplay = document.getElementsByClassName("seccionHome__contDestacados--contProductos")[0].getAttribute("item-display-m")
        //     margin = itemDisplay * 20
        // }

        // var item = document.getElementsByClassName("contProducto")
        // var itemleft = item.length % itemDisplay
        // var itemSlide = Math.floor(item.length / itemDisplay)

        // for(let i = 0; i < item.length; i++){
        //     item[i].style.width = (window.screen.width / itemDisplay) - margin + "px"
        // }
    }

    function nextSlider(){
        document.getElementsByClassName("seccionHome__contDestacados--contProductos__slider").style.left = - window.screen.width + "px"
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
                <div className="seccionHome__contBanner">
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
                                <div className="seccionHome__contDestacados--contProductos" item-display-d="4" item-display-t="3" item-display-m="1">
                                    <div className="seccionHome__contDestacados--contProductos__slider">
                                        {
                                            novedades()
                                        }
                                        <button className="seccionHome__contDestacados--contProductos__slider--btnLeft" onClick={moveSlider}>Left</button>
                                        <button className="seccionHome__contDestacados--contProductos__slider--btnRight" onClick={moveSlider}>Right</button>
                                    </div>
                                </div>
                                <button>Comprar</button>

                                <h1>Más vendidos</h1>
                                <div className="titleDivider" />
                                <div className="seccionHome__contDestacados--contProductos" item-display-d="5" item-display-t="3" item-display-m="1">
                                    <div className="seccionHome__contDestacados--contProductos__slider">
                                        {
                                            ventas()
                                        }
                                    </div>
                                </div>
                                {/* <div className="seccionHome__contDestacados--contProductos">
                                    {
                                        ventas()
                                    }
                                </div> */}
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