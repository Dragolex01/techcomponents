import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';

import { useEffect } from 'react';
import { connect } from 'react-redux';

import { check_authenticated, load_user, refresh } from '../redux/actions/auth';

function Layout(props){

    useEffect(() => {
        props.refresh()
        props.check_authenticated()
        props.load_user()
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
    refresh
}) (Layout);