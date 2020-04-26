import React from 'react'
import { NavLink } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { logoutUser, setCurrentPage, pageItems } from '../../redux/actions'
import { useDispatch } from 'react-redux'

const Navbar = ({auth}) => {
    const dispatch = useDispatch()
    const handleListClick = () => {
        dispatch(setCurrentPage(1))
        dispatch(pageItems(1))
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">
                <Link to="/" className="navbar-brand ml-4" >PasLib</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {auth &&
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/list" onClick={handleListClick} className="nav-link" activeClassName="active">List<span className="sr-only">(current)</span></NavLink>
                        </li>
                    </ul>
                    }
                    <ul className="navbar-nav ml-auto">
                        {auth
                        ?
                        <div className="row ml-0 mr-0">
                        <li className="nav-item">
                            <span className="navbar-brand font-weight-light mr-4" style={{cursor: "default"}}>{localStorage.getItem("login")}</span>
                        </li>
                        <li className="nav-item">
                            <Link to="/" onClick={() => dispatch(logoutUser())} className="nav-link mr-4">Log Out</Link>
                        </li>
                        </div>
                        :
                        <li className="nav-item">
                            <NavLink to="/auth" className="nav-link mr-4" activeClassName="active">Sign In</NavLink>
                        </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar