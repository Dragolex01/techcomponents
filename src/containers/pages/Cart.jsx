import { useEffect } from 'react';
import { connect } from 'react-redux'

import Layout from '../../hocs/Layout';
import {
    get_items,
    get_item_total,
    get_total
} from '../../redux/actions/cart';

function Cart({ get_items, get_item_total, get_total, isAuthenticated, items, amount, total_items }){
    
    useEffect(() => {
        window.scrollTo(0,0)
        get_items()
        get_item_total()
        get_total()
    }, [])

    const showItems = () => {
        return(
            <div>
                <h4>Tu carrito tiene {total_items} productos</h4>
                {
                    items && items !== null && items !== undefined && items.length > 0 ?
                    items.map((item, i) => {
                        return(
                            <div key={i}>
                                
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return(
        <Layout>
            <div>
                {showItems()}
            </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    items: state.Cart.items,
    amount: state.Cart.amount,
    total_items: state.Cart.total_items
})

export default connect(mapStateToProps, {
    get_items,
    get_item_total,
    get_total
}) (Cart)