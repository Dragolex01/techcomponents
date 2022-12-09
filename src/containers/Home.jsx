import { useEffect } from 'react';
import { connect } from 'react-redux';

import { get_products } from '../redux/actions/products';

import Layout from '../hocs/Layout';
import Card from '../components/product/Card';

function Home({ get_products, products }){

    useEffect(() => {
        window.scrollTo(0, 0)

        get_products();
    }, [])

    const novedades = () => { // Ordenar por fecha nueva
        return(
            <>
                {
                    products.map((product, i) => {
                        return(
                            i <= 5 ?
                            <div className="contProducto" key={product.id}>
                                <Card product={product} />
                                <p>{product.date_created}</p>
                            </div> : null
                        )
                    })
                }
            </>
        )
    }

    const ventas = () => { // Ordenar por más vendidos
        return(
            <>
                {
                    products.map((product, i) => {
                        return(
                            i <= 5 ?
                            <div className="contProducto" key={product.id}>
                                <Card product={product} />
                                <p>{product.sold}</p>
                            </div> : null
                        )
                    })
                }
            </>
        )
    }

    return(
        <Layout>
            <div className="seccionHome">
                <div className="seccionHome__contOfertas">
                    <div className="seccionHome__contOfertas--oferta">
                        a
                    </div>
                    <div className="seccionHome__contOfertas--oferta">
                        a
                    </div>
                    <div className="seccionHome__contOfertas--oferta">
                        a
                    </div>
                </div>
                <h1>Novedades</h1>
                <div className="seccionHome__contProductos">
                    {
                        products &&
                        products !== null &&
                        products !== undefined ?
                        novedades() : null
                    }
                </div>
                <h1>Más vendidos</h1>
                <div className="seccionHome__contProductos">
                    {
                        products &&
                        products !== null &&
                        products !== undefined ?
                        ventas() : null
                    }
                </div>
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