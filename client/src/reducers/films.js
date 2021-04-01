export const films = (films=[], action) => {
    switch (action.type) {
        case 'GET_FILMS':
            console.log(action.payload)
            films = action.payload
            localStorage.setItem('filmsData', JSON.stringify(films))

            return action.payload
        case 'ADD_FILM':
            console.log(action.payload)
            return [...films, action.payload]    
        case 'DELETE_FILM':
            return films.filter(film => film._id !== action.payload)
        case 'SEARCH_FILM':
            return action.payload
    
        default:
            return films
    }
}