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
            procedure: ""
        };
    }

    toggleProc = () => {
        this.setState({
            showProc: !this.state.showProc
        });
    }

    toggleMed = () => {
        this.setState({
            showMed: !this.state.showMed
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

    render() {
        const { values } = this.props;
        return (
            <div>
                <form>
                    <h2>Interventions / Treatment</h2>
                    <h3>Procedures</h3>
                    {this.showTable}
                    <Button onClick={this.toggleProc}>Add</Button>
                    {this.state.showProc ? <Popup text="Add Procedure" closePopup={this.toggleProc}/> : null}
                    <div className="group">
                        <span>Procedure</span>
                        <input type="text" name="procedure" value={values.procedure} onChange={this.props.handleChange('procedure')} />
                    </div>
                    <h3>Medications</h3>
                    <Button onClick={this.toggleMed}>Add</Button>
                    {this.state.showMed ? <Popup text="Add Medication" closePopup={this.toggleMed}/> : null}
                    <hr/>
                    <Button className="left" onClick={this.back}>Previous</Button>
                    <Button className="right" onClick={this.saveAndContinue}>Next</Button>
                </form>
                {/* Bottom chart navigation */}
                <div className="chartnav">
                    <div className="tab" onClick={this.navigate(1)}>
                        <img src="/profile.png"/>
                        <b>Call</b>
                    </div>
                    <div className="tab" onClick={this.navigate(2)}>
                        <img src="/profile.png"/>
                        <b>Patient</b>
                    </div>
                    <div className="tab active" onClick={this.navigate(3)}>
                        <img src="/profile.png"/>
                        <b>Interventions</b>
                    </div>
                    <div className="tab" onClick={this.navigate(4)}>
                        <img src="/profile.png"/>
                        <b>Confirm</b>
                    </div>
                </div>
            </div>
        )
    }
}