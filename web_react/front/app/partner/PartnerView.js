/**
 * Created by kevin on 16/5/30.
 */


import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Cells, Cell, CellHeader, CellBody, ButtonArea, Button} from 'react-weui'
import {fetchPartner, deletePartner} from './partnerActions'
import {browserHistory} from 'react-router'

export class PartnerView extends React.Component{
    static propTypes = {
        params: PropTypes.object,
        partner: PropTypes.object,
        fetch: PropTypes.func.isRequired,
        delete: PropTypes.func.isRequired
    };

    componentDidMount(){
        this.props.fetch(this.props.params.partnerId * 1);
    }

    goEdit(partnerId){
        browserHistory.push(`/react/partnerEdit/${partnerId}`)
    }

    handleDelete(partnerId){
        if (confirm('确认要删除当前伙伴吗?')){
            this.props.delete(partnerId)
        }
    }

    render(){
        const {partner} = this.props;
        return (
            <section>
                <Cells>
                    <Cell>
                        <CellBody>{partner.name}</CellBody>
                    </Cell>
                    <Cell>
                        <CellBody>{partner.city}</CellBody>
                    </Cell>
                    <Cell>
                        <CellBody>{partner.contract_address}</CellBody>
                    </Cell>
                    <Cell>
                        <CellBody>{partner.email}</CellBody>
                    </Cell>
                </Cells>
                <ButtonArea>
                    <Button onClick={this.goEdit.bind(this, partner.id)}>编辑</Button>
                    <Button onClick={this.handleDelete.bind(this, partner.id)}>删除</Button>
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
        delete: deletePartner()
    }, dispatch)
}

function mergeProps(stateProps, dispatchProps, ownProps){
    return {...stateProps, ...dispatchProps, ...ownProps};
}


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PartnerView);