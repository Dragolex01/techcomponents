import { useEffect } from 'react';
import { connect } from 'react-redux';

import { check_authenticated, load_user, refresh } from '../redux/actions/auth';
import { get_user_profile } from '../redux/actions/profile';
// import { get_items, get_total, get_item_total } from '../redux/actions/cart';

import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';


function Layout(props){

    useEffect(() => {
        props.refresh()
        props.check_authenticated()
        props.load_user()
        props.get_user_profile()
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
    check_authenticated,
    load_user,
    refresh,
    get_user_profile
}) (Layout);