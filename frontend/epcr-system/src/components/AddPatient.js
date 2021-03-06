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
                <form id="patient">
                    <h2>{this.context.translate('patient-info')}</h2>
                    <Button onClick={this.toggleAdd}>Previous Patient Search</Button>
                    {this.state.showPop ? <Popup text="Search Patient" closePopup={this.togglePop} /> : null}
                    <h3>Demographics &amp; Personal</h3>
                    <table className="cform">
                        <tr>
                            <th width="25%">Full Name</th>
                            <td width="75%">
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="fname" value={values.fname} onChange={this.props.handleChange('fname')} />
                                    <strong>First</strong>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="lname" value={values.lname} onChange={this.props.handleChange('lname')} />
                                    <strong>Last</strong>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Date of Birth</th>
                            <td>
                                <DatePicker
                                    selected={values.birth ? values.birthDisplay : false}
                                    placeholderText="dd/mm/yyyy"
                                    onChange={this.props.handleDateNoTime('birth')}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Classification</th>
                            <td>
                                <select name="classify" value={values.classify} onChange={this.props.handleChange('classify')}>
                                    <option disabled selected value="">{this.context.translate('select')}</option>
                                    <option value="Adult">Adult (15yr - 65yr)</option>
                                    <option value="Senior Adult">Senior Adult (&lt;65yr)</option>
                                    <option value="Pediatric">Pediatric (28 days - 15yr)</option>
                                    <option value="Neonatal">Neonatal (0 - 28 days)</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>
                                <div style={{ margin: '5px' }} onChange={this.props.handleChange('gender')}>
                                    <label className="v2"><input type="radio" name="gender" value="Male" defaultChecked checked={values.gender.includes("Male")} /> Male</label>
                                    <label className="v2"><input type="radio" name="gender" value="Female" checked={values.gender.includes("Female")} /> Female</label>
                                    <label className="v2"><input type="radio" name="gender" value="Other" checked={values.gender.includes("Other")} /> Other</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td><input style={{ width: '80px', marginRight: '0px' }} type="number" name="weight" value={values.weight} min="0" onChange={this.props.handleChange('weight')} /> kg</td>
                        </tr>
                        <tr>
                            <th>Braslow Color</th>
                            <td>
                                <select name="braslow" value={values.braslow} onChange={this.props.handleChange('braslow')}>
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
                            </td>
                        </tr>
                    </table>
                    <h3>Address &amp; Contact</h3>
                    <table className="cform">
                        <tr>
                            <th width="25%" className="top">Address</th>
                            <td width="75%">
                                <div>
                                    <input className="block" type="text" name="address" value={values.address} onChange={this.props.handleChange('address')} />
                                    <strong>Street Address</strong>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="city" value={values.city} onChange={this.props.handleChange('city')} />
                                    <strong>City</strong>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="state" value={values.state} onChange={this.props.handleChange('state')} />
                                    <strong>State</strong>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="country" value={values.country} onChange={this.props.handleChange('country')} />
                                    <strong>Country</strong>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <input style={{ marginRight: '0px' }} type="number" name="zip" value={values.zip} onChange={this.props.handleChange('zip')} />
                                    <strong>Zip</strong>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td><input type="number" name="phone" value={values.phone} onChange={this.props.handleChange('phone')} /></td>
                        </tr>
                    </table>
                    <h3>Medical History</h3>
                    <table className="cform">
                        <tr>
                            <th width="25%" className="top">HPI (History of present illness)</th>
                            <td width="75%"><textarea className="block" name="hpi" value={values.hpi} onChange={this.props.handleChange('hpi')} /></td>
                        </tr>
                        <tr>
                            <th>Given by</th>
                            <td>
                                <div style={{ margin: '5px' }}>
                                    <label className="v2" style={{ display: 'inline-block' }}><input type="checkbox" name="historyGiven" value="Patient" checked={values.assessmentCheckBoxes[271]} onChange={this.props.handleAssessmentCheckboxes(271)} /> Patient</label>
                                    <label className="v2" style={{ display: 'inline-block' }}><input type="checkbox" name="historyGiven" value="Family" checked={values.assessmentCheckBoxes[272]} onChange={this.props.handleAssessmentCheckboxes(272)} /> Family</label>
                                    <label className="v2" style={{ display: 'inline-block' }}><input type="checkbox" name="historyGiven" value="Other" checked={values.assessmentCheckBoxes[273]} onChange={this.props.handleAssessmentCheckboxes(273)} /> Other</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Medication allergies</th>
                            <td><input className="block" type="text" name="medAllergy" value={values.medAllergy} onChange={this.props.handleChange('medAllergy')} /></td>
                        </tr>
                        <tr>
                            <th>Environmental allergies</th>
                            <td><input className="block" type="text" name="envAllergy" value={values.envAllergy} onChange={this.props.handleChange('envAllergy')} /></td>
                        </tr>
                        <tr>
                            <th className="top">Past medical history</th>
                            <td>                                
                                <select style={{ height: '240px' }} name="pastHistory" onChange={this.props.handleChange('pastHistory')} multiple>
                                    <option value="R - Asthma">R - Asthma</option>
                                    <option value="R - COPD">R - COPD</option>
                                    <option value="R - Emphysema">R - Emphysema</option>
                                    <option value="R - Chronic Bronchitis">R - Chronic Bronchitis</option>
                                    <option value="R - COVID-19">R - COVID-19</option>
                                    <option value="R - Tuberculosis">R - Tuberculosis</option>
                                    <option value="CV - Hypertension">CV - Hypertension</option>
                                    <option value="CV - Abnormal heart rhythm">CV - Abnormal heart rhythm</option>
                                    <option value="CV - Heart attack">CV - Heart attack</option>
                                    <option value="CV - Angina">CV - Angina</option>
                                    <option value="CV - Cardiact stent/bypass">CV - Cardiact stent/bypass</option>
                                    <option value="CV - Heart failure">CV - Heart failure</option>
                                    <option value="CV - Stroke">CV - Stroke</option>
                                    <option value="CV - Aneurysm">CV - Aneurysm</option>
                                    <option value="CV - Cardiac arrythmias">CV - Cardiac arrythmias</option>
                                    <option value="CV - Pacemaker/Defib">CV - Pacemaker/Defib</option>
                                    <option value="CV - Blood clotting defect">CV - Blood clotting defect</option>
                                    <option value="E - Diabetes">E - Diabetes</option>
                                    <option value="E - Cancer">E - Cancer</option>
                                    <option value="E - Thyroid">E - Thyroid</option>
                                    <option value="E - Liver disease">E - Liver disease</option>
                                    <option value="GI - GERD/Reflux/Ulcer">GI - GERD/Reflux/Ulcer</option>
                                    <option value="GI - Gallstone">GI - Gallstone</option>
                                    <option value="GI - Diverticulitis">GI - Diverticulitis</option>
                                    <option value="GI - Pancreatitis">GI - Pancreatitis</option>
                                    <option value="GI - Kidney disease">GI - Kidney disease</option>
                                    <option value="I - COVID/COVID exposure">I - COVID/COVID exposure</option>
                                    <option value="I - Influenza">I - Influenza</option>
                                    <option value="I - Hepatitis">I - Hepatitis</option>
                                    <option value="I - HIV">I - HIV</option>
                                    <option value="M - Anxiety">M - Anxiety</option>
                                    <option value="M - Depression">M - Depression</option>
                                    <option value="M - Substance abuse">M - Substance abuse</option>
                                    <option value="M - Psychiatric">M - Psychiatric</option>
                                    <option value="M - Migraines">M - Migraines</option>
                                    <option value="M - Seizure">M - Seizure</option>
                                    <option value="M - Parkinsons/Dementia">M - Parkinsons/Dementia</option>
                                    <option value="OB - Pregnancy complications">OB - Pregnancy complications</option>
                                    <option value="O - Other">O - Other</option>
                                </select>
                                {values.pastHistory.includes("Other") ?
                                    <div style={{ display: 'inline-block', verticalAlign: 'bottom' }}>
                                        <input type="text" name="pastHistoryOther" value={values.pastHistoryOther} onChange={this.props.handleChange('pastHistoryOther')} />
                                        <div><small><em>Separate multiple items with a comma.</em></small></div>
                                    </div>
                                    : null}
                                <div><small><em>Hold down CTRL key to select multiple items from different areas.</em></small></div>
                            </td>
                        </tr>
                    </table>
                    <Button className="left" onClick={this.back}>Previous</Button>
                    <Button className="right" onClick={this.saveAndContinue}>Next</Button>
                </form>
                {/* Bottom chart navigation */}
                <div className="chartnav">
                    <div className="tab" onClick={this.navigate(1)}>
                        <img src="/profile.png" />
                        <b>Call</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(2)}>
                        <img src="/profile.png" />
                        <b>Patient</b>
                    </div>
                    <div className="tab" onClick={this.navigate(3)}>
                        <img src="/profile.png" />
                        <b>Physical Assessment</b>
                    </div>
                    <div className="tab" onClick={this.navigate(4)}>
                        <img src="/profile.png" />
                        <b>Interventions</b>
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