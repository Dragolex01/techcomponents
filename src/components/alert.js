import { Fragment } from 'react'
import { connect } from 'react-redux'

// import { CheckCircleIcon } from '@heroicons/react/solid'

function Alert({ alert }) {

    const displayAlert = () => {
        if (alert !== null){
            return (
                <div>
                    {/* {alert.alertType} */}
                    {alert.msg}
                </div>
                
            )
        }
        // } else {
        //     return(
        //         // <Fragment></Fragment>
        //         console.log(alert)
        //     )
        // }
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