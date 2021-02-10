import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {Link} from 'react-router-dom'
import '../App.css'

export default class PatientEntry extends Component {

    render() {
        return (
            <Container className="chart shadow">  
            	<Row>
            		<Col>         
		            	<b>Patient Name: </b>
		            	{this.props.fname} {this.props.lname}
		            	<br />
		            	<b>D.O.B.: </b>
		            	{this.props.dob}
		            	<br /><br />
		            	<b>Patient Address: </b>
						{this.props.address}
						<br />
						<b>Patient Phone: </b>
						{this.props.phone}
		            	<br />
		            	{this.props.notes}
		            </Col>
		            <div >
		            	<br/><br/><br/>
		        		<Button as={Link} to={`/Patient/${ this.props.id }`}>View</Button>
		        	</div>
		        </Row>
            </Container>
        )
    }
}