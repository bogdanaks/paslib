import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser, loginUser } from '../../redux/actions'

import css from './auth.module.css'

const Auth = () => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({ login: "", password: "" })
    const handleInputChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const handleButtonClick = event => {
        if(event.target.name === 'register') {
            dispatch(registerUser(form))
        } else {
            dispatch(loginUser(form))
        }
    }
    const handleEnter = e => {
        if (e.key === 'Enter') {
            dispatch(loginUser(form))
        }
    }
    return (
        <div className={css.authWrapper + " container p-0"}>
            <div className="container">
                <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
                    <div className="card border-0 shadow ">
                        <div className="card-body p-5">
                            <h1 className="font-weight-light text-center">Authorization</h1>
                            <div className="d-flex justify-content-center mt-4">
                                <div className="conatiner-fluid w-100">
                                    <div className="col">
                                        <div className="row">
                                            <input  className={css.inputAuth + " w-100"}
                                                    type="text"
                                                    name="login"
                                                    defaultValue=""
                                                    placeholder='Your login'
                                                    onChange={handleInputChange}
                                                    onKeyDown={handleEnter}
                                            />
                                        </div>
                                        <div className="row">
                                            <input  className={css.inputAuth + " w-100 mt-4"}
                                                    type="password"
                                                    name="password"
                                                    defaultValue=""
                                                    placeholder='Your password'
                                                    onChange={handleInputChange}
                                                    onKeyDown={handleEnter}
                                            />
                                        </div>
                                        <div className="row d-flex justify-content-center">
                                            <button type="submit" onClick={handleButtonClick} name="register" className="btn btn-dark mt-4">Register</button>
                                            <button type="submit" onClick={handleButtonClick} name="login" className="btn btn-dark ml-2 mt-4">Login</button>
                                        </div>
                                    </div>
                                </div> 
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
