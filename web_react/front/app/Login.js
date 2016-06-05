/**
 * Created by kevin on 16/5/28.
 */

import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {authenticateFactory} from './authActions'
import {Button, ButtonArea, Form, FormCell, CellHeader, CellBody, Label, Input, Select} from 'react-weui';
import 'weui';


export class Login extends React.Component{
    constructor(props: any){
        super(props);
        this.state = {
            db: '',
            username: '',
            password: ''
        }
    }

    render(){
        let {loginWithPassword} = this.props;
        let {db, username, password} = this.state;
        return (
            <div>
                <div style={{textAlign: "center"}}>
                    <h2>用户登录</h2>
                </div>
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>数据库</Label>
                        </CellHeader>
                        <CellBody>
                            <Select value={db} onChange={e=>this.setState({db: e.target.value})}>
                                <option value="">&lt;请选择数据库&gt;</option>
                                <option value="atc01">正式库</option>
                                <option value="atc01">测试库</option>
                            </Select>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>帐号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="text" value={username} placeholder="请输入Odoo登录帐号" onChange={e=>this.setState({username: e.target.value})}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>密码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="password" value={password} onChange={e=>this.setState({password: e.target.value})}/>
                        </CellBody>
                    </FormCell>
                </Form>
                <ButtonArea>
                    <Button onClick={()=>loginWithPassword(db, username, password)}>登录</Button>
                </ButtonArea>

            </div>
        )

    }
}

export default connect(state=>{
    return {


    }
}, dispatch=>{
    return bindActionCreators({
        loginWithPassword: authenticateFactory()
    }, dispatch)
})(Login);
