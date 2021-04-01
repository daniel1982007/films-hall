import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {searchFilm} from '../actions/index'

const Navbar = () => {
    const dispatch = useDispatch()

    const history = useHistory()

    const [searchText, setSearchText] = useState('')

    const handleChange = (e) => {
        setSearchText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(searchFilm(searchText))
        history.push('/')
    }

    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid flex-column flex-md-row">
                <Link to='/' className='h2 text-decoration-none text-light'>Film-Store</Link>
                <div className='d-flex flex-column flex-md-row align-items-center py-2 py-md-0'>
                    <Link to='/add' className='m-2'>
                        <i className="fas fa-plus-circle fa-2x text-light"></i>
                    </Link>
                    <form className="d-flex" onSubmit={handleSubmit}>
                        <input className="form-control mx-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} value={searchText}/>
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar