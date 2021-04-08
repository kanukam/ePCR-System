import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Popup from './Popup'
import ShowProc from './ShowProc'
import ShowMed from './ShowMed'
import '../App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MainContext } from '../Auth';

export default class AddInterventions extends Component {
    static contextType = MainContext;
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
            pCPRby: "",
            pCPRbyName: "",
            pOutcome: "",
            pEffective: "",
            pEnergy: "",
            pConverted: "",
            pPulseCapture: "",
            pBy: "",
            pByOther: "",
            // medications
            mName: "",
            mTime: "",
            mTimeDisplay: "",
            mDosage: "",
            mUnit: "",
            mRoute: "",
            mBy: "",
            mByOther: "",
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
            pCPRby: "",
            pCPRbyName: "",
            pOutcome: "",
            pEffective: "",
            pEnergy: "",
            pConverted: "",
            pPulseCapture: "",
            pBy: "",
            pByOther: ""
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
            mRoute: "",
            mBy: "",
            mByOther: ""
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

    makeEmpty = input => { alert(input); this.setState({ [input]: "" }); }

    submitMedication = (event) => {
        event.preventDefault();
        if(this.state.mName === "" || this.state.mTime === "" || this.state.mDosage === "" || this.state.mUnit === "" || this.state.mRoute === "" ) {
            this.setState({ message: "required-fields" });
        } else {
            this.setState({ message: "" });
            let medications = "[Medicamento: " + this.state.mName + " | Hora: " + this.state.mTime + " | Dosis: " + this.state.mDosage + " " + this.state.mUnit + " | Tomar: " + this.state.mRoute + " | Por: ";
            // done by
            if(this.state.mBy === "Otro") { medications += this.state.mByOther; }
            else { medications += this.state.mBy; }
            medications += "]";
            this.props.appendMedications(medications);
            this.toggleMed();
        }
    }

    deleteMedication = index => (event) => { this.props.deleteMedications(index); }

