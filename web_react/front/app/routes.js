/**
 * Created by kevin on 16/5/28.
 */
import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import App from './App'
import PartnerList from './partner/PartnerList'
import PartnerView from './partner/PartnerView'
import PartnerEdit from './partner/PartnerEdit'
import Login from './Login'
const routes = (
    <Route path="/react" component={App}>
        <IndexRoute component={PartnerList}/>
        <Route path="login" component={Login}/>
        <Route path="partnerView/:partnerId" component={PartnerView}/>
        <Route path="partnerEdit/:partnerId" component={PartnerEdit}/>
        <Route path="partnerNew" component={PartnerEdit}/>
    </Route>
)

export default routes;