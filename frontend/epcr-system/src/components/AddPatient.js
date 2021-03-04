import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Popup from './Popup'
import DatePicker from "react-datepicker";
import '../App.css';
import { MainContext } from '../Auth';

export default class AddPatient extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            message: "",
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

    render() {
        const { values } = this.props;
        return (
            <div className="chart">
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
                            <div>
                                <span>Date of Birth</span>
                                <DatePicker
                                    selected={values.birth ? values.birthDisplay : false}
                                    placeholderText="dd/mm/yyyy"
                                    onChange={this.props.handleDateNoTime('birth')}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <div className="group">
                                <span>Classification</span>
                                <div>
                                    <select name="classify" value={values.class} onChange={this.props.handleChange('classify')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
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
                                <span>Braslow Color</span>
                                <div>
                                    <select name="classify" value={values.class} onChange={this.props.handleChange('braslow')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        <option value="Gray">Gray</option>
                                        <option value="Pink">Pink</option>
                                        <option value="Red">Red</option>
                                        <option value="Purple">Purple</option>
                                        <option value="Yellow">Yellow</option>
                                        <option value="White">White</option>
                                        <option value="Blue">Blue</option>
                                        <option value="Orange">Orange</option>
                                        <option value="Green">Green</option>
                                    </select>
                                </div>
                            </div>
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
                        </Col>
                    </Row>
                    <div>
                        <span>Phone</span>
                        <input type="number" name="phone" value={values.phone} onChange={this.props.handleChange('phone')} />
                    </div>
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