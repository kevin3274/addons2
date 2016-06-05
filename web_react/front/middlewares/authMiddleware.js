/**
 * Created by kevin on 16/5/28.
 */

import actionTypeBuilder from '../utils/actionTypeBuilder'
import {AUTHENTICATE} from '../app/authActions'
import {browserHistory} from 'react-router'

export default store => next => action =>{
    if (action.type != AUTHENTICATE){
        return next(action);
    }

    let options = {
        jsonrpc: "2.0",
        method: "call",
        params: {
            db: action.db,
            login: action.username,
            password: action.password
        },
        id: Math.floor(Math.random() * 1000 * 1000 * 1000)
    }

    fetch("/web/session/authenticate", {
        method: "POST",
        body: JSON.stringify(options),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res=>res.json())
        .then(data=>{
            if (data && data.error){
                throw data.error
            }
            if (data.result.uid){
                store.dispatch({
                    type: actionTypeBuilder.changed(action.type),
                    data: data.result
                })
                browserHistory.push('/react');
            }else{
                throw data;
            }
        }).catch(err=>{
        store.dispatch({
            type: actionTypeBuilder.error(action.type),
            error: err
        })
    })

}