    submitProcedure = (event) => {
        event.preventDefault();
        if(this.state.pName === "" || this.state.pTime === "") {
            this.setState({ message: "required-fields" });
        } else {
            this.setState({ message: "" });
        
        // change to Spanish later
        let procedures = "[Procedimiento: " + this.state.pName;
        if (this.state.pName === "Paro cardíaco") {
            procedures += " | Hora de lo sucedido: " + this.state.pTime + " | Hora de inicio CPR: " + this.state.pCPRstart + " | Tiempo de parar CPR: " + this.state.pCPRstop + " | Resultado: " + this.state.pOutcome;
        }
        else { procedures += " | Hora: " + this.state.pTime; }
        if (this.state.pLocation !== "") { procedures += " | Ubicación: " + this.state.pLocation; }
        if (this.state.pType !== "") { procedures += " | Tipo: " + this.state.pType; }
        if (this.state.pSize !== "") { procedures += " | Tamaño: " + this.state.pSize; }
        if (this.state.pTube !== "") { procedures += " | Tamaño del tubo: " + this.state.pTube; }
        if (this.state.pNeedle !== "") { procedures += " | Tamaño de la aguja: " + this.state.pNeedle; }
        if (this.state.pFluid !== "") { procedures += " | Fluido: " + this.state.pFluid; }
        if (this.state.pResult !== "") { procedures += " | Resultados: " + this.state.pResult; }
        if (this.state.pDelivery !== "") { procedures += " | Entrega: " + this.state.pDelivery; }
        if (this.state.pAmount !== "") { procedures += " | Cantidad: " + this.state.pAmount; }
        if (this.state.pName === "Vía aérea básica - BVM") { procedures += "| Útilizar: " + this.state.pAdjuncts.join(); }
        if (this.state.pPhysician !== "") { procedures += " | Médico: " + this.state.pPhysician; }
        if (this.state.pOrders !== "") { procedures += " | Órdenes: " + this.state.pOrders; }
        if (this.state.pTeeth !== "") { procedures += " | Profundidad en los dientes: " + this.state.pTeeth; }
        if (this.state.pName === "Vía aérea avanzada - Intubación") { procedures += "| Confirmación: " + this.state.pConfirm.join(); }
        if (this.state.pName === "12 Lead EKG") { procedures += " | Resultados: " + this.state.pFindings.join(); }
        if (this.state.pRhythm !== "") { procedures += " | Cadencia: " + this.state.pRhythm; }
        if (this.state.pMode !== "") { procedures += " | Clase: " + this.state.pMode; }
        if (this.state.pRate !== "") { procedures += " | Grado: " + this.state.pRate; }
        if (this.state.pOutput !== "") { procedures += " | mA Salida: " + this.state.pOutput; }
        if (this.state.pCapture !== "") { procedures += " | Capturar: " + this.state.pCapture; }
        if (this.state.pEffective !== "") { procedures += " | Eficaz: " + this.state.pEffective; }
        if (this.state.pEnergy !== "") { procedures += " | Energía: " + this.state.pEnergy; }
        if (this.state.pConverted !== "") { procedures += " | Convertido a: " + this.state.pConverted; }
        if (this.state.pPulseCapture !== "") { procedures += " | Pulso con captura: " + this.state.pPulseCapture; }
        // done by
        if (this.state.pName === "Paro cardíaco") { procedures += " | CPR hecho por: " + this.state.pCPRbyName + "]"; }
        else {
            procedures += " | Por: ";
            if(this.state.pBy === "Otro") { procedures += this.state.pByOther; }
            else { procedures += this.state.pBy; }
            procedures += "]";
        }
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
        var current = ""
        var time = ""
        var index = ""
        var lastIndex = ""
        var data = ""
        var by = ""
        for (var i = 0; i < values.procedures.length; i++) {
            current = values.procedures[i].split(" | ");
            time = current[1].split(": ");
            index = values.procedures[i].indexOf(current[2]);
            lastIndex = values.procedures[i].lastIndexOf(" | ");
            data = values.procedures[i].substring(index, lastIndex);
            if (data === " | ") { data = "N/A"; }
            by = current[current.length - 1];
            by = by.substring(by.lastIndexOf(":") + 2, by.indexOf("]"));
            procedureList.push(<ShowProc
                time={this.displayTime(time[1])}
                name={current[0].split(": ")[1]}
                data={data}
                by={by}
                index={i}
                deleteProc={this.deleteProcedure}
                removeText={this.context.translate('remove')}
            />)
        }
        var medicationList = [];
        for (var i = 0; i < values.medications.length; i++) {
            current = values.medications[i].split(" | ");
            time = current[1].split(": ");
            by = current[current.length - 1];
            by = by.substring(by.lastIndexOf(":") + 2, by.indexOf("]"));
            medicationList.push(<ShowMed
                time={this.displayTime(time[1])}
                name={current[0].split(": ")[1]}
                dosage={current[2].split(": ")[1]}
                route={current[3].split(": ")[1]}
                by={by}
                index={i}
                deleteMed={this.deleteMedication}
                removeText={this.context.translate('remove')}
            />)
        }

        return (
            <div className="chart">
                <form id="interventions">
                    <h2>{this.context.translate('inter-treatment')}</h2>
                    <h3>{this.context.translate('procedures')}</h3>
                    {values.procedures.length >= 1 ?
                        <table className="treatment">
                            <tbody>
                                <tr>
                                    <th width="12%">{this.context.translate('Time')}</th>
                                    <th width="20%">{this.context.translate('procedure')}</th>
                                    <th>{this.context.translate('data')}</th>
                                    <th width="15%">{this.context.translate('by')}</th>
                                    <th width="10%">{this.context.translate('action')}</th>
                                </tr>
                                {procedureList}
                            </tbody>
                        </table> : null}
                    <div style={{ textAlign: 'center' }}><input type="button" value={this.context.translate('add-proc')} onClick={this.toggleProc} /></div>
                    {this.state.showProc ?
                        <Popup
                            text="add-proc"
                            changeInter={this.changeInter}
                            handleCheck={this.handleCheck}
                            handleDate={this.handleDate}
                            makeEmpty={this.makeEmpty}
                            closePopup={this.toggleProc}
                            submitProcedure={this.submitProcedure}
                            inter={inter}
                        />
                        : null}
                    <h3>{this.context.translate('medications')}</h3>
                    {values.medications.length >= 1 ?
                        <table className="treatment">
                            <tbody>
                                <tr>
                                    <th width="12%">{this.context.translate('Time')}</th>
                                    <th width="20%">{this.context.translate('medication')}</th>
                                    <th width="20%">{this.context.translate('dosage')}</th>
                                    <th>{this.context.translate('route')}</th>
                                    <th width="15%">{this.context.translate('by')}</th>
                                    <th width="10%">{this.context.translate('action')}</th>
                                </tr>
                                {medicationList}
                            </tbody>
                        </table> : null}
                    <div style={{ textAlign: 'center' }}><input type="button" value={this.context.translate('add-med')} onClick={this.toggleMed} /></div>
                    {this.state.showMed ?
                        <Popup
                            text="add-med"
                            changeInter={this.changeInter}
                            handleDate={this.handleDate}
                            closePopup={this.toggleMed}
                            submitMedication={this.submitMedication}
                            inter={inter}
                        />
                        : null}
                    <h3><label className="v2"style={{lineHeight:'40px'}}>{this.context.translate('intake-output')} <input type="checkbox" name="none" value="intake" checked={values.assessmentCheckBoxes[316]} onChange={this.props.handleAssessmentCheckboxes(316)} /></label></h3>
                    {values.assessmentCheckBoxes[316] ?
                        <table className="cform">
                            <tbody>
                                <tr>
                                    <th className="top" width="25%">{this.context.translate('bleeding')}</th>
                                    <td colspan="3" width="75%">
                                        <div style={{ display: 'inline-block' }}>
                                            <input type="number" className="calculation" name="ioBleedPT" min="0" max="9999" value={values.ioBleedPT} onChange={this.props.handleChange('ioBleedPT')} />
                                            <strong>{this.context.translate('bpre-transport')}</strong>
                                        </div>
                                        <div style={{ display: 'inline-block' }}>
                                            <input type="number" className="calculation" name="ioBleedT" min="0" max="9999" value={values.ioBleedT} onChange={this.props.handleChange('ioBleedT')} />
                                            <strong>{this.context.translate('btransport')}</strong>
                                        </div>
                                        <div style={{ display: 'inline-block' }}>
                                            <input type="number" className="calculation" disabled value={parseInt(values.ioBleedPT) + parseInt(values.ioBleedT)} />
                                            <strong>Total</strong>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="top">{this.context.translate('iv-fluid')}</th>
                                    <td colspan="3">
                                        <div style={{ display: 'inline-block' }}>
                                            <input type="number" className="calculation" name="ioIVPT" min="0" max="9999" value={values.ioIVPT} onChange={this.props.handleChange('ioIVPT')} />
                                            <strong>{this.context.translate('bpre-transport')}</strong>
                                        </div>
                                        <div style={{ display: 'inline-block' }}>
                                            <input type="number" className="calculation" name="ioIVT" min="0" max="9999" value={values.ioIVT} onChange={this.props.handleChange('ioIVT')} />
                                            <strong>{this.context.translate('btransport')}</strong>
                                        </div>
                                        <div style={{ display: 'inline-block' }}>
                                            <input type="number" className="calculation" disabled value={parseInt(values.ioIVPT) + parseInt(values.ioIVT)} />
                                            <strong>Total</strong>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="top">{this.context.translate('oral-fluid')}</th>
                                    <td colspan="3">
                                        <div style={{ display: 'inline-block' }}>
                                            <input type="number" className="calculation" name="ioOralPT" min="0" max="9999" value={values.ioOralPT} onChange={this.props.handleChange('ioOralPT')} />
                                            <strong>{this.context.translate('bpre-transport')}</strong>
                                        </div>
                                        <div style={{ display: 'inline-block' }}>
                                            <input type="number" className="calculation" name="ioOralT" min="0" max="9999" value={values.ioOralT} onChange={this.props.handleChange('ioOralT')} />
                                            <strong>{this.context.translate('btransport')}</strong>
                                        </div>
                                        <div style={{ display: 'inline-block' }}>
                                            <input type="number" className="calculation" disabled value={parseInt(values.ioOralPT) + parseInt(values.ioOralT)} />
                                            <strong>Total</strong>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="top">{this.context.translate('vomit')}</th>
                                    <td colspan="3">
                                        <div style={{ display: 'inline-block' }}>
                                            <input type="number" className="calculation" name="ioVomitPT" min="0" max="9999" value={values.ioVomitPT} onChange={this.props.handleChange('ioVomitPT')} />
                                            <strong>{this.context.translate('bpre-transport')}</strong>
                                        </div>
                                        <div style={{ display: 'inline-block' }}>
                                            <input type="number" className="calculation" name="ioVomitT" min="0" max="9999" value={values.ioVomitT} onChange={this.props.handleChange('ioVomitT')} />
                                            <strong>{this.context.translate('btransport')}</strong>
                                        </div>
                                        <div style={{ display: 'inline-block' }}>
                                            <input type="number" className="calculation" disabled value={parseInt(values.ioVomitPT) + parseInt(values.ioVomitT)} />
                                            <strong>Total</strong>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table> : null}
                    <h3><label className="v2" style={{lineHeight:'40px'}}>{this.context.translate('obstetrics')} <input type="checkbox" name="none" value="obstetrics" checked={values.assessmentCheckBoxes[317]} onChange={this.props.handleAssessmentCheckboxes(317)} /></label></h3>
                    {values.assessmentCheckBoxes[317] ?
                        <table className="cform">
                            <tbody>
                                <tr>
                                    <th width="25%">{this.context.translate('gravid')}</th>
                                    <td width="75%"><input type="number" className="calculation" name="oGravid" min="0" max="99" value={values.oGravid} onChange={this.props.handleChange('oGravid')} /></td>
                                </tr>
                                <tr>
                                    <th>{this.context.translate('para')}</th>
                                    <td><input type="number" className="calculation" name="oPara" min="0" max="99" value={values.oPara} onChange={this.props.handleChange('oPara')} /></td>
                                </tr>
                                <tr>
                                    <th>{this.context.translate('abortion')}</th>
                                    <td><input type="number" className="calculation" name="oAbortion" min="0" max="99" value={values.oAbortion} onChange={this.props.handleChange('oAbortion')} /></td>
                                </tr>
                                <tr>
                                    <th>{this.context.translate('due-date')}</th>
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
                                <tr><th>{this.context.translate('gestation')}</th>
                                    <td><input type="text" style={{ width: '80px', marginRight: '0' }} name="oGestation" value={values.oGestation} onChange={this.props.handleChange('oGestation')} /> {this.context.translate('week')}s</td>
                                </tr>
                                <tr>
                                    <th>{this.context.translate('vaginal-bleed')}</th>
                                    <td>
                                        <div style={{ margin: '7.5px' }} onChange={this.props.handleChange('oVaginalBleed')}>
                                            <label className="v2"><input type="radio" name="oVaginalBleed" value="Sí" checked={values.oVaginalBleed.includes("Sí") } /> {this.context.translate('yes')}</label>
                                            <label className="v2"><input type="radio" name="oVaginalBleed" value="No" checked={values.oVaginalBleed.includes("No")} /> No</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>{this.context.translate('contraction')}</th>
                                    <td><input type="text" name="oContraction" value={values.oContraction} onChange={this.props.handleChange('oContraction')} /></td>
                                </tr>
                                <tr>
                                    <th>{this.context.translate('frequency')}</th>
                                    <td><input type="text" style={{ width: '80px', marginRight: '0' }} name="oFrequency" value={values.oFrequency} onChange={this.props.handleChange('oFrequency')} /> {this.context.translate('minute')}s</td>
                                </tr>
                                <tr>
                                    <th>{this.context.translate('duration')}</th>
                                    <td><input type="text" style={{ width: '80px', marginRight: '0' }} name="oDuration" value={values.oDuration} onChange={this.props.handleChange('oDuration')} /> {this.context.translate('minute')}s</td>
                                </tr>
                                <tr>
                                    <th>{this.context.translate('water-rupture')}</th>
                                    <td>
                                        <div style={{ margin: '7.5px' }} onChange={this.props.handleChange('oWaterRupture')}>
                                            <label className="v2"><input type="radio" name="oWaterRupture" value="Sí" checked={values.oWaterRupture.includes("Sí")} /> {this.context.translate('yes')}</label>
                                            <label className="v2"><input type="radio" name="oWaterRupture" value="No" checked={values.oWaterRupture.includes("No")} /> No</label>
                                        </div>
                                    </td>
                                </tr>
                                {values.oWaterRupture === "Sí" ?
                                    <tr>
                                        <th>{this.context.translate('water-color')}</th>
                                        <td>
                                            <div style={{ margin: '7.5px' }} onChange={this.props.handleChange('oWaterColor')}>
                                                <label className="v2"><input type="radio" name="oWaterColor" value="Claro" checked={values.oWaterColor.includes("Claro")} /> {this.context.translate('clear')}</label>
                                                <label className="v2"><input type="radio" name="oWaterColor" value="Sangrienta" checked={values.oWaterColor.includes("Sangrienta")} /> {this.context.translate('bloody')}</label>
                                                <label className="v2"><input type="radio" name="oWaterColor" value="Meconio" checked={values.oWaterColor.includes("Meconio")} /> {this.context.translate('meconium')}</label>
                                            </div>
                                        </td>
                                    </tr>
                                    : null}
                                <tr>
                                    <th>{this.context.translate('baby-moving')}</th>
                                    <td>
                                        <div style={{ margin: '7.5px' }} onChange={this.props.handleChange('oBabyMoving')}>
                                            <label className="v2"><input type="radio" name="oBabyMoving" value="Sí" checked={values.oBabyMoving.includes("Sí")} /> {this.context.translate('yes')}</label>
                                            <label className="v2"><input type="radio" name="oBabyMoving" value="No" checked={values.oBabyMoving.includes("No")} /> No</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>{this.context.translate('delivery-time')}</th>
                                    <td><input type="number" className="calculation" name="oDelivery" min="0" max="99" value={values.oDelivery} onChange={this.props.handleChange('oDelivery')} /></td>
                                </tr>
                                <tr>
                                    <th>{this.context.translate('placenta')}</th>
                                    <td>
                                        <div style={{ margin: '7.5px' }} onChange={this.props.handleChange('oPlacenta')}>
                                            <label className="v2"><input type="radio" name="oPlacenta" value="Sí" checked={values.oPlacenta.includes("Sí")} /> {this.context.translate('yes')}</label>
                                            <label className="v2"><input type="radio" name="oPlacenta" value="No" checked={values.oPlacenta.includes("No")} /> No</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>{this.context.translate('baby-sex')}</th>
                                    <td>
                                        <div style={{ margin: '7.5px' }} onChange={this.props.handleChange('oBabySex')}>
                                            <label className="v2"><input type="radio" name="oBabySex" value="Hombre" checked={values.oBabySex.includes("Hombre")} /> {this.context.translate('male')}</label>
                                            <label className="v2"><input type="radio" name="oBabySex" value="Mujer" checked={values.oBabySex.includes("Mujer")} /> {this.context.translate('female')}</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>{this.context.translate('born')}</th>
                                    <td>
                                        <div style={{ margin: '7.5px' }} onChange={this.props.handleChange('oBorn')}>
                                            <label className="v2"><input type="radio" name="oBorn" value="Vivo" checked={values.oBorn.includes("Vivo")} /> {this.context.translate('alive')}</label>
                                            <label className="v2"><input type="radio" name="oBorn" value="Muerto" checked={values.oBorn.includes("Muerto")} /> {this.context.translate('dead')}</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="top">{this.context.translate('apgar')}</th>
                                    <td>
                                        <div style={{ margin: '7.5px' }}>
                                            <img width="600px" src="https://1q3nfm4evj5z1sgm624e93ka-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/Apgar-Scoring-System-Diagnosing-Birth-Injuries.jpg" /><br />
                                            <div style={{ display: 'block' }}>
                                                <input type="text" style={{ width: '80px' }} name="oAPGAR1" value={values.oAPGAR1} onChange={this.props.handleChange('oAPGAR1')} />
                                                <strong>1 {this.context.translate('minute')}</strong>
                                            </div>
                                            <div style={{ display: 'block' }}>
                                                <input type="text" style={{ width: '80px' }} name="oAPGAR5" value={values.oAPGAR5} onChange={this.props.handleChange('oAPGAR5')} />
                                                <strong>5 {this.context.translate('minute')}s</strong>
                                            </div>
                                            <div style={{ display: 'block' }}>
                                                <input type="text" style={{ width: '80px' }} name="oAPGAR10" value={values.oAPGAR10} onChange={this.props.handleChange('oAPGAR10')} />
                                                <strong>10 {this.context.translate('minute')}s</strong>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table> : null}
                    {/*<input type="text" name="pName" value={this.state.pName} />
                    <hr/>*/}
                    <Button className="left" onClick={this.back}>{this.context.translate('previous')}</Button>
                    <Button className="right" onClick={this.saveAndContinue}>{this.context.translate('next')}</Button>
                </form>
                {/* Bottom chart navigation */}
                <div className="chartnav">
                <div className="tab" onClick={this.navigate(1)}>
                        <img src="/callIcon.png" />
                        <b>{this.context.translate('call')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(2)}>
                        <img src="/patientIcon.png" />
                        <b>{this.context.translate('patient')}</b>
                    </div>
                    <div className="tab" onClick={this.navigate(3)}>
                        <img src="/assessmentIcon.png" />
                        <b>{this.context.translate('physical-exam')}</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(4)}>
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