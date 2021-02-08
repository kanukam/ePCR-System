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
            redirect: "/PatientList",
            // all variables across section forms!
            no: "",
            date: currentDate,
            type: "Clinic",
            mci: "",
            pt: "",
            care: "BLS",
            triage: "Green",
            loc: "",
            loctype: "Clinic",
            dispatch: "",
            enroute: "",
            scene: "",
            contact: "",
            enroute2: "",
            arrive: "",
            /* patient */
            fname: "",
            lname: "",
            birth: "", // datetime, age is calculated based on this
            classify: "",
            gender: "Male",
            weight: "", // in kg
            address: "",
            city: "",
            country: "",
            zip: "",
            phone: "",
            history: "", // subject to change
            /* */
            procedure: ""
        };
    }

    handleChange = input => event => {
        /*const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});*/
        /*const target = event.target;
        if(target.name === "birth") {
            let date = event.target.value;
            let newDate = date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
            this.setState({ birth: newDate })
            alert(this.state.birth);
        } else {*/
            this.setState({ [input]: event.target.value })
        //}
    }

    handleToggle = input => event => {
        this.setState({loctype: event})
    }

    handleDate = input => event => {
        let date = event.target.value;
        let newDate = date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
        this.setState({ [input]: newDate })
        alert(this.state.birth);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // call variables
        const call = this.state.no + " | " + this.state.type + " | " + this.state.mci + " | " + this.state.pt + " | " + this.state.care + " | " + this.state.triage + " | " + this.state.loc + " | " + this.state.loctype;
        const olddate = this.state.date;
        const date =  olddate.substring(8, 10) + "/" + olddate.substring(5, 7) + "/" + olddate.substring(0, 4);
        const times = this.state.dispatch + " | " + this.state.enroute + " | " + this.state.scene + " | " + this.state.contact + " | " + this.state.enroute2 + " | " + this.state.arrive;
        // patient variables
        const fname = this.state.fname;
        const lname = this.state.lname;
        const dob = this.state.birth;
        const birth = dob.substring(8, 10) + "/" + dob.substring(5, 7) + "/" + dob.substring(0, 4);
        const classify = this.state.classify;
        const gender = this.state.gender;
        const weight = this.state.weight;
        const address = this.state.address + ", " + this.state.city + ", " + this.state.country + ", " + this.state.zip;
        const phone = this.state.phone;
        // interventions variables
        const procedure = this.state.procedure;
        // send to backend
        const url = 'http://localhost:3000/charts/add';
        const options = {
            method: 'POST',
            body: JSON.stringify({ call, date, times, fname, lname, birth, classify, gender, weight, address, phone, procedure }),
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
            mci,
            pt,
            care,
            triage,
            loc,
            loctype,
            dispatch,
            enroute,
            scene,
            contact,
            enroute2,
            arrive,
            fname,
            lname,
            birth,
            classify,
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
            mci,
            pt,
            care,
            triage,
            loc,
            loctype,
            dispatch,
            enroute,
            scene,
            contact,
            enroute2,
            arrive,
            fname,
            lname,
            birth,
            classify,
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
                    handleDate={this.handleDate}
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