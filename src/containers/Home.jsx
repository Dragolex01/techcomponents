import { useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from "../hocs/Layout";

function Home(){

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return(
        <Layout>
            <div className="seccionHome">
                Home
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps, {
    
}) (Home);