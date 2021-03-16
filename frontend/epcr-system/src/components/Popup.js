import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import PatientRow from './PatientRow'
import '../App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            surgicalcheck: "",
            needlecheck: "",
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

    showSomething = input => (e) => {
        if (input === "surgical") {
            //var checkbox = document.getElementById("surgical");
            this.setState({
                surgicalcheck: !this.state.surgicalcheck
            });
        } else if (input === "needle") {
            //var checkbox = document.getElementById("needle");
            this.setState({
                needlecheck: !this.state.needlecheck
            });
        }
    }

    renderProc(proc) {
        switch (proc) {
            case "Blood Glucose":
                return (
                    <div className="group">
                        <span>Results</span>
                        <input type="text" name="pResult" value={this.props.pResult} onChange={this.props.changeInter('pResult')} />
                    </div>
                );
            case "Hemorrhage Control":
                return (
                    <div>
                        <div className="group">
                            <span>Type</span>
                            <select name="pType" value={this.props.pType} onChange={this.props.changeInter('pType')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="Direct pressure">Direct pressure</option>
                                <option value="Elevation">Elevation</option>
                                <option value="Pressure dressing">Pressure dressing</option>
                                <option value="Pressure point">Pressure point</option>
                                <option value="Hemostatic dressing">Hemostatic dressing</option>
                                <option value="Tourniquet">Tourniquet</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>Location</span>
                            <select name="pLocation" value={this.props.pLocation} onChange={this.props.changeInter('pLocation')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="Hand Left">Hand Left</option>
                                <option value="Hand Right">Hand Right</option>
                                <option value="Arm Left">Arm Left</option>
                                <option value="Arm Right">Arm Right</option>
                                <option value="Foot Left">Foot Left</option>
                                <option value="Foot Right">Foot Right</option>
                                <option value="Leg Left">Leg Left</option>
                                <option value="Leg Right">Leg Right</option>
                                <option value="Head">Head</option>
                                <option value="Neck">Neck</option>
                                <option value="Chest">Chest</option>
                                <option value="Abdomen">Abdomen</option>
                                <option value="Back">Back</option>
                            </select>
                        </div>
                    </div>
                );
            case "Splinting":
                return (
                    <div>
                        <div className="group">
                            <span>Type</span>
                            <select name="pType" value={this.props.pType} onChange={this.props.changeInter('pType')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="Standard">Standard</option>
                                <option value="Sling">Sling</option>
                                <option value="Traction">Traction</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>Location</span>
                            <select name="pLocation" value={this.props.pLocation} onChange={this.props.changeInter('pLocation')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="Hand/Wrist Left">Hand/Wrist Left</option>
                                <option value="Hand/Wrist Right">Hand/Wrist Right</option>
                                <option value="Arm Left">Arm Left</option>
                                <option value="Arm Right">Arm Right</option>
                                <option value="Foot/Ankle Left">Foot/Ankle Left</option>
                                <option value="Foot/Ankle Right">Foot/Ankle Right</option>
                                <option value="Leg Left">Leg Left</option>
                                <option value="Leg Right">Leg Right</option>
                            </select>
                        </div>
                    </div>
                );
            case "Oxygen":
                return (
                    <div>
                        <div className="group">
                            <span>Delivery</span>
                            <select name="pDelivery" value={this.props.pDelivery} onChange={this.props.changeInter('pDelivery')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="Nasal cannula">Nasal cannula</option>
                                <option value="Face mask">Face mask</option>
                                <option value="Non-rebreather mask">Non-rebreather mask</option>
                                <option value="BVM/LMA/ETT">BVM/LMA/ETT</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>Amount</span>
                            <input type="number" style={{ width: '80px', marginRight: '0px' }} name="pAmount" value={this.props.pAmount} maxlength="2" min="1" max="15" onChange={this.props.changeInter('pAmount')} /> L/min
                        </div>
                    </div>
                );
            case "Spinal Precautions":
                return (
                    <div className="group">
                        <span>Type</span>
                        <select name="pType" value={this.props.pType} onChange={this.props.changeInter('pType')}>
                            <option disabled selected value="">-Select-</option>
                            <option value="C-Collar">C-Collar</option>
                            <option value="Backboard">Backboard</option>
                            <option value="Straps">Straps</option>
                        </select>
                    </div>
                );
            case "Suction":
                return (
                    <div className="group">
                        <span>Location</span>
                        <select name="pLocation" value={this.props.pLocation} onChange={this.props.changeInter('pLocation')}>
                            <option disabled selected value="">-Select-</option>
                            <option value="Mouth">Mouth</option>
                            <option value="Nasal">Nasal</option>
                        </select>
                    </div>
                );
            case "Basic Airway - BVM":
                return (
                    <div className="group">
                        <span>Adjuncts</span>
                        <div style={{ width: '245px' }}>
                            <label><input type="checkbox" name="pAdjuncts" value="None" onChange={this.props.handleCheck("pAdjuncts")} /> None</label>
                            <label><input type="checkbox" name="pAdjuncts" value="OPA" onChange={this.props.handleCheck("pAdjuncts")} /> OPA</label>
                            <label><input type="checkbox" name="pAdjuncts" value="NPA" onChange={this.props.handleCheck("pAdjuncts")} /> NPA</label>
                        </div>
                    </div>
                );
            case "MD Consult":
                return (
                    <div>
                        <div className="group">
                            <span>Physician</span>
                            <input type="text" name="pPhysician" value={this.props.pPhysician} onChange={this.props.changeInter('pPhysician')} />
                        </div>
                        <div className="group">
                            <span>Orders</span>
                            <textarea name="pOrders" value={this.props.pOrders} onChange={this.props.changeInter('pOrders')} />
                        </div>
                    </div>
                );
            case "IV":
                return (
                    <div>
                        <div className="group">
                            <span>Size</span>
                            <select name="pSize" value={this.props.pSize} onChange={this.props.changeInter('pSize')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="14 ga">14 ga</option>
                                <option value="16 ga">16 ga</option>
                                <option value="18 ga">18 ga</option>
                                <option value="20 ga">20 ga</option>
                                <option value="22 ga">22 ga</option>
                                <option value="24 ga">24 ga</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>Location</span>
                            <select name="pLocation" value={this.props.pLocation} onChange={this.props.changeInter('pLocation')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="Antecubital Left">Antecubital Left</option>
                                <option value="Antecubital Right">Antecubital Right</option>
                                <option value="Hand Left">Hand Left</option>
                                <option value="Hand Right">Hand Right</option>
                                <option value="Forearm Left">Forearm Left</option>
                                <option value="Forearm Right">Forearm Right</option>
                                <option value="Foot Left">Foot Left</option>
                                <option value="Foot Right">Foot Right</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="group" onChange={this.props.changeInter('pFluid')}>
                            <span>Fluid</span>
                            <div style={{ margin: '7px' }}>
                                <label className="v2"><input type="radio" name="pFluid" value="NS" defaultChecked /> NS</label>
                                <label className="v2"><input type="radio" name="pFluid" value="LR" /> LR</label>
                                <label className="v2"><input type="radio" name="pFluid" value="D5NS" /> D5NS</label>
                            </div>
                        </div>
                    </div>
                );
            case "IO IV":
                return (
                    <div>
                        <div className="group">
                            <span>Size</span>
                            <select name="pSize" value={this.props.pSize} onChange={this.props.changeInter('pSize')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="Blue adult">Blue adult</option>
                                <option value="Pink pediatric">Pink pediatric</option>
                                <option value="Yellow large">Yellow large</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>Location</span>
                            <select name="pLocation" value={this.props.pLocation} onChange={this.props.changeInter('pLocation')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="Tibia Left">Tibia Left</option>
                                <option value="Tibia Right">Tibia Right</option>
                                <option value="Humeral Head Left">Humeral Head Left</option>
                                <option value="Humeral Head Right">Humeral Head Right</option>
                            </select>
                        </div>
                        <div className="group" onChange={this.props.changeInter('pFluid')}>
                            <span>Fluid</span>
                            <div style={{ margin: '7px' }}>
                                <label className="v2"><input type="radio" name="pFluid" value="NS" defaultChecked /> NS</label>
                                <label className="v2"><input type="radio" name="pFluid" value="LR" /> LR</label>
                                <label className="v2"><input type="radio" name="pFluid" value="D5NS" /> D5NS</label>
                            </div>
                        </div>
                    </div>
                );
            case "Pleural Decompression":
                return (
                    <div>
                        <div className="group">
                            <span>Needle size</span>
                            <select name="pNeedle" value={this.props.pNeedle} onChange={this.props.changeInter('pNeedle')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="14 ga">14 ga</option>
                                <option value="18 ga">18 ga</option>
                                <option value="20 ga">20 ga</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>Location</span>
                            <select name="pLocation" value={this.props.pLocation} onChange={this.props.changeInter('pLocation')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="Left anterior chest">Left anterior chest</option>
                                <option value="Right anterior chest">Right anterior chest</option>
                                <option value="Left lateral chest">Left lateral chest</option>
                                <option value="Right lateral chest">Right lateral chest</option>
                            </select>
                        </div>
                    </div>
                );
            case "Advanced Airway - LMA":
                return (
                    <div className="group">
                        <span>Size</span>
                        <input type="number" style={{ width: '80px', marginRight: '0px' }} name="pSize" value={this.props.pSize} maxlength="1" min="0" max="5" onChange={this.props.changeInter('pSize')} />
                    </div>
                );
            case "Advanced Airway - Intubation":
                return (
                    <div>
                        <div className="group">
                            <span>Tube size</span>
                            <select name="pTube" value={this.props.pTube} onChange={this.props.changeInter('pTube')}>
                                <option disabled selected value="">-Select-</option>
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
                            <span>Depth at Teeth</span>
                            <input type="number" style={{ width: '80px', marginRight: '0px' }} name="pTeeth" value={this.props.pTeeth} maxlength="2" min="0" max="99" onChange={this.props.changeInter('pTeeth')} /> cm
                        </div>
                        <div className="group">
                            <span>Confirmation</span>
                            <div style={{ width: '245px' }}>
                                <label><input type="checkbox" name="pConfirm" value="Chest rise" onChange={this.props.handleCheck("pConfirm")} /> Chest rise</label>
                                <label><input type="checkbox" name="pConfirm" value="Even breath sounds" onChange={this.props.handleCheck("pConfirm")} /> Equal breath sounds</label>
                                <label><input type="checkbox" name="pConfirm" value="Vapor in tube" onChange={this.props.handleCheck("pConfirm")} /> Vapor in tube</label>
                                <label><input type="checkbox" name="pConfirm" value="Bulb Suction" onChange={this.props.handleCheck("pConfirm")} /> Bulb Suction</label>
                                <label><input type="checkbox" name="pConfirm" value="EasyCap" onChange={this.props.handleCheck("pConfirm")} /> EasyCap</label>
                                <label><input type="checkbox" name="pConfirm" value="ETCO2" onChange={this.props.handleCheck("pConfirm")} /> ETCO2</label>
                            </div>
                        </div>
                    </div>
                );
            case "Cricothyrotomy":
                return (
                    <div>
                        <div className="group">
                            <span>Surgical</span>
                            <input type="checkbox" style={{ margin: '13px 0' }} name="surgical" value={this.state.surgicalcheck} onClick={this.showSomething("surgical")} />
                        </div>
                        {this.state.surgicalcheck ?
                            <div className="group">
                                <span>Tube size</span>
                                <select name="pTube" value={this.props.pTube} onChange={this.props.changeInter('pTube')}>
                                    <option disabled selected value="">-Select-</option>
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
                            <span>Needle</span>
                            <input type="checkbox" style={{ margin: '13px 0' }} name="needle" value={this.state.needlecheck} onClick={this.showSomething("needle")} />
                        </div>
                        {this.state.needlecheck ?
                            <div className="group">
                                <span>Needle size</span>
                                <select name="pNeedle" value={this.props.pNeedle} onChange={this.props.changeInter('pNeedle')}>
                                    <option disabled selected value="">-Select-</option>
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
                            <span>Rhythm</span>
                            <select name="pRhythm" value={this.props.pRhythm} onChange={this.props.changeInter('pRhythm')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="Sinus rhythm">Sinus rhythm</option>
                                <option value="A-Flutter">A-Flutter</option>
                                <option value="A-Fibrillation">A-Fibrillation</option>
                                <option value="1st degree block">1st degree block</option>
                                <option value="2nd degree block">2nd degree block</option>
                                <option value="3rd degree block">3rd degree block</option>
                            </select>
                        </div>
                        <div className="group">
                            <span>Findings</span>
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
            case "Cardiac Arrest":
                return (
                    <div>
                        <div>
                            <span>Start time CPR</span>
                            <DatePicker
                                selected={this.props.pCPRstartDisplay ? this.props.pCPRstartDisplay : false}
                                placeholderText="dd/mm/yyyy --:-- --"
                                onChange={this.props.handleDate('pCPRstart')}
                                timeInputLabel="Time:"
                                dateFormat="dd/MM/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div>
                            <span>Stop time CPR</span>
                            <DatePicker
                                selected={this.props.pCPRstopDisplay ? this.props.pCPRstopDisplay : false}
                                placeholderText="dd/mm/yyyy --:-- --"
                                onChange={this.props.handleDate('pCPRstop')}
                                timeInputLabel="Time:"
                                dateFormat="dd/MM/yyyy h:mm aa"
                                showTimeInput
                            />
                        </div>
                        <div className="group">
                            <span>Outcome</span>
                            <select name="pOutcome" value={this.props.pOutcome} onChange={this.props.changeInter('pOutcome')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="Pulse return">Pulse return</option>
                                <option value="Expired">Expired</option>
                            </select>
                        </div>
                    </div>
                );
            case "Cardiac Defib - AED":
                return (
                    <div className="group" onChange={this.props.changeInter('pEffective')}>
                        <span>Effective</span>
                        <div style={{ margin: '7px' }}>
                            <label className="v2"><input type="radio" name="pEffective" value="Yes" defaultChecked /> Yes</label>
                            <label className="v2"><input type="radio" name="pEffective" value="No" /> No</label>
                        </div>
                    </div>
                );
            case "Cardiac Defib - Manual":
                return (
                    <div>
                        <div className="group">
                            <span>Rhythm</span>
                            <select name="pRhythm" value={this.props.pRhythm} onChange={this.props.changeInter('pRhythm')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="V-Tach">V-Tach</option>
                                <option value="V-Fib">V-Fib</option>
                                <option value="SVT">SVT</option>
                            </select>
                        </div>
                        <div className="group" onChange={this.props.changeInter('pMode')}>
                            <span>Mode</span>
                            <div style={{ margin: '7px' }}>
                                <label className="v2"><input type="radio" name="pMode" value="Synchronized" defaultChecked /> Synchronized</label>
                                <label className="v2"><input type="radio" name="pMode" value="Unsynchronized" /> Unsynchronized</label>
                            </div>
                        </div>
                        <div className="group">
                            <span>Energy</span>
                            <input type="number" style={{ width: '80px', marginRight: '0px' }} name="pEnergy" value={this.props.pEnergy} maxlength="3" min="0" max="999" onChange={this.props.changeInter('pEnergy')} /> jules
                        </div>
                        <div className="group">
                            <span>Converted to</span>
                            <select name="pConverted" value={this.props.pConverted} onChange={this.props.changeInter('pConverted')}>
                                <option disabled selected value="">-Select-</option>
                                <option value="Sinus rhythm">Sinus rhythm</option>
                                <option value="V-Tach">V-Tach</option>
                                <option value="V-Fib">V-Fib</option>
                                <option value="Asystole">Asystole</option>
                                <option value="No conversion">No conversion</option>
                            </select>
                        </div>
                    </div>
                );
            case "Cardiac Pacing":
                return (
                    <div>
                        <div className="group" onChange={this.props.changeInter('pMode')}>
                            <span>Mode</span>
                            <div style={{ margin: '7px' }}>
                                <label className="v2"><input type="radio" name="pMode" value="Fixed" defaultChecked /> Fixed</label>
                                <label className="v2"><input type="radio" name="pMode" value="Demand" /> Demand</label>
                            </div>
                        </div>
                        <div className="group">
                            <span>Rate</span>
                            <input type="number" style={{ width: '80px', marginRight: '0px' }} name="pRate" value={this.props.pRate} maxlength="3" min="0" max="999" onChange={this.props.changeInter('pRate')} />
                        </div>
                        <div className="group">
                            <span>mA Output</span>
                            <input type="number" style={{ width: '80px', marginRight: '0px' }} name="pOutput" value={this.props.pOutput} maxlength="3" min="0" max="999" onChange={this.props.changeInter('pOutput')} />
                        </div>
                        <div className="group" onChange={this.props.changeInter('pCapture')}>
                            <span>Capture</span>
                            <div style={{ margin: '7px' }}>
                                <label className="v2"><input type="radio" name="pCapture" value="Yes" defaultChecked /> Yes</label>
                                <label className="v2"><input type="radio" name="pCapture" value="No" /> No</label>
                            </div>
                        </div>
                        <div className="group" onChange={this.props.changeInter('pPulseCapture')}>
                            <span>Pulse with capture</span>
                            <div style={{ margin: '7px' }}>
                                <label className="v2"><input type="radio" name="pPulseCapture" value="Yes" defaultChecked /> Yes</label>
                                <label className="v2"><input type="radio" name="pPulseCapture" value="No" /> No</label>
                            </div>
                        </div>
                    </div>
                );
            default:
                return "";
        }
    }

    selectPatient = index => (event) => {
        var patient = this.state.patientList[index];
        this.props.selectPatient(patient);
    }

    displayTime(time) {
        var index = time.indexOf("-");
        var lastIndex = time.lastIndexOf("-");
        var year = time.substring(0, index);
        var month = time.substring(index + 1, index + 3);
        var day = time.substring(lastIndex + 1);
        return day + "/" + month + "/" + year;
    }

    render() {
        const { inter } = this.props;
        var patientComponents = [];
        for (var i = 0; i < this.state.patients.length; i++) {
            patientComponents.push(<PatientRow
                fname={this.state.patients[i]["fname"]}
                lname={this.state.patients[i]["lname"]}
                dob={this.displayTime(this.state.patients[i]["birth"])}
                id={this.state.patients[i].id}
                index={i}
                select={this.selectPatient}
            />)
            var pat = this.state.patients[i].id + "," + this.state.patients[i]["fname"] + "," + this.state.patients[i]["lname"] + "," + this.state.patients[i]["birth"] + "," + this.state.patients[i]["gender"] + ",;";
            this.state.patientList.push(pat);
        }
        return (
            <div>
                {this.props.text.includes("Patient") ?
                    <div className="popup shadow psearch">
                        <h2>{this.props.text}</h2>
                        <div style={{ height: '285px', overflow: 'auto' }}>
                            <table className="treatment" style={{ marginBottom: '0' }}>
                                <tr>
                                    <th>Last name</th>
                                    <th>First name</th>
                                    <th>Date of birth</th>
                                    <th width="100px">Action</th>
                                </tr>
                                {patientComponents}
                            </table>
                        </div>
                    </div>
                : <div className="popup shadow">
                    <h2>{this.props.text}</h2>
                    {this.props.text.includes("Procedure") ?
                        <form>
                            <Row>
                                <Col>
                                    <div className="group">
                                        <span>Procedure</span>
                                        <select className="multiple" name="pName" style={{ height: '150px' }} onChange={this.props.changeInter('pName')} multiple>
                                            <option value="Blood Glucose">Blood Glucose</option>
                                            <option value="Hemorrhage Control">Hemorrhage Control</option>
                                            <option value="Splinting">Splinting</option>
                                            <option value="Oxygen">Oxygen</option>
                                            <option value="Spinal Precautions">Spinal Precautions</option>
                                            <option value="Pelvic Binder">Pelvic Binder</option>
                                            <option value="Suction">Suction</option>
                                            <option value="Basic Airway - BVM">Basic Airway - BVM</option>
                                            <option value="MD Consult">MD Consult</option>
                                            <option value="IV">IV</option>
                                            <option value="IO IV">IO IV</option>
                                            <option value="Pleural Decompression">Pleural Decompression</option>
                                            <option value="Advanced Airway - LMA">Advanced Airway - LMA</option>
                                            <option value="Advanced Airway - Intubation">Advanced Airway - Intubation</option>
                                            <option value="Cricothyrotomy">Cricothyrotomy</option>
                                            <option value="12 Lead EKG">12 Lead EKG</option>
                                            <option value="Cardiac Arrest">Cardiac Arrest</option>
                                            <option value="Cardiac Defib - AED">Cardiac Defib - AED</option>
                                            <option value="Cardiac Defib - Manual">Cardiac Defib - Manual</option>
                                            <option value="Cardiac Pacing">Cardiac Pacing</option>
                                        </select>
                                    </div>
                                    <div>
                                        <span>{inter.pName === "Cardiac Arrest" ? "Time of arrest" : "Time"}</span>
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
                                        <span>{inter.pName === "Cardiac Arrest" ? "CPR done by" : "Crew"}</span>
                                        <input type="text" value="John Doe" disabled />
                                    </div>
                                    <small>Note: Crew member name should be selected from current user's information.</small><br/>
                                    <small style={{color:'red'}}>{inter.message}</small>
                                    <div className="bottom">
                                        <input type="button" className="left" value="Add" onClick={this.props.submitProcedure} />
                                        <input type="button" className="right" value="Cancel" onClick={this.props.closePopup} />
                                    </div>
                                </Col>
                            </Row>
                        </form>
                        : null}
                    {this.props.text.includes("Medication") ?
                        <form>
                            <Row>
                                <Col>
                                    <div className="group">
                                        <span>Medication</span>
                                        <select className="multiple" name="mName" style={{ height: '150px' }} onChange={this.props.changeInter('mName')} multiple>
                                            <option value="Nitroglycerine">Nitroglycerine</option>
                                            <option value="Ondansetron">Ondansetron</option>
                                            <option value="Oxygen">Oxygen</option>
                                            <option value="Phenylephrine">Phenylephrine</option>
                                            <option value="Procardia">Procardia</option>
                                            <option value="Propanalol">Propanalol</option>
                                        </select>
                                    </div>
                                    <div>
                                        <span>Time</span>
                                        {/*<input type="datetime-local" name="mTime" value={inter.mTime} onChange={this.props.changeInter('mTime')} />*/}
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
                                        <span>Dosage</span>
                                        <input type="number" style={{ width: '27%', marginRight: '10px' }} min="0" name="mDosage" value={inter.mDosage} onChange={this.props.changeInter('mDosage')} />
                                        <select name="mUnit" style={{ width: '32%' }} onChange={this.props.changeInter('mUnit')}>
                                            <option disabled selected value="">-Select-</option>
                                            <option value="GMS">GMS</option>
                                            <option value="in.">Inches (in.)</option>
                                            <option value="L">Liters (L)</option>
                                            <option value="kg">Kilograms (kg)</option>
                                            <option value="tablet">Tablets</option>
                                        </select>
                                    </div>
                                    <div className="group">
                                        <span>Route</span>
                                        <select name="mRoute" onChange={this.props.changeInter('mRoute')}>
                                            <option disabled selected value="">-Select-</option>
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
                                    </div>
                                    <div className="group">
                                        <span>Crew</span>
                                        <input type="text" value="John Doe" disabled />
                                    </div>
                                    <small>Note: Crew member name should be selected from current user's information.</small><br/>
                                    <small style={{color:'red'}}>{inter.message}</small>
                                    <div className="bottom">
                                    <input type="button" className="left" value="Add" onClick={this.props.submitMedication} />
                                        <input type="button" className="right" value="Cancel" onClick={this.props.closePopup} />
                                    </div>
                                </Col>
                            </Row>
                        </form>
                        : null}
                </div>}
            </div>
        )
    }
}