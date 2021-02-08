import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class AddCall extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
            currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            message: "",
            // only variables for current section of form!
            no: 0,
            type: "Clinic",
            date: currentDate,
            mci: "",
            pt: "",
            care: "BLS",
            triage: "Green",
            loc: "",
            loctype: "Clinic",
            dispatch: "",
            enroute: "",
            scene: "",
            contact: "",
            enroute2: "",
            arrive: ""
        };
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { values } = this.props;
        return (
            <div>
                <form>
                    <h2>Call Information</h2>
                    <h3>Incident</h3>
                    <Row>
                        <Col>
                            <div className="group">
                                <span>Call #</span>
                                <input type="text" name="no" value={values.no} onChange={this.props.handleChange('no')} />
                            </div>
                            <div className="group">
                                <span>Date</span>
                                <input type="date" name="date" value={values.date} onChange={this.props.handleChange('date')} />
                            </div>
                            <div className="group">
                                <span>MCI</span>
                                <input type="text" name="mci" value={values.mci} onChange={this.props.handleChange('mci')} />
                            </div>
                            <div className="group">
                                <span>Pt Count</span>
                                <input type="text" name="pt" value={values.pt} onChange={this.props.handleChange('pt')} />
                            </div>
                            <small>Note: Patient count should determine the number of forms for each patient  to be added in the next form.</small>
                        </Col>
                        <Col>
                            <div className="group">
                                <span>Call Type</span>
                                <select name="type" value={values.type} onChange={this.props.handleChange('type')}>
                                    <option value="Clinic">Clinic</option>
                                    <option value="Ambulance">Ambulance</option>
                                </select>
                            </div>
                            <div className="group">
                                <span>Care Level</span>
                                <select name="care" value={values.care} onChange={this.props.handleChange('care')}>
                                    <option value="BLS">BLS</option>
                                    <option value="ALS">ALS</option>
                                    <option value="Nursing">Nursing</option>
                                </select>
                            </div>
                            <div className="group">
                                <span>Triage Color</span>
                                <select name="triage" value={values.triage} onChange={this.props.handleChange('triage')}>
                                    <option value="Green">Green</option>
                                    <option value="Yellow">Yellow</option>
                                    <option value="Red">Red</option>
                                    <option value="Black">Black</option>
                                </select>
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <div className="group">
                                <span className="block">Location</span>
                                <input className="block" type="text" name="loc" value={values.loc} onChange={this.props.handleChange('loc')} />
                            </div>
                        </Col>
                        <Col>
                            <div className="group">
                                <span>Location Type</span>
                                <select name="loctype" value={values.loctype} onChange={this.props.handleChange('loctype')}>
                                    <option value="Clinic">Clinic</option>
                                    <option value="Home">Home</option>
                                    <option value="Work">Work</option>
                                    <option value="School">School</option>
                                    <option value="Public">Public</option>
                                    <option value="Road">Road</option>
                                    <option value="Marina">Marina</option>
                                    <option value="Beach">Beach</option>
                                </select>
                            </div>
                        </Col>
                    </Row>
                    <h3>Times</h3>
                    <Row>
                        <Col>
                            <div className="group">
                                <span>Dispatch</span>
                                <input type="datetime-local" name="dispatch" value={values.dispatch} onChange={this.props.handleChange('dispatch')} />
                            </div>
                            <div className="group">
                                <span>Enroute</span>
                                <input type="datetime-local" name="enroute" value={values.enroute} onChange={this.props.handleChange('enroute')} />
                            </div>
                            <div className="group">
                                <span>Scene</span>
                                <input type="datetime-local" name="scene" value={values.scene} onChange={this.props.handleChange('scene')} />
                            </div>
                        </Col>
                        <Col>
                            <div className="group">
                                <span>Contact</span>
                                <input type="datetime-local" name="contact" value={values.contact} onChange={this.props.handleChange('contact')} />
                            </div>
                            <div className="group">
                                <span>Enroute</span>
                                <input type="datetime-local" name="enroute2" value={values.enroute2} onChange={this.props.handleChange('enroute2')} />
                            </div>
                            <div className="group">
                                <span>Arrival</span>
                                <input type="datetime-local" name="arrive" value={values.arrive} onChange={this.props.handleChange('arrive')} />
                            </div>
                        </Col>
                    </Row>
                    <Button className="right" onClick={this.saveAndContinue}>Next</Button>
                </form>
                <div>Bottom navigation will be implemented soon.</div>
            </div>
        )
    }
}