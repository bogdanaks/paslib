import { COUNT_PAGES, CURRENT_PAGE } from './actionTypes'

const initialState = {
    countPages: 0,
    curPage: 1
}

export const pageReducer = (state = initialState, action) => {
    switch(action.type) {
        case COUNT_PAGES:
            return { ...state, countPages: action.payload }
        case CURRENT_PAGE:
            return { ...state,  curPage: action.payload}
        default: return state
    }
}