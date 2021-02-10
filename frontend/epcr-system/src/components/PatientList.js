import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Container from 'react-bootstrap/Container'
import MainNav from './MainNav'
import PatientEntry from './PatientEntry'
import '../App.css'

export default class PatientList extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            contentSpacing: '0 0 0 150px',
            sidebarHide: true
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
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
                if(response.ok)
                    return response.json();
                else
                    throw Error("Failed");
            })
            .then((data) => {
                this.setState({patients: data['patients']});
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
        var patientComponents = [];
        for(var i = 0; i < this.state.patients.length; i++){
            patientComponents.push(<PatientEntry 
                                        fname={this.state.patients[i]["fname"]}
                                        lname={this.state.patients[i]["lname"]}
                                        dob={this.state.patients[i]["birth"]}
                                        address={this.state.patients[i]["address"]}
                                        phone={this.state.patients[i]["phone"]}
                                        notes={this.state.patients[i]["history"]}
                                        id={this.state.patients[i].id}
                                        key={this.state.patients[i].id}
                                    />)
        }
        return (
            <React.Fragment>
                <MainNav 
                    username={this.context.username} 
                    patient={true} 
                    sidebarHide={this.state.sidebarHide} 
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />
                <Container className="main-content" style={{padding: this.state.contentSpacing}}>
                    {patientComponents}
                </Container>
            </React.Fragment>
        )
    }
}