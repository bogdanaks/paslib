import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, FETCH_USER } from './actionTypes'

const initialState = {
    userId: ""
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER:
            return { ...state, userId: action.payload }
        case REGISTER_USER:
            return { ...state }
        case LOGIN_USER:
            return { ...state, userId: action.payload }
        case LOGOUT_USER:
            return { ...state, userId: "" }
        default: return state
    }
}