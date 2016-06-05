/**
 * Created by kevin on 16/5/25.
 */

import actionTypeBuilder from '../../utils/actionTypeBuilder'
import {LOAD_PARTNERS, FETCH_PARTNER} from './partnerActions'

const initialState = {
    partners: [],
    partner: {},
    ready: false
}

export default function (state = initialState, action){
    const {data, type, ready, error} = action;

    switch (type){
        case actionTypeBuilder.ready(LOAD_PARTNERS):
            return {...state, ready};
        case actionTypeBuilder.changed(LOAD_PARTNERS):
            return {...state, partners: data};
        case actionTypeBuilder.error(LOAD_PARTNERS):
            return {...state, error};
        case actionTypeBuilder.ready(FETCH_PARTNER):
            return {...state, ready};
        case actionTypeBuilder.changed(FETCH_PARTNER):
            return {...state, partner: data};
        case actionTypeBuilder.error(FETCH_PARTNER):
            return {...state, error};
        default:
            return initialState;
    }
}
