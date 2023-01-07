import { Fragment } from 'react'
import { connect } from 'react-redux'

// import { CheckCircleIcon } from '@heroicons/react/solid'

function Alert({ alert }) {

    const displayAlert = () => {
        if (alert !== null){
            return (
                <div className="contAlerta">
                    <p>{alert.msg}</p>
                </div>
                
            )
        }
    }

    return (
        <Fragment>
            {displayAlert()}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    alert: state.Alert.alert
})

export default connect(mapStateToProps)(Alert)