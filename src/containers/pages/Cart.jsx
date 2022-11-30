import { useEffect } from 'react';
import { connect } from 'react-redux'

import Layout from '../../hocs/Layout';
import {
    get_items,
    get_item_total,
    get_total
} from '../../redux/actions/cart';

function Cart({ get_items, get_item_total, get_total }){
    
    useEffect(() => {
        //window.scrollTo(0,0)
        get_items()
        get_item_total()
        get_total()
    }, [])
    
    return(
        <Layout>
            <div>Carrito</div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    product: state.Products.product
})

export default connect(mapStateToProps, {
    get_items,
    get_item_total,
    get_total
}) (Cart)