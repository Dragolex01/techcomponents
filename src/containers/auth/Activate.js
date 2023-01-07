import { useEffect } from 'react';

import Layout from '../../hocs/Layout';
import { useNavigate, useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { activate } from '../../redux/actions/auth';

function Activate({ activate, loading }){

    const params = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const uid = params.uid
        const token = params.token

        activate(uid, token)
        navigate("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <Layout>
            <></>
        </Layout>
    )
}

const mapStateToProps = state => ({
    loading: state.Auth.loading
})

export default connect(mapStateToProps, {
    activate
}) (Activate);