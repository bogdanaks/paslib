import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createItem, setCurrentPage, pageItems} from '../../../../redux/actions'

import {Spring} from 'react-spring/renderprops'

const AddItem = ({userId}) => {
    const dispatch = useDispatch()
    const newItem = {
        userId: userId,
        title: "",
        login: "",
        password: "",
        link: "",
        category: ""
    }
    const curPage = useSelector(state => state.page.curPage)
    const items = useSelector(state => state.list.items)
    const handleClickAddBtn = async () => {
        await dispatch(createItem(newItem))
        if(items.length === 3) {
            dispatch(setCurrentPage(curPage+1))
            dispatch(pageItems(curPage+1))
        }
    }
    
    return (
        <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => 
            <button 
                style={props} 
                type="button" 
                className="btn btn-dark btn-sm"
                onClick={handleClickAddBtn}
            >Add new password
            </button>}
        </Spring>
    )
}

export default AddItem
