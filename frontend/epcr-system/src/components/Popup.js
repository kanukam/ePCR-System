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
                {this.props.text.includes("Procedure") ?
                    <form>
                        <Row>
                            <Col>
                                <label>
                                    <span>Procedure</span>
                                    <select className="multiple" name="proc" style={{height:'150px'}} multiple>
                                        <option value="TBA">TBA</option>
                                        <option value="TBA">TBA</option>
                                        <option value="TBA">TBA</option>
                                        <option value="TBA">TBA</option>
                                        <option value="TBA">TBA</option>
                                        <option value="TBA">TBA</option>
                                    </select>
                                </label>
                                <label>
                                    <span>Time</span>
                                    <input type="datetime-local" />
                                </label>
                                <label>
                                    <span>Crew</span>
                                    <input type="text" value="John Doe" disabled />
                                </label>
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
                                <label>
                                    <span>Medication</span>
                                    <select className="multiple" name="med" style={{height:'150px'}} multiple>
                                        <option value="Nitroglycerine">Nitroglycerine</option>
                                        <option value="Ondansetron">Ondansetron</option>
                                        <option value="Oxygen">Oxygen</option>
                                        <option value="Phenylephrine">Phenylephrine</option>
                                        <option value="Procardia">Procardia</option>
                                        <option value="Propanalol">Propanalol</option>
                                    </select>
                                </label>
                                <label>
                                    <span>Time</span>
                                    <input type="datetime-local" />
                                </label>
                                <label>
                                    <span>Dosage</span>
                                    <input type="number" style={{ width: '28%', marginRight: '9px' }} />
                                    <select name="unit" style={{ width: '40%' }}>
                                        <option value="GMS">GMS</option>
                                        <option value="in.">Inches (in.)</option>
                                        <option value="L">Liters (L)</option>
                                        <option value="kg">Kilograms (kg)</option>
                                        <option value="tablet">Tablets</option>
                                    </select>
                                </label>
                                <label>
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
                                </label>
                                <label>
                                    <span>Crew</span>
                                    <input type="text" value="John Doe" disabled />
                                </label>
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