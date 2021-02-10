import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: ""
        };
    }

    handleType = input => event => {
        if (input.includes("Procedure")) {
            this.setState({ type: "procedure" });
        }
        else { alert(false); }
    }

    render() {
        return (
            <div className="popup shadow">
                <h2>{this.props.text}</h2>
                {this.props.text.includes("Patient") ?
                    <div>Search for patient and then use those values to populate to form fields.</div>
                : null}
                {this.props.text.includes("Procedure") ?
                    <form>
                        <Row>
                            <Col>
                                <div className="group">
                                    <span>Procedure</span>
                                    <select className="multiple" name="proc" style={{height:'150px'}} multiple>
                                        <option value="TBA">TBA</option>
                                        <option value="TBA">TBA</option>
                                        <option value="TBA">TBA</option>
                                        <option value="TBA">TBA</option>
                                        <option value="TBA">TBA</option>
                                        <option value="TBA">TBA</option>
                                    </select>
                                </div>
                                <div className="group">
                                    <span>Time</span>
                                    <input type="datetime-local" />
                                </div>
                                <div className="group">
                                    <span>Crew</span>
                                    <input type="text" value="John Doe" disabled />
                                </div>
                                <small>Note: Crew member name should be selected from current user's information. Currently, the below buttons do nothing yet.</small>
                                <div className="bottom">
                                    <Button className="left" onClick={this.props.closePopup}>Add</Button>
                                    <Button className="right" onClick={this.props.closePopup}>Cancel</Button>
                                </div>
                            </Col>
                        </Row>
                    </form>
                : null}
                {this.props.text.includes("Medication") ?
                    <form>
                        <Row>
                            <Col>
                                <div className="group">
                                    <span>Medication</span>
                                    <select className="multiple" name="med" style={{height:'150px'}} multiple>
                                        <option value="Nitroglycerine">Nitroglycerine</option>
                                        <option value="Ondansetron">Ondansetron</option>
                                        <option value="Oxygen">Oxygen</option>
                                        <option value="Phenylephrine">Phenylephrine</option>
                                        <option value="Procardia">Procardia</option>
                                        <option value="Propanalol">Propanalol</option>
                                    </select>
                                </div>
                                <div className="group">
                                    <span>Time</span>
                                    <input type="datetime-local" />
                                </div>
                                <div className="group">
                                    <span>Dosage</span>
                                    <input type="number" style={{ width:'27%', marginRight:'10px' }} min="0" />
                                    <select name="unit" style={{ width:'32%' }}>
                                        <option value="GMS">GMS</option>
                                        <option value="in.">Inches (in.)</option>
                                        <option value="L">Liters (L)</option>
                                        <option value="kg">Kilograms (kg)</option>
                                        <option value="tablet">Tablets</option>
                                    </select>
                                </div>
                                <div className="group">
                                    <span>Route</span>
                                    <select name="route">
                                        <option value="Oral">Oral</option>
                                        <option value="IM">IM</option>
                                        <option value="IV">IV</option>
                                        <option value="Nasal">Nasal</option>
                                        <option value="Inhaled">Inhaled</option>
                                        <option value="Topical">Topical</option>
                                        <option value="Sublingual">Sublingual</option>
                                        <option value="Ophthalmic">Ophthalmic</option>
                                        <option value="Otic">Otic</option>
                                        <option value="Rectal">Rectal</option>
                                    </select>
                                </div>
                                <div className="group">
                                    <span>Crew</span>
                                    <input type="text" value="John Doe" disabled />
                                </div>
                                <small>Note: Crew member name should be selected from current user's information. Currently, the below buttons do nothing yet.</small>
                                <div className="bottom">
                                    <Button className="left" onClick={this.props.closePopup}>Add</Button>
                                    <Button className="right" onClick={this.props.closePopup}>Cancel</Button>
                                </div>
                            </Col>
                        </Row>
                    </form>
                : null}
            </div>
        )
    }
}