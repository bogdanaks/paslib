import {
        SHOW_LOADER, HIDE_LOADER, 
        SHOW_LOADER_IMAGE, HIDE_LOADER_IMAGE, 
        SHOW_ALERT_DANGER, HIDE_ALERT_DANGER, SHOW_ALERT_SUCCESS, HIDE_ALERT_SUCCESS
    } 
from './actionTypes'

const initialState = {
    loading: false,
    loadingImage: false,
    alertDanger: null,
    alertSuccess: null
}

export const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true }
        case HIDE_LOADER:
            return { ...state, loading: false }

        case SHOW_LOADER_IMAGE:
            return { ...state, loadingImage: true }
        case HIDE_LOADER_IMAGE:
            return { ...state, loadingImage: false }

        case SHOW_ALERT_DANGER:
            return { ...state, alertDanger: action.payload }
        case HIDE_ALERT_DANGER:
            return { ...state, alertDanger: null }
        case SHOW_ALERT_SUCCESS:
            return { ...state, alertSuccess: action.payload }
        case HIDE_ALERT_SUCCESS:
            return { ...state, alertSuccess: null }
        default: return state
    }
}