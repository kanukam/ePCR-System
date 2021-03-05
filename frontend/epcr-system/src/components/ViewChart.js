import React, { Component } from 'react';
import { MainContext } from '../Auth';
import Container from 'react-bootstrap/Container';
import MainNav from './MainNav';
import Notes from './Notes';
import '../App.css'

export default class ViewChart extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            sidebarHide: true,
            contentSpacing: '0 0 0 150px',
            chart: []
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:3000/charts/patient/' + this.props.match.params.id;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(url, options)
            .then((response) => {
                if(response.ok)
                    return response.json();
                else
                    throw Error("Failed");
            })
            .then((data) => {
                this.setState({chart: data['chart'][0]});
            })
            .catch((error) => {
                console.log(error);
            }); 
    }

    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }

    render() {
        console.log(this.state.chart);
        const { fname, lname, birth, classify, gender, weight, address, city, country, zip, idate, ptct, ino, mci, care, triage, ctype, disp, loctype, dest, loc, dispatch, contact, enroute, arrdes, arrscn  } = "";

        return (
            <React.Fragment>
                <MainNav 
                    username={this.context.username} 
                    viewcharts={true} 
                    sidebarHide={this.state.sidebarHide} 
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />
                <Container className="main-content" style={{padding: this.state.contentSpacing}}>
                    
                        <h2>Patient Name Here</h2>
                        <b>Date:</b> {idate}
                        <table className="info" border="1">
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
                        </table>
                        <table className="info" border="1">
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
                        </table>
                        <table className="crew" order="1">
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
                        </table>
                    
                    <Notes />
                </Container>
            </React.Fragment>
        )
    }
}
