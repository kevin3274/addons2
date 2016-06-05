/**
 * Created by kevin on 16/6/5.
 */

import React, {PropTypes} from 'react'
import {fetchPartner, savePartner} from './partnerActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Cells, Cell, CellHeader, CellBody, ButtonArea, Button, Form, FormCell, Label, Input} from 'react-weui'


export class PartnerEdit extends React.Component{
    static propTypes = {
        params: PropTypes.object,
        save: PropTypes.func.isRequired,
        fetch: PropTypes.func.isRequired,
        partner: PropTypes.object
    };

    constructor(props: any){
        super(props);
        this.state = {
            vals: {}
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        if (this.props.params.partnerId){
            this.props.fetch(this.props.params.partnerId * 1);
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.partner){
            this.setState({...this.state, vals: {name: nextProps.partner.name, contact_address: nextProps.partner.contact_address}});
        }
    }

    handleChange(keyPair){
        let vals = this.state.vals;
        vals = {...vals, ...keyPair }
        this.setState({...this.state, vals});
    }

    handleSave(){
        this.props.save(this.props.params.partnerId && this.props.params.partnerId * 1, this.state.vals);
    }

    render(){
        const {partner} = this.props;
        const {vals} = this.state;
        return (
            <section>
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>名称</Label>
                        </CellHeader>
                        <CellBody>
                            <Input value={vals.name} onChange={e=>this.handleChange({name: e.target.value})}></Input>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>地址</Label>
                        </CellHeader>
                        <CellBody>
                            <Input value={vals.contact_address} onChange={e=>this.handleChange({contact_address: e.target.value})}></Input>
                        </CellBody>
                    </FormCell>
                </Form>
                <ButtonArea>
                    <Button onClick={this.handleSave.bind(this)}>保存</Button>
                </ButtonArea>
            </section>
        )
    }
}

function mapStateToProps(state){
    return {
        partner: state.partner.partner
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetch: fetchPartner(),
        save: savePartner()
    }, dispatch)
}

function mergeProps(stateProps, dispatchProps, ownProps){
    return {...stateProps, ...dispatchProps, ...ownProps};
}


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PartnerEdit);
