import React, { Component } from 'react';
import '../App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MainContext } from '../Auth';

export default class AddCall extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            charts: [],
            mci: "",
            va: "",
            jsonData: { "call": [] }
        };
    }

    componentDidMount() {
        this.props.getIno();
    }

    navigate = step => (e) => {
        e.preventDefault();
        this.props.navigate(step);
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        // this.fetchInput();
        this.props.nextStep();
    }

    render() {
        const { values } = this.props;
        return (
            <div className="chart">
                <form id="call">
                    <h2>{this.context.translate('call-info')}</h2>
                    <h3>{this.context.translate('response-details')}</h3>
                    <table className="cform">
                        <tbody>
                            <tr>
                                <th width="20%">{this.context.translate('ino')}</th>
                                <td width="30%"><input type="text" name="ino" disabled value={values.ino} /></td>
                                <th width="20%">{this.context.translate('unit')}<em>*</em></th>
                                <td width="30%">
                                    <select name="unit" value={values.unit} onChange={this.props.handleChange('unit')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        <option value="M-01">M-01</option>
                                        <option value="M-02">M-02</option>
                                        <option value="M-03">M-03</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>{this.context.translate('idate')}<em>*</em></th>
                                <td>
                                    <DatePicker
                                        selected={values.idateDisplay ? values.idateDisplay : false}
                                        placeholderText="dd/mm/yyyy"
                                        onChange={this.props.handleDateNoTime('idate')}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </td>
                                <th width="20%">{this.context.translate('call-type')}<em>*</em></th>
                                <td width="30%">
                                    <select name="ctype" value={values.ctype} onChange={this.props.handleChange('ctype')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        <option value="Clínica">{this.context.translate('clinic')}</option>
                                        <option value="Escena">{this.context.translate('scene')}</option>
                                        <option value="Transferencia">{this.context.translate('transfer')}</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>{this.context.translate('ilocation')}<em>*</em></th>
                                <td>
                                    <select name="loctype" value={values.loctype} onChange={this.props.handleChange('loctype')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        <option value="Clínica Rescate">{this.context.translate('rescate-clinic')}</option>
                                        <option value="Casa">{this.context.translate('chome')}</option>
                                        <option value="Negocio">{this.context.translate('business')}</option>
                                        <option value="Escuela">{this.context.translate('school')}</option>
                                        <option value="Publico">{this.context.translate('public')}</option>
                                        <option value="Sitio de construcción">{this.context.translate('construction-site')}</option>
                                        <option value="Área de recreación">{this.context.translate('recreation')}</option>
                                        <option value="Camino/Carretera">{this.context.translate('road-hwy')}</option>
                                        <option value="Marina">Marina</option>
                                        <option value="Oficina médica">{this.context.translate('med-office')}</option>
                                        <option value="Playa">{this.context.translate('beach')}</option>
                                        <option value="Océano/Bahía">{this.context.translate('ocean-bay')}</option>
                                        <option value="Otro">{this.context.translate('other')}</option>
                                    </select>
                                </td>
                                <th>{this.context.translate('call-nature')}<em>*</em></th>
                                <td>
                                    <select name="nature" value={values.nature} onChange={this.props.handleChange('nature')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        <option value="Comprobación B/P">{this.context.translate('bp-check')}</option>
                                        <option value="Inyección">{this.context.translate('injection')}</option>
                                        <option value="Cardíaca">{this.context.translate('cardiac')}</option>
                                        <option value="OB">OB</option>
                                        <option value="Pulmonar">{this.context.translate('pulmonary')}</option>
                                        <option value="Trauma">Trauma</option>
                                        <option value="Otros médicos">{this.context.translate('med-other')}</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>{this.context.translate('iaddress')}<em>*</em></th>
                                <td><input type="text" name="loc" value={values.loc} onChange={this.props.handleChange('loc')} /></td>
                                <th>{this.context.translate('care-level')}</th>
                                <td>
                                    <select name="care" value={values.care} onChange={this.props.handleChange('care')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        <option value="BLS">BLS</option>
                                        <option value="ALS">ALS</option>
                                        <option value="Nursing">Nursing</option>
                                    </select>
                                </td>
                            </tr>
                            <tr style={{ borderTop: '1px solid #ddd' }}>
                                <th>{this.context.translate('disposition')}<em>*</em></th>
                                <td>
                                    <select name="disp" value={values.disp} onChange={this.props.handleChange('disp')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        <option value="Tratar y descargar">{this.context.translate('treat-release')}</option>
                                        <option value="Transportacion">{this.context.translate('transport')}</option>
                                        <option value="(dead) Muerto">{this.context.translate('doa')}</option>
                                        <option value="Rechazar el servicio médico">{this.context.translate('ama')}</option>
                                        <option value="No se puede localizar">{this.context.translate('na-locate')}</option>
                                    </select>
                                </td>
                                <th>{this.context.translate('destination')}<em>*</em></th>
                                <td>
                                    <select name="dest" value={values.dest} onChange={this.props.handleChange('dest')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        <option value="Clínica Rescate">{this.context.translate('rescate-clinic')}</option>
                                        <option value="IMSS">IMSS</option>
                                        <option value="ISTESON">ISTESON</option>
                                        <option value="SEMESON">SEMESON</option>
                                        <option value="ISSSTE">ISSSTE</option>
                                        <option value="Pabellon Guadalupe">Pabellon Guadalupe</option>
                                        <option value="Hospital Cima">Hospital Cima</option>
                                        <option value="Hospital Clinica Del Noroeste">Hospital Clinica Del Noroeste</option>
                                        <option value="Hospital San Benito">Hospital San Benito</option>
                                        <option value="Hospital San Jose Guaymas">Hospital San Jose Guaymas</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th className="top" rowSpan="2">{this.context.translate('other-agencies')}</th>
                                <td rowSpan="2">
                                    <div id="agency">
                                        <label><input type="checkbox" name="agency" value="Policía local" checked={values.assessmentCheckBoxes[262]} onChange={this.props.handleAssessmentCheckboxes(262)} /> {this.context.translate('local-police')}</label>
                                        <label><input type="checkbox" name="agency" value="Policía estatal" checked={values.assessmentCheckBoxes[263]} onChange={this.props.handleAssessmentCheckboxes(263)} /> {this.context.translate('state-police')}</label>
                                        <label><input type="checkbox" name="agency" value="Policía federal" checked={values.assessmentCheckBoxes[264]} onChange={this.props.handleAssessmentCheckboxes(264)} /> {this.context.translate('federal-police')}</label>
                                        <label><input type="checkbox" name="agency" value="Cruz Rojas" checked={values.assessmentCheckBoxes[265]} onChange={this.props.handleAssessmentCheckboxes(265)} /> Cruz Rojas</label>
                                        <label><input type="checkbox" name="agency" value="Bomberos" checked={values.assessmentCheckBoxes[266]} onChange={this.props.handleAssessmentCheckboxes(266)} /> Bomberos</label>
                                        <label><input type="checkbox" name="agency" value="Otro" checked={values.assessmentCheckBoxes[267]} onChange={this.props.handleAssessmentCheckboxes(267)} /> {this.context.translate('other')}</label>
                                    </div>
                                </td>
                                <th>{this.context.translate('trauma-cause')}</th>
                                <td>
                                    <select name="trauma" value={values.trauma} onChange={this.props.handleChange('trauma')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        <option value="Animal">Animal</option>
                                        <option value="Asalto">{this.context.translate('assault')}</option>
                                        <option value="Vehículo de motor">{this.context.translate('motor-vehicle')}</option>
                                        <option value="Bicicleta">{this.context.translate('bicycle')}</option>
                                        <option value="Barco">{this.context.translate('boat')}</option>
                                        <option value="Ahogado">{this.context.translate('drown')}</option>
                                        <option value="Eléctrico">{this.context.translate('electrical')}</option>
                                        <option value="Explosión">{this.context.translate('explosion')}</option>
                                        <option value="Caída">{this.context.translate('fall')}</option>
                                        <option value="Fuego">{this.context.translate('fire')}</option>
                                        <option value="Arma">{this.context.translate('gun')}</option>
                                        <option value="Herramientas">{this.context.translate('tools')}</option>
                                        <option value="Apuñalar">{this.context.translate('stabbing')}</option>
                                        <option value="Atascado por objeto">{this.context.translate('object-struck')}</option>
                                        <option value="Sustancia tóxica">{this.context.translate('toxic-subst')}</option>
                                        <option value="Otro vehículo">{this.context.translate('other-vehicle')}</option>
                                        <option value="Otro">{this.context.translate('other')}</option>
                                    </select>
                                </td>
                            </tr>
                            {values.trauma === "Caída" ?
                                <tr>
                                    <th className="top" height="28%">{this.context.translate('fallht')}</th>
                                    <td valign="top"><input style={{ width: '80px', marginRight: '0px' }} type="number" name="fallht" value={values.fallht} min="0" onChange={this.props.handleChange('fallht')} /> m</td>
                                </tr>
                                : <tr><td className="top" colSpan="2" height="28%"></td></tr>}
                            <tr style={{ borderTop: '1px solid #ddd' }}>
                                <th colSpan="4">
                                    <label className="v2">
                                        <b style={{ display: 'inline-block', paddingRight: '10px' }}>{this.context.translate('mci')}</b>
                                        <input type="checkbox" name="none" value="mci" checked={values.assessmentCheckBoxes[268]} onChange={this.props.handleAssessmentCheckboxes(268)} />
                                    </label>
                                </th>
                            </tr>
                            {values.assessmentCheckBoxes[268] ?
                                <tr>
                                    <th>{this.context.translate('num-patients')}</th>
                                    <td><input type="number" name="ptct" min="1" value={values.ptct} onChange={this.props.handleChange('ptct')} /></td>
                                    <th>{this.context.translate('triage')}</th>
                                    <td>
                                        <select name="triage" value={values.triage} onChange={this.props.handleChange('triage')}>
                                            <option disabled selected value="">{this.context.translate('select')}</option>
                                            <option value="Verde">{this.context.translate('green')}</option>
                                            <option value="Amarillo">{this.context.translate('yellow')}</option>
                                            <option value="Rojo">{this.context.translate('red')}</option>
                                            <option value="Negro">{this.context.translate('black')}</option>
                                        </select>
                                    </td>
                                </tr>
                                : null}
                            <tr>
                                <th colSpan="4">
                                    <label className="v2">
                                        <b style={{ display: 'inline-block', paddingRight: '10px' }}>{this.context.translate('vehicle-accident')}</b>
                                        <input type="checkbox" name="none" value="va" checked={values.assessmentCheckBoxes[269]} onChange={this.props.handleAssessmentCheckboxes(269)} />
                                    </label>
                                </th>
                            </tr>
                            {values.assessmentCheckBoxes[269] ?
                                <tr>
                                    <th>{this.context.translate('type')}</th>
                                    <td>
                                        <select name="vatype" value={values.vatype} onChange={this.props.handleChange('vatype')}>
                                            <option disabled selected value="">{this.context.translate('select')}</option>
                                            <option value="Auto en objeto">{this.context.translate('auto-object')}</option>
                                            <option value="Auto en otro auto">{this.context.translate('auto-auto')}</option>
                                            <option value="Motocicleta">{this.context.translate('motor')}</option>
                                            <option value="ATV">ATV</option>
                                            <option value="Barco">{this.context.translate('boat')}</option>
                                            <option value="Aviación">{this.context.translate('aviation')}</option>
                                        </select>
                                    </td>
                                    <th>{this.context.translate('safety-equip')}</th>
                                    <td>
                                        <select name="vasafe" value={values.vasafe} onChange={this.props.handleChange('vasafe')}>
                                            <option disabled selected value="">{this.context.translate('select')}</option>
                                            <option value="Ninguno">{this.context.translate('none')}</option>
                                            <option value="Cinturón">{this.context.translate('seatbelt')}</option>
                                            <option value="Casco">{this.context.translate('helmet')}</option>
                                            <option value="Bolsas de aire desplegadas">{this.context.translate('airbags-deployed')}</option>
                                            <option value="Ropa protectora">{this.context.translate('protect-cloth')}</option>
                                            <option value="Salvavidas">{this.context.translate('life-preserver')}</option>
                                        </select>
                                    </td>
                                </tr>
                                : null}
                            {values.assessmentCheckBoxes[269] ?
                                <tr>
                                    <th rowSpan="2" valign="top">{this.context.translate('impact')}</th>
                                    <td rowSpan="2">
                                        <div>
                                            <label><input type="checkbox" name="vaimpact" value="Frente" checked={values.assessmentCheckBoxes[270]} onChange={this.props.handleAssessmentCheckboxes(270)} /> {this.context.translate('head-on')}</label>
                                            <label><input type="checkbox" name="vaimpact" value="Lado" checked={values.assessmentCheckBoxes[271]} onChange={this.props.handleAssessmentCheckboxes(271)} /> {this.context.translate('side')}</label>
                                            <label><input type="checkbox" name="vaimpact" value="Trasero" checked={values.assessmentCheckBoxes[272]} onChange={this.props.handleAssessmentCheckboxes(272)} /> {this.context.translate('rear')}</label>
                                            <label><input type="checkbox" name="vaimpact" value="Rodar sobre" checked={values.assessmentCheckBoxes[273]} onChange={this.props.handleAssessmentCheckboxes(273)} /> {this.context.translate('roll-over')}</label>
                                        </div>
                                    </td>
                                    <th>{this.context.translate('est-spd')}</th>
                                    <td><input style={{ width: '80px', marginRight: '0px' }} type="number" name="vaspd" value={values.vaspd} min="0" onChange={this.props.handleChange('vaspd')} /> {this.context.translate('mph')}</td>
                                </tr>
                                : null}
                            {values.assessmentCheckBoxes[269] ?
                                <tr>
                                    <th>{this.context.translate('eject-vehicle')}</th>
                                    <td>
                                        <label><input type="radio" name="vaeject" value="Sí" checked={values.vaeject.includes("Sí")} onChange={this.props.handleChange('vaeject')} /> {this.context.translate('yes')}</label>
                                        <label><input type="radio" name="vaeject" value="No" checked={values.vaeject.includes("No")} onChange={this.props.handleChange('vaeject')} /> No</label>
                                    </td>
                                </tr>
                                : null}
                        </tbody>
                    </table>
                    <h3>{this.context.translate('response-times')}</h3>
                    <table className="cform">
                        <tbody>
                            <tr>
                                <th width="20%">{this.context.translate('dispatch')}<em>*</em></th>
                                <td>
                                    <DatePicker
                                        selected={values.dispatchDisplay ? values.dispatchDisplay : false}
                                        placeholderText="dd/mm/yyyy --:-- --"
                                        onChange={this.props.handleDate('dispatch')}
                                        timeInputLabel="Time:"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        showTimeInput />
                                </td>
                            </tr>
                            <tr>
                                <th>{this.context.translate('enroute')}<em>*</em></th>
                                <td>
                                    <DatePicker
                                        selected={values.enrouteDisplay ? values.enrouteDisplay : false}
                                        placeholderText="dd/mm/yyyy --:-- --"
                                        onChange={this.props.handleDate('enroute')}
                                        timeInputLabel="Time:"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        showTimeInput />
                                </td>
                            </tr>
                            <tr>
                                <th>{this.context.translate('arrscn')}<em>*</em></th>
                                <td>
                                    <DatePicker
                                        selected={values.arrscnDisplay ? values.arrscnDisplay : false}
                                        placeholderText="dd/mm/yyyy --:-- --"
                                        onChange={this.props.handleDate('arrscn')}
                                        timeInputLabel="Time:"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        showTimeInput />
                                </td>
                            </tr>
                            <tr>
                                <th>{this.context.translate('pcontact')}<em>*</em></th>
                                <td>
                                    <DatePicker
                                        selected={values.contactDisplay ? values.contactDisplay : false}
                                        placeholderText="dd/mm/yyyy --:-- --"
                                        onChange={this.props.handleDate('contact')}
                                        timeInputLabel="Time:"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        showTimeInput />
                                </td>
                            </tr>
                            <tr>
                                <th>{this.context.translate('dptscn')}<em>*</em></th>
                                <td>
                                    <DatePicker
                                        selected={values.dptscnDisplay ? values.dptscnDisplay : false}
                                        placeholderText="dd/mm/yyyy --:-- --"
                                        onChange={this.props.handleDate('dptscn')}
                                        timeInputLabel="Time:"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        showTimeInput />
                                </td>
                            </tr>
                            <tr>
                                <th>{this.context.translate('arrdes')}<em>*</em></th>
                                <td>
                                    <DatePicker
                                        selected={values.arrdesDisplay ? values.arrdesDisplay : false}
                                        placeholderText="dd/mm/yyyy --:-- --"
                                        onChange={this.props.handleDate('arrdes')}
                                        timeInputLabel="Time:"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        showTimeInput />
                                </td>
                            </tr>
                            <tr>
                                <th>{this.context.translate('trcare')}<em>*</em></th>
                                <td>
                                    <DatePicker
                                        selected={values.trcareDisplay ? values.trcareDisplay : false}
                                        placeholderText="dd/mm/yyyy --:-- --"
                                        onChange={this.props.handleDate('trcare')}
                                        timeInputLabel="Time:"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        showTimeInput />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="button" className="right" onClick={this.saveAndContinue} value={this.context.translate('next')} />
                </form>
                {/* Bottom chart navigation */}
                <div className="chartnav">
                    <div className="tab active" onClick={this.navigate(1)}>
                        <img src="/callIcon.png" alt="Call" />
                        <b>{this.context.translate('call')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(2)}>
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
