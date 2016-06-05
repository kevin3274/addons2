/**
 * Created by kevin on 16/5/25.
 */

import actionTypeBuilder from '../utils/actionTypeBuilder'
import {browserHistory} from 'react-router'

export default store => next => action => {
    if (!action.rpc){
        return next(action)
    }
    let options = {
        jsonrpc: "2.0",
        method: "call",
        params: action.rpc,
        id: Math.floor(Math.random() * 1000 * 1000 * 1000)
    };
    fetch('/web/dataset/call_kw',{
        method: "POST",
        body: JSON.stringify(options),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Openerp-Session-Id": store.getState().auth.session_id
        }
    })
        .then(res=>res.json())
        .then(data=>{
            if (data && data.error){
                if (data.error.data.name == "werkzeug.exceptions.NotFound"){
                   browserHistory.push('/react/login')
                }
                throw data.error;
            }else{
                next({
                    type: actionTypeBuilder.changed(action.type),
                    data: data.result
                })
                if (action.onChanged){
                    action.onChanged(data.result);
                }
            }
        })
        .catch(err=>{
            next({
                type: actionTypeBuilder.error(action.type),
                error: err
            })
        })
}