import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import '../App.css'

export default class PatientEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        };
    }

    componentDidMount(){
    }

    render() {
        return (
            <Container className="chart" style={{height: '150px'}}>  
            	<Row>
            		<Col>         
		            	<b>Patient Name: </b>
		            	{this.props.patient}
		            	<br />
		            	<b>D.O.B.:</b>
		            	<br />
		            	{this.props.dob}
		            	<br />
		            	<b>Additional Info:</b>
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