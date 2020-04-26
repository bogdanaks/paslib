import {    REGISTER_USER, LOGIN_USER, LOGOUT_USER, FETCH_USER,
            RECEIVE_ITEMS, CREATE_ITEM, DELETE_ITEM,
            COUNT_PAGES, CURRENT_PAGE,
            HIDE_ALERT_DANGER, SHOW_ALERT_DANGER, SHOW_ALERT_SUCCESS, HIDE_ALERT_SUCCESS,
            CHANGE_ITEM_FIELD,
            SHOW_LOADER, HIDE_LOADER, SHOW_LOADER_IMAGE, HIDE_LOADER_IMAGE
        } 
from "./actionTypes";
import api from '../api'
import jwt from 'jsonwebtoken'

// Auth actions
export function fetchUser() {
    return async dispatch => {
        const token = localStorage.getItem("token")
        // Decode token
        if(token) {
            try {
                const decodeToken = await jwt.decode(token)
                dispatch({ type: FETCH_USER, payload: decodeToken._id })
            } catch(err) {
                showAlertDanger("Invalid decode token")
                localStorage.removeItem("token")
            }
        }
    }
}
export function registerUser(user) {
    return async dispatch => {
        const userObj = await api.post('/api/auth/register', user )
                                .then( res => res.data )
                                .catch(err => dispatch(showAlertDanger(err.response.request.response)))
        if(userObj) {
            dispatch({ type: REGISTER_USER })
            dispatch(loginUser(user))
        }
    }
}
export function loginUser(user) {
    return async dispatch => {
        const userObj = await api.post('/api/auth/login', user )
                                .then( res => res.data )
                                .catch(err => dispatch(showAlertDanger(err.response.request.response)))
        if(userObj) {
            localStorage.setItem("token", userObj.token)
            localStorage.setItem("login", user.login)
            dispatch({type: LOGIN_USER, payload: userObj.userId })
        }
    }
}
export function logoutUser() {
    return async dispatch => {
        dispatch({ type: LOGOUT_USER })
        localStorage.removeItem("token")
        localStorage.removeItem("login")
    }
}


// Items actions
export function fetchItems(userId) {
    return async dispatch => {
        dispatch(showLoading())
        dispatch(showLoadingImage())
        const res = await api.get(`/api/lists/${userId}`, {
            headers: {
                'auth-token': localStorage.getItem("token"),
            }})
            .then( res => res.data )
            .catch(err => dispatch(showAlertDanger(err.response.request.response)))
        dispatch({type: RECEIVE_ITEMS, payload: res})
        dispatch(hideLoading())
        dispatch(hideLoadingImage())
    }
}
export function createItem(item) {
    return async dispatch => {
        const res = await api.post('/api/lists/add', { ...item }, {
                headers: {
                    'auth-token': localStorage.getItem("token"),
                }})
                 .then( res => res.data)
                 .catch(err => dispatch(showAlertDanger(err.response.request.response)))
        dispatch({type: CREATE_ITEM, payload: res})
    }
}
export function deleteItem(itemId) {
    return async dispatch => {
        await api.delete(`/api/lists/delete/${itemId}`, {
                headers: {
                    'auth-token': localStorage.getItem("token"),
                }})
                 .then( res => res.data)
                 .catch(err => dispatch(showAlertDanger(err.response.request.response)))
        await api.delete(`/api/images/delete/${itemId}`, {
                headers: {
                    'auth-token': localStorage.getItem("token"),
                }})
                .then( res => res.data)
                .catch(err => dispatch(showAlertDanger(err.response.request.response)))
        dispatch({type: DELETE_ITEM, payload: itemId})
    }
}
export function findItems(title) {
    return async dispatch => {
        dispatch(showLoading())
        dispatch(showLoadingImage())
        const res = await api.get(`/api/lists/find/${title}`, {
                headers: {
                    'auth-token': localStorage.getItem("token"),
                }})
                 .then( res => res.data)
                 .catch(err => dispatch(showAlertDanger(err.response.request.response)))
        if(res.length <= 0) dispatch(showAlertDanger("No results were found for your request"))
        dispatch({type: RECEIVE_ITEMS, payload: res})
        dispatch(showAlertSuccess("We found results for your request"))
        dispatch(hideLoading())
        dispatch(hideLoadingImage())
    }
}

// Pages action
export function getCountPage(userId) {
    return async dispatch => {
        const res = await api.get(`/api/lists/counts/${userId}`, {
            headers: {
                'auth-token': localStorage.getItem("token"),
            }})
            .then( res => res.data )
            .catch(err => dispatch(showAlertDanger(err.response.request.response)))
        const pages = Math.ceil(res / 3)
        dispatch({type: COUNT_PAGES, payload: pages})
    }
}
export function setCurrentPage(numPage) {
    return {type: CURRENT_PAGE, payload: numPage}
}
export function pageItems(pageNumber) {
    return async dispatch => {
        dispatch(showLoading())
        dispatch(showLoadingImage())
        const res = await api.get(`/api/lists/page/${pageNumber}`, {
            headers: {
                'auth-token': localStorage.getItem("token"),
            }})
            .then( res => res.data )
            .catch(err => dispatch(showAlertDanger(err.response.request.response)))
        dispatch({type: RECEIVE_ITEMS, payload: res})
        dispatch(hideLoading())
        dispatch(hideLoadingImage())
    }
}

// Items fields actions
export function changeItemField(id, key, value) {
    return async dispatch => {
        await api.post('/api/lists//edit', {id, key, value}, {
                headers: {
                    'auth-token': localStorage.getItem("token"),
                }})
                 .then( res => res.data)
                 .catch(err => dispatch(showAlertDanger(err.response.request.response)))
        dispatch({
            type: CHANGE_ITEM_FIELD,
            id: id,
            key: key,
            value: value
        })
    }
}


// Image actions
export function imageUpload(file, itemId) {
    return async dispatch => {
        dispatch(showLoadingImage())
        const fileFormat = file.type
        const fileSizeKB = Math.round(file.size/1000)
        const token = localStorage.getItem("token")
        // Проверка на тип файла
        if(fileFormat === "image/png" || fileFormat === "image/jpeg") {
            // Проверка на размер файла
            if (fileSizeKB < 2000) {
                // Загрузка файла
                const data = new FormData()
                data.append('file', file)
                await api.post(`/api/images/upload/${itemId}`, data, {
                    headers: {
                        'auth-token': token,
                    }})
                    .then( res => res.request.responseURL)
                    .catch(err => dispatch(showAlertDanger(err)))
                const imageLink = await api.get(`/api/images/${itemId}`)
                                .then(res => res.request.responseURL)
                                .catch(err => dispatch(showAlertDanger(err.response.request.response)))
                await api.post('/api/lists//edit', {id: itemId, key: "image", value: imageLink}, {
                    headers: {
                        'auth-token': token,
                    }})
                        .then( res => res.data)
                        .catch(err => dispatch(showAlertDanger(err.response.request.response)))
                
                dispatch({
                    type: CHANGE_ITEM_FIELD,
                    id: itemId,
                    key: "image",
                    value: imageLink
                })
            } else {
                dispatch(showAlertDanger("Слишком большой размер файла. Файл не должен превышать 2МБ"))
            }
        } else {
            dispatch(showAlertDanger("Не подходящий тип файла. Выберите тип jpeg или png"))
        }
        dispatch(hideLoadingImage())
    }
}


// Show and hide alert
export function showAlertDanger(text) {
    return async dispatch => {
        await dispatch({
            type: SHOW_ALERT_DANGER,
            payload: text
        })
        setTimeout(()=>{
            dispatch(hideAlertDanger())
        }, 2500)
    }
}
export function hideAlertDanger() {
    return {
        type: HIDE_ALERT_DANGER
    }
}

export function showAlertSuccess(text) {
    return async dispatch => {
        await dispatch({
            type: SHOW_ALERT_SUCCESS,
            payload: text
        })
        setTimeout(()=>{
            dispatch(hideAlertSuccess())
        }, 2500)
    }
}

export function hideAlertSuccess() {
    return {
        type: HIDE_ALERT_SUCCESS
    }
}

// Show and hide loading
export function showLoading() {
    return {
        type: SHOW_LOADER
    }
}
export function hideLoading() {
    return {
        type: HIDE_LOADER
    }
}

export function showLoadingImage() {
    return {
        type: SHOW_LOADER_IMAGE
    }
}
export function hideLoadingImage() {
    return {
        type: HIDE_LOADER_IMAGE
    }
}