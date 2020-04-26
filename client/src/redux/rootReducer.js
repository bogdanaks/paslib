import {combineReducers} from 'redux'
import { userReducer } from './userReducer'
import { itemsReducer } from './itemsReducer'
import { appReducer } from './appReducer'
import { pageReducer } from './pageReducer'

export const rootReducer = combineReducers({
    user: userReducer,
    list: itemsReducer,
    page: pageReducer,
    app: appReducer
})