import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

import css from './search.module.css'
import { findItems, fetchItems } from '../../../redux/actions'

const Search = ({userId}) => {
    const [search, setSearch] = useState("")
    const searchInput = useRef()
    const dispatch = useDispatch()

    const handleSearchClick = () => {
        if(search.length > 0) {
            dispatch(findItems(search))
            searchInput.current.value = search
        } else {
            dispatch(fetchItems(userId))
        }
    }
    const handleEnter = (event) => {
        if (event.keyCode === 13) {
            handleSearchClick()
        }
    }
    const handleClearClick = () => {
        dispatch(fetchItems(userId))
        searchInput.current.value = ""
        setSearch("")
    }
    const handleInputChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div className={css.searchBlock + " input-group mr-4 d-flex align-items-center"}>
            <input 
                type="text" 
                className={css.searchInput + " form-control"} 
                placeholder="Search by title" 
                aria-label="Search.."
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                ref={searchInput}
            />
            {search && 
            <span 
                className={css.clearIcon}
                onClick={handleClearClick}
            ><FontAwesomeIcon icon={faTimesCircle} style={{cursor: 'pointer'}} />
            </span>
            }
            <span 
                className={css.searchIcon}
                onClick={handleSearchClick}
            ><FontAwesomeIcon icon={faSearch} style={{cursor: 'pointer'}} />
            </span>
        </div>
    )
}

export default Search
