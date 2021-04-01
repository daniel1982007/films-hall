import React from 'react'
import Navbar from './components/Navbar'
import AddFilmForm from './components/AddFilmForm'
import Film from './components/Film'
import FilmList from './components/FilmList'
import Foot from './components/Foot'

import {Switch, Route} from 'react-router-dom'

const App = () => {
    return (
        <div className='bg-light vh-100'>
            <Navbar />
            
            <Switch>
                <Route exact path='/'>
                    <FilmList />
                </Route>
                <Route path='/add'>
                    <AddFilmForm />
                </Route>
                <Route path='/:id'>
                    <Film />
                </Route>
            </Switch>

            <Foot />
        </div>
    )
}

export default App