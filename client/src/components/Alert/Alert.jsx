import React from 'react'
import { Spring } from 'react-spring/renderprops'
import { useSelector } from 'react-redux'

const Alert = () => {
    const alertDanger = useSelector(state => state.app.alertDanger)
    const alertSuccess = useSelector(state => state.app.alertSuccess)
    if(alertDanger) {
        return (
            <Spring
                from={{ transform: 'translate3d(-60px, 0 ,0)', opacity: 0 }}
                to={{ transform: 'translate3d(0px, 0, 0)', opacity: 1 }}>
                {anim => 
                    <div className="alert alert-danger mt-3 ml-4 position-absolute" role="alert" style={{zIndex: 999, ...anim}}>
                        {alertDanger}
                    </div>
                }
            </Spring>
        )
    } else if (alertSuccess) {
        return (
            <Spring
                from={{ transform: 'translate3d(-60px, 0 ,0)', opacity: 0 }}
                to={{ transform: 'translate3d(0px, 0, 0)', opacity: 1 }}>
                {anim => 
                    <div className="alert alert-success mt-3 ml-4 position-absolute" role="alert" style={{zIndex: 999, ...anim}}>
                        {alertSuccess}
                    </div>
                }
            </Spring>
        )
    } else {
        return null
    }
}

export default Alert
