import React, {useEffect, useState} from 'react'
import {CSSTransition} from 'react-transition-group'

import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {addFilm, importFilms} from '../actions/index'
import { toast } from 'react-toastify'

const AddFilmForm = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    

    const [filmData, setFilmData] = useState({
        Title: '', ReleaseYear: '', Format: '', Stars: ''
    })

    const [isTitleErrorLabelOpen, setIsTitleErrorLabelOpen] = useState(false)
    const [titleErrorMessage, setTitleErrorMessage] = useState('')

    const [isYearErrorLabelOpen, setIsYearErrorLabelOpen] = useState(false)
    const [yearErrorMessage, setYearErrorMessage] = useState('')

    const [isStarsErrorLabelOpen, setIsStarsErrorLabelOpen] = useState(false)
    const [starsErrorMessage, setStarsErrorMessage] = useState('')

    const [hasError, setHasErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    //how to get the id of new added film?
    const message = useSelector(state => state.films.message)//state data my not be the same with data in database, there may be many reducers except filmsReducer
    //when selected piece of state changes, even just just dispatch to reducer, it triggers component rerender, 
    console.log(message)

    useEffect(() => {
        if(message) {
            setHasErrorMessage(true)
            setErrorMessage(message)
        }
    }, [message])


    const handleChange = (e) => {
        const key = e.target.name
        
        setFilmData({...filmData, [key]: e.target.value})
    }


    const handleBlur = (e) => {
        const fieldName = e.target.name

        switch (fieldName) {
            case 'Title':
                if(filmData.Title && !/^[\w:\-, ]+$/.test(filmData.Title)) {
                    setIsTitleErrorLabelOpen(true)
                    setTitleErrorMessage('Title could be combination of letters, numbers, spaces or symbols : -')
                }
                if(/^[ ]+$/.test(filmData.Title)) {
                    setIsTitleErrorLabelOpen(true)
                    setTitleErrorMessage('Title field can not be only spaces.')
                }

                return
            
            case 'ReleaseYear':
                const filmYear = parseInt(filmData.ReleaseYear)
                const isInRange = (filmYear > 2021 || filmYear < 1850) ? false : true
                
                if(filmData.ReleaseYear && !/^[0-9]{4}$/.test(filmYear)) {
                    setIsYearErrorLabelOpen(true)
                    setYearErrorMessage('Only 4 numbers')
                } else if(filmData.ReleaseYear && !isInRange) {
                    setIsYearErrorLabelOpen(true)
                    setYearErrorMessage('Only between 1850 to 2021')
                }

                return

            case 'Stars':
                let nameArr = filmData.Stars.split(',')
                if(!nameArr[nameArr.length-1]) nameArr = nameArr.slice(0, nameArr.length-1)
                nameArr = nameArr.map(name => name.trim().toUpperCase().replace(/[ ]+/g, [ ]))
                const nameSet = new Set(nameArr)

                if(filmData.Stars && !/^[a-zA-Z]+[a-zA-Z, ]+$/.test(filmData.Stars)) {
                    setIsStarsErrorLabelOpen(true)
                    setStarsErrorMessage('Only letters, spaces and commas are allowed, and begins from a letter')
                } else if(nameArr.some(name => !name || !name.trim())) {
                    setIsStarsErrorLabelOpen(true)
                    setStarsErrorMessage('Invalid names input, names are seperated by a comma, for example: Donald Trump, Joe Biden')
                } else if(nameSet.size !== nameArr.length) {
                    setIsStarsErrorLabelOpen(true)
                    setStarsErrorMessage('Actors names repeated.')
                }
                
                return
        
            default:
                return
        }
    }

    const handleFocus = (e) => {
        const fieldName = e.target.name

        switch (fieldName) {
            case 'Title':
                setIsTitleErrorLabelOpen(false)
                return
            case 'ReleaseYear':
                setIsYearErrorLabelOpen(false)
                return
            case 'Stars':
                setIsStarsErrorLabelOpen(false)
                return
            default:
                return
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if(!filmData.Title || !filmData.ReleaseYear || !filmData.Format || !filmData.Stars) {
            setHasErrorMessage(true)
            setErrorMessage('check if you have any empty field at first!')
        } else if(isTitleErrorLabelOpen || isYearErrorLabelOpen || isStarsErrorLabelOpen) {
            setHasErrorMessage(true)
            setErrorMessage('Clear input Errors to submit')
        } else {
            
            //this is an async function, after dispatch to reducer new state, useSelector triggers rerender, rerun all commands, but logic inside of event will not rerun, because it reruns only when event happens!
            const newFilm = await dispatch(addFilm(filmData))
            console.log(message)//if same film data submit, throw an error
            console.log(newFilm)

            //if(!newFilm.error) {
            if(!newFilm.error) {
                toast.success('Great, You have successfully submitted a film.')
                history.push(`/${newFilm._id}`)//${data._id}
            } 
            // else {
            //     setHasErrorMessage(true)
            //     setErrorMessage('This film has registered to system...')
            // }          
            
            
        }
    }

    const handleImport = (e) => {
        //e.preventDefault()
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.onload = (e) => {
            const text = e.target.result
            console.log(text)
            
            const textGroups = text.split(/[\r\n]{3,}/)
            console.log(textGroups)

            const filmObjects = textGroups.map(oneTextGroup => {
                const group = oneTextGroup.replace(/Release Year/, 'ReleaseYear')
                const keys = group.match(/(?<=\\n)[\w]+|^[\w]+/gm)
                const values = group.match(/(?<=:)[\w:,\- ]+/g)
                const obj = {}
                keys.forEach((key, index) => obj[key] = values[index].trim())
                return obj
            })

            console.log(filmObjects)

            dispatch(importFilms(filmObjects))

            history.push('/')
        }

        reader.readAsText(file)

        // dispatch(importFilms(objs))
    }

    console.log(filmData)

    return (
        <div className='container-lg py-3'>
            <CSSTransition in={hasError} timeout={300} classNames='liveValidateMessage' unmountOnExit>
                <div className='alert alert-danger small mx-5 liveValidateMessage text-center'>{errorMessage}</div>
            </CSSTransition>
            <div className='row g-4 m-0 align-items-center'>
                <div className='col-md-6'>
                    <form onSubmit={handleSubmit}>
                        <div className='my-2 mx-5'>
                            <label className='d-block form-label' htmlFor="title">Film Title</label>
                            <input className='form-control' name='Title' id='title' type="text" placeholder='Enter film name' onChange={handleChange} value={filmData.Title} onBlur={handleBlur} onFocus={handleFocus}/>
                            <CSSTransition in={isTitleErrorLabelOpen} timeout={300} classNames='liveValidateMessage' unmountOnExit>
                                <div className='alert alert-danger small liveValidateMessage'>{titleErrorMessage}</div>
                            </CSSTransition>
                        </div>
                        <div className='my-2 mx-5'>
                            <label className='d-block form-label' htmlFor="release-year">Release Year</label>
                            <input className='form-control' name='ReleaseYear' id='release-year' type="text" placeholder='Release Year (for example: 2000)' onChange={handleChange} value={filmData.ReleaseYear} onBlur={handleBlur} onFocus={handleFocus}/>
                            <CSSTransition in={isYearErrorLabelOpen} timeout={300} classNames='liveValidateMessage' unmountOnExit>
                                <div className='alert alert-danger small liveValidateMessage'>{yearErrorMessage}</div>
                            </CSSTransition>
                        </div>
                        <div className='my-2 mx-5'>
                            <label className='d-block form-label' htmlFor="format">Video Format</label> 
                            <select className="form-select" name='Format' id='format' onChange={handleChange} value={filmData.Format} onBlur={handleBlur} onFocus={handleFocus}>
                                <option value=''>Select a Video Format</option>
                                <option value="VHS">VHS</option>
                                <option value="DVD">DVD</option>
                                <option value="Blu-Ray">Blu-Ray</option>
                            </select>
                        </div>
                        <div className='my-2 mx-5'>
                            <label className='d-block form-label' htmlFor="actors">Casting</label>
                            <input className='form-control' name='Stars' id='actors' type="text" placeholder='Film actors and actresses' onChange={handleChange} value={filmData.Stars} onBlur={handleBlur} onFocus={handleFocus}/>
                            <CSSTransition in={isStarsErrorLabelOpen} timeout={300} classNames='liveValidateMessage' unmountOnExit>
                                <div className='alert alert-danger small liveValidateMessage'>{starsErrorMessage}</div>
                            </CSSTransition>
                        </div>
                        <div className='mt-3 mx-5'>
                            <button className='btn btn-primary p-3 w-100'>Add to film list</button>
                        </div>
                    </form>
                </div>
                <div className='col-md-6'>
                    <div className='my-2 mx-5'>
                        <div className='d-flex'>
                            <input type="file" onChange={handleImport}/>
                            <button className='btn btn-primary'>Import</button>
                        </div>
                        <p className='h6 mt-3'>If you want to add multiple films, you can import films from here</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFilmForm