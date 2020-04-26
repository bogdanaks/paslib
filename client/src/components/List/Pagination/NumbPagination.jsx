import React from 'react'
import { Link } from 'react-router-dom'

const NumbPagination = ({active, num, handleClick}) => {
    return (
        <li className={active + " page-item"}>
            <Link 
                to={"/list/page/"+num} 
                className="page-link"
                name={num}
                onClick={handleClick}
            >
                {num}
            </Link>
        </li>
    )
}

export default NumbPagination
