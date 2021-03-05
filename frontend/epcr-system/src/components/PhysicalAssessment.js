import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../styles/PhysicalAssessment.css'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class PhysicalAssessment extends Component {

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

            o	Normal	o	Normal
o	Abrasion	o	Abrasión
o	Laceration	o	Laceración
o	Puncture wound	o	Herida punzante
o	Bleeding	o	Sangrado
o	Contusion	o	Contusión
o	Pain	o	Dolor
o	Swelling	o	Hinchazón
o	Deformity	o	Deformidad
o	Open fracture	o	Fractura abierta
o	Numbness	o	Entumecimiento
o	Burn	o	Quemar

        */

        return (
            <div className="assessment">
                <div className="content">
                    <h2 className="mb-2">Physical Exam</h2>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Skin</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="skin" value="Normal" checked={this.props.values.assessmentCheckBoxes[1]} onChange={this.props.handleAssessmentCheckboxes(1)} />
                            <Form.Check type="checkbox" label={`Pale`} name="skin" value="Pale" checked={this.props.values.assessmentCheckBoxes[2]} onChange={this.props.handleAssessmentCheckboxes(2)} />
                            <Form.Check type="checkbox" label={`Cyanotic`} name="skin" value="Cyanotic" checked={this.props.values.assessmentCheckBoxes[3]} onChange={this.props.handleAssessmentCheckboxes(3)} />
                            <Form.Check type="checkbox" label={`Mottled`} name="skin" value="Mottled" checked={this.props.values.assessmentCheckBoxes[4]} onChange={this.props.handleAssessmentCheckboxes(4)} />
                            <Form.Check type="checkbox" label={`Cap refill <2 sec`} name="skin" value="Cap refill <2 sec" checked={this.props.values.assessmentCheckBoxes[5]} onChange={this.props.handleAssessmentCheckboxes(5)} />
                            <Form.Check type="checkbox" label={`Cap refill >4 sec`} name="skin" value="Cap refill >4 sec" checked={this.props.values.assessmentCheckBoxes[6]} onChange={this.props.handleAssessmentCheckboxes(6)} />
                            <Form.Check type="checkbox" label={`Hot`} name="skin" value="Hot" checked={this.props.values.assessmentCheckBoxes[7]} onChange={this.props.handleAssessmentCheckboxes(7)} />
                            <Form.Check type="checkbox" label={`Cool/cold`} name="skin" value="Cool/cold" checked={this.props.values.assessmentCheckBoxes[8]} onChange={this.props.handleAssessmentCheckboxes(8)} />
                            <Form.Check type="checkbox" label={`Clammy`} name="skin" value="Clammy" checked={this.props.values.assessmentCheckBoxes[9]} onChange={this.props.handleAssessmentCheckboxes(9)} />
                            <Form.Check type="checkbox" label={`Diaphoretic`} name="skin" value="Diaphoretic" checked={this.props.values.assessmentCheckBoxes[10]} onChange={this.props.handleAssessmentCheckboxes(10)} />
                            <Form.Check type="checkbox" label={`Flushed`} name="skin" value="Flushed" checked={this.props.values.assessmentCheckBoxes[11]} onChange={this.props.handleAssessmentCheckboxes(11)} />
                            <Form.Check type="checkbox" label={`Rash`} name="skin" value="Rash" checked={this.props.values.assessmentCheckBoxes[12]} onChange={this.props.handleAssessmentCheckboxes(12)} />
                        </Col>

                        <Form.Label column sm={2}>Mental</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="right_upper_arm" value="Normal" checked={this.props.values.assessmentCheckBoxes[13]} onChange={this.props.handleAssessmentCheckboxes(13)} />
                            <Form.Check type="checkbox" label={`Oriented person`} name="right_upper_arm" value="Oriented person" checked={this.props.values.assessmentCheckBoxes[14]} onChange={this.props.handleAssessmentCheckboxes(14)} />
                            <Form.Check type="checkbox" label={`Oriented place`} name="right_upper_arm" value="Oriented place" checked={this.props.values.assessmentCheckBoxes[15]} onChange={this.props.handleAssessmentCheckboxes(15)} />
                            <Form.Check type="checkbox" label={`Oriented time`} name="right_upper_arm" value="Oriented time" checked={this.props.values.assessmentCheckBoxes[16]} onChange={this.props.handleAssessmentCheckboxes(16)} />
                            <Form.Check type="checkbox" label={`Oriented event`} name="right_upper_arm" value="Oriented event" checked={this.props.values.assessmentCheckBoxes[17]} onChange={this.props.handleAssessmentCheckboxes(17)} />
                            <Form.Check type="checkbox" label={`Confused`} name="right_upper_arm" value="Confused" checked={this.props.values.assessmentCheckBoxes[18]} onChange={this.props.handleAssessmentCheckboxes(18)} />
                            <Form.Check type="checkbox" label={`Lethargic`} name="right_upper_arm" value="Lethargic" checked={this.props.values.assessmentCheckBoxes[19]} onChange={this.props.handleAssessmentCheckboxes(19)} />
                            <Form.Check type="checkbox" label={`Unresponsive`} name="right_upper_arm" value="Unresponsive" checked={this.props.values.assessmentCheckBoxes[20]} onChange={this.props.handleAssessmentCheckboxes(20)} />
                            <Form.Check type="checkbox" label={`Combative`} name="right_upper_arm" value="Combative" checked={this.props.values.assessmentCheckBoxes[21]} onChange={this.props.handleAssessmentCheckboxes(21)} />
                            <Form.Check type="checkbox" label={`Combative`} name="right_upper_arm" value="Combative" checked={this.props.values.assessmentCheckBoxes[22]} onChange={this.props.handleAssessmentCheckboxes(22)} />
                            <Form.Check type="checkbox" label={`Suicidal thinking/action`} name="right_upper_arm" value="Suicidal thinking/action" checked={this.props.values.assessmentCheckBoxes[23]} onChange={this.props.handleAssessmentCheckboxes(23)} />
                            <Form.Check type="checkbox" label={`Hallucinations`} name="right_upper_arm" value="Hallucinations" checked={this.props.values.assessmentCheckBoxes[24]} onChange={this.props.handleAssessmentCheckboxes(24)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Left Upper Arm</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="left_upper_arm" value="Normal" checked={this.props.values.assessmentCheckBoxes[1]} onChange={this.props.handleAssessmentCheckboxes(1)}/>
                            <Form.Check type="checkbox" label={`Abrasion`} name="left_upper_arm" value="Abrasion" checked={this.props.values.assessmentCheckBoxes[2]} onChange={this.props.handleAssessmentCheckboxes(2)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="left_upper_arm" value="Laceration" checked={this.props.values.assessmentCheckBoxes[3]} onChange={this.props.handleAssessmentCheckboxes(3)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="left_upper_arm" value="Puncture wound" checked={this.props.values.assessmentCheckBoxes[4]} onChange={this.props.handleAssessmentCheckboxes(4)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="left_upper_arm" value="Bleeding" checked={this.props.values.assessmentCheckBoxes[5]} onChange={this.props.handleAssessmentCheckboxes(5)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="left_upper_arm" value="Contusion" checked={this.props.values.assessmentCheckBoxes[6]} onChange={this.props.handleAssessmentCheckboxes(6)} />
                            <Form.Check type="checkbox" label={`Pain`} name="left_upper_arm" value="Pain" checked={this.props.values.assessmentCheckBoxes[7]} onChange={this.props.handleAssessmentCheckboxes(7)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="left_upper_arm" value="Swelling" checked={this.props.values.assessmentCheckBoxes[8]} onChange={this.props.handleAssessmentCheckboxes(8)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="left_upper_arm" value="Deformity" checked={this.props.values.assessmentCheckBoxes[9]} onChange={this.props.handleAssessmentCheckboxes(9)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="left_upper_arm" value="Open Fracture" checked={this.props.values.assessmentCheckBoxes[10]} onChange={this.props.handleAssessmentCheckboxes(10)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="left_upper_arm" value="Numbness" checked={this.props.values.assessmentCheckBoxes[11]} onChange={this.props.handleAssessmentCheckboxes(11)} />
                            <Form.Check type="checkbox" label={`Burn`} name="left_upper_arm" value="Burn" checked={this.props.values.assessmentCheckBoxes[12]} onChange={this.props.handleAssessmentCheckboxes(12)} />
                        </Col>

                        <Form.Label column sm={2}>Right Upper Arm</Form.Label>
                        <Col sm={4} className="mt-2">
                            <Form.Check type="checkbox" label={`Normal`} name="right_upper_arm" value="Normal" checked={this.props.values.assessmentCheckBoxes[13]} onChange={this.props.handleAssessmentCheckboxes(13)} />
                            <Form.Check type="checkbox" label={`Abrasion`} name="right_upper_arm" value="Abrasion" checked={this.props.values.assessmentCheckBoxes[14]} onChange={this.props.handleAssessmentCheckboxes(14)} />
                            <Form.Check type="checkbox" label={`Laceration`} name="right_upper_arm" value="Laceration" checked={this.props.values.assessmentCheckBoxes[15]} onChange={this.props.handleAssessmentCheckboxes(15)} />
                            <Form.Check type="checkbox" label={`Puncture wound`} name="right_upper_arm" value="Puncture wound" checked={this.props.values.assessmentCheckBoxes[16]} onChange={this.props.handleAssessmentCheckboxes(16)} />
                            <Form.Check type="checkbox" label={`Bleeding`} name="right_upper_arm" value="Bleeding" checked={this.props.values.assessmentCheckBoxes[17]} onChange={this.props.handleAssessmentCheckboxes(17)} />
                            <Form.Check type="checkbox" label={`Contusion`} name="right_upper_arm" value="Contusion" checked={this.props.values.assessmentCheckBoxes[18]} onChange={this.props.handleAssessmentCheckboxes(18)} />
                            <Form.Check type="checkbox" label={`Pain`} name="right_upper_arm" value="Pain" checked={this.props.values.assessmentCheckBoxes[19]} onChange={this.props.handleAssessmentCheckboxes(19)} />
                            <Form.Check type="checkbox" label={`Swelling`} name="right_upper_arm" value="Swelling" checked={this.props.values.assessmentCheckBoxes[20]} onChange={this.props.handleAssessmentCheckboxes(20)} />
                            <Form.Check type="checkbox" label={`Deformity`} name="right_upper_arm" value="Deformity" checked={this.props.values.assessmentCheckBoxes[21]} onChange={this.props.handleAssessmentCheckboxes(21)} />
                            <Form.Check type="checkbox" label={`Open Fracture`} name="right_upper_arm" value="Open Fracture" checked={this.props.values.assessmentCheckBoxes[22]} onChange={this.props.handleAssessmentCheckboxes(22)} />
                            <Form.Check type="checkbox" label={`Numbness`} name="right_upper_arm" value="Numbness" checked={this.props.values.assessmentCheckBoxes[23]} onChange={this.props.handleAssessmentCheckboxes(23)} />
                            <Form.Check type="checkbox" label={`Burn`} name="right_upper_arm" value="Burn" checked={this.props.values.assessmentCheckBoxes[24]} onChange={this.props.handleAssessmentCheckboxes(24)} />
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