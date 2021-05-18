import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { MainContext } from '../Auth'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'

export class ChartPreview extends Component {
    static contextType = MainContext;
    year(date){
        let temp = date.split('T')[0]
        temp = temp.split('-');
        let year = temp[0];
        let month = temp[1];
        let day = temp[2];
        return day + '/' + month + '/' + year;
        
    }
    render() {
        return (
            <Container className='chart shadow'>
                <Row>
                    <Col>
                        <b>{this.context.translate('name')}: </b>
                        {this.props.fname} {this.props.lname}
                        <br />
                        <b>{this.context.translate('dob')}: </b>
                        {this.props.birth && this.year(this.props.birth)}
                        <br />
                        <b>{this.context.translate('address')}: </b>
                        {processAddress(this.props.address)}
                        <br />
                        { this.props.phone !== ''  &&
                            <div><b>{this.context.translate('phone')}: </b> {this.props.phone}</div>
                        }
                        <br />
                        {this.props.history}
                    </Col>
                    <Col>
                        <b>{this.context.translate('ilocation')}: </b>
                        {this.props.location}
                        <br />
                        <b>{this.context.translate('call-type')}: </b>
                        {this.props.call_type}
                        <br />
                        <b>{this.context.translate('idate')}: </b>
                        {this.props.incident_date && this.year(this.props.incident_date)}
                    </Col>
                    <div >
                        <br /><br /><br />
                        <ButtonGroup>
                            <Button variant="primary" as={Link} to={`/ViewChart/${this.props.id}`}>{this.context.translate('view')}</Button>
                            {//<Button variant="outline-primary" href={`http://localhost:3000/api/charts/${this.props.id}/pdf?locale=${this.context.language}`}>{this.context.translate('download')}</Button>
                        }</ButtonGroup>

                    </div>
                </Row>
            </Container>
        )
    }
}

function processAddress(address){
    let addressArray = address.split(',');
    let address_trimmed = '';
    for(let i =0; i < addressArray.length; i++){
        if(addressArray[i].trim() !== ''){
            address_trimmed += addressArray[i] + ', ';
        }
    }

    return address_trimmed.substring(0, address_trimmed.length - ', '.length);
}

export default ChartPreview
