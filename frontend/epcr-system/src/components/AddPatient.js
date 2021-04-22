import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { FaSearch } from 'react-icons/fa'
import PatientRow from './PatientRow'
import DatePicker from "react-datepicker";
import '../App.css';
import { MainContext } from '../Auth';

export default class AddPatient extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            search: "",
            showPop: false,
            patient: "",
            patients: [],
            patientList: []
        };
    }

    componentDidMount() {
        const url = 'http://localhost:3000/patients/';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(url, options)
            .then((response) => {
                if (response.ok)
                    return response.json();
                else
                    throw Error("Failed");
            })
            .then((data) => {
                this.setState({ patients: data['patients'] });
            })
            .catch((error) => {
                console.log(error);
            });
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
        this.setState({ showPop: !this.state.showPop });
    }

    hideSearch = () => {
        this.setState({ showPop: false });
    }

    displayTime(time) {
        var index = time.indexOf("-");
        var lastIndex = time.lastIndexOf("-");
        var year = time.substring(0, index);
        var month = time.substring(index + 1, index + 3);
        var day = time.substring(lastIndex + 1);
        return day + "/" + month + "/" + year;
    }

    selectPatient = index => (event) => {
        var patient = this.state.patientList[index];
        //this.props.selectPatient(patient);
        this.props.setPatient(patient);
        this.hideSearch();
    }

    search(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }

    render() {
        const { values } = this.props;
        for (var i = 0; i < this.state.patients.length; i++) {
            var pat = this.state.patients[i].id + "," + this.state.patients[i]["fname"] + "," + this.state.patients[i]["lname"] + "," + this.state.patients[i]["birth"] + "," + this.state.patients[i]["gender"] + ",;";
            this.state.patientList.push(pat);
        }
        let filteredPatients = this.state.patients.filter(
            (patient) => {
                var fullname = patient["fname"] + " " + patient["lname"];
                var fullnameR = patient["lname"] + " " + patient["fname"];
                var full = fullname.toLowerCase().indexOf(this.state.search.toLowerCase());
                var fullR = fullnameR.toLowerCase().indexOf(this.state.search.toLowerCase());
                if (full !== -1) { return full !== -1; }
                else if (fullR !== -1) { return fullR !== -1; }
            }
        );
        return (
            <div className="chart">
                <form id="patient">
                    <h2>{this.context.translate('patient-info')}</h2>
                    <div style={{ textAlign: 'center' }}><input type="button" value={this.context.translate('prev-patient-search')} onClick={this.toggleSearch} /></div>
                    <Modal
                        show={this.state.showPop}
                        onHide={this.hideSearch}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{this.context.translate('prev-patient-search')}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="filterfield">
                                <span><FaSearch /></span><input type="search" placeholder={this.context.translate('full-name')} value={this.state.search} onChange={this.search.bind(this)} />
                            </div>
                            <div style={{ height: '525px', overflow: 'auto' }}>
                                <table className="psearch">
                                    <thead>
                                        <tr>
                                            <th>{this.context.translate('fname')}</th>
                                            <th>{this.context.translate('lname')}</th>
                                            <th>{this.context.translate('pbirth')}</th>
                                            <th width="100px">{this.context.translate('action')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPatients.map((patient, index) => {
                                            return <PatientRow
                                                fname={patient["fname"]}
                                                lname={patient["lname"]}
                                                dob={patient["birth"] ? this.displayTime(patient["birth"]) : null}
                                                id={patient.id}
                                                index={index}
                                                select={this.selectPatient}
                                                selectText={this.context.translate('select1')}
                                            />
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Modal.Body>
                    </Modal>
                    <h3>{this.context.translate('patient-info')}</h3>
                    <table className="cform">
                        <tbody>
                            <tr>
                                <th width="25%">{this.context.translate('full-name')}<em>*</em></th>
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
                                <th>{this.context.translate('pbirth')}<em>*</em></th>
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
                                <th>{this.context.translate('classify')}<em>*</em></th>
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
                                <th>{this.context.translate('psex')}<em>*</em></th>
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
                        </tbody>
                    </table>
                    <h3>{this.context.translate('address-contact')}</h3>
                    <table className="cform">
                        <tbody>
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
                        </tbody>
                    </table>
                    <h3>{this.context.translate('med-history')}</h3>
                    <table className="cform">
                        <tbody>
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
                        </tbody>
                    </table>
                    <table className="cform history">
                        <tbody>
                            <tr>
                                <th colSpan="3" className="top">{this.context.translate('past-history')}</th>
                            </tr>
                            <tr>
                                <td valign="top" width="33%">
                                    <label><input type="checkbox" name="pastHistory" value="R - Asma" checked={values.assessmentCheckBoxes[277]} onChange={this.props.handleAssessmentCheckboxes(277)} /> {this.context.translate('asthma')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="R - Epoc" checked={values.assessmentCheckBoxes[278]} onChange={this.props.handleAssessmentCheckboxes(278)} /> {this.context.translate('copd')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="R - Enfisema" checked={values.assessmentCheckBoxes[279]} onChange={this.props.handleAssessmentCheckboxes(279)} /> {this.context.translate('emphysema')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="R - Bronquitis crónica" checked={values.assessmentCheckBoxes[280]} onChange={this.props.handleAssessmentCheckboxes(280)} /> {this.context.translate('chronicbron')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="R - Tuberculosis" checked={values.assessmentCheckBoxes[281]} onChange={this.props.handleAssessmentCheckboxes(281)} /> R - Tuberculosis</label>
                                </td>
                                <td valign="top" width="33%">
                                    <label><input type="checkbox" name="pastHistory" value="CV - Hipertensión" checked={values.assessmentCheckBoxes[282]} onChange={this.props.handleAssessmentCheckboxes(282)} /> {this.context.translate('hypertension')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="CV - Ritmo cardíaco anormal" checked={values.assessmentCheckBoxes[283]} onChange={this.props.handleAssessmentCheckboxes(283)} /> {this.context.translate('abheartrhy')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="CV - Ataque cardíaco" checked={values.assessmentCheckBoxes[284]} onChange={this.props.handleAssessmentCheckboxes(284)} /> {this.context.translate('heartatk')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="CV - Angina" checked={values.assessmentCheckBoxes[285]} onChange={this.props.handleAssessmentCheckboxes(285)} /> CV - Angina</label>
                                    <label><input type="checkbox" name="pastHistory" value="CV - Stent cardíaco / Bypass" checked={values.assessmentCheckBoxes[286]} onChange={this.props.handleAssessmentCheckboxes(286)} /> {this.context.translate('cardiacstent')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="CV - Insuficiencia cardíaca" checked={values.assessmentCheckBoxes[287]} onChange={this.props.handleAssessmentCheckboxes(287)} /> {this.context.translate('heartfail')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="CV - Golpe" checked={values.assessmentCheckBoxes[288]} onChange={this.props.handleAssessmentCheckboxes(288)} /> {this.context.translate('stroke')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="CV - Aneurismo" checked={values.assessmentCheckBoxes[289]} onChange={this.props.handleAssessmentCheckboxes(289)} /> {this.context.translate('aneurysm')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="CV - Arritmia cardíaca" checked={values.assessmentCheckBoxes[290]} onChange={this.props.handleAssessmentCheckboxes(290)} /> {this.context.translate('cardiacarryth')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="CV – Marcapasos / Defib" checked={values.assessmentCheckBoxes[291]} onChange={this.props.handleAssessmentCheckboxes(291)} /> {this.context.translate('pacemaker')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="CV - Defecto de coagulación de la sangre" checked={values.assessmentCheckBoxes[292]} onChange={this.props.handleAssessmentCheckboxes(292)} /> {this.context.translate('bloodclot')}</label>
                                    <div style={{ height: '10px' }}></div>
                                </td>
                                <td valign="top" width="33%">
                                    <label><input type="checkbox" name="pastHistory" value="E - Diabetes" checked={values.assessmentCheckBoxes[293]} onChange={this.props.handleAssessmentCheckboxes(293)} /> E - Diabetes</label>
                                    <label><input type="checkbox" name="pastHistory" value="E - Cáncer" checked={values.assessmentCheckBoxes[294]} onChange={this.props.handleAssessmentCheckboxes(294)} /> {this.context.translate('cancer')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="E - Tiroides" checked={values.assessmentCheckBoxes[295]} onChange={this.props.handleAssessmentCheckboxes(295)} /> {this.context.translate('thyroid')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="E - Enfermedad hepática" checked={values.assessmentCheckBoxes[296]} onChange={this.props.handleAssessmentCheckboxes(296)} /> E - {this.context.translate('liverdisease')}</label>
                                </td>
                            </tr>
                            <tr>
                                <td valign="top">
                                    <label><input type="checkbox" name="pastHistory" value="GI – Reflujo / Úlcera" checked={values.assessmentCheckBoxes[297]} onChange={this.props.handleAssessmentCheckboxes(297)} /> GI - {this.context.translate('gerd')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="GI - Cálculo biliar" checked={values.assessmentCheckBoxes[298]} onChange={this.props.handleAssessmentCheckboxes(298)} /> GI - {this.context.translate('gallstone')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="GI - Diverticulitis" checked={values.assessmentCheckBoxes[299]} onChange={this.props.handleAssessmentCheckboxes(299)} /> GI - Diverticulitis</label>
                                    <label><input type="checkbox" name="pastHistory" value="GI - Pancreatitis" checked={values.assessmentCheckBoxes[300]} onChange={this.props.handleAssessmentCheckboxes(300)} /> GI - Pancreatitis</label>
                                    <label><input type="checkbox" name="pastHistory" value="GI - Enfermedad renal" checked={values.assessmentCheckBoxes[301]} onChange={this.props.handleAssessmentCheckboxes(301)} /> GI - {this.context.translate('kidneydisease')}</label>
                                </td>
                                <td valign="top">
                                    <label><input type="checkbox" name="pastHistory" value="I – Covid / Exposición de Covid" checked={values.assessmentCheckBoxes[302]} onChange={this.props.handleAssessmentCheckboxes(302)} /> I - {this.context.translate('covid')}</label>
                                    <label><input type="checkbox" name="pastHistory" value="I - Influenza" checked={values.assessmentCheckBoxes[303]} onChange={this.props.handleAssessmentCheckboxes(303)} /> I - Influenza</label>
                                    <label><input type="checkbox" name="pastHistory" value="I - Hepatitis" checked={values.assessmentCheckBoxes[304]} onChange={this.props.handleAssessmentCheckboxes(304)} /> I - Hepatitis</label>
                                    <label><input type="checkbox" name="pastHistory" value="I - Sida" checked={values.assessmentCheckBoxes[305]} onChange={this.props.handleAssessmentCheckboxes(305)} /> I - {this.context.translate('hiv')}</label>
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
                                <td colSpan="2" valign="top">
                                    <label><input type="checkbox" name="none" value="O - Otro" checked={values.assessmentCheckBoxes[315]} onChange={this.props.handleAssessmentCheckboxes(315)} /> O - {this.context.translate('other')}</label>
                                    {values.assessmentCheckBoxes[315] ? <input type="text" className="block" name="pastHistoryOther" placeholder={this.context.translate('seperate-comma')} value={values.pastHistoryOther} onChange={this.props.handleChange('pastHistoryOther')} /> : null}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="button" className="left" onClick={this.back} value={this.context.translate('previous')} />
                    <input type="button" className="right" onClick={this.saveAndContinue} value={this.context.translate('next')} />
                </form>
                {/* Bottom chart navigation */}
                <div className="chartnav">
                    <div className="tab" onClick={this.navigate(1)}>
                        <img src="/callIcon.png" alt="Call" />
                        <b>{this.context.translate('call')}</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(2)}>
                        <img src="/patientIcon.png" alt="Patient" />
                        <b>{this.context.translate('patient')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(3)}>
                        <img src="/assessmentIcon.png" alt="Physical Exam" />
                        <b>{this.context.translate('physical-exam')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(4)}>
                        <img src="/interventionsIcon.png" alt="Interventions" />
                        <b>{this.context.translate('interventions')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(5)}>
                        <img src="/confirmIcon.png" alt="Confirm" />
                        <b>{this.context.translate('confirm')}</b>
                    </div>
                </div>
            </div>
        )
    }
}