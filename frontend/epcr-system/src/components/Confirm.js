import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Moment from 'react-moment';
import { MainContext } from '../Auth';
import '../App.css'

export default class Confirm extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            message: ""
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
        console.log(values.dispatch);
        return (
            <div className="form-confirm">
                <form>
                    <h2>Confirm Chart Report</h2>
                    <table className="crew" border="1">
                        <tr><th>Response</th></tr>
                        <tr>
                            <td>
                                <b>Incident date</b> {values.idate}<br/>
                                <b>Incident #</b> {values.ino}<br/>
                                <b>Unit #</b> {values.unit}<br/>
                                <b>Call type</b> {values.ctype}<br/>
                                <b>Call nature</b> {values.nature}<br/>
                                <b>Care level</b> {values.care}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Incident address</b> {values.loc}<br/>
                                <b>Incident location</b> {values.loctype}<br/>
                                <b>Disposition</b> {values.disp}<br/>
                                <b>Destination</b> {values.dest}<br/>
                                <b>Other agencies on scene</b> {values.agency.join()}<br/>
                                <b>Trauma cause</b> {values.trauma}{values.fallht !== "" ? ", height: " + values.fallht + " m" : null}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Mass casualty incident</b> {values.assessmentCheckBoxes[268] ? <text>Yes<br/><b>Patient count</b> {values.ptct}<br/><b>Triage color</b> {values.triage}</text> : "No"}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Vehicle accident</b> {values.assessmentCheckBoxes[269] ? <text>Yes<br/>
                                    <b>Type</b> {values.vatype}<br/>
                                    <b>Impact</b> {values.impact}<br/>
                                    <b>Safety equipment</b> {values.vasafe}<br/>
                                    <b>Estimated speed</b> {values.vaspd}<br/>
                                    <b>Ejection from vehicle</b> {values.vaeject}
                                </text> : "No"}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Dispatch</b> {values.dispatch ? <Moment date={values.dispatch} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                <b>Enroute</b> {values.enroute ? <Moment date={values.enroute} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                <b>Arrive scene</b> {values.arrscn ? <Moment date={values.arrscn} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                <b>Patient contact</b> {values.contact ? <Moment date={values.contact} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                <b>Depart scene</b> {values.dptscn ? <Moment date={values.dptscn} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                <b>Arrive destination</b> {values.arrdes ? <Moment date={values.arrdes} format="DD-MM-YY hh:mm:ss A" /> : null}<br/>
                                <b>Transfer of care</b> {values.trcare ? <Moment date={values.trcare} format="DD-MM-YY hh:mm:ss A" /> : null}
                            </td>
                        </tr>
                        <tr><th>Demographics</th></tr>
                        <tr>
                            <td>
                                <b>Patient name</b> {values.lname}, {values.fname}<br/>
                                <b>Date of birth</b> {values.birth ? <Moment date={values.birth} format="DD-MM-YY" /> : null}<br/>
                                <b>Classification</b> {values.classify}<br/>
                                <b>Gender</b> {values.gender}<br/>
                                <b>Weight</b> {values.weight} kg<br/>
                                <b>Braslow color</b> {values.bcolor}<br/>
                                <b>Address</b> {values.street}, {values.city}, {values.state}, {values.country} {values.zip}<br/>
                                <b>Phone</b> {values.phone}
                            </td>
                        </tr>
                        <tr><th>History</th></tr>
                        <tr>
                            <td>
                                <b>History of present illness</b> {values.hpi}<br/>
                                <b>Given by</b> {values.historyGiven.join()}<br/>
                                <b>Medical allergies</b> {values.medAllergy}<br/>
                                <b>Environmental allergies</b> {values.envAllergy}<br/>
                                <b>Past medical history</b> {values.pastHistory}{values.assessmentCheckBoxes[315] ? ",O - Other" + values.pastHistoryOther : null}
                            </td>
                        </tr>
                        <tr><th>Assessment</th></tr>
                        <tr>
                            <td>
                                <b>Skin</b> {values.skin.join()}<br/>
                                <b>Mental</b> {values.mental.join()}<br/>
                                <b>Neurological</b> {values.neurological.join()}<br/>
                                <b>Head</b> {values.head.join()}<br/>
                                <b>Neck</b> {values.neck.join()}<br/>
                                <b>Chest</b> {values.chest}<br/>
                                <b>Pulse</b> Strength: {values.pulse_strength} | Rate: {values.pulse_rate}<br/>
                                <b>Abdomen</b> {values.abdomen.join()}<br/>
                                <b>Pelvis</b> {values.pelvis.join()}<br/>
                                <b>Back</b> {values.back.join()}<br/>
                                <b>Left upper arm</b> {values.left_upper_arm.join()}<br/>
                                <b>Left lower arm</b> {values.left_lower_arm.join()}<br/>
                                <b>Left hand wrist</b> {values.left_hand_wrist.join()}<br/>
                                <b>Left upper leg</b> {values.left_upper_leg.join()}<br/>
                                <b>Left lower leg</b> {values.left_lower_leg.join()}<br/>
                                <b>Left ankle foot</b> {values.left_ankle_foot.join()}<br/>
                                <b>Right upper arm</b> {values.right_upper_arm.join()}<br/>
                                <b>Right lower arm</b> {values.right_lower_arm.join()}<br/>
                                <b>Right hand wrist</b> {values.right_hand_wrist.join()}<br/>
                                <b>Right upper leg</b> {values.right_upper_leg.join()}<br/>
                                <b>Right lower leg</b> {values.right_lower_leg.join()}<br/>
                                <b>Right ankle foot</b> {values.right_ankle_foot.join()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Vitals</b> {values.vital_signs.join()}
                            </td>
                        </tr>
                        <tr><th>Treatment</th></tr>
                        <tr>
                            <td>
                                <b>Procedures</b> {values.procedures.join()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Medications</b> {values.medications.join()}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Intake Output</b>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>obstetrics</b>
                            </td>
                        </tr>
                    </table>
                    <small style={{color:'red'}} className="ml-2">{this.context.translate(values.message)}</small>
                    <Button className="left" onClick={this.back}>Previous</Button>
                    <Button className="right" onClick={this.props.handleSubmit}>Submit</Button>
                </form>
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
                        <b>Physical Exam</b>
                    </div>
                    <div className="tab" onClick={this.navigate(4)}>
                        <img src="/profile.png" />
                        <b>Interventions</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(5)}>
                        <img src="/profile.png" />
                        <b>Confirm</b>
                    </div>
                </div>
            </div>
        )
    }
}