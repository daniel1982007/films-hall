import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getFilms} from '../actions/index'

const FilmList = () => {
    const dispatch = useDispatch()

    const films = useSelector(state => state.films)
    films.sort((a, b) => {
        return a.Title.toUpperCase() > b.Title.toUpperCase() ? 1 : -1
    })
    console.log(films)
    
    useEffect(() => {
        dispatch(getFilms())
        
    }, [dispatch])


    return (
        !films.length ? 
            (<div className='m-3 text-center'>
                <div >No data here</div>
            </div>) 
            :
            (<>
                <h2 className='m-3 text-primary'>Films' list</h2>
                <ol className='m-3 h3 text-primary fst-italic'>
                    {films.map((film, index) => (<li key={index} className='m-3'>
                        <Link to={`/${film._id}`}>{film.Title}</Link>
                    </li>))}
                </ol>
            </>)
    )  
}

export default FilmList