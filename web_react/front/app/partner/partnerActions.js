/**
 * Created by kevin on 16/5/25.
 */
import actionTypeBuilder from '../../utils/actionTypeBuilder';
import {browserHistory} from 'react-router'

export const LOAD_PARTNERS = actionTypeBuilder.type("LOAD_PARTNERS");
export const FETCH_PARTNER = actionTypeBuilder.type("FETCH_PARTNER");
export const SAVE_PARTNER = actionTypeBuilder.type("SAVE_PARTNER");
export const DELETE_PARTNER = actionTypeBuilder.type("DELETE_PARTNER");



export function loadPartners(){
    return ()=>{
        return dispatch=>{
            dispatch({
                type: LOAD_PARTNERS,
                rpc: {
                    model: 'res.partner',
                    method: 'search_read',
                    args: [[]],
                    kwargs: {}
                }
            })
        }
    }
};

export function fetchPartner(){
    return (partnerId)=>{
        return dispatch=>{
            dispatch({
                type: FETCH_PARTNER,
                rpc: {
                    model: "res.partner",
                    method: "read",
                    args: [partnerId],
                    kwargs: {}
                }
            })
        }
    }
};


export function savePartner(){
    return (partnerId, values)=>{
        if (partnerId){
            var rpc = {
                    model: 'res.partner',
                    method: 'write',
                    args: [partnerId, values],
                    kwargs: {}
                };
        }else{
            var rpc = {
                model: 'res.partner',
                method: 'create',
                args: [values],
                kwargs: {}
            }
        }
        return dispatch=>{
            dispatch({
                type: SAVE_PARTNER,
                rpc,
                onChanged: result=>{
                    browserHistory.replace('/react')
                }
            })
        }
    }
}

export function deletePartner(){
    return partnerId=>{
        return dispatch=>{
            dispatch({
                type: DELETE_PARTNER,
                rpc: {
                    model: 'res.partner',
                    method: 'unlink',
                    args: [partnerId],
                    kwargs: {}
                },
                onChanged: result=>{
                    browserHistory.replace('/react')
                }
            })
        }
    }
}