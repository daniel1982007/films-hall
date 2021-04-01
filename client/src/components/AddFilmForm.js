import React, {useState} from 'react'

import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {addFilm} from '../actions/index'

const AddFilmForm = () => {
    const [filmData, setFilmData] = useState({
        Title: '', ReleaseYear: '', Format: '', Stars: ''
    })

    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = (e) => {
        setFilmData({...filmData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addFilm(filmData))
        history.push('/')
    }

    const handleImport = (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = e.target.result
            console.log(text)
        }

        reader.readAsText(e.target.files[0])
    }


    return (
        <div className='container-lg py-3'>
            <div className='row g-4 m-0 align-items-center'>
                <div className='col-md-6'>
                    <form onSubmit={handleSubmit}>
                        <div className='my-2 mx-5'>
                            <label className='d-block form-label' htmlFor="title">Film Title</label>
                            <input className='form-control' name='Title' id='title' type="text" placeholder='Enter film name' onChange={handleChange} value={filmData.Title} />
                        </div>
                        <div className='my-2 mx-5'>
                            <label className='d-block form-label' htmlFor="release-year">Release Year</label>
                            <input className='form-control' name='ReleaseYear' id='release-year' type="text" placeholder='Release Year (for example: 2000)' onChange={handleChange} value={filmData.ReleaseYear} />
                        </div>
                        <div className='my-2 mx-5'>
                            <label className='d-block form-label' htmlFor="format">Video Format</label>
                            <input className='form-control' name='Format' id='format' type="text" placeholder='Film format' onChange={handleChange} value={filmData.Format} />
                        </div>
                        <div className='my-2 mx-5'>
                            <label className='d-block form-label' htmlFor="actors">Casting</label>
                            <input className='form-control' name='Stars' id='actors' type="text" placeholder='Film actors and actresses' onChange={handleChange} value={filmData.Stars}/>
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