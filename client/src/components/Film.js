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

    const film = JSON.parse(localStorage.getItem('films')).find(film => film._id === id)
    console.log(film)
    
    

    //const film = films.find(film => film._id === id)

    const handleDelete = () => {
        dispatch(deleteFilm(film._id))
        history.push('/')
    }


    return (
        <div className='container-sm py-3'>
            <div className='card'>
                <div className='card-header'>
                    <h3 className='text-primary'>Wonderful film: <span className='fst-italic text-decoration-underline'>{film.Title}</span></h3>
                </div>
                <div className='card-body bg-light'>
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
                </div>
                <div className='card-footer d-flex justify-content-between'>
                    <Link to='/' className='btn btn-primary m-3'>Back to film list</Link>
                    <button className='btn btn-danger m-3' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Film