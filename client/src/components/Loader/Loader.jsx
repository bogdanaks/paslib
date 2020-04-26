import React from 'react'

const Loader = ({margin=5}) => {
    return (
        <div className={"mt-" + margin + " container d-flex justify-content-center"}>
            <div className="spinner-border text-dark" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
