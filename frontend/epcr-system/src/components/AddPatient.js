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
            showPop: false,
            patient: "",
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

    toggleSearch = () => {
        this.setState({
            showPop: !this.state.showPop
        });
    }

    selectPatient = existingPatient => {
        //alert(existingPatient);
        this.props.setPatient(existingPatient);
        this.toggleSearch();
    }

    render() {
        const { values } = this.props;
        return (
            <div className="chart">
                <form id="patient">
                    <h2>{this.context.translate('patient-info')}</h2>
                    <div style={{ textAlign: 'center' }}><input type="button" value="Previous Patient Search" onClick={this.toggleSearch} /></div>
                    {/*<Button onClick={this.toggleSearch}>Previous Patient Search</Button>*/}
                    {this.state.showPop ? <Popup text="Search Patient" closePopup={this.togglePop} selectPatient={this.selectPatient} /> : null}
                    <h3>Demographics &amp; Personal</h3>
                    <table className="cform">
                        <tr>
                            <th width="25%">Full name</th>
                            <td width="75%">
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="fname" id="fname" value={values.fname} onChange={this.props.handleChange('fname')} />
                                    <strong>First</strong>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="lname" id="lname" value={values.lname} onChange={this.props.handleChange('lname')} />
                                    <strong>Last</strong>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Date of birth</th>
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
                            <th>{this.context.translate('classify')}</th>
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
                            <th>Braslow color</th>
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
                                    <label className="v2"><input type="checkbox" name="historyGiven" value="Patient" checked={values.assessmentCheckBoxes[274]} onChange={this.props.handleAssessmentCheckboxes(274)} /> Patient</label>
                                    <label className="v2"><input type="checkbox" name="historyGiven" value="Family" checked={values.assessmentCheckBoxes[275]} onChange={this.props.handleAssessmentCheckboxes(275)} /> Family</label>
                                    <label className="v2"><input type="checkbox" name="historyGiven" value="Other" checked={values.assessmentCheckBoxes[276]} onChange={this.props.handleAssessmentCheckboxes(276)} /> Other</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Medication allergies</th>
                            <td><input className="block" type="text" name="medAllergy" placeholder="Separate multiple items with a comma" value={values.medAllergy} onChange={this.props.handleChange('medAllergy')} /></td>
                        </tr>
                        <tr>
                            <th>Environmental allergies</th>
                            <td><input className="block" type="text" name="envAllergy" placeholder="Separate multiple items with a comma" value={values.envAllergy} onChange={this.props.handleChange('envAllergy')} /></td>
                        </tr>
                    </table>
                    <table className="cform history">
                        <tr>
                            <th colspan="3" className="top">Past medical history</th>
                        </tr>
                        <tr>
                            <td valign="top" width="33%">
                                <label><input type="checkbox" name="pastHistory" value="R - Asthma" checked={values.assessmentCheckBoxes[277]} onChange={this.props.handleAssessmentCheckboxes(277)} /> R - Asthma</label>
                                <label><input type="checkbox" name="pastHistory" value="R - COPD" checked={values.assessmentCheckBoxes[278]} onChange={this.props.handleAssessmentCheckboxes(278)} /> R - COPD</label>
                                <label><input type="checkbox" name="pastHistory" value="R - Emphysema" checked={values.assessmentCheckBoxes[279]} onChange={this.props.handleAssessmentCheckboxes(279)} /> R - Emphysema</label>
                                <label><input type="checkbox" name="pastHistory" value="R - Chronic Bronchitis" checked={values.assessmentCheckBoxes[280]} onChange={this.props.handleAssessmentCheckboxes(280)} /> R - Chronic Bronchitis</label>
                                <label><input type="checkbox" name="pastHistory" value="R - COVID-19" checked={values.assessmentCheckBoxes[281]} onChange={this.props.handleAssessmentCheckboxes(281)} /> R - COVID-19</label>
                                <label><input type="checkbox" name="pastHistory" value="R - Tuberculosis" checked={values.assessmentCheckBoxes[282]} onChange={this.props.handleAssessmentCheckboxes(282)} /> R - Tuberculosis</label>
                            </td>
                            <td valign="top" width="33%">
                                <label><input type="checkbox" name="pastHistory" value="CV - Hypertension" checked={values.assessmentCheckBoxes[283]} onChange={this.props.handleAssessmentCheckboxes(283)} /> CV - Hypertension</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Abnormal heart rhythm" checked={values.assessmentCheckBoxes[284]} onChange={this.props.handleAssessmentCheckboxes(284)} /> CV - Abnormal heart rhythm</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Heart attack" checked={values.assessmentCheckBoxes[285]} onChange={this.props.handleAssessmentCheckboxes(285)} /> CV - Heart attack</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Angina" checked={values.assessmentCheckBoxes[286]} onChange={this.props.handleAssessmentCheckboxes(286)} /> CV - Angina</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Cardiact stent/bypass" checked={values.assessmentCheckBoxes[287]} onChange={this.props.handleAssessmentCheckboxes(287)} /> CV - Cardiact stent/bypass</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Heart failure" checked={values.assessmentCheckBoxes[288]} onChange={this.props.handleAssessmentCheckboxes(288)} /> CV - Heart failure</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Stroke" checked={values.assessmentCheckBoxes[289]} onChange={this.props.handleAssessmentCheckboxes(289)} /> CV - Stroke</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Aneurysm" checked={values.assessmentCheckBoxes[290]} onChange={this.props.handleAssessmentCheckboxes(290)} /> CV - Aneurysm</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Cardiac arrythmias" checked={values.assessmentCheckBoxes[291]} onChange={this.props.handleAssessmentCheckboxes(291)} /> CV - Cardiac arrythmias</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Pacemaker/Defib" checked={values.assessmentCheckBoxes[292]} onChange={this.props.handleAssessmentCheckboxes(292)} /> CV - Pacemaker/Defib</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Blood clotting defect" checked={values.assessmentCheckBoxes[293]} onChange={this.props.handleAssessmentCheckboxes(293)} /> CV - Blood clotting defect</label>
                                <div style={{height:'10px'}}></div>
                            </td>
                            <td valign="top" width="33%">
                                <label><input type="checkbox" name="pastHistory" value="E - Diabetes" checked={values.assessmentCheckBoxes[294]} onChange={this.props.handleAssessmentCheckboxes(294)} /> E - Diabetes</label>
                                <label><input type="checkbox" name="pastHistory" value="E - Cancer" checked={values.assessmentCheckBoxes[295]} onChange={this.props.handleAssessmentCheckboxes(295)} /> E - Cancer</label>
                                <label><input type="checkbox" name="pastHistory" value="E - Thyroid" checked={values.assessmentCheckBoxes[296]} onChange={this.props.handleAssessmentCheckboxes(296)} /> E - Thyroid</label>
                                <label><input type="checkbox" name="pastHistory" value="E - Liver disease" checked={values.assessmentCheckBoxes[297]} onChange={this.props.handleAssessmentCheckboxes(297)} /> E - Liver disease</label>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top">
                                <label><input type="checkbox" name="pastHistory" value="GI - GERD/Reflux/Ulcer" checked={values.assessmentCheckBoxes[298]} onChange={this.props.handleAssessmentCheckboxes(298)} /> GI - GERD/Reflux/Ulcer</label>
                                <label><input type="checkbox" name="pastHistory" value="GI - Gallstone" checked={values.assessmentCheckBoxes[299]} onChange={this.props.handleAssessmentCheckboxes(299)} /> GI - Gallstone</label>
                                <label><input type="checkbox" name="pastHistory" value="GI - Diverticulitis" checked={values.assessmentCheckBoxes[300]} onChange={this.props.handleAssessmentCheckboxes(300)} /> GI - Diverticulitis</label>
                                <label><input type="checkbox" name="pastHistory" value="GI - Pancreatitis" checked={values.assessmentCheckBoxes[301]} onChange={this.props.handleAssessmentCheckboxes(301)} /> GI - Pancreatitis</label>
                                <label><input type="checkbox" name="pastHistory" value="GI - Kidney disease" checked={values.assessmentCheckBoxes[302]} onChange={this.props.handleAssessmentCheckboxes(302)} /> GI - Kidney disease</label>
                            </td>
                            <td valign="top">
                                <label><input type="checkbox" name="pastHistory" value="I - COVID/COVID exposure" checked={values.assessmentCheckBoxes[303]} onChange={this.props.handleAssessmentCheckboxes(303)} /> I - COVID/COVID exposure</label>
                                <label><input type="checkbox" name="pastHistory" value="I - Influenza" checked={values.assessmentCheckBoxes[304]} onChange={this.props.handleAssessmentCheckboxes(304)} /> I - Influenza</label>
                                <label><input type="checkbox" name="pastHistory" value="I - Hepatitis" checked={values.assessmentCheckBoxes[305]} onChange={this.props.handleAssessmentCheckboxes(305)} /> I - Hepatitis</label>
                                <label><input type="checkbox" name="pastHistory" value="I - HIV" checked={values.assessmentCheckBoxes[306]} onChange={this.props.handleAssessmentCheckboxes(306)} /> I - HIV</label>
                            </td>
                            <td valign="top">
                                <label><input type="checkbox" name="pastHistory" value="M - Anxiety" checked={values.assessmentCheckBoxes[307]} onChange={this.props.handleAssessmentCheckboxes(307)} /> M - Anxiety</label>
                                <label><input type="checkbox" name="pastHistory" value="M - Depression" checked={values.assessmentCheckBoxes[308]} onChange={this.props.handleAssessmentCheckboxes(308)} /> M - Depression</label>
                                <label><input type="checkbox" name="pastHistory" value="M - Substance abuse" checked={values.assessmentCheckBoxes[309]} onChange={this.props.handleAssessmentCheckboxes(309)} /> M - Substance abuse</label>
                                <label><input type="checkbox" name="pastHistory" value="M - Psychiatric" checked={values.assessmentCheckBoxes[310]} onChange={this.props.handleAssessmentCheckboxes(310)} /> M - Psychiatric</label>
                                <label><input type="checkbox" name="pastHistory" value="M - Migraines" checked={values.assessmentCheckBoxes[311]} onChange={this.props.handleAssessmentCheckboxes(311)} /> M - Migraines</label>
                                <label><input type="checkbox" name="pastHistory" value="M - Seizure" checked={values.assessmentCheckBoxes[312]} onChange={this.props.handleAssessmentCheckboxes(312)} /> M - Seizure</label>
                                <label><input type="checkbox" name="pastHistory" value="M - Parkinsons/Dementia" checked={values.assessmentCheckBoxes[313]} onChange={this.props.handleAssessmentCheckboxes(313)} /> M - Parkinsons/Dementia</label>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top">
                                <label><input type="checkbox" name="pastHistory" value="OB - Pregnancy complications" checked={values.assessmentCheckBoxes[314]} onChange={this.props.handleAssessmentCheckboxes(314)} /> OB - Pregnancy complications</label>
                            </td>
                            <td colspan="2" valign="top">
                                <label><input type="checkbox" name="none" value="O - Other" checked={values.assessmentCheckBoxes[315]} onChange={this.props.handleAssessmentCheckboxes(315)} /> O - Other</label>
                                {values.assessmentCheckBoxes[315] ? <input type="text" className="block" name="pastHistoryOther" placeholder="Separate multiple items with a comma" value={values.pastHistoryOther} onChange={this.props.handleChange('pastHistoryOther')} /> : null}
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
                        <b>Physical Exam</b>
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