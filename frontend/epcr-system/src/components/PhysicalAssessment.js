import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../styles/PhysicalAssessment.css'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class PhysicalAssessment extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    navigate = step => (e) => {
        e.preventDefault();
        this.props.navigate(step);
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
        const { values } = this.props;
        /*
            const left_upper_arm = this.state.left_upper_arm;
            const left_lower_arm = this.state.left_lower_arm;
            const left_hand_wrist = this.state.left_hand_wrist;
            const left_upper_leg = this.state.left_upper_leg;
            const left_lower_leg = this.state.left_lower_leg;
            const left_ankle_foot = this.state.left_ankle_foot;
            const right_upper_arm = this.state.right_upper_arm;
            const right_lower_arm = this.state.right_lower_arm;
            const right_hand_wrist = this.state.right_hand_wrist;
            const right_upper_leg = this.state.right_upper_leg;
            const right_lower_leg = this.state.right_lower_leg;
            const right_ankle_foot = this.state.right_ankle_foot;
            const extra_findings = this.state.extra_findings;
            const stroke_time = this.state.stroke_time;
            const stroke_facial_droop = this.state.stroke_facial_droop;
            const stroke_arm_drift = this.state.stroke_arm_drift;
            const stroke_abnormal_speech = this.state.stroke_abnormal_speech;
        */
        return (
            <div className="assessment">
                <div className="content">
                    <h2>Physical Exam</h2>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>Left Arm</Form.Label>
                            <Col sm={4}>
                                <Form.Control as="select" multiple>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Col>
                            <Form.Label column sm={2}>Left Arm</Form.Label>
                            <Col sm={4}>
                                <Form.Control as="select" multiple>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    <Button className="left" onClick={this.back}>Previous</Button>
                    <Button className="right" onClick={this.saveAndContinue}>Next</Button>
                </div>
                {/* Bottom chart navigation */}
                <div className="chartnav">
                    <div className="tab" onClick={this.navigate(1)}>
                        <img src="/profile.png" />
                        <b>Call</b>
                    </div>
                    <div className="tab" onClick={this.navigate(2)}>
                        <img src="/profile.png" />
                        <b>Patient</b>
                    </div>
                    <div className="tab" onClick={this.navigate(3)}>
                        <img src="/profile.png" />
                        <b>Interventions</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(4)}>
                        <img src="/profile.png" />
                        <b>Physical Assessment</b>
                    </div>
                    <div className="tab" onClick={this.navigate(5)}>
                        <img src="/profile.png" />
                        <b>Confirm</b>
                    </div>
                </div>
            </div>
        )
    }
}