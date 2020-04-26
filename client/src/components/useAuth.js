import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions'

function useAuth() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])
    const userId = useSelector(state => state.user.userId)
    const result = userId ? true : false
    return result
}

export default useAuth