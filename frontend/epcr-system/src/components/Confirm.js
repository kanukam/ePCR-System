import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class Confirm extends Component {
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
        return (
            <div>
                <form>
                    <h2>Confirm Chart Report</h2>
                    <b>Date:</b> {values.idate}
                    <table className="crew" border="1">
                        <tr>
                            <td>
                                <b>Incident #</b> {values.ino}<br/>
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
                                <b>MCI</b> {values.assessmentCheckBoxes[268] ? <text>Yes<br/><b>Patient count</b> {values.ptct}<br/><b>Triage color</b> {values.triage}</text> : "No"}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Vehicle accident</b> {values.assessmentCheckBoxes[269] ? <text>Yes<br/>
                                    <b>Type</b> {values.vatype}<br/>
                                    <b>Impact</b> {values.impact.join()}<br/>
                                    <b>Safety equipment</b> {values.vasafe}<br/>
                                    <b>Estimated speed</b> {values.vaspd}<br/>
                                    <b>Ejection from vehicle</b> {values.vaeject}
                                </text> : "No"}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Dispatch</b> {values.dispatch}<br/>
                                <b>Enroute</b> {values.enroute}<br/>
                                <b>Arrive scene</b> {values.arrscn}<br/>
                                <b>Patient contact</b> {values.contact}<br/>
                                <b>Depart scene</b> {values.dptscn}<br/>
                                <b>Arrive destination</b> {values.arrdes}<br/>
                                <b>Transfer of care</b> {values.trcare}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Patient name</b> {values.lname}, {values.fname}<br/>
                                <b>Date of birth</b> {values.birth}<br/>
                                <b>Classification</b> {values.classify}<br/>
                                <b>Gender</b> {values.gender}<br/>
                                <b>Weight</b> {values.weight} kg<br/>
                                <b>Braslow color</b> {values.bcolor}<br/>
                                <b>Address</b> {values.street}, {values.city}, {values.state}, {values.country} {values.zip}
                                <b>Phone</b> {values.phone}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>History of present illness</b> {values.hpi}<br/>
                                <b>Given by</b> {values.historyGiven.join()}<br/>
                                <b>Medical allergies</b> {values.medAllergy}<br/>
                                <b>Environmental allergies</b> {values.envAllergy}<br/>
                                <b>Past medical history</b> {values.pastHistory}{values.assessmentCheckBoxes[315] ? ",O - Other" + values.pastHistoryOther : null}
                            </td>
                        </tr>
                    </table>
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