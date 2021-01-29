import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }
    
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const {values: {
            no,
            date,
            type,
            mci,
            pt,
            care,
            triage,
            loc,
            loctype,
            dispatch,
            enroute,
            scene,
            contact,
            enroute2,
            arrive,
            patient,
            birth,
            weight,
            address,
            city,
            country,
            zip,
            procedure
        }} = this.props;
        return (
            <div style={{lineHeight:'40px'}}>
                <h2>Call Information</h2>
                <Row>
                    <Col>
                        <span>Call #</span> {no}<br/>
                        <span>Date</span> {date}<br/>
                        <span>MCI</span> {mci}<br/>
                        <span>Pt Count</span> {pt}
                    </Col>
                    <Col>
                        <span>Call Type</span> {type}<br/>
                        <span>Care Level</span> {care}<br/>
                        <span>Triage Color</span> {triage}
                    </Col>
                </Row>
                <Row>
                    <Col><span>Location</span> {loc}</Col>
                    <Col><span>Location Type</span> {loctype}</Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        <span>Dispatch</span> {dispatch}<br/>
                        <span>Enroute</span> {enroute}<br/>
                        <span>Scene</span> {scene}
                    </Col>
                    <Col>
                        <span>Contact</span> {contact}<br/>
                        <span>Enroute</span> {enroute2}<br/>
                        <span>Arrive</span> {arrive}
                    </Col>
                </Row>
                <h2>Patient Information</h2>
                <Row>
                    <Col>
                        <span>Patient</span> {patient}<br/>
                        <span>Date of Birth</span> {birth}<br/>
                        <span>Weight</span> {weight} kg<br/>
                        <span>Address</span> {address}, {city}, {country} {zip}<br/>
                        <h2>Interventions</h2>
                        <span>Procedure</span> {procedure}
                    </Col>
                </Row>
                <Button className="left" onClick={this.back}>Previous</Button>
                <Button className="right" onClick={this.props.handleSubmit}>Submit</Button>
            {/* Message displayed telling results of registration */}
            {this.state.message && <p className="text-dark mt-1"> { this.state.message } </p>}
            </div>
        )
    }
}