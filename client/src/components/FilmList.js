import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getFilms} from '../actions/index'

const FilmList = () => {
    const dispatch = useDispatch()

    const films = useSelector(state => state.films.films)
    
    console.log(films)//first run because first render, second run because useEffect getfilms, pass to reducer, and here useSelector runs
    
    useEffect(() => {
        dispatch(getFilms())
        
    }, [dispatch]) //when redirect from other location to this home '/', it will rerender, all components run, if state inside this component changes, useEffect will not run,, if nothing changes in []


    return (
        !films?.length ? 
            (<div className='m-3 text-center'>
                {/* <div >No data here</div> */}
                <div className="spinner-border" role="status"></div>
            </div>) 
            :
            (<>
                <h2 className='m-3 text-primary text-center'>Films' list</h2>
                {/* <ol className='m-3 h3 text-primary fst-italic'>
                    {films.map((film, index) => (<li key={index} className='m-3'>
                        <Link to={`/${film._id}`}>{film.Title}</Link>
                    </li>))}
                </ol> */}

                
                    {films.map((film, index) => (
                        <div className='container-sm text-center' key={index}>
                            <div className='card m-2'>
                                <div className='card-body bg-light'>
                                    <Link to={`/${film._id}`} className='h3 fst-italic text-decoration-none'>{film.Title}</Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    
                
            </>)
    )  
}

export default FilmList