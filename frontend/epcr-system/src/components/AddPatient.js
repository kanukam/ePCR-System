import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class AddPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            // only variables for current section of form!
            patient: "",
            birth: "", // datetime, age is calculated based on this
            gender: "Male",
            weight: "", // in kg
            address: "",
            city: "",
            country: "",
            zip: "",
            phone: "",
            history: "", // subject to change
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
        const { values } = this.props;
        return (
            <div>
                <form>
                    <h2>Patient Information</h2>
                    <h3>Demographics</h3>
                    <Row>
                        <Col>
                            <label>
                                <span>Full Name</span>
                                <input type="text" name="patient" value={values.patient} onChange={this.props.handleChange('patient')} />
                            </label>
                            <label>
                                <span>Date of Birth</span>
                                <input type="date" name="birth" value={values.birth} onChange={this.props.handleChange('birth')} />
                            </label>
                        </Col>
                        <Col>
                            <label>
                                <span>Gender</span>
                                <input type="radio" name="gender" value="Male" checked={values.gender === "Male"} onChange={this.props.handleGender('gender')} defaultChecked /> Male
                            <input type="radio" name="gender" value="Female" checked={values.gender === "Female"} /> Female
                        </label>
                            <label>
                                <span>Weight</span>
                                <input style={{width:'80px'}} type="number" name="weight" value={values.weight} onChange={this.props.handleChange('weight')} /> kg
                        </label>
                            <small>Note: Gender is not yet handled.</small>
                        </Col>
                    </Row>
                    <h3>Address</h3>
                    <Row>
                        <Col>
                            <label>
                                <input className="block" type="text" name="address" value={values.address} onChange={this.props.handleChange('address')} />
                                <span className="block">Address</span>
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>
                                <input className="block" type="text" name="city" value={values.city} onChange={this.props.handleChange('city')} />
                                <span className="block">City</span>
                            </label>
                        </Col>
                        <Col>
                            <label>
                                <input className="block" type="text" name="country" value={values.country} onChange={this.props.handleChange('country')} />
                                <span className="block">Country</span>
                            </label>
                        </Col>
                        <Col>
                            <label>
                                <input className="block" type="number" name="zip" value={values.zip} onChange={this.props.handleChange('zip')} />
                                <span className="block">Zip</span>
                            </label>
                        </Col>
                    </Row>
                    <Button className="left" onClick={this.back}>Previous</Button>
                    <Button className="right" onClick={this.saveAndContinue}>Next</Button>
                </form>
            </div>
        )
    }
}