import React from 'react'
import { Link } from 'react-router-dom'

import css from './error.module.css'

const Error = () => {
    return (
        <div className={css.errorWrapper + " container p-0"}>
            <div className="col-8">
                <div className="card border-0 shadow ">
                    <div className="card-body p-5">
                        <h1 className="font-weight-light text-center">404 PAGE NOT FOUND</h1>
                        <div className="row mt-4 d-flex justify-content-center">
                            <Link className="btn btn-dark" to="/">Go home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error
