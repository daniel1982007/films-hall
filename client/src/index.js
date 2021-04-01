import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {compose, applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'

import App from './App'

const store = createStore(reducer, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
    , document.getElementById('root')
)