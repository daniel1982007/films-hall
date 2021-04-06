export const films = (films=[], action) => {
    switch (action.type) {
        case 'GET_FILMS':
            console.log(action.payload)
            localStorage.setItem('films', JSON.stringify(action.payload))

            return action.payload
        case 'ADD_FILM':
            console.log(films)
            console.log(action.payload)
            localStorage.setItem('films', JSON.stringify([...films, action.payload]))
            return [...films, action.payload]
        case 'IMPORT_FILMS':
            console.log(action.payload)
            return action.payload
        case 'DELETE_FILM':
            return films.filter(film => film._id !== action.payload)
        case 'SEARCH_FILM':
            return action.payload
    
        default:
            return films
    }
}