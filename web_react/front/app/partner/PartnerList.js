/**
 * Created by kevin on 16/5/25.
 */

import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {CellsTitle, Cells, Cell, CellBody, ButtonArea, Button} from 'react-weui'
import {browserHistory} from 'react-router'
import {loadPartners} from './partnerActions'

export class PartnerList extends React.Component{
    static propTypes = {
        load: PropTypes.func.isRequired,
        partners: PropTypes.array.isRequired
    };
    componentDidMount(){
        this.props.load();
    }

    handleClick(p){
        browserHistory.push(`/react/partnerView/${p.id}`);
    }

    handleNew(){
        browserHistory.push('/react/partnerNew');
    }
    render(){
        return (
            <section>
                <CellsTitle>合作伙伴列表</CellsTitle>
                <ButtonArea>
                    <Button onClick={this.handleNew.bind(this)}>新增</Button>
                </ButtonArea>
                <Cells access={true}>
                    {
                        this.props.partners.map(p=>(
                            <Cell key={p.id} onClick={this.handleClick.bind(this, p)}>
                                <CellBody>{p.name}</CellBody>
                            </Cell>
                        ))
                    }
                </Cells>

            </section>
        )
    }
}


function mapStateToProps(state){
    return {
        partners: state.partner.partners
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        load: loadPartners()
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnerList);
