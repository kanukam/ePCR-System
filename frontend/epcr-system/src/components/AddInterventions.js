import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Popup from './Popup'
import ShowProc from './ShowProc'
import ShowMed from './ShowMed'
import '../App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { da } from 'date-fns/locale'

export default class AddInterventions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            showProc: false,
            showMed: false,
            showIntake: false,
            showObstetrics: false,
            // only variables for current section of form!
            pName: "",
            pTime: "",
            pTimeDisplay: "",
            pLocation: "",
            pType: "",
            pSize: "",
            pTube: "",
            pNeedle: "",
            pFluid: "",
            pResult: "",
            pDelivery: "",
            pAmount: "",
            pAdjuncts: [],
            pPhysician: "",
            pOrders: "",
            pTeeth: "",
            pConfirm: [],
            pFindings: [],
            pRhythm: "",
            pMode: "",
            pRate: "",
            pOutput: "",
            pCapture: "",
            pCPRstart: "",
            pCPRstartDisplay: "",
            pCPRstop: "",
            pCPRstopDisplay: "",
            pOutcome: "",
            pEffective: "",
            pEnergy: "",
            pConverted: "",
            pPulseCapture: "",
            // medications
            mName: "",
            mTime: "",
            mTimeDisplay: "",
            mDosage: "",
            mUnit: "",
            mRoute: "",
            testing: ""
        };
    }

    toggleProc = () => {
        this.setState({
            showProc: !this.state.showProc,
            pName: "",
            pTime: "",
            pTimeDisplay: "",
            pLocation: "",
            pType: "",
            pSize: "",
            pTube: "",
            pNeedle: "",
            pFluid: "",
            pResult: "",
            pDelivery: "",
            pAmount: "",
            pAdjuncts: [],
            pPhysician: "",
            pOrders: "",
            pTeeth: "",
            pConfirm: [],
            pFindings: [],
            pRhythm: "",
            pMode: "",
            pRate: "",
            pOutput: "",
            pCapture: "",
            pCPRstart: "",
            pCPRstartDisplay: "",
            pCPRstop: "",
            pCPRstopDisplay: "",
            pOutcome: "",
            pEffective: "",
            pEnergy: "",
            pConverted: "",
            pPulseCapture: ""
        });
    }

    toggleMed = () => {
        this.setState({
            showMed: !this.state.showMed,
            mName: "",
            mTime: "",
            mTimeDisplay: "",
            mDosage: "",
            mUnit: "",
            mRoute: ""
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

    changeInter = input => event => { this.setState({ [input]: event.target.value }); }

    handleCheck = input => event => {
        const target = event.target;
        var value = target.value;
        if (target.checked) {
            if (input === "pAdjuncts") { this.state.pAdjuncts.push(value); }
            else if (input === "pConfirm") { this.state.pConfirm.push(value); }
            else if (input === "pFindings") { this.state.pFindings.push(value); }
        } else {
            if (input === "pAdjuncts") { this.state.pAdjuncts.splice(value, 1); }
            else if (input === "pConfirm") { this.state.pConfirm.splice(value, 1); }
            else if (input === "pFindings") { this.state.pFindings.splice(value, 1); }
        }
    }

    handleDate = input => date => {
        var displayedDate = input + "Display";
        this.setState({ [displayedDate]: date });
        date = date.toISOString().slice(0, 19).replace('T', " ");
        this.setState({ [input]: date });
    }

    submitMedication = (event) => {
        event.preventDefault();
        if(this.state.mName === "" || this.state.mTime === "" || this.state.mDosage === "" || this.state.mUnit === "" || this.state.mRoute === "" ) {
            this.setState({ message: "One or more required fields have been left blank. Please fill them out." });
        } else {
            this.setState({ message: "" });
            // change to Spanish later
            let medications = "[Medication: " + this.state.mName + " | Time: " + this.state.mTime + " | Dosage: " + this.state.mDosage + " " + this.state.mUnit + " | Route: " + this.state.mRoute;
            // done by John Doe for now
            medications += " | By: John Doe" + "]";
            this.props.appendMedications(medications);
            this.toggleMed();
        }
    }

    deleteMedication = index => (event) => { this.props.deleteMedications(index); }

    submitProcedure = (event) => {
        event.preventDefault();
        if(this.state.pName === "" || this.state.pTime === "") {
            this.setState({ message: "One or more required fields have been left blank. Please fill them out." });
        } else {
            this.setState({ message: "" });
        
        // change to Spanish later
        let procedures = "[Procedure: " + this.state.pName;
        if (this.state.pName === "Cardiac Arrest") {
            procedures += " | Time of arrest: " + this.state.pTime + " | Start time CPR: " + this.state.pCPRstart + " | Stop time CPR: " + this.state.pCPRstop + " | Outcome: " + this.state.pOutcome;
        }
        else { procedures += " | Time: " + this.state.pTime; }
        if (this.state.pLocation !== "") { procedures += " | Location: " + this.state.pLocation; }
        if (this.state.pType !== "") { procedures += " | Type: " + this.state.pType; }
        if (this.state.pSize !== "") { procedures += " | Size: " + this.state.pSize; }
        if (this.state.pTube !== "") { procedures += " | Tube size: " + this.state.pTube; }
        if (this.state.pNeedle !== "") { procedures += " | Needle size: " + this.state.pNeedle; }
        if (this.state.pFluid !== "") { procedures += " | Fluid: " + this.state.pFluid; }
        if (this.state.pResult !== "") { procedures += " | Result: " + this.state.pResult; }
        if (this.state.pDelivery !== "") { procedures += " | Delivery: " + this.state.pDelivery; }
        if (this.state.pAmount !== "") { procedures += " | Amount: " + this.state.pAmount; }
        if (this.state.pName === "Basic Airway - BVM") { procedures += "| Adjuncts: " + this.state.pAdjuncts.join(); }
        if (this.state.pPhysician !== "") { procedures += " | Physician: " + this.state.pPhysician; }
        if (this.state.pOrders !== "") { procedures += " | Orders: " + this.state.pOrders; }
        if (this.state.pTeeth !== "") { procedures += " | Depth at teeth: " + this.state.pTeeth; }
        if (this.state.pName === "Advanced Airway - Intubation") { procedures += "| Confirmation: " + this.state.pConfirm.join(); }
        if (this.state.pName === "12 Lead EKG") { procedures += " | Findings: " + this.state.pFindings.join(); }
        if (this.state.pRhythm !== "") { procedures += " | Rhythm: " + this.state.pRhythm; }
        if (this.state.pMode !== "") { procedures += " | Mode: " + this.state.pMode; }
        if (this.state.pRate !== "") { procedures += " | Rate: " + this.state.pRate; }
        if (this.state.pOutput !== "") { procedures += " | Output: " + this.state.pOutput; }
        if (this.state.pCapture !== "") { procedures += " | Capture: " + this.state.pCapture; }
        if (this.state.pEffective !== "") { procedures += " | Effective: " + this.state.pEffective; }
        if (this.state.pEnergy !== "") { procedures += " | Energy: " + this.state.pEnergy; }
        if (this.state.pConverted !== "") { procedures += " | Converted to: " + this.state.pConverted; }
        if (this.state.pPulseCapture !== "") { procedures += " | Pulse capture: " + this.state.pPulseCapture; }
        // done by John Doe for now
        if (this.state.pName === "Cardiac Arrest") { procedures += " | CPR done by: " + "John Doe" + "]"; }
        else { procedures += " | By: " + "John Doe" + "]"; }
        this.props.appendProcedures(procedures);
        this.toggleProc();
    }
    }

    deleteProcedure = index => (event) => { this.props.deleteProcedures(index); }

    displayTime(time) {
        var datetime = time.split(" ");
        var date = datetime[0].split("-");
        return date[2] + "/" + date[1] + "/" + date[0] + " " + datetime[1];
    }

    render() {
        const { values } = this.props;
        const inter = this.state;
        var procedureList = [];
        for (var i = 0; i < values.procedures.length; i++) {
            var current = values.procedures[i].split(" | ");
            var time = current[1].split(": ");
            var index = values.procedures[i].indexOf(current[2]);
            var lastIndex = values.procedures[i].lastIndexOf(" | ");
            var data = values.procedures[i].substring(index, lastIndex);
            if (data === " | ") { data = "N/A"; }
            var crew = current[current.length - 1];
            crew = crew.substring(crew.lastIndexOf(":") + 2, crew.indexOf("]"));
            procedureList.push(<ShowProc
                time={this.displayTime(time[1])}
                name={current[0].split(": ")[1]}
                data={data}
                crew={crew}
                index={i}
                deleteProc={this.deleteProcedure}
            />)
        }
        var medicationList = [];
        for (var i = 0; i < values.medications.length; i++) {
            var current = values.medications[i].split(" | ");
            var time = current[1].split(": ");
            var crew = current[current.length - 1];
            crew = crew.substring(crew.lastIndexOf(":") + 2, crew.indexOf("]"));
            medicationList.push(<ShowMed
                time={this.displayTime(time[1])}
                name={current[0].split(": ")[1]}
                dosage={current[2].split(": ")[1]}
                route={current[3].split(": ")[1]}
                crew={crew}
                index={i}
                deleteMed={this.deleteMedication}
            />)
        }

        return (
            <div className="chart">
                <form id="interventions">
                    <h2>Interventions / Treatment</h2>
                    <h3>Procedures</h3>
                    {values.procedures.length >= 1 ?
                        <table className="treatment">
                            <tr>
                                <th width="12%">Time</th>
                                <th width="20%">Procedure</th>
                                <th>Data</th>
                                <th width="15%">Crew</th>
                                <th width="10%">Action</th>
                            </tr>
                            {procedureList}
                        </table> : null}
                    <div style={{ textAlign: 'center' }}><input type="button" value="Add a Procedure" onClick={this.toggleProc} /></div>
                    {this.state.showProc ?
                        <Popup
                            text="Add Procedure"
                            changeInter={this.changeInter}
                            handleCheck={this.handleCheck}
                            handleDate={this.handleDate}
                            closePopup={this.toggleProc}
                            submitProcedure={this.submitProcedure}
                            inter={inter}
                        />
                        : null}
                    <h3>Medications</h3>
                    {values.medications.length >= 1 ?
                        <table className="treatment">
                            <tr>
                                <th width="12%">Time</th>
                                <th width="20%">Medication</th>
                                <th width="20%">Dosage</th>
                                <th>Route</th>
                                <th width="15%">Crew</th>
                                <th width="10%">Action</th>
                            </tr>
                            {medicationList}
                        </table> : null}
                    <div style={{ textAlign: 'center' }}><input type="button" value="Add a Medication" onClick={this.toggleMed} /></div>
                    {this.state.showMed ?
                        <Popup
                            text="Add Medication"
                            changeInter={this.changeInter}
                            handleDate={this.handleDate}
                            closePopup={this.toggleMed}
                            submitMedication={this.submitMedication}
                            inter={inter}
                        />
                        : null}
                    <h3><label className="v2"style={{lineHeight:'40px'}}>Intake Output <input type="checkbox" name="none" value="intake" checked={values.assessmentCheckBoxes[316]} onChange={this.props.handleAssessmentCheckboxes(316)} /></label></h3>
                    {values.assessmentCheckBoxes[316] ?
                        <table className="cform">
                            <tr>
                                <th className="top" width="25%">Bleeding</th>
                                <td colspan="3" width="75%">
                                    <div style={{ display: 'inline-block' }}>
                                        <input type="number" className="calculation" name="ioBleedPT" min="0" max="9999" value={values.ioBleedPT} onChange={this.props.handleChange('ioBleedPT')} />
                                        <strong>Pre transport</strong>
                                    </div>
                                    <div style={{ display: 'inline-block' }}>
                                        <input type="number" className="calculation" name="ioBleedT" min="0" max="9999" value={values.ioBleedT} onChange={this.props.handleChange('ioBleedT')} />
                                        <strong>Transport</strong>
                                    </div>
                                    <div style={{ display: 'inline-block' }}>
                                        <input type="number" className="calculation" disabled value={parseInt(values.ioBleedPT) + parseInt(values.ioBleedT)} />
                                        <strong>Total</strong>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="top">IV fluids</th>
                                <td colspan="3">
                                    <div style={{ display: 'inline-block' }}>
                                        <input type="number" className="calculation" name="ioIVPT" min="0" max="9999" value={values.ioIVPT} onChange={this.props.handleChange('ioIVPT')} />
                                        <strong>Pre transport</strong>
                                    </div>
                                    <div style={{ display: 'inline-block' }}>
                                        <input type="number" className="calculation" name="ioIVT" min="0" max="9999" value={values.ioIVT} onChange={this.props.handleChange('ioIVT')} />
                                        <strong>Transport</strong>
                                    </div>
                                    <div style={{ display: 'inline-block' }}>
                                        <input type="number" className="calculation" disabled value={parseInt(values.ioIVPT) + parseInt(values.ioIVT)} />
                                        <strong>Total</strong>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="top">Oral fluids</th>
                                <td colspan="3">
                                    <div style={{ display: 'inline-block' }}>
                                        <input type="number" className="calculation" name="ioOralPT" min="0" max="9999" value={values.ioOralPT} onChange={this.props.handleChange('ioOralPT')} />
                                        <strong>Pre transport</strong>
                                    </div>
                                    <div style={{ display: 'inline-block' }}>
                                        <input type="number" className="calculation" name="ioOralT" min="0" max="9999" value={values.ioOralT} onChange={this.props.handleChange('ioOralT')} />
                                        <strong>Transport</strong>
                                    </div>
                                    <div style={{ display: 'inline-block' }}>
                                        <input type="number" className="calculation" disabled value={parseInt(values.ioOralPT) + parseInt(values.ioOralT)} />
                                        <strong>Total</strong>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="top">Vomit</th>
                                <td colspan="3">
                                    <div style={{ display: 'inline-block' }}>
                                        <input type="number" className="calculation" name="ioVomitPT" min="0" max="9999" value={values.ioVomitPT} onChange={this.props.handleChange('ioVomitPT')} />
                                        <strong>Pre transport</strong>
                                    </div>
                                    <div style={{ display: 'inline-block' }}>
                                        <input type="number" className="calculation" name="ioVomitT" min="0" max="9999" value={values.ioVomitT} onChange={this.props.handleChange('ioVomitT')} />
                                        <strong>Transport</strong>
                                    </div>
                                    <div style={{ display: 'inline-block' }}>
                                        <input type="number" className="calculation" disabled value={parseInt(values.ioVomitPT) + parseInt(values.ioVomitT)} />
                                        <strong>Total</strong>
                                    </div>
                                </td>
                            </tr>
                        </table> : null}
                    <h3><label className="v2" style={{lineHeight:'40px'}}>Obstetrics <input type="checkbox" name="none" value="obstetrics" checked={values.assessmentCheckBoxes[317]} onChange={this.props.handleAssessmentCheckboxes(317)} /></label></h3>
                    {values.assessmentCheckBoxes[317] ?
                        <table className="cform">
                            <tr>
                                <th width="25%">Gravid</th>
                                <td width="75%"><input type="number" className="calculation" name="oGravid" min="0" max="99" value={values.oGravid} onChange={this.props.handleChange('oGravid')} /></td>
                            </tr>
                            <tr>
                                <th>Para</th>
                                <td><input type="number" className="calculation" name="oPara" min="0" max="99" value={values.oPara} onChange={this.props.handleChange('oPara')} /></td>
                            </tr>
                            <tr>
                                <th>Abortion</th>
                                <td><input type="number" className="calculation" name="oAbortion" min="0" max="99" value={values.oAbortion} onChange={this.props.handleChange('oAbortion')} /></td>
                            </tr>
                            <tr>
                                <th>Due date</th>
                                <td>
                                    <DatePicker
                                        selected={values.oDuedateDisplay ? values.oDuedateDisplay : false}
                                        placeholderText="dd/mm/yyyy"
                                        onChange={this.props.handleDate('oDuedate')}
                                        timeInputLabel="Time:"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        showTimeInput
                                    />
                                </td>
                            </tr>
                            <tr><th>Gestation</th>
                                <td><input type="text" style={{width:'80px', marginRight: '0'}} name="oGestation" value={values.oGestation} onChange={this.props.handleChange('oGestation')} /> weeks</td>
                            </tr>
                            <tr>
                                <th>Vaginal bleeding</th>
                                <td>
                                    <div style={{margin:'7.5px'}} onChange={this.props.handleChange('oVaginalBleed')}>
                                        <label className="v2"><input type="radio" name="oVaginalBleed" value="Yes" checked={values.oVaginalBleed.includes("Yes")} /> Yes</label>
                                        <label className="v2"><input type="radio" name="oVaginalBleed" value="No" checked={values.oVaginalBleed.includes("No")} /> No</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>Contraction onset</th>
                                <td><input type="text" name="oContraction" value={values.oContraction} onChange={this.props.handleChange('oContraction')} /></td>
                            </tr>
                            <tr>
                                <th>Frequency</th>
                                <td><input type="text" style={{width:'80px', marginRight: '0'}} name="oFrequency" value={values.oFrequency} onChange={this.props.handleChange('oFrequency')} /> minutes</td>
                            </tr>
                            <tr>
                                <th>Duration</th>
                                <td><input type="text" style={{width:'80px', marginRight: '0'}} name="oDuration" value={values.oDuration} onChange={this.props.handleChange('oDuration')} /> minutes</td>
                            </tr>
                            <tr>
                                <th>Bag of water ruptured</th>
                                <td>
                                    <div style={{margin:'7.5px'}} onChange={this.props.handleChange('oWaterRupture')}>
                                        <label className="v2"><input type="radio" name="oWaterRupture" value="Yes" checked={values.oWaterRupture.includes("Yes")} /> Yes</label>
                                        <label className="v2"><input type="radio" name="oWaterRupture" value="No" checked={values.oWaterRupture.includes("No")} /> No</label>
                                    </div>                                    
                                </td>
                            </tr>
                            {values.oWaterRupture === "Yes" ?
                            <tr>
                                <th>Color of fluid</th>
                                <td>
                                    <div style={{margin:'7.5px'}} onChange={this.props.handleChange('oWaterColor')}>
                                        <label className="v2"><input type="radio" name="oWaterColor" value="Clear" checked={values.oWaterColor.includes("Clear")} /> Clear</label>
                                        <label className="v2"><input type="radio" name="oWaterColor" value="Bloody" checked={values.oWaterColor.includes("Bloody")} /> Bloody</label>
                                        <label className="v2"><input type="radio" name="oWaterColor" value="Meconium" checked={values.oWaterColor.includes("Meconium")} /> Meconium</label>
                                    </div>                                    
                                </td>
                            </tr>
                            :null }
                            <tr>
                                <th>Feel baby moving</th>
                                <td>
                                    <div style={{margin:'7.5px'}} onChange={this.props.handleChange('oBabyMoving')}>
                                        <label className="v2"><input type="radio" name="oBabyMoving" value="Yes" checked={values.oBabyMoving.includes("Yes")} /> Yes</label>
                                        <label className="v2"><input type="radio" name="oBabyMoving" value="No" checked={values.oBabyMoving.includes("No")} /> No</label>
                                    </div>                                    
                                </td>
                            </tr>
                            <tr>
                                <th>Delivery time</th>
                                <td><input type="number" className="calculation" name="oDelivery" min="0" max="99" value={values.oDelivery} onChange={this.props.handleChange('oDelivery')} /></td>
                            </tr>
                            <tr>
                                <th>Placenta delivered</th>
                                <td>
                                    <div style={{margin:'7.5px'}} onChange={this.props.handleChange('oPlacenta')}>
                                        <label className="v2"><input type="radio" name="oPlacenta" value="Yes" checked={values.oPlacenta.includes("Yes")} /> Yes</label>
                                        <label className="v2"><input type="radio" name="oPlacenta" value="No" checked={values.oPlacenta.includes("No")} /> No</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>Baby sex</th>
                                <td>
                                    <div style={{margin:'7.5px'}} onChange={this.props.handleChange('oBabySex')}>
                                        <label className="v2"><input type="radio" name="oBabySex" value="Male" checked={values.oBabySex.includes("Male")} /> Male</label>
                                        <label className="v2"><input type="radio" name="oBabySex" value="Female" checked={values.oBabySex.includes("Female")} /> Female</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>Born</th>
                                <td>
                                    <div style={{margin:'7.5px'}} onChange={this.props.handleChange('oBorn')}>
                                        <label className="v2"><input type="radio" name="oBorn" value="Alive" checked={values.oBorn.includes("Alive")} /> Alive</label>
                                        <label className="v2"><input type="radio" name="oBorn" value="Dead" checked={values.oBorn.includes("Dead")} /> Dead</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="top">APGAR score</th>
                                <td>
                                    <div style={{margin:'7.5px'}} onChange={this.props.handleChange('oAPGAR')}>
                                        <img width="600px" src="https://1q3nfm4evj5z1sgm624e93ka-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/Apgar-Scoring-System-Diagnosing-Birth-Injuries.jpg"/><br/>
                                        <label className="v2"><input type="radio" name="oAPGAR" value="0" checked={values.oAPGAR.includes("0")} /> 0 points</label>
                                        <label className="v2"><input type="radio" name="oAPGAR" value="1" checked={values.oAPGAR.includes("1")} /> 1 point</label>
                                        <label className="v2"><input type="radio" name="oAPGAR" value="2" checked={values.oAPGAR.includes("2")} /> 2 points</label>
                                    </div>
                                </td>
                            </tr>
                        </table> : null}
                    {/*<input type="text" name="pName" value={this.state.pName} />
                    <hr/>*/}
                    <Button className="left" onClick={this.back}>Previous</Button>
                    <Button className="right" onClick={this.saveAndContinue}>Next</Button>
                </form>
                {/* Bottom chart navigation */}
                <div className="chartnav">
                    <div className="tab" onClick={this.navigate(1)}>
                        <img src="/profile.png" />
                        <b>Call</b>
                    </div>
                    <div className="tab" onClick={this.navigate(2)}>
                        <img src="/profile.png" />
                        <b>Patient</b>
                    </div>
                    <div className="tab" onClick={this.navigate(3)}>
                        <img src="/profile.png" />
                        <b>Physical Exam</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(4)}>
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