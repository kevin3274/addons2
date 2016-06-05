/**
 * Created by kevin on 16/5/26.
 */
import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import partner from './partner/partnerReducer'
import auth from './authReducer'

const reducers = combineReducers({
    partner,
    auth,
    routing: routerReducer
});

export default reducers;