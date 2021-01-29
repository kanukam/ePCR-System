import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import '../App.css'

export default class PatientEntry extends Component {

    render() {
        return (
            <Container className="chart shadow" style={{height: '150px'}}>  
            	<Row>
            		<Col>         
		            	<b>Patient Name: </b>
		            	{this.props.patient}
		            	<br />
		            	<b>D.O.B.:</b>
		            	<br />
		            	{this.props.dob}
		            	<br />
		            	<b>Patient Address:</b>
		            	<br />
		            	{this.props.notes}
		            </Col>
		            <div >
		            	<br/><br/><br/>
		        		<Button>View</Button>
		        	</div>
		        </Row>
            </Container>
        )
    }
}