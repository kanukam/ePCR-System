import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserDropdown from './UserDropdown'
import '../App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MainContext } from '../Auth';

export default class Popup extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            surgicalcheck: false,
            needlecheck: false,
            users: [],
            patients: [],
            patientList: []
        };
    }

    componentDidMount() {
        const url = 'http://localhost:3000/users';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        // Post request
        fetch(url, options).then(response => response.json())
            .then(data => {
                this.setState({ users: data["userInfo"] });
            })
            .catch((error) => {
                this.setState({ errorMessage: this.context.translate('error') });
            })
    }

    showSomething = input => (e) => {
        if (input === "surgical") {
            this.setState({
                surgicalcheck: !this.state.surgicalcheck
            });
        } else if (input === "needle") {
            this.setState({
                needlecheck: !this.state.needlecheck
            });
        }
    }

    renderProc(proc) {
        switch (proc) {
            case "Glucosa en sangre":
                return (
                    <div className="group">
                        <span>{this.context.translate('results')}</span>
                        <input type="text" name="pResult" value={this.props.pResult} onChange={this.props.changeInter('pResult')} />
                    </div>
                );
            case "Control de hemorragia":
                return (
                    <div>
                        <div className="group">
                            <span>{this.context.translate('type')}</span>
                            <select name="pType" value={this.props.pType} onChange={this.props.changeInter('pType')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Presión directa">{this.context.translate('direct-press')}</option>
                                <option value="Elevación">{this.context.translate('elevation')}</option>
                                <option value="Apósito a presión">{this.context.translate('press-dress')}</option>
                                <option value="Punto de presión">{this.context.translate('press-point')}</option>
                                <option value="Aderezo hemostático">{this.context.translate('hemo-dress')}</option>
                                <option value="Torniquete">{this.context.translate('tourniquet')}</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>{this.context.translate('location')}</span>
                            <select name="pLocation" value={this.props.pLocation} onChange={this.props.changeInter('pLocation')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Mano izquierda">{this.context.translate('hand-left')}</option>
                                <option value="Mano derecha">{this.context.translate('hand-right')}</option>
                                <option value="Brazo a la izquierda">{this.context.translate('arm-left')}</option>
                                <option value="Brazo a la derecha">{this.context.translate('arm-right')}</option>
                                <option value="Pie izquierdo">{this.context.translate('foot-left')}</option>
                                <option value="Pie derecho">{this.context.translate('foot-right')}</option>
                                <option value="Pierna izquierda">{this.context.translate('leg-left')}</option>
                                <option value="Pierna derecha">{this.context.translate('leg-right')}</option>
                                <option value="Cabeza">{this.context.translate('Head')}</option>
                                <option value="Cuello">{this.context.translate('Neck')}</option>
                                <option value="Pecho">{this.context.translate('Chest')}</option>
                                <option value="Abdomen">{this.context.translate('Abdomen')}</option>
                                <option value="Espalda">{this.context.translate('back')}</option>
                            </select>
                        </div>
                    </div>
                );
            case "Entablillado":
                return (
                    <div>
                        <div className="group">
                            <span>{this.context.translate('type')}</span>
                            <select name="pType" value={this.props.pType} onChange={this.props.changeInter('pType')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Estándar">{this.context.translate('standard')}</option>
                                <option value="Cabestrillo">{this.context.translate('sling')}</option>
                                <option value="Tracción">{this.context.translate('traction')}</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>{this.context.translate('location')}</span>
                            <select name="pLocation" value={this.props.pLocation} onChange={this.props.changeInter('pLocation')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Mano/Muñeca izquierda">{this.context.translate('Left-hand-/-wrist')}</option>
                                <option value="Mano/Muñeca derecha">{this.context.translate('Right-hand-/-wrist')}</option>
                                <option value="Brazo a la izquierda">{this.context.translate('arm-left')}</option>
                                <option value="Brazo a la derecha">{this.context.translate('arm-right')}</option>
                                <option value="Pie/Tobillo izquierdo">{this.context.translate('Left-ankle-/-foot')}</option>
                                <option value="Pie/Tobillo derecho">{this.context.translate('Right-ankle-/-foot')}</option>
                                <option value="Pierna izquierda">{this.context.translate('leg-left')}</option>
                                <option value="Pierna derecha">{this.context.translate('leg-right')}</option>
                            </select>
                        </div>
                    </div>
                );
            case "Oxígeno":
                return (
                    <div>
                        <div className="group">
                            <span>{this.context.translate('delivery')}</span>
                            <select name="pDelivery" value={this.props.pDelivery} onChange={this.props.changeInter('pDelivery')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Mangera nasal">{this.context.translate('nasal-cannula')}</option>
                                <option value="Mascarilla">{this.context.translate('face-mask')}</option>
                                <option value="Máscara de no respirar">{this.context.translate('non-rebreather')}</option>
                                <option value="BVM/LMA/ETT">BVM/LMA/ETT</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>{this.context.translate('amount')}</span>
                            <input type="number" style={{ width: '80px', marginRight: '0px' }} name="pAmount" value={this.props.pAmount} maxLength="2" min="1" max="15" onChange={this.props.changeInter('pAmount')} /> L/min
                        </div>
                    </div>
                );
            case "Precauciones de la columna vertebral":
                return (
                    <div className="group">
                        <span>{this.context.translate('type')}</span>
                        <select name="pType" value={this.props.pType} onChange={this.props.changeInter('pType')}>
                            <option disabled selected value="">{this.context.translate('select')}</option>
                            <option value="C-Cuello">{this.context.translate('c-collar')}</option>
                            <option value="Tablero">{this.context.translate('backboard')}</option>
                            <option value="Correas">{this.context.translate('straps')}</option>
                        </select>
                    </div>
                );
            case "Succión":
                return (
                    <div className="group">
                        <span>{this.context.translate('location')}</span>
                        <select name="pLocation" value={this.props.pLocation} onChange={this.props.changeInter('pLocation')}>
                            <option disabled selected value="">{this.context.translate('select')}</option>
                            <option value="Boca">{this.context.translate('mouth')}</option>
                            <option value="Nasal">Nasal</option>
                        </select>
                    </div>
                );
            case "Vía aérea básica - BVM":
                return (
                    <div className="group">
                        <span>{this.context.translate('adjuncts')}</span>
                        <div style={{ width: '245px' }}>
                            <label><input type="checkbox" name="pAdjuncts" value="Ninguno" onChange={this.props.handleCheck("pAdjuncts")} /> {this.context.translate('none')}</label>
                            <label><input type="checkbox" name="pAdjuncts" value="OPA" onChange={this.props.handleCheck("pAdjuncts")} /> OPA</label>
                            <label><input type="checkbox" name="pAdjuncts" value="NPA" onChange={this.props.handleCheck("pAdjuncts")} /> NPA</label>
                        </div>
                    </div>
                );
            case "MD Consultar":
                return (
                    <div>
                        <div className="group">
                            <span>{this.context.translate('physician')}</span>
                            <input type="text" name="pPhysician" value={this.props.pPhysician} onChange={this.props.changeInter('pPhysician')} />
                        </div>
                        <div className="group">
                            <span>{this.context.translate('orders')}</span>
                            <textarea name="pOrders" value={this.props.pOrders} onChange={this.props.changeInter('pOrders')} />
                        </div>
                    </div>
                );
            case "Intravenosa":
                return (
                    <div>
                        <div className="group">
                            <span>{this.context.translate('size')}</span>
                            <select name="pSize" value={this.props.pSize} onChange={this.props.changeInter('pSize')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="14 ga">14 ga</option>
                                <option value="16 ga">16 ga</option>
                                <option value="18 ga">18 ga</option>
                                <option value="20 ga">20 ga</option>
                                <option value="22 ga">22 ga</option>
                                <option value="24 ga">24 ga</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>{this.context.translate('location')}</span>
                            <select name="pLocation" value={this.props.pLocation} onChange={this.props.changeInter('pLocation')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Antecubital Left">{this.context.translate('antecubital-left')}</option>
                                <option value="Antecubital Right">{this.context.translate('antecubital-right')}</option>
                                <option value="Hand Left">{this.context.translate('hand-left')}</option>
                                <option value="Hand Right">{this.context.translate('hand-right')}</option>
                                <option value="Forearm Left">{this.context.translate('forearm-left')}</option>
                                <option value="Forearm Right">{this.context.translate('forearm-right')}</option>
                                <option value="Foot Left">{this.context.translate('foot-left')}</option>
                                <option value="Foot Right">{this.context.translate('foot-right')}</option>
                                <option value="Other">{this.context.translate('other')}</option>
                            </select>
                        </div>
                        <div className="group" onChange={this.props.changeInter('pFluid')}>
                            <span>{this.context.translate('fluid')}</span>
                            <div style={{ margin: '7px' }}>
                                <label className="v2"><input type="radio" name="pFluid" value="NS" defaultChecked /> NS</label>
                                <label className="v2"><input type="radio" name="pFluid" value="LR" /> LR</label>
                                <label className="v2"><input type="radio" name="pFluid" value="D5NS" /> D5NS</label>
                            </div>
                        </div>
                    </div>
                );
            case "IO Intravenosa":
                return (
                    <div>
                        <div className="group">
                            <span>{this.context.translate('size')}</span>
                            <select name="pSize" value={this.props.pSize} onChange={this.props.changeInter('pSize')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Adulto azul">{this.context.translate('blue-adult')}</option>
                                <option value="Rosa pediátrico">{this.context.translate('pink-pediatric')}</option>
                                <option value="Amarillo grande">{this.context.translate('yellow-large')}</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>Location</span>
                            <select name="pLocation" value={this.props.pLocation} onChange={this.props.changeInter('pLocation')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Tibia izquierda">{this.context.translate('tibia-left')}</option>
                                <option value="Tibia derecha">{this.context.translate('tibia-right')}</option>
                                <option value="Cabeza humeral izquierda">{this.context.translate('humeral-left')}</option>
                                <option value="Cabeza humeral derecha">{this.context.translate('humeral-right')}</option>
                            </select>
                        </div>
                        <div className="group" onChange={this.props.changeInter('pFluid')}>
                            <span>{this.context.translate('fluid')}</span>
                            <div style={{ margin: '7px' }}>
                                <label className="v2"><input type="radio" name="pFluid" value="NS" defaultChecked /> NS</label>
                                <label className="v2"><input type="radio" name="pFluid" value="LR" /> LR</label>
                                <label className="v2"><input type="radio" name="pFluid" value="D5NS" /> D5NS</label>
                            </div>
                        </div>
                    </div>
                );
            case "Descompresión pleural":
                return (
                    <div>
                        <div className="group">
                            <span>{this.context.translate('needle-size')}</span>
                            <select name="pNeedle" value={this.props.pNeedle} onChange={this.props.changeInter('pNeedle')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="14 ga">14 ga</option>
                                <option value="18 ga">18 ga</option>
                                <option value="20 ga">20 ga</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>{this.context.translate('location')}</span>
                            <select name="pLocation" value={this.props.pLocation} onChange={this.props.changeInter('pLocation')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Pecho anterior izquierdo">{this.context.translate('ant-chest-left')}</option>
                                <option value="Pecho anterior derecho">{this.context.translate('ant-chest-right')}</option>
                                <option value="Pecho lateral izquierdo">{this.context.translate('lat-chest-left')}</option>
                                <option value="Pecho lateral derecho">{this.context.translate('lat-chest-right')}</option>
                            </select>
                        </div>
                    </div>
                );
            case "Vía aérea avanzada - LMA":
                return (
                    <div className="group">
                        <span>{this.context.translate('size')}</span>
                        <input type="number" style={{ width: '80px', marginRight: '0px' }} name="pSize" value={this.props.pSize} maxLength="1" min="0" max="5" onChange={this.props.changeInter('pSize')} />
                    </div>
                );
            case "Vía aérea avanzada - Intubación":
                return (
                    <div>
                        <div className="group">
                            <span>{this.context.translate('tube-size')}</span>
                            <select name="pTube" value={this.props.pTube} onChange={this.props.changeInter('pTube')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="4.5">4.5</option>
                                <option value="5">5</option>
                                <option value="5.5">5.5</option>
                                <option value="6">6</option>
                                <option value="6.5">6.5</option>
                                <option value="7">7</option>
                                <option value="7.5">7.5</option>
                                <option value="8">8</option>
                                <option value="8.5">8.5</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>{this.context.translate('depth-teeth')}</span>
                            <input type="number" style={{ width: '80px', marginRight: '0px' }} name="pTeeth" value={this.props.pTeeth} maxLength="2" min="0" max="99" onChange={this.props.changeInter('pTeeth')} /> cm
                        </div>
                        <div className="group">
                            <span>{this.context.translate('confirmation')}</span>
                            <div style={{ width: '245px' }}>
                                <label><input type="checkbox" name="pConfirm" value="Aumento del pecho" onChange={this.props.handleCheck("pConfirm")} /> {this.context.translate('chest-rise')}</label>
                                <label><input type="checkbox" name="pConfirm" value="Sonidos de respiración iguales" onChange={this.props.handleCheck("pConfirm")} /> {this.context.translate('equal-breath')}</label>
                                <label><input type="checkbox" name="pConfirm" value="Vapor en tubo" onChange={this.props.handleCheck("pConfirm")} /> {this.context.translate('vapor-tube')}</label>
                                <label><input type="checkbox" name="pConfirm" value="Succión de bombilla" onChange={this.props.handleCheck("pConfirm")} /> {this.context.translate('bulb-suction')}</label>
                                <label><input type="checkbox" name="pConfirm" value="EasyCap" onChange={this.props.handleCheck("pConfirm")} /> EasyCap</label>
                                <label><input type="checkbox" name="pConfirm" value="ETCO2" onChange={this.props.handleCheck("pConfirm")} /> ETCO2</label>
                            </div>
                        </div>
                    </div>
                );
            case "Cricotirotomía":
                return (
                    <div>
                        <div className="group">
                            <span>{this.context.translate('surgical')}</span>
                            <input type="checkbox" style={{ margin: '13px 0' }} name="surgical" value={this.state.surgicalcheck} onChange={this.showSomething("surgical")} />
                        </div>
                        {this.state.surgicalcheck ?
                            <div className="group">
                                <span>{this.context.translate('tube-size')}</span>
                                <select name="pTube" value={this.props.pTube} onChange={this.props.changeInter('pTube')}>
                                    <option disabled selected value="">{this.context.translate('select')}</option>
                                    <option value="4">4</option>
                                    <option value="4.5">4.5</option>
                                    <option value="5">5</option>
                                    <option value="5.5">5.5</option>
                                    <option value="6">6</option>
                                    <option value="6.5">6.5</option>
                                </select>
                            </div>
                            : null}
                        <div className="group">
                            <span>{this.context.translate('needle')}</span>
                            <input type="checkbox" style={{ margin: '13px 0' }} name="needle" value={this.state.needlecheck} onChange={this.showSomething("needle")} />
                        </div>
                        {this.state.needlecheck ?
                            <div className="group">
                                <span>{this.context.translate('needle-size')}</span>
                                <select name="pNeedle" value={this.props.pNeedle} onChange={this.props.changeInter('pNeedle')}>
                                    <option disabled selected value="">{this.context.translate('select')}</option>
                                    <option value="14 ga">14 ga</option>
                                    <option value="18 ga">18 ga</option>
                                    <option value="20 ga">20 ga</option>
                                </select>
                            </div>
                            : null}
                    </div>
                );
            case "12 Lead EKG":
                return (
                    <div>
                        <div className="group">
                            <span>{this.context.translate('rhythm')}</span>
                            <select name="pRhythm" value={this.props.pRhythm} onChange={this.props.changeInter('pRhythm')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Ritmo sinusal">{this.context.translate('sinus-rhythm')}</option>
                                <option value="A-Aleteo">{this.context.translate('a-flutter')}</option>
                                <option value="A-Fibrilación">{this.context.translate('a-fibrillation')}</option>
                                <option value="1st bloque de grado">{this.context.translate('1-degree-block')}</option>
                                <option value="2nd bloque de grado">{this.context.translate('2-degree-block')}</option>
                                <option value="3rd bloque de grado">{this.context.translate('3-degree-block')}</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>{this.context.translate('findings')}</span>
                            <div style={{ width: '245px' }}>
                                <label><input type="checkbox" name="pFindings" value="Normal" onChange={this.props.handleCheck("pFindings")} /> Normal</label>
                                <label><input type="checkbox" name="pFindings" value="Inferior MI" onChange={this.props.handleCheck("pFindings")} /> Inferior MI</label>
                                <label><input type="checkbox" name="pFindings" value="Anterior MI" onChange={this.props.handleCheck("pFindings")} /> Anterior MI</label>
                                <label><input type="checkbox" name="pFindings" value="Lateral MI" onChange={this.props.handleCheck("pFindings")} /> Lateral MI</label>
                                <label><input type="checkbox" name="pFindings" value="Septal MI" onChange={this.props.handleCheck("pFindings")} /> Septal MI</label>
                                <label><input type="checkbox" name="pFindings" value="RBBB" onChange={this.props.handleCheck("pFindings")} /> RBBB</label>
                                <label><input type="checkbox" name="pFindings" value="LBBB" onChange={this.props.handleCheck("pFindings")} /> LBBB</label>
                            </div>
                        </div>
                    </div>
                );
            case "Defib cardíaco - AED":
                return (
                    <div className="group" onChange={this.props.changeInter('pEffective')}>
                        <span>{this.context.translate('effective')}</span>
                        <div style={{ margin: '7px' }}>
                            <label className="v2"><input type="radio" name="pEffective" value="Sí" defaultChecked /> {this.context.translate('yes')}</label>
                            <label className="v2"><input type="radio" name="pEffective" value="No" /> No</label>
                        </div>
                    </div>
                );
            case "Defib cardíaco - Manual":
                return (
                    <div>
                        <div className="group">
                            <span>{this.context.translate('rhythm')}</span>
                            <select name="pRhythm" value={this.props.pRhythm} onChange={this.props.changeInter('pRhythm')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="V-Tach">V-Tach</option>
                                <option value="V-Fib">V-Fib</option>
                                <option value="SVT">SVT</option>
                            </select>
                        </div>
                        <div className="group" onChange={this.props.changeInter('pMode')}>
                            <span>{this.context.translate('mode')}</span>
                            <div style={{ margin: '7px' }}>
                                <label className="v2"><input type="radio" name="pMode" value="Sincronizado" defaultChecked /> {this.context.translate('synchronized')}</label>
                                <label className="v2"><input type="radio" name="pMode" value="Sin sincronizar" /> {this.context.translate('unsynchronized')}</label>
                            </div>
                        </div>
                        <div className="group">
                            <span>{this.context.translate('energy')}</span>
                            <input type="number" style={{ width: '80px', marginRight: '0px' }} name="pEnergy" value={this.props.pEnergy} maxLength="3" min="0" max="999" onChange={this.props.changeInter('pEnergy')} /> jules
                        </div>
                        <div className="group">
                            <span>{this.context.translate('converted')}</span>
                            <select name="pConverted" value={this.props.pConverted} onChange={this.props.changeInter('pConverted')}>
                                <option disabled selected value="">{this.context.translate('select')}</option>
                                <option value="Ritmo sinusal">{this.context.translate('sinus-rhythm')}</option>
                                <option value="V-Tach">V-Tach</option>
                                <option value="V-Fib">V-Fib</option>
                                <option value="Asistolia">{this.context.translate('asystole')}</option>
                                <option value="Sin conversión">{this.context.translate('no-convert')}</option>
                            </select>
                        </div>
                    </div>
                );
            case "Ritmo cardíaco":
                return (
                    <div>
                        <div className="group" onChange={this.props.changeInter('pMode')}>
                            <span>{this.context.translate('mode')}</span>
                            <div style={{ margin: '7px' }}>
                                <label className="v2"><input type="radio" name="pMode" value="Fijo" defaultChecked /> {this.context.translate('fixed')}</label>
                                <label className="v2"><input type="radio" name="pMode" value="Demanda" /> {this.context.translate('demanda')}</label>
                            </div>
                        </div>
                        <div className="group">
                            <span>{this.context.translate('rate')}</span>
                            <input type="number" style={{ width: '80px', marginRight: '0px' }} name="pRate" value={this.props.pRate} maxLength="3" min="0" max="999" onChange={this.props.changeInter('pRate')} />
                        </div>
                        <div className="group">
                            <span>{this.context.translate('ma-output')}</span>
                            <input type="number" style={{ width: '80px', marginRight: '0px' }} name="pOutput" value={this.props.pOutput} maxLength="3" min="0" max="999" onChange={this.props.changeInter('pOutput')} />
                        </div>
                        <div className="group" onChange={this.props.changeInter('pCapture')}>
                            <span>{this.context.translate('capture')}</span>
                            <div style={{ margin: '7px' }}>
                                <label className="v2"><input type="radio" name="pCapture" value="Sí" defaultChecked /> {this.context.translate('yes')}</label>
                                <label className="v2"><input type="radio" name="pCapture" value="No" /> No</label>
                            </div>
                        </div>
                        <div className="group" onChange={this.props.changeInter('pPulseCapture')}>
                            <span>{this.context.translate('pulse-capture')}</span>
                            <div style={{ margin: '7px' }}>
                                <label className="v2"><input type="radio" name="pPulseCapture" value="Sí" defaultChecked /> {this.context.translate('yes')}</label>
                                <label className="v2"><input type="radio" name="pPulseCapture" value="No" /> No</label>
                            </div>
                        </div>
                    </div>
                );
            default:
                return "";
        }
    }

    render() {
        const { inter } = this.props;
        var userComponents = [];
        for (var i = 0; i < this.state.users.length; i++) {
            var certifications = '';
            if (this.state.users[i]["certifications"] !== null) {
                certifications = this.state.users[i]["certifications"].split(',');
                for (var j = 0; j < certifications.length; j++) {
                    if (certifications[j] === "Enfermera") { certifications[j] = this.context.translate('nurse'); }
                    else if (certifications[j] === "Paramedico") { certifications[j] = this.context.translate('paramedic'); }
                }
                certifications = certifications.join(', ');
            } else { certifications = "N/A"; }
            userComponents.push(<UserDropdown
                name={this.state.users[i]["name"]}
                certification={certifications}
            />)
        }
        return (
            <div className="popup shadow">
                <input type="button" class="closebutton" onClick={this.props.closePopup} value="&#x2715;" />
                <h2>{this.context.translate(this.props.text)}</h2>
                {this.props.text.includes("proc") ?
                    <div>
                        <Row>
                            <Col>
                                <div className="group">
                                    <span>{this.context.translate('procedure')}</span>
                                    <select className="multiple" name="pName" style={{ height: '150px' }} onChange={this.props.changeInter('pName')} multiple>
                                        <option value="Glucosa en sangre">{this.context.translate('blood_glucose')}</option>
                                        <option value="Control de hemorragia">{this.context.translate('hemo_control')}</option>
                                        <option value="Entablillado">{this.context.translate('splinting')}</option>
                                        <option value="Oxígeno">{this.context.translate('oxygen')}</option>
                                        <option value="Precauciones de la columna vertebral">{this.context.translate('spinal_precaution')}</option>
                                        <option value="Aglutinante pélvic">{this.context.translate('pelvic_binder')}</option>
                                        <option value="Succión">{this.context.translate('suction')}</option>
                                        <option value="Vía aérea básica - BVM">{this.context.translate('airway_bvm')}</option>
                                        <option value="MD Consultar">{this.context.translate('md_consult')}</option>
                                        <option value="Intravenosa">{this.context.translate('iv')}</option>
                                        <option value="IO Intravenosa">{this.context.translate('io_iv')}</option>
                                        <option value="Descompresión pleural">{this.context.translate('pleural_decomp')}</option>
                                        <option value="Vía aérea avanzada - LMA">{this.context.translate('airway_lma')}</option>
                                        <option value="Vía aérea avanzada - Intubación">{this.context.translate('airway_intub')}</option>
                                        <option value="Cricotirotomía">{this.context.translate('crico')}</option>
                                        <option value="12 Lead EKG">12 Lead EKG</option>
                                        <option value="Paro cardíaco">{this.context.translate('cardiac_arrest')}</option>
                                        <option value="Defib cardíaco - AED">{this.context.translate('cardiac_aed')}</option>
                                        <option value="Defib cardíaco - Manual">{this.context.translate('cardiac_manual')}</option>
                                        <option value="Ritmo cardíaco">{this.context.translate('cardiac_pacing')}</option>
                                    </select>
                                </div>
                                {inter.pName === "Paro cardíaco" ?
                                    <div>
                                        <div>
                                            <span>{this.context.translate('time-arrest')}</span>
                                            <DatePicker
                                                selected={inter.pTimeDisplay ? inter.pTimeDisplay : false}
                                                placeholderText="dd/mm/yyyy --:-- --"
                                                onChange={this.props.handleDate('pTime')}
                                                timeInputLabel="Time:"
                                                dateFormat="dd/MM/yyyy h:mm aa"
                                                showTimeInput
                                            />
                                        </div>
                                        <div>
                                            <span>{this.context.translate('cpr-start')}</span>
                                            <DatePicker
                                                selected={inter.pCPRstartDisplay ? inter.pCPRstartDisplay : false}
                                                placeholderText="dd/mm/yyyy --:-- --"
                                                onChange={this.props.handleDate('pCPRstart')}
                                                timeInputLabel="Time:"
                                                dateFormat="dd/MM/yyyy h:mm aa"
                                                showTimeInput
                                            />
                                        </div>
                                        <div>
                                            <span>{this.context.translate('cpr-stop')}</span>
                                            <DatePicker
                                                selected={inter.pCPRstopDisplay ? inter.pCPRstopDisplay : false}
                                                placeholderText="dd/mm/yyyy --:-- --"
                                                onChange={this.props.handleDate('pCPRstop')}
                                                timeInputLabel="Time:"
                                                dateFormat="dd/MM/yyyy h:mm aa"
                                                showTimeInput
                                            />
                                        </div>
                                        <div className="group">
                                            <span>{this.context.translate('outcome')}</span>
                                            <select name="pOutcome" value={inter.pOutcome} onChange={this.props.changeInter('pOutcome')}>
                                                <option disabled selected value="">{this.context.translate('select')}</option>
                                                <option value="Retorno de pulso">{this.context.translate('pulse-return')}</option>
                                                <option value="Muerto">{this.context.translate('expired')}</option>
                                            </select>
                                        </div>
                                        <div className="group">
                                            <span>{this.context.translate('cpr-by')}</span>
                                            <select name="pCPRby" value={inter.pCPRby} onChange={this.props.changeInter('pCPRby')}>
                                                <option disabled selected value="">{this.context.translate('select')}</option>
                                                <option value="Espectador">{this.context.translate('bystander')}</option>
                                                <option value="Personal médico">{this.context.translate('med-personnel')}</option>
                                            </select>
                                        </div>
                                        {inter.pCPRby === "Personal médico" ?
                                            <div className="group">
                                                <span>{this.context.translate('med-name')}</span>
                                                <select name="pCPRbyName" value={inter.pCPRbyName} onChange={this.props.changeInter('pCPRbyName')}>
                                                    <option disabled selected value="">{this.context.translate('select')}</option>
                                                    {userComponents}
                                                </select>
                                            </div>
                                            : null}
                                        {inter.pCPRby === "Espectador" ?
                                            <div className="group">
                                                <span>{this.context.translate('other-name')}</span>
                                                <input type="text" name="pCPRbyName" value={inter.pCPRbyName} onChange={this.props.changeInter('pCPRbyName')} />
                                            </div>
                                            : null}
                                    </div>
                                    : <div>
                                        <div>
                                            <span>{this.context.translate('Time')}</span>
                                            <DatePicker
                                                selected={inter.pTimeDisplay ? inter.pTimeDisplay : false}
                                                placeholderText="dd/mm/yyyy --:-- --"
                                                onChange={this.props.handleDate('pTime')}
                                                timeInputLabel="Time:"
                                                dateFormat="dd/MM/yyyy h:mm aa"
                                                showTimeInput
                                            />
                                        </div>
                                        {this.renderProc(inter.pName)}
                                        <div className="group">
                                            <span>{this.context.translate('by')}</span>
                                            <select name="pBy" value={inter.pBy} onChange={this.props.changeInter('pBy')}>
                                                <option disabled selected value="">{this.context.translate('select')}</option>
                                                {userComponents}
                                                <option value="Otro">{this.context.translate('other')}</option>
                                            </select>
                                        </div>
                                        {inter.pBy === "Otro" ?
                                            <div className="group">
                                                <span>{this.context.translate('other-name')}</span>
                                                <input type="text" name="pByOther" value={inter.pByOther} onChange={this.props.changeInter('pByOther')} />
                                            </div>
                                            : null}
                                    </div>}
                                <small className="message">{this.context.translate(inter.message)}</small>
                                <div className="bottom">
                                    <input type="button" className="left" value={this.context.translate('add')} onClick={this.props.submitProcedure} />
                                    <input type="button" className="right cancel" value={this.context.translate('cancel')} onClick={this.props.closePopup} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    : null}
                {this.props.text.includes("med") ?
                    <div>
                        <Row>
                            <Col>
                                <div className="group">
                                    <span>{this.context.translate('medication')}</span>
                                    <input type="text" name="mName" value={inter.mName} onChange={this.props.changeInter('mName')} />
                                </div>
                                <div>
                                    <span>{this.context.translate('Time')}</span>
                                    <DatePicker
                                        selected={inter.mTimeDisplay ? inter.mTimeDisplay : false}
                                        placeholderText="dd/mm/yyyy --:-- --"
                                        onChange={this.props.handleDate('mTime')}
                                        timeInputLabel="Time:"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        showTimeInput
                                    />
                                </div>
                                <div className="group">
                                    <span>{this.context.translate('dosage')}</span>
                                    <input type="number" style={{ width: '22%', marginRight: '10px' }} min="0" name="mDosage" value={inter.mDosage} onChange={this.props.changeInter('mDosage')} />
                                    <select name="mUnit" style={{ width: '30%' }} onChange={this.props.changeInter('mUnit')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        <option value="GMS">GMS</option>
                                        <option value="in.">Inches (in.)</option>
                                        <option value="L">Liters (L)</option>
                                        <option value="kg">Kilograms (kg)</option>
                                        <option value="tablet">Tablets</option>
                                    </select>
                                </div>
                                <div className="group">
                                    <span>{this.context.translate('route')}</span>
                                    <select name="mRoute" onChange={this.props.changeInter('mRoute')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        <option value="Oral">Oral</option>
                                        <option value="IM">IM</option>
                                        <option value="IV">IV</option>
                                        <option value="Nasal">Nasal</option>
                                        <option value="Inhalar">{this.context.translate('inhaled')}</option>
                                        <option value="Tópico">{this.context.translate('topical')}</option>
                                        <option value="Sublingual">Sublingual</option>
                                        <option value="Oftálmico">{this.context.translate('ophthalmic')}</option>
                                        <option value="Oidos">{this.context.translate('otic')}</option>
                                        <option value="Rectal">Rectal</option>
                                    </select>
                                </div>
                                <div className="group">
                                    <span>{this.context.translate('by')}</span>
                                    <select name="mBy" value={inter.mBy} onChange={this.props.changeInter('mBy')}>
                                        <option disabled selected value="">{this.context.translate('select')}</option>
                                        {userComponents}
                                        <option value="Otro">{this.context.translate('other')}</option>
                                    </select>
                                </div>
                                {inter.mBy === "Otro" ?
                                    <div className="group">
                                        <span>{this.context.translate('other-name')}</span>
                                        <input type="text" name="mByOther" value={inter.mByOther} onChange={this.props.changeInter('mByOther')} />
                                    </div>
                                    : null}
                                <small className="message">{this.context.translate(inter.message)}</small>
                                <div className="bottom">
                                    <input type="button" className="left" value={this.context.translate('add')} onClick={this.props.submitMedication} />
                                    <input type="button" className="right cancel" value={this.context.translate('cancel')} onClick={this.props.closePopup} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    : null}
            </div>
        )
    }
}