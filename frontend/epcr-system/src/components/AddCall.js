import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class AddCall extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
            currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            message: "",
            mci: "",
            va: "",
            jsonData: {"call": []}
        };
    }

    navigate = step => (e) => {
        e.preventDefault();
        this.fetchInput();
        this.props.navigate(step);
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.fetchInput();
        this.props.nextStep();
    }

    fetchInput = (e) => {
        //e.preventDefault();
        var form = document.getElementById("call");
        var data = new FormData(form);
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        this.state.jsonData = JSON.stringify(object);
        alert(this.state.jsonData);
        this.props.fetchNewInput(this.state.jsonData, 1);
    }

    showMCI = (e) => {
        var checkbox = document.getElementById("mci");
        //if(checkbox.checked) {
            this.setState({
                mci: !this.state.mci
            });
        //}
    }

    showVA = (e) => {
        this.setState({
            va: !this.state.va
        });
    }

    render() {
        const { values } = this.props;
        const { callinfo } = this.props;
        return (
            <div>
                <form id="call">
                    <h2>Call Information</h2>
                    <h3>Details</h3>
                    {callinfo.no}
                    <table className="cform">
                        <tr>
                            <th width="20%">Incident number</th>
                            <td width="30%"><input type="text" name="ino" value={values.ino} onChange={this.props.handleChange('ino')} /></td>
                            <th width="20%">Unit number</th>
                            <td width="30%">
                                <select name="unit" value={values.unit} onChange={this.props.handleChange('unit')}>
                                    <option value="M-01">M-01</option>
                                    <option value="M-02">M-02</option>
                                    <option value="M-03">M-03</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Incident date</th>
                            <td><input type="date" name="idate" value={values.idate} onChange={this.props.handleChange('idate')} /></td>
                            <th width="20%">Call type</th>
                            <td width="30%">
                                <select name="ctype" value={values.ctype} onChange={this.props.handleChange('ctype')}>
                                    <option value="Clinic">Clinic</option>
                                    <option value="Scene">Scene</option>
                                    <option value="Transfer">Transfer</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Incident location</th>
                            <td>
                                <select name="loctype" value={values.loctype} onChange={this.props.handleChange('loctype')}>
                                    <option value="Rescate clinic">Rescate clinic</option>
                                    <option value="Home">Home</option>
                                    <option value="Business">Business</option>
                                    <option value="School">School</option>
                                    <option value="Public">Public</option>
                                    <option value="Construction site">Construction site</option>
                                    <option value="Recreation area">Recreation area</option>
                                    <option value="Road/Highway">Road/Highway</option>
                                    <option value="Marina">Marina</option>
                                    <option value="Medical office">Medical office</option>
                                    <option value="Beach">Beach</option>
                                    <option value="Ocean/Bay">Ocean/Bay</option>
                                    <option value="Other">Other</option>
                                </select>
                            </td>
                            <th>Nature of call</th>
                            <td>
                                <select name="nature" value={values.nature} onChange={this.props.handleChange('nature')}>
                                    <option value="B/P check">B/P check</option>
                                    <option value="Cardiac">Cardiac</option>
                                    <option value="Injection">Injection</option>
                                    <option value="OB">OB</option>
                                    <option value="Pulmonary">Pulmonary</option>
                                    <option value="Trauma">Trauma</option>
                                    <option value="Medical other">Medical other</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Incident address</th>
                            <td><input type="text" name="loc" value={values.loc} onChange={this.props.handleChange('loc')} /></td>
                            <th>Care level</th>
                            <td>
                                <select name="care" value={values.care} onChange={this.props.handleChange('care')}>
                                    <option value="BLS">BLS</option>
                                    <option value="ALS">ALS</option>
                                    <option value="Nursing">Nursing</option>
                                </select>
                            </td>
                        </tr>
                        <tr style={{borderTop:'1px solid #ddd'}}>
                            <th>Disposition</th>
                            <td>
                                <select name="disp" value={values.disp} onChange={this.props.handleChange('disp')}>
                                    <option value="Treat and release">Treat and release</option>
                                    <option value="Transport">Transport</option>
                                    <option value="DOA">DOA</option>
                                    <option value="AMA">AMA</option>
                                    <option value="Unable to locate">Unable to locate</option>
                                </select>
                            </td>
                            <th>Destination</th>
                            <td>
                                <select name="dest" value={values.dest} onChange={this.props.handleChange('dest')}>
                                    <option value="Rescate clinic">Rescate clinic</option>
                                    <option value="IMSS">IMSS</option>
                                    <option value="ISTESON">ISTESON</option>
                                    <option value="SEMESON">SEMESON</option>
                                    <option value="ISSSTE">ISSSTE</option>
                                    <option value="Pabellon Guadalupe">Pabellon Guadalupe</option>
                                    <option value="Hospital Cima">Hospital Cima</option>
                                    <option value="Hospital Clinica Del Noroeste">Hospital Clinica Del Noroeste</option>
                                    <option value="Hospital San Benito">Hospital San Benito</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className="top" rowspan="2">Other agencies on scene</th>
                            <td rowspan="2">
                                <div>
                                    <label><input type="checkbox" name="agency" /> Local Police</label>
                                    <label><input type="checkbox" name="agency" /> State Police</label><br/>
                                    <label><input type="checkbox" name="agency" /> Federal Police</label>
                                    <label><input type="checkbox" name="agency" /> Cruz Rojas</label><br/>
                                    <label><input type="checkbox" name="agency" /> Bomberos</label>
                                    <label><input type="checkbox" name="agency" /> Other</label>
                                </div>
                            </td>
                            <th>Trauma cause</th>
                            <td>
                                <select name="trauma" value={values.trauma} onChange={this.props.handleChange('trauma')}>
                                    <option value="Animal">Animal</option>
                                    <option value="Assault">Assault</option>
                                    <option value="Motor vehicle">Motor vehicle</option>
                                    <option value="Bicycle">Bicycle</option>
                                    <option value="Boat">Boat</option>
                                    <option value="Drowning">Drowning</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Explosion">Explosion</option>
                                    <option value="Fall">Fall</option>
                                    <option value="Fire">Fire</option>
                                    <option value="Gun">Gun</option>
                                    <option value="Tools">Tools</option>
                                    <option value="Stabbing">Stabbing</option>
                                    <option value="Stuck by object">Stuck by object</option>
                                    <option value="Toxic substance">Toxic substance</option>
                                    <option value="Other vehicle">Other vehicle</option>
                                    <option value="Other">Other</option>
                                </select>
                            </td>
                        </tr>
                        {values.trauma === "Fall" ?
                        <tr>
                            <th className="top" height="28%">Height</th>
                            <td valign="top"><input style={{width:'80px', marginRight:'0px'}} type="number" name="fallht" value={values.fallht} min="0" onChange={this.props.handleChange('fallht')} /> m</td>
                        </tr>
                        : <tr><td className="top" colspan="2" height="28%"></td></tr>}
                        <tr style={{borderTop:'1px solid #ddd'}}>
                            <th colspan="4">
                                <b style={{display:'inline-block', paddingRight:'10px'}}>MCI</b>
                                <input type="checkbox" name="mci" id="mci" onClick={this.showMCI} />
                            </th>
                        </tr>
                        {this.state.mci ?
                        <tr>
                            <th>Patient Count</th>
                            <td><input type="number" name="ptct" min="1" value={values.ptct} onChange={this.props.handleChange('ptct')} /></td>
                            <th>Triage Color</th>
                            <td>
                                <select name="triage" value={values.triage} onChange={this.props.handleChange('triage')}>
                                    <option value="Green">Green</option>
                                    <option value="Yellow">Yellow</option>
                                    <option value="Red">Red</option>
                                    <option value="Black">Black</option>
                                </select>
                            </td>
                        </tr>
                        : null}
                        <tr>
                            <th colspan="4">
                                <b style={{display:'inline-block', paddingRight:'10px'}}>Vehicle Accident</b>
                                <input type="checkbox" name="va" id="va" value={values.va} onClick={this.showVA} />
                            </th>
                        </tr>
                        {this.state.va ?
                        <tr>
                            <th>Type</th>
                            <td>
                                <select name="vatype" value={values.vatype} onChange={this.props.handleChange('vatype')}>
                                    <option value="Auto into object">Auto into object</option>
                                    <option value="Auto into another auto">Auto into another auto</option>
                                    <option value="Motorcycle">Motorcycle</option>
                                    <option value="ATV">ATV</option>
                                    <option value="Boat">Boat</option>
                                    <option value="Aviation">Aviation</option>
                                </select>
                            </td>
                            <th>Safety equipment</th>
                            <td>
                                <select name="vasafe" value={values.vasafe} onChange={this.props.handleChange('vasafe')}>
                                    <option value="None">None</option>
                                    <option value="Seatbelt">Seatbelt</option>
                                    <option value="Helmet">Helmet</option>
                                    <option value="Airbags deployed">Airbags deployed</option>
                                    <option value="Protective clothing">Protective clothing</option>
                                    <option value="Life preserver">Life preserver</option>
                                </select>
                            </td>
                        </tr>
                        : null}
                        {this.state.va ?
                        <tr>
                            <th rowspan="2" valign="top">Impact</th>
                            <td rowspan="2">
                                <div>
                                    <label><input type="checkbox" name="vaimpact" /> Head on</label>
                                    <label><input type="checkbox" name="vaimpact" /> Side</label><br/>
                                    <label><input type="checkbox" name="vaimpact" /> Rear</label>
                                    <label><input type="checkbox" name="vaimpact" /> Roll over</label>
                                </div>
                            </td>
                            <th>Estimated speed</th>
                            <td><input style={{width:'80px', marginRight:'0px'}} type="number" name="vaspd" value={values.vaspd} min="0" onChange={this.props.handleChange('vaspd')} /> mph</td>
                        </tr>
                        : null}
                        {this.state.va ?
                        <tr>
                            <th>Ejection from vehicle</th>
                            <td>
                                <div>
                                    <label><input type="radio" name="vaeject" value="Yes" defaultChecked /> Yes</label>
                                    <label><input type="radio" name="vaeject" value="No" /> No</label>
                                </div>
                            </td>
                        </tr>
                        : null}
                    </table>
                    <h3>Times</h3>
                    <table className="cform">
                        <tr>
                            <th width="20%">Dispatch</th>
                            <td><input type="datetime-local" name="dispatch" value={values.dispatch} onChange={this.props.handleChange('dispatch')} /></td>
                        </tr>
                        <tr>
                            <th>Enroute</th>
                            <td><input type="datetime-local" name="enroute" value={values.enroute} onChange={this.props.handleChange('enroute')} /></td>
                        </tr>
                        <tr>
                            <th>Arrive scene</th>
                            <td><input type="datetime-local" name="arrscn" value={values.arrscn} onChange={this.props.handleChange('arrscn')} /></td>
                        </tr>
                        <tr>
                            <th>Patient contact</th>
                            <td><input type="datetime-local" name="contact" value={values.contact} onChange={this.props.handleChange('contact')} /></td>
                        </tr>
                        <tr>
                            <th>Depart scene</th>
                            <td><input type="datetime-local" name="dptscn" value={values.dptscn} onChange={this.props.handleChange('dptscn')} /></td>
                        </tr>
                        <tr>
                            <th>Arrive destination</th>
                            <td><input type="datetime-local" name="arrdes" value={values.arrdes} onChange={this.props.handleChange('arrdes')} /></td>
                        </tr>
                        <tr>
                            <th>Transfer of care</th>
                            <td><input type="datetime-local" name="trcare" value={values.trcare} onChange={this.props.handleChange('trcare')} /></td>
                        </tr>
                    </table>
                    <Button className="right" onClick={this.saveAndContinue}>Next</Button>
                </form>
                {/* Bottom chart navigation */}
                <div className="chartnav">
                    <div className="tab active" onClick={this.navigate(1)}>
                        <img src="/profile.png" />
                        <b>Call</b>
                    </div>
                    <div className="tab" onClick={this.navigate(2)}>
                        <img src="/profile.png" />
                        <b>Patient</b>
                    </div>
                    <div className="tab" onClick={this.navigate(3)}>
                        <img src="/profile.png" />
                        <b>Interventions</b>
                    </div>
                    <div className="tab" onClick={this.navigate(4)}>
                        <img src="/profile.png" />
                        <b>Confirm</b>
                    </div>
                </div>
            </div>
        )
    }
}