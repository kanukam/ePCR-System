import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
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
        return day + '-' + month + '-' + year;
        
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
                        <br /><br />
                        <b>{this.context.translate('address')}: </b>
                        {this.props.address}
                        <br />
                        <b>{this.context.translate('phone')}: </b>
                        {this.props.phone}
                        <br />
                        {this.props.history}
                    </Col>
                    <div >
                        <br /><br /><br />
                        <Button variant="primary" as={Link} to={`/Patient/${this.props.id}`}>View</Button>
                    </div>
                </Row>
            </Container>
        )
    }
}

export default ChartPreview


