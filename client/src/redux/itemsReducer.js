import { RECEIVE_ITEMS, CREATE_ITEM, DELETE_ITEM, CHANGE_ITEM_FIELD } from './actionTypes'

const initialState = {
    items: []
}

export const itemsReducer = (state = initialState, action) => {
    switch(action.type) {
        case RECEIVE_ITEMS:
            return { ...state, items: action.payload }
        case CREATE_ITEM:
            return { ...state, items: state.items.concat(action.payload) }
        case DELETE_ITEM:
            return { ...state, items: state.items.filter((item)=>item._id !== action.payload) }
        case CHANGE_ITEM_FIELD:
            return {
                ...state,
                items: state.items.map(item => {
                  if(item._id === action.id) {
                    return {
                      ...item,
                      [action.key]: action.value,
                    }
                  }
                  return item;
                })
            }
        default: return state
    }
}