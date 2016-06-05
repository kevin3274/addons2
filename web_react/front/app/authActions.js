/**
 * Created by kevin on 16/5/28.
 */
import actionTypeBuilder from '../utils/actionTypeBuilder'
export const AUTHENTICATE = actionTypeBuilder.type("AUTHENTICATE");

export function authenticateFactory(){
    return (db, username, password)=>{
       return dispatch=>{
           dispatch({
               type: AUTHENTICATE,
               db,
               username,
               password
           })
       }
    }
}