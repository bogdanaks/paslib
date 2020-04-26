import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, setCurrentPage, pageItems } from '../../../../redux/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import css from './deleteitem.module.css'

const DeleteItem = ({id}) => {
    const dispatch = useDispatch()
    const curPage = useSelector(state => state.page.curPage)
    const items = useSelector(state => state.list.items)
    const handleClickDeleteBtn = () => {
        dispatch(deleteItem(id))
        if(items.length === 1) {
            if(curPage >= 2) {
                dispatch(setCurrentPage(curPage-1))
                dispatch(pageItems(curPage-1))
            }
        }
    }
    return(
        <span onClick={handleClickDeleteBtn} className={css.btnDelete}>
            <FontAwesomeIcon icon={faTrashAlt} className=""/>
        </span>
    )
}

export default DeleteItem