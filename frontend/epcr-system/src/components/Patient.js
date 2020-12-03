import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Container from 'react-bootstrap/Container'
import MainNav from './MainNav'
import PatientEntry from './PatientEntry'
import '../App.css'

export default class Patient extends Component {
    static contextType = MainContext;

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

    render() {
        return (
            <React.Fragment>
                <MainNav username={this.context.username} patient={true}/>
 
                <Container className="main-content">
                    <PatientEntry patient="john"/>  
                    <PatientEntry patient="smith"/>
                </Container>
            </React.Fragment>
        )
    }
}