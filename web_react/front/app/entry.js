/**
 * Created by kevin on 16/5/24.
 */
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import reducers from './reducers'
import routes from './routes'
import {Router, Route, browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import fetchMiddleware from '../middlewares/fetchMiddleware'
import authMiddleware from '../middlewares/authMiddleware'

let loggerMiddleware = createLogger();

const store = createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware, fetchMiddleware, authMiddleware));

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>, document.getElementById("react-root"));

