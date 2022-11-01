import { useState } from 'react';

import Layout from '../../hocs/Layout';
import { useParams, Navigate } from 'react-router';

import { connect } from 'react-redux';
import { activate } from '../../redux/actions/auth';

function Activate({ activate, loading }){

    const params = useParams()
    const [activated, setActivated] = useState(false)

    function activate_account(){
        const uid = params.uid
        const token = params.token

        // console.log(uid)
        // console.log(token)
        activate(uid, token)
        setActivated(true)
    }

    if(activated && !loading){
        return(
            <Navigate to="/" />
        )
    }

    return(
        <Layout>
            <button type="button" onClick={activate_account}>Activate account</button>
        </Layout>
    )
}

const mapStateToProps = state => ({
    loading: state.Auth.loading
})

export default connect(mapStateToProps, {
    activate
}) (Activate);