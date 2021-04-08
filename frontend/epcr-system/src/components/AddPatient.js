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
                    <div style={{ textAlign: 'center' }}><input type="button" value={this.context.translate('prev-patient-search')} onClick={this.toggleSearch} /></div>
                    {this.state.showPop ? <Popup text="patient-search" closePopup={this.togglePop} selectPatient={this.selectPatient} /> : null}
                    <h3>{this.context.translate('patient-info')}</h3>
                    <table className="cform">
                        <tr>
                            <th width="25%">{this.context.translate('full-name')}</th>
                            <td width="75%">
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="fname" id="fname" value={values.fname} onChange={this.props.handleChange('fname')} />
                                    <strong>{this.context.translate('fname')}</strong>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="lname" id="lname" value={values.lname} onChange={this.props.handleChange('lname')} />
                                    <strong>{this.context.translate('lname')}</strong>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>{this.context.translate('pbirth')}</th>
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
                                    <option value="Adulto">{this.context.translate('adult')}</option>
                                    <option value="Adulto Senior">{this.context.translate('senior-adult')}</option>
                                    <option value="Pediatrica">{this.context.translate('pediatric')}</option>
                                    <option value="Neonatal">{this.context.translate('neonatal')}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>{this.context.translate('psex')}</th>
                            <td>
                                <select name="gender" value={values.gender} onChange={this.props.handleChange('gender')}>
                                    <option disabled selected value="">{this.context.translate('select')}</option>
                                    <option value="Hombre">{this.context.translate('male')}</option>
                                    <option value="Mujer">{this.context.translate('female')}</option>
                                    <option value="Otro">{this.context.translate('other')}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>{this.context.translate('pweight')}</th>
                            <td><input style={{ width: '80px', marginRight: '0px' }} type="number" name="weight" value={values.weight} min="0" onChange={this.props.handleChange('weight')} /> kg</td>
                        </tr>
                        <tr>
                            <th>{this.context.translate('braslow')}</th>
                            <td>
                                <select name="braslow" value={values.braslow} onChange={this.props.handleChange('braslow')}>
                                    <option disabled selected value="">{this.context.translate('select')}</option>
                                    <option value="Gris">{this.context.translate('gray')}</option>
                                    <option value="Rosa">{this.context.translate('pink')}</option>
                                    <option value="Rojo">{this.context.translate('red')}</option>
                                    <option value="Púrpura">{this.context.translate('purple')}</option>
                                    <option value="Amarillo">{this.context.translate('yellow')}</option>
                                    <option value="Blanco">{this.context.translate('white')}</option>
                                    <option value="Azul">{this.context.translate('blue')}</option>
                                    <option value="Naranja">{this.context.translate('orange')}</option>
                                    <option value="Verde">{this.context.translate('green')}</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <h3>{this.context.translate('address-contact')}</h3>
                    <table className="cform">
                        <tr>
                            <th width="25%" className="top">{this.context.translate('address')}</th>
                            <td width="75%">
                                <div>
                                    <input className="block" type="text" name="subdivision" value={values.subdivision} onChange={this.props.handleChange('subdivision')} />
                                    <strong>{this.context.translate('subdivision')}</strong>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="street" value={values.street} onChange={this.props.handleChange('street')} />
                                    <strong>{this.context.translate('street')}</strong>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="blvd" value={values.blvd} onChange={this.props.handleChange('blvd')} />
                                    <strong>Blvd</strong>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="km" value={values.km} onChange={this.props.handleChange('km')} />
                                    <strong>Km</strong>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="city" value={values.city} onChange={this.props.handleChange('city')} />
                                    <strong>{this.context.translate('city')}</strong>
                                </div>
                                <div style={{ display: 'inline-block' }}>
                                    <input type="text" name="state" value={values.state} onChange={this.props.handleChange('state')} />
                                    <strong>{this.context.translate('state')}</strong>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <th>{this.context.translate('phone-number')}</th>
                            <td><input type="number" name="phone" value={values.phone} onChange={this.props.handleChange('phone')} /></td>
                        </tr>
                    </table>
                    <h3>{this.context.translate('med-history')}</h3>
                    <table className="cform">
                        <tr>
                            <th width="25%" className="top">{this.context.translate('hpi')}</th>
                            <td width="75%"><textarea className="block" name="hpi" value={values.hpi} onChange={this.props.handleChange('hpi')} /></td>
                        </tr>
                        <tr>
                            <th>{this.context.translate('given-by')}</th>
                            <td>
                                <div style={{ margin: '5px' }}>
                                    <label className="v2"><input type="checkbox" name="historyGiven" value="Paciente" checked={values.assessmentCheckBoxes[274]} onChange={this.props.handleAssessmentCheckboxes(274)} /> {this.context.translate('patient')}</label>
                                    <label className="v2"><input type="checkbox" name="historyGiven" value="Familia" checked={values.assessmentCheckBoxes[275]} onChange={this.props.handleAssessmentCheckboxes(275)} /> {this.context.translate('family')}</label>
                                    <label className="v2"><input type="checkbox" name="historyGiven" value="Otro" checked={values.assessmentCheckBoxes[276]} onChange={this.props.handleAssessmentCheckboxes(276)} /> {this.context.translate('other')}</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>{this.context.translate('med-allergy')}</th>
                            <td><input className="block" type="text" name="medAllergy" placeholder={this.context.translate('seperate-comma')} value={values.medAllergy} onChange={this.props.handleChange('medAllergy')} /></td>
                        </tr>
                        <tr>
                            <th>{this.context.translate('env-allergy')}</th>
                            <td><input className="block" type="text" name="envAllergy" placeholder={this.context.translate('seperate-comma')} value={values.envAllergy} onChange={this.props.handleChange('envAllergy')} /></td>
                        </tr>
                    </table>
                    <table className="cform history">
                        <tr>
                            <th colspan="3" className="top">{this.context.translate('past-history')}</th>
                        </tr>
                        <tr>
                            <td valign="top" width="33%">
                                <label><input type="checkbox" name="pastHistory" value="R - Asma" checked={values.assessmentCheckBoxes[277]} onChange={this.props.handleAssessmentCheckboxes(277)} /> {this.context.translate('asthma')}</label>
                                <label><input type="checkbox" name="pastHistory" value="R - Epoc" checked={values.assessmentCheckBoxes[278]} onChange={this.props.handleAssessmentCheckboxes(278)} /> {this.context.translate('copd')}</label>
                                <label><input type="checkbox" name="pastHistory" value="R - Enfisema" checked={values.assessmentCheckBoxes[279]} onChange={this.props.handleAssessmentCheckboxes(279)} /> {this.context.translate('emphysema')}</label>
                                <label><input type="checkbox" name="pastHistory" value="R - Bronquitis crónica" checked={values.assessmentCheckBoxes[280]} onChange={this.props.handleAssessmentCheckboxes(280)} /> {this.context.translate('chronicbron')}</label>
                                <label><input type="checkbox" name="pastHistory" value="R - Tuberculosis" checked={values.assessmentCheckBoxes[282]} onChange={this.props.handleAssessmentCheckboxes(282)} /> R - Tuberculosis</label>
                            </td>
                            <td valign="top" width="33%">
                                <label><input type="checkbox" name="pastHistory" value="CV - Hipertensión" checked={values.assessmentCheckBoxes[283]} onChange={this.props.handleAssessmentCheckboxes(283)} /> {this.context.translate('hypertension')}</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Ritmo cardíaco anormal" checked={values.assessmentCheckBoxes[284]} onChange={this.props.handleAssessmentCheckboxes(284)} /> {this.context.translate('abheartrhy')}</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Ataque cardíaco" checked={values.assessmentCheckBoxes[285]} onChange={this.props.handleAssessmentCheckboxes(285)} /> {this.context.translate('heartatk')}</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Angina" checked={values.assessmentCheckBoxes[286]} onChange={this.props.handleAssessmentCheckboxes(286)} /> CV - Angina</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Stent cardíaco / Bypass" checked={values.assessmentCheckBoxes[287]} onChange={this.props.handleAssessmentCheckboxes(287)} /> {this.context.translate('cardiacstent')}</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Insuficiencia cardíaca" checked={values.assessmentCheckBoxes[288]} onChange={this.props.handleAssessmentCheckboxes(288)} /> {this.context.translate('heartfail')}</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Golpe" checked={values.assessmentCheckBoxes[289]} onChange={this.props.handleAssessmentCheckboxes(289)} /> {this.context.translate('stroke')}</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Aneurismo" checked={values.assessmentCheckBoxes[290]} onChange={this.props.handleAssessmentCheckboxes(290)} /> {this.context.translate('aneurysm')}</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Arritmia cardíaca" checked={values.assessmentCheckBoxes[291]} onChange={this.props.handleAssessmentCheckboxes(291)} /> {this.context.translate('cardiacarryth')}</label>
                                <label><input type="checkbox" name="pastHistory" value="CV – Marcapasos / Defib" checked={values.assessmentCheckBoxes[292]} onChange={this.props.handleAssessmentCheckboxes(292)} /> {this.context.translate('pacemaker')}</label>
                                <label><input type="checkbox" name="pastHistory" value="CV - Defecto de coagulación de la sangre" checked={values.assessmentCheckBoxes[293]} onChange={this.props.handleAssessmentCheckboxes(293)} /> {this.context.translate('bloodclot')}</label>
                                <div style={{height:'10px'}}></div>
                            </td>
                            <td valign="top" width="33%">
                                <label><input type="checkbox" name="pastHistory" value="E - Diabetes" checked={values.assessmentCheckBoxes[294]} onChange={this.props.handleAssessmentCheckboxes(294)} /> E - Diabetes</label>
                                <label><input type="checkbox" name="pastHistory" value="E - Cáncer" checked={values.assessmentCheckBoxes[295]} onChange={this.props.handleAssessmentCheckboxes(295)} /> {this.context.translate('cancer')}</label>
                                <label><input type="checkbox" name="pastHistory" value="E - Tiroides" checked={values.assessmentCheckBoxes[296]} onChange={this.props.handleAssessmentCheckboxes(296)} /> {this.context.translate('thyroid')}</label>
                                <label><input type="checkbox" name="pastHistory" value="Enfermedad hepática" checked={values.assessmentCheckBoxes[297]} onChange={this.props.handleAssessmentCheckboxes(297)} /> {this.context.translate('liverdisease')}</label>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top">
                                <label><input type="checkbox" name="pastHistory" value="GI – Reflujo / Úlcera" checked={values.assessmentCheckBoxes[298]} onChange={this.props.handleAssessmentCheckboxes(298)} /> GI - {this.context.translate('gerd')}</label>
                                <label><input type="checkbox" name="pastHistory" value="GI - Cálculo biliar" checked={values.assessmentCheckBoxes[299]} onChange={this.props.handleAssessmentCheckboxes(299)} /> GI - {this.context.translate('gallstone')}</label>
                                <label><input type="checkbox" name="pastHistory" value="GI - Diverticulitis" checked={values.assessmentCheckBoxes[300]} onChange={this.props.handleAssessmentCheckboxes(300)} /> GI - Diverticulitis</label>
                                <label><input type="checkbox" name="pastHistory" value="GI - Pancreatitis" checked={values.assessmentCheckBoxes[301]} onChange={this.props.handleAssessmentCheckboxes(301)} /> GI - Pancreatitis</label>
                                <label><input type="checkbox" name="pastHistory" value="GI - Enfermedad renal" checked={values.assessmentCheckBoxes[302]} onChange={this.props.handleAssessmentCheckboxes(302)} /> GI - {this.context.translate('kidneydisease')}</label>
                            </td>
                            <td valign="top">
                                <label><input type="checkbox" name="pastHistory" value="I – Covid / Exposición de Covid" checked={values.assessmentCheckBoxes[303]} onChange={this.props.handleAssessmentCheckboxes(303)} /> I - {this.context.translate('covid')}</label>
                                <label><input type="checkbox" name="pastHistory" value="I - Influenza" checked={values.assessmentCheckBoxes[304]} onChange={this.props.handleAssessmentCheckboxes(304)} /> I - Influenza</label>
                                <label><input type="checkbox" name="pastHistory" value="I - Hepatitis" checked={values.assessmentCheckBoxes[305]} onChange={this.props.handleAssessmentCheckboxes(305)} /> I - Hepatitis</label>
                                <label><input type="checkbox" name="pastHistory" value="I - Sida" checked={values.assessmentCheckBoxes[306]} onChange={this.props.handleAssessmentCheckboxes(306)} /> I - {this.context.translate('hiv')}</label>
                                <label><input type="checkbox" name="pastHistory" value="I - Tuberculosis" checked={values.assessmentCheckBoxes[306]} onChange={this.props.handleAssessmentCheckboxes(306)} /> I - Tuberculosis </label>
                            </td>
                            <td valign="top">
                                <label><input type="checkbox" name="pastHistory" value="M - Ansiedad" checked={values.assessmentCheckBoxes[307]} onChange={this.props.handleAssessmentCheckboxes(307)} /> M - {this.context.translate('anxiety')}</label>
                                <label><input type="checkbox" name="pastHistory" value="M - Depresión" checked={values.assessmentCheckBoxes[308]} onChange={this.props.handleAssessmentCheckboxes(308)} /> M - {this.context.translate('depression')}</label>
                                <label><input type="checkbox" name="pastHistory" value="M - Abuso" checked={values.assessmentCheckBoxes[309]} onChange={this.props.handleAssessmentCheckboxes(309)} /> M - {this.context.translate('substabuse')}</label>
                                <label><input type="checkbox" name="pastHistory" value="M - Psiquiátrico" checked={values.assessmentCheckBoxes[310]} onChange={this.props.handleAssessmentCheckboxes(310)} /> M - {this.context.translate('Psychiatric')}</label>
                                <label><input type="checkbox" name="pastHistory" value="N - Migrañas" checked={values.assessmentCheckBoxes[311]} onChange={this.props.handleAssessmentCheckboxes(311)} /> N - {this.context.translate('migraines')}</label>
                                <label><input type="checkbox" name="pastHistory" value="N - Convulsiones" checked={values.assessmentCheckBoxes[312]} onChange={this.props.handleAssessmentCheckboxes(312)} /> N - {this.context.translate('seizure')}</label>
                                <label><input type="checkbox" name="pastHistory" value="N – Parkinson / Demencia" checked={values.assessmentCheckBoxes[313]} onChange={this.props.handleAssessmentCheckboxes(313)} /> N - {this.context.translate('parkinsons')}</label>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top">
                                <label><input type="checkbox" name="pastHistory" value="OB - Complicaciones del embarazo" checked={values.assessmentCheckBoxes[314]} onChange={this.props.handleAssessmentCheckboxes(314)} /> OB - {this.context.translate('pregnancy')}</label>
                            </td>
                            <td colspan="2" valign="top">
                                <label><input type="checkbox" name="none" value="O - Otro" checked={values.assessmentCheckBoxes[315]} onChange={this.props.handleAssessmentCheckboxes(315)} /> O - {this.context.translate('other')}</label>
                                {values.assessmentCheckBoxes[315] ? <input type="text" className="block" name="pastHistoryOther" placeholder={this.context.translate('seperate-comma')} value={values.pastHistoryOther} onChange={this.props.handleChange('pastHistoryOther')} /> : null}
                            </td>
                        </tr>
                    </table>
                    <Button className="left" onClick={this.back}>{this.context.translate('previous')}</Button>
                    <Button className="right" onClick={this.saveAndContinue}>{this.context.translate('next')}</Button>
                </form>
                {/* Bottom chart navigation */}
                <div className="chartnav">
                <div className="tab" onClick={this.navigate(1)}>
                        <img src="/callIcon.png" />
                        <b>{this.context.translate('call')}</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(2)}>
                        <img src="/patientIcon.png" />
                        <b>{this.context.translate('patient')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(3)}>
                        <img src="/assessmentIcon.png" />
                        <b>{this.context.translate('physical-exam')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(4)}>
                        <img src="/interventionsIcon.png" />
                        <b>{this.context.translate('interventions')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(5)}>
                        <img src="/confirmIcon.png" />
                        <b>{this.context.translate('confirm')}</b>
                    </div>
                </div>
            </div>
        )
    }
}