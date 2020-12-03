import React from 'react'
import Container from 'react-bootstrap/Container'
import '../App.css'

export default class PatientEntry extends React.Component {

    render() {
        return (
            <Container className="chart" style={{height: '150px'}}>           
            	<b>Patient</b>
            	<br />
            	{this.props.patient}
            </Container>
        )
    }
}