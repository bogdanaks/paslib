import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import Item from './Item/Item'
import Search from './Search/Search'
import AddItem from './Item/AddItem/AddItem'
import Pagination from './Pagination/Pagination'
import Loader from '../Loader/Loader'
import { fetchItems } from '../../redux/actions'


const List = () => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.app.loading)
    const userId = useSelector(state => state.user.userId)
    useEffect(() => {
        dispatch(fetchItems(userId))
    }, [dispatch, userId])
    const items = useSelector(state => state.list.items)

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <div className="d-flex justify-content-center mt-4" >
                        <Search userId={userId}/>
                        <AddItem userId={userId}/>
                    </div>
                </div>
            </div>
            {loading
            ? <Loader />
            :
            <div>
                <div className="row">
                    <div className="col-lg-8 offset-lg-2 mt-3">
                            {items.map((item, index) => 
                                <Item item={item} key={index} itemId={item._id}/> )
                            }
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="justify-content-center mt-3 mb-4">
                            <Pagination items={items} userId={userId}/>
                        </div>
                    </div> 
                </div>
            </div>
            }
        </div>
    )
}


export default List