/**
 * Created by kevin on 16/5/28.
 */

import actionTypeBuilder from '../utils/actionTypeBuilder'
import {AUTHENTICATE} from './authActions'

const initialState = {

};

export default function(state=initialState, action){
    const {type, data, error} = action;
    switch (type){
        case actionTypeBuilder.changed(AUTHENTICATE):
            return {...state, ...data}
        case actionTypeBuilder.error(AUTHENTICATE):
            return {...state, ...error}
        default:
            return state;
    }
}