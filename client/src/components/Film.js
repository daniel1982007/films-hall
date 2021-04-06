import React from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteFilm} from '../actions/index'


const Film = () => {
    const {id} = useParams()
    console.log(id)
    
    const dispatch = useDispatch()
    const history = useHistory()
    
    //1, if refresh, films will be empty
    //2, if add new, films are not updated

    const films = JSON.parse(localStorage.getItem('films'))
    console.log(films)
    const film = films.find(film => film._id === id)
    

    //const film = films.find(film => film._id === id)

    const handleDelete = () => {
        dispatch(deleteFilm(film._id))
        history.push('/')
    }


    return (
        <div className='p-4'>
            <div>
                <h3 className='text-center text-primary'>Title of this film:</h3>
                <h1 className='text-center text-primary fst-italic text-decoration-underline'>{film.Title}</h1>
            </div>
            <div>
                <h3 className='text-center text-primary'>Release year of this film:</h3>
                <h1 className='text-center text-primary fst-italic text-decoration-underline'>{film.ReleaseYear}</h1>
            </div>
            <div>
                <h3 className='text-center text-primary'>Film format:</h3>
                <h1 className='text-center text-primary fst-italic text-decoration-underline'>{film.Format}</h1>
            </div>
            <div>
                <h3 className='text-center text-primary'>All actors in this film:</h3>
                <h1 className='text-center text-primary fst-italic text-decoration-underline'>{film.Stars}</h1>
            </div>
            <div className='d-flex justify-content-between'>
                <Link to='/' className='btn btn-primary m-3'>Back to film list</Link>
                <button className='btn btn-danger m-3' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default Film