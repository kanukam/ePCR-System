import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Popup from './Popup'
import '../App.css'

export default class AddInterventions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            showProc: false,
            showMed: false,
            // only variables for current section of form!
            pName: null,
            pTime: null,
            pTimeDisplay: null,
            pLocation: null,
            pType: null,
            pSize: null,
            pTube: null,
            pNeedle: null,
            pFluid: null,
            pResult: null,
            pDelivery: null,
            pAmount: null,
            pAdjuncts: [],
            pPhysician: null,
            pOrders: null,
            pTeeth: null,
            pConfirm: [],
            pFindings: [],
            pRhythm: null,
            pMode: null,
            pRate: null,
            pOutput: null,
            pCapture: null,
            pCRPstart: null,
            pCPRstartDisplay: null,
            pCPRstop: null,
            pCPRstopDisplay: null,
            pOutcome: null,
            pEffective: null,
            pEnergy: null,
            pConverted: null,
            pPulseCapture: null,
            // medications
            mName: null,
            mTime: null,
            mDosage: null,
            mUnit: null,
            mRoute: null
        };
    }

    toggleProc = () => {
        this.setState({
            showProc: !this.state.showProc,
            pName: null,
            pTime: null,
            pTimeDisplay: null,
            pLocation: null,
            pType: null,
            pSize: null,
            pTube: null,
            pNeedle: null,
            pFluid: null,
            pResult: null,
            pDelivery: null,
            pAmount: null,
            pAdjuncts: [],
            pPhysician: null,
            pOrders: null,
            pTeeth: null,
            pConfirm: [],
            pFindings: [],
            pRhythm: null,
            pMode: null,
            pRate: null,
            pOutput: null,
            pCapture: null,
            pCRPstart: null,
            pCPRstartDisplay: null,
            pCPRstop: null,
            pCPRstopDisplay: null,
            pOutcome: null,
            pEffective: null,
            pEnergy: null,
            pConverted: null,
            pPulseCapture: null
        });
    }

    toggleMed = () => {
        this.setState({
            showMed: !this.state.showMed,
            mName: null,
            mTime: null,
            mDosage: null,
            mUnit: null,
            mRoute: null
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

    changeInter = input => event => {
        this.setState({ [input]: event.target.value });
    }

    handleCheck = input => event => {
        const target = event.target;
        var value = target.value;
        if(target.checked) {
            if(input === "pAdjuncts") { this.state.pAdjuncts.push(value); }
            else if(input === "pConfirm") { this.state.pConfirm.push(value); }
            else if(input === "pFindings") { this.state.pFindings.push(value); }
        } else {
            if(input === "pAdjuncts") { this.state.pAdjuncts.splice(value, 1); }
            else if(input === "pConfirm") { this.state.pConfirm.splice(value, 1); }
            else if(input === "pFindings") { this.state.pFindings.splice(value, 1); }
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
        /* MIGHT CONVERT TO A BUNCH OF JSON OBJECTS BEFORE SUBMITTING, FOR NOW BELOW IS FOR TESTING PURPOSES */
        const name = this.state.mName;
        const time = this.state.mTime;
        const dosage = this.state.mDosage;
        const unit = this.state.mUnit;
        const route = this.state.mRoute;
        let patientID = 1;
        /* send to backend */
        const url = 'http://localhost:3000/charts/addMed';
        const options = {
            method: 'POST',
            body: JSON.stringify({
                body: {
                    name, time, dosage, unit, route, patientID
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        console.log(options);
        fetch(url, options).then((response) => {
            
            if (!response.ok) {
                throw Error;
            }
            this.setState({ message: "Add Successful" });
        }).catch((error) => {
            this.setState({ message: "Add Failed" });
        })
        this.setState({
            success: true
        })
        this.toggleMed();
    }

    submitProcedure = (event) => {
        event.preventDefault();
        /* MIGHT CONVERT TO A BUNCH OF JSON OBJECTS BEFORE SUBMITTING, FOR NOW BELOW IS FOR TESTING PURPOSES */
        const name = this.state.pName;
        const time = this.state.pTime;
        const location = this.state.pLocation || null;
        const type = this.state.pType || null;
        const size = this.state.pSize || null;
        const tube = this.state.pTube || null;
        const needle = this.state.pNeedle || null;
        const fluid = this.state.pFluid || null;
        const result = this.state.pResult || null;
        const delivery = this.state.pDelivery || null;
        const amount = this.state.pAmount || null;
        const adjuncts = this.state.pAdjuncts.join();
        const physician = this.state.pPhysician || null;
        const orders = this.state.pOrders || null;
        const teeth = this.state.pTeeth || null;
        const confirm = this.state.pConfirm.join();
        const findings = this.state.pFindings.join();
        const rhythm = this.state.pRhythm || null;
        const mode = this.state.pMode || null;
        const rate = this.state.pRate || null;
        const output = this.state.pOutput || null;
        const capture = this.state.pCapture || null;
        const cprStart = this.state.pCRPstart || null;
        const cprStop = this.state.pCPRstop || null;
        const outcome = this.state.pOutcome || null;
        const effective = this.state.pEffective || null;
        const energy = this.state.pEnergy || null;
        const converted = this.state.pConverted || null;
        const pulseCapture = this.state.pPulseCapture || null;
        let patientID = 1;
        /* send to backend */
        const url = 'http://localhost:3000/charts/addProc';
        const options = {
            method: 'POST',
            body: JSON.stringify({
                body: {
                    name, time, location, type, size, tube, needle, fluid, result, delivery, amount, adjuncts, physician, orders, teeth, confirm, findings, rhythm, mode, rate, output, output, capture, cprStart, cprStop, outcome, effective, energy, converted, pulseCapture, patientID
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        console.log(options);
        fetch(url, options).then((response) => {
            
            if (!response.ok) {
                throw Error;
            }
            this.setState({ message: "Add Successful" });
        }).catch((error) => {
            this.setState({ message: "Add Failed" });
        })
        this.setState({
            success: true
        })
        this.toggleProc();
    }

    render() {
        //const { values } = this.props;
        const inter = this.state;
        return (
            <div className="chart">
                <form id="interventions">
                    <h2>Interventions / Treatment</h2>
                    <h3>Procedures</h3>
                    {this.showTable}
                    <Button onClick={this.toggleProc}>Add</Button>
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
                    <Button onClick={this.toggleMed}>Add</Button>
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
                    <input type="text" name="pName" value={this.state.pName} />
                    <hr/>
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
                        <b>Physical Assessment</b>
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