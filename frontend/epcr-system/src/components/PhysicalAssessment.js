import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class PhysicalAssessment extends Component {
    constructor(props) {
        super(props);
        this.state = {

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

    render() {
        const { values } = this.props;
        return (
            <div>















                <Button className="left" onClick={this.back}>Previous</Button>
                <Button className="right" onClick={this.saveAndContinue}>Next</Button>
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
                    <div className="tab active" onClick={this.navigate(3)}>
                        <img src="/profile.png" />
                        <b>Interventions</b>
                    </div>
                    <div className="tab" onClick={this.navigate(4)}>
                        <img src="/profile.png" />
                        <b>Physical Assessment</b>
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