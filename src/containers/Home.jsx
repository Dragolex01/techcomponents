import { useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from "../hocs/Layout";
import { get_products, products } from '../redux/actions/products';

function Home({ get_products, products }){

    useEffect(() => {
        window.scrollTo(0, 0)

        get_products()
    }, [])

    return(
        <Layout>
            <div>
                {
                    products && products !== null && products !== undefined &&
                    products.map(product => {
                        return(
                            <div>
                                <h2>{product.name}</h2>
                            </div>
                        )
                    })
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