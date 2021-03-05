import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
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
        
        const { fname, lname, birth, classify, gender, weight, address, city, country, zip, idate, ptct, ino, mci, care, triage, ctype, disp, loctype, dest, loc, dispatch, contact, enroute, arrdes, arrscn  } = this.props.values;
        return (
            <div className="chart">
                <form>
                    <h2>Confirm Chart Report</h2>
                    <b>Date:</b> {idate}
                    <table className="info" border="1">
                        <tbody>
                            <tr><th colSpan="8">Patient Information</th></tr>
                            <tr>
                                <td width="10%">Name</td>
                                <td width="30%">{lname}, {fname}</td>
                                <td width="10%">Classification</td>
                                <td width="20%">{classify}</td>
                                <td width="10%">D.O.B.</td>
                                <td width="20%">{birth}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{address}, {city}, {country} {zip}</td>
                                <td>Gender</td>
                                <td>{gender}</td>
                                <td>Weight</td>
                                <td>{weight} kg</td>
                            </tr>
                            <tr>
                                <td>Number of Patients at Scene</td>
                                <td colSpan="7">{ptct}</td>
                            </tr>
                            <tr><th colSpan="4">Call Information</th></tr>
                            <tr>
                                <td width="15%">Incident #</td>
                                <td width="35%">{ino}</td>
                                <td width="15%">MCI</td>
                                <td width="35%">{mci}</td>
                            </tr>
                            <tr>
                                <td>Care Level</td>
                                <td>{care}</td>
                                <td>Triage Color</td>
                                <td>{triage}</td>
                            </tr>
                            <tr>
                                <td>Call Type</td>
                                <td>{ctype}</td>
                                <td>Disposition</td>
                                <td>{disp}</td>
                            </tr>
                            <tr>
                                <td>Location Type</td>
                                <td>{loctype}</td>
                                <td>Destination Type</td>
                                <td>{dest}</td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td>{loc}</td>
                                <td>Destination</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Response Mode</td>
                                <td></td>
                                <td>Transport Mode</td>
                                <td></td>
                            </tr>
                            <tr><th colSpan="4">Response Times</th></tr>
                            <tr>
                                <td>Dispatch</td>
                                <td>{dispatch}</td>
                                <td>Contact</td>
                                <td>{contact}</td>
                            </tr>
                            <tr>
                                <td>Enroute</td>
                                <td>{enroute}</td>
                                <td>Enroute</td>
                                <td>{arrdes}</td>
                            </tr>
                            <tr>
                                <td>Scene</td>
                                <td>{arrscn}</td>
                                <td>Arrive</td>
                                <td>{arrscn}</td>
                            </tr>
                                <tr><th colSpan="4">Unit Personnel</th></tr>
                                <tr>
                                    <td><b>Crew Member</b></td>
                                    <td><b>Certification</b></td>
                                    <td><b>Role</b></td>
                                </tr>
                                <tr>
                                    <td>CREW NAME</td>
                                    <td>Registered Nurse</td>
                                    <td></td>
                                </tr>
                        </tbody>
                    </table>
                    <Button className="left" onClick={this.back}>Previous</Button>
                    <Button className="right" onClick={this.props.handleSubmit}>Submit</Button>
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