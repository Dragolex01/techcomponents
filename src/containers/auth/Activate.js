import { useEffect, useState } from 'react';

import Layout from '../../hocs/Layout';
import { useNavigate, useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { activate } from '../../redux/actions/auth';

function Activate({ activate, loading }){

    const params = useParams()
    const [activated, setActivated] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const uid = params.uid
        const token = params.token

        activate(uid, token)
        navigate("/")
    }, [])

    // function activate_account(){
    //     const uid = params.uid
    //     const token = params.token

    //     activate(uid, token)
    //     setActivated(true)
    // }

    // function activate_success(){
    //     return(
    //         <Navigate to="/home" />
    //     )
    // }

    // if(activated && !loading){
    //     return(
    //         <Navigate to="/" />
    //     )
    // }

    return(
        <Layout>
            {/* <button type="button" onClick={activate_account}>Activate account</button> */}
        </Layout>
    )
}

const mapStateToProps = state => ({
    loading: state.Auth.loading
})

export default connect(mapStateToProps, {
    activate
}) (Activate);