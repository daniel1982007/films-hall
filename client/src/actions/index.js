import * as api from '../api/index'

export const getFilms = () => async (dispatch) => {
    try {
        const {data} = await api.getFilms()
        console.log(data)
        dispatch({type: 'GET_FILMS', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const addFilm = (film) => async (dispatch) => {
    try {
        const {data} = await api.addFilm(film)
        console.log(data)
        dispatch({type: 'ADD_FILM', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteFilm = (id) => async (dispatch) => {
    try {
        await api.deleteFilm(id)
        dispatch({type: 'DELETE_FILM', payload: id})

    } catch (error) {
        console.log(error)
    }
}

export const searchFilm = (str) => async (dispatch) => {
    try {
        const {data} = await api.searchFilm(str)
        console.log(data)
        dispatch({type: 'SEARCH_FILM', payload: data})
    } catch (error) {
        console.log(error)
    }
}