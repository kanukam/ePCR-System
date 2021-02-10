import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Popup from './Popup'
import '../App.css'

export default class AddPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            // only variables for current section of form!
            fname: "",
            lname: "",
            birth: "", // datetime, age is calculated based on this
            classify: "Adult",
            gender: "Male",
            weight: "", // in kg
            address: "",
            city: "",
            country: "",
            zip: "",
            phone: "",
            history: "", // subject to change
            showPop: false
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

    toggleAdd = () => {
        this.setState({
            showPop: !this.state.showPop
        });
    }

    testing = (e) => {
        e.preventDefault();
        var text = document.getElementById("inputt").value;
        text = text + '5';
        document.getElementById("inputt").value = text;
    }

    render() {
        const { values } = this.props;
        return (
            <div className="chartp">
                <form>
                    <h2>Patient Information</h2>
                    <Button onClick={this.toggleAdd}>Previous Patient Search</Button>
                    {this.state.showPop ? <Popup text="Search Patient" closePopup={this.togglePop}/> : null}
                    <h3>Demographics &amp; Personal</h3>
                    <Row>
                        <Col>
                            <div className="group">
                                <span>Full Name</span>
                                <div>
                                    <input type="text" name="fname" value={values.fname} onChange={this.props.handleChange('fname')} />
                                    <strong>First</strong>
                                </div>
                                <div>
                                    <input type="text" name="lname" value={values.lname} onChange={this.props.handleChange('lname')} />
                                    <strong>Last</strong>
                                </div>
                            </div>
                            <div className="group">
                                <span>Date of Birth</span>
                                <input type="date" name="birth" placeholder="DD/MM/YYYY" value={values.birth} onChange={this.props.handleChange('birth')} />
                            </div>
                            <div className="group">
                                <span>Classification</span>
                                <div>
                                    <select name="classify" value={values.class} onChange={this.props.handleChange('classify')}>
                                        <option value="Adult">Adult</option>
                                        <option value="Senior Adult">Senior Adult</option>
                                        <option value="Pediatric">Pediatric</option>
                                        <option value="Neonatal">Neonatal</option>
                                    </select>
                                </div>
                            </div>
                            <div className="group" onChange={this.props.handleChange('gender')}>
                                <span>Gender</span>
                                <div>
                                    <label><input type="radio" name="gender" value="Male" defaultChecked /> Male</label>
                                    <label><input type="radio" name="gender" value="Female" /> Female</label>
                                    <label><input type="radio" name="gender" value="Other" /> Other</label>
                                </div>
                            </div>
                            <div className="group">
                                <span>Weight</span>
                                <input style={{width:'80px', marginRight:'0px'}} type="number" name="weight" value={values.weight} min="0" onChange={this.props.handleChange('weight')} /> kg
                            </div>
                            <div className="group">
                                <span style={{width:'15%'}}>Braslow Color</span>
                                <div>
                                    <label><input type="checkbox" name="bcolor" /> Gray</label>
                                    <label><input type="checkbox" name="bcolor" /> Pink</label>
                                    <label><input type="checkbox" name="bcolor" /> Red</label>
                                    <label><input type="checkbox" name="bcolor" /> Purple</label>
                                    <label><input type="checkbox" name="bcolor" /> Yellow</label>
                                    <label><input type="checkbox" name="bcolor" /> White</label>
                                    <label><input type="checkbox" name="bcolor" /> Blue</label>
                                    <label><input type="checkbox" name="bcolor" /> Orange</label>
                                    <label><input type="checkbox" name="bcolor" /> Green</label>
                                </div>
                            </div>
                            <small>Note: Name split into first and last for easy search results sorted either by first or last name &amp;&amp; Braslow color not yet handled.</small> 
                        </Col>
                    </Row>
                    <h3>Address &amp; Contact</h3>
                    <Row>
                        <Col>
                            <div className="group">
                                <span>Address</span>
                                <div style={{width:'80%'}}>
                                    <div style={{width:'100%'}}>
                                        <input className="block" type="text" name="address" value={values.address} onChange={this.props.handleChange('address')} />
                                        <strong>Street Address</strong>
                                    </div>
                                    <div>
                                        <input type="text" name="city" value={values.city} onChange={this.props.handleChange('city')} />
                                        <strong>City</strong>
                                    </div>
                                    <div>
                                        <input type="text" name="state" value={values.state} onChange={this.props.handleChange('state')} />
                                        <strong>State</strong>
                                    </div>
                                    <div>
                                        <input type="text" name="country" value={values.country} onChange={this.props.handleChange('country')} />
                                        <strong>Country</strong>
                                    </div>
                                    <div>
                                        <input style={{marginRight:'0px'}} type="number" name="zip" value={values.zip} onChange={this.props.handleChange('zip')} />
                                        <strong>Zip</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="group">
                                <span>Phone</span>
                                <input type="number" name="phone" value={values.phone} onChange={this.props.handleChange('phone')} />
                            </div>
                        </Col>
                    </Row>
                    <Button className="left" onClick={this.back}>Previous</Button>
                    <Button className="right" onClick={this.saveAndContinue}>Next</Button>
                </form>
                {/* Bottom chart navigation */}
                <div className="chartnav">
                    <div className="tab" onClick={this.navigate(1)}>
                        <img src="/profile.png"/>
                        <b>Call</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(2)}>
                        <img src="/profile.png"/>
                        <b>Patient</b>
                    </div>
                    <div className="tab" onClick={this.navigate(3)}>
                        <img src="/profile.png"/>
                        <b>Interventions</b>
                    </div>
                    <div className="tab" onClick={this.navigate(4)}>
                        <img src="/profile.png"/>
                        <b>Confirm</b>
                    </div>
                </div>
            </div>
        )
    }
}