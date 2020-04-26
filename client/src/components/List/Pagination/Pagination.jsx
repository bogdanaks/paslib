import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import NumbPagination from './NumbPagination'
import { getCountPage, setCurrentPage, pageItems } from '../../../redux/actions'

const Pagination = ({userId}) => {
    const dispatch = useDispatch()
    const count = useSelector(state => state.page.countPages)
    let links = []
    useEffect(() => {
        dispatch(getCountPage(userId))
    }, [dispatch, userId])


    let curPage = useSelector(state => state.page.curPage)
    for ( let i = 1; i <= count; i++ ) {
        if(i >= curPage-2 && i <= curPage+2) {
            links.push(i)
        }
    }
    
    const handleClickPage = event => {
        dispatch(pageItems(Number(event.target.name)))
        dispatch(setCurrentPage(Number(event.target.name)))
    }
    const handleFirstPageClick = () => {
        dispatch(pageItems(1))
        dispatch(setCurrentPage(1))
    }
    const handleLastPageClick = () => {
        dispatch(pageItems(count))
        dispatch(setCurrentPage(count))
    }

    return (
        <nav aria-label="pagination">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <Link to="/list/page/1" className="page-link" name="1" aria-label="Previous" onClick={handleFirstPageClick}>
                        <span aria-hidden="true">&laquo;</span>
                    </Link>
                </li>
                {links.map((num) => {
                    return <NumbPagination active={curPage === num && "active"} key={num} num={num} handleClick={handleClickPage}/>
                })}
                <li className="page-item">
                    <Link className="page-link" to={"/list/page/"+count} name={count} aria-label="Next" onClick={handleLastPageClick}>
                        <span aria-hidden="true">&raquo;</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination