import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { MainContext } from '../Auth'
import '../App.css'
import '../Sidebar.css'

import AddCall from './AddCall'
import AddPatient from './AddPatient'
import AddInterventions from './AddInterventions'
import Confirm from './Confirm'

export default class ChartForm extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        var today = new Date(),
            currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            message: "",
            success: false,
            step: 1,
            redirect: "/Patient",
            // all variables across section forms!
            no: "",
            date: currentDate,
            type: "Clinic",
            dispatch: "",
            patient: "",
            birth: "", // datetime, age is calculated based on this
            gender: "Male",
            weight: "", // in kg
            address: "",
            city: "",
            country: "",
            zip: "",
            phone: "",
            history: "", // subject to change
            procedure: ""
        };
    }

    handleChange = input => event => {
        /*const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});*/
        this.setState({ [input]: event.target.value })
    }

    handleGender = input => event => {
        this.setState({
            gender: event.currentTarget.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // call variables
        const call = this.state.no + " | " + this.state.type;
        const date = this.state.date;
        const times = this.state.dispatch;
        // patient variables
        const patient = this.state.patient;
        const birth = this.state.birth;
        const weight = this.state.weight;
        const address = this.state.address + ", " + this.state.city + ", " + this.state.country + ", " + this.state.zip;
        // interventions variables
        const procedure = this.state.procedure;
        // send to backend
        const url = 'http://localhost:3000/charts/add';
        const options = {
            method: 'POST',
            body: JSON.stringify({ call, date, times, patient, birth, weight, address, procedure }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
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
        this.nextStep();
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    }

    render() {
        const { step } = this.state;
        const {
            no,
            date,
            type,
            dispatch,
            patient,
            birth,
            weight,
            address,
            city,
            country,
            zip,
            procedure
        } = this.state;
        const values = {
            no,
            date,
            type,
            dispatch,
            patient,
            birth,
            weight,
            address,
            city,
            country,
            zip,
            procedure
        };
        switch (step) {
            case 1:
                return <AddCall
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={values}
                />
            case 2:
                return <AddPatient
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    handleGender={this.handleGender}
                    values={values}
                />
            case 3:
                return <AddInterventions
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                />
            case 4:
                return <Confirm
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleSubmit={this.handleSubmit}
                    values={values}
                />
            case 5:
                return <Redirect to={this.state.redirect}/>
        }
    }
}
