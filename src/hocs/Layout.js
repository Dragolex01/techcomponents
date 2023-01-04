import { useEffect } from 'react';
import { connect } from 'react-redux';

import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import { get_user_profile } from '../redux/actions/profile';
import { get_items, get_total, get_item_total } from '../redux/actions/cart';

import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';


function Layout(props){

    useEffect(() => {
        props.refresh()
        props.check_authenticated()
        props.load_user()
        props.get_user_profile()
        props.get_items()
        props.get_total()
        props.get_item_total()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div>
            <Header />
                {props.children}
            <Footer />
        </div>
    )
}

export default connect(null, {
    refresh,
    check_authenticated,
    load_user,
    get_user_profile,
    get_items,
    get_total,
    get_item_total,
}) (Layout);