import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Container from 'react-bootstrap/Container'
import MainNav from './MainNav'
import PatientEntry from './PatientEntry'
import '../App.css'

export default class Patient extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            contentSpacing: '0 0 0 150px',
            sidebarHide: true
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    viewCharts() {
        const url = 'http://localhost:3000/charts/';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(url, options).then((response) => {
            if (!response.ok) {
                throw Error;
            }
        })
        
    }

    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
        console.log('working');
    }

    render() {
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
                    <PatientEntry patient="john" dob="12/3/2020" notes="additional info"/>  
                    <PatientEntry patient="smith" dob="03/11/2000" notes="additional info"/>
                </Container>
            </React.Fragment>
        )
    }
}