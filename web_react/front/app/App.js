/**
 * Created by kevin on 16/5/28.
 */
import React from 'react'
import {connect} from 'react-redux'

export const App =  ({children, user})=>(
    <div>
        {
            user ?
                <p>Logged User: {user}</p>
                : null
        }
        {children}
    </div>
);


export default connect(state=>{
    return {
        user: state.user
    }
})(App)
