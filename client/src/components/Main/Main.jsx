import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect';

import css from './main.module.css'

const Main = ({auth}) => {
    const textArray = [
        "qwerty123",
        "password123",
        "123456"
    ]
    return(
        <div className={css.mainWrapper + " container p-0"}>
            <div className="col-8">
                <div className="card border-0 shadow ">
                    <div className="card-body p-5">
                        <h1 className="font-weight-light text-center">Save your password from any service</h1>
                        <h2 className="font-weight-light text-center">
                            <Typewriter
                                options={{
                                    strings: textArray,
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h2>
                        <div className="row mt-4 d-flex justify-content-center">
                            {!auth
                            ? <NavLink className="btn btn-dark" to="/auth">Sign in</NavLink>
                            : <Link className="btn btn-dark" to="/list">My password list</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main