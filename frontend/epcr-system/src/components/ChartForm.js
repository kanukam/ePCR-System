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
        this.state = {
            message: "",
            success: false,
            step: 1,
            redirect: "/Patients",
            callinfo: [],
            // all default variables across section forms!
            /* call */
            ino: "",
            idate: "",
            idateDisplay: "",
            unit: "",
            ctype: "",
            nature: "",
            care: "",
            loc: "",
            loctype: "",
            disp: "",
            dest: "",
            agency: "",
            trauma: "",
            fallht: "",
            // this section must be blank by default
            mci: "",
            ptct: "",
            triage: "",
            va: "",
            vatype: "",
            vasafe: "",
            vaimpact: "",
            vaspd: "",
            vaeject: "",
            //
            dispatch: "",
            dispatchDisplay: "",
            enroute: "",
            enrouteDisplay: "",
            arrscn: "",
            arcscnDisplay: "",
            contact: "",
            contactDisplay: "",
            dptscn: "",
            dptscnDisplay: "",
            arrdes: "",
            arrdesDisplay: "",
            trcare: "",
            trcareDisplay:"",
            /* patient */
            fname: "",
            lname: "",
            birth: "",
            birthDisplay: "",
            classify: "",
            gender: "",
            weight: "",
            address: "",
            city: "",
            country: "",
            zip: "",
            phone: "",
            history: "", // subject to change
            /* interventions */
            procedure: ""
        };
    }

    handleChange = input => event => {
        this.setState({ [input]: event.target.value });
    }

    handleDate = input => date => {
        var displayedDate = input + "Display";
        console.log(date);
        this.setState({ [displayedDate]: date });
        date = date.toISOString();
        this.setState({ [input]: date });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        /* variables used for monthly/yearly reporting */
        // call variables
        // patient variables
        const fname = this.state.fname;
        const lname = this.state.lname;
        const classify = this.state.classify;
        const gender = this.state.gender;

        /* variables used to reduce fields */
        // call variables
        let agency = this.state.agency;
        let mci = "";
        let va = "";
        // patient variables
        const dob = this.state.birth;
        // Testing date, empty string dates will trigger an error on backend without this
        const birth = dob || null;
        const weight = this.state.weight;
        const address = this.state.address + ", " + this.state.city + ", " + this.state.country + " " + this.state.zip;
        const phone = this.state.phone;
        // interventions variables
        const procedure = this.state.procedure;
        /* send to backend */
        /*
        const url = 'http://localhost:3000/charts/add';
        const options = {
            method: 'POST',
            body: JSON.stringify({ date, incident, loctype, nature, disp, dest, agency, trauma, mci, va, times, fname, lname, birth, classify, gender, weight, address, phone, procedure }),
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
        */
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

    navigate = (input) => {
        this.setState({
            step: input
        })
    }

    fetchNewInput = (input, num) => {
        var obj = JSON.parse(input);
        if(num === 1) { this.setState({callinfo: obj}); }
    }

    render() {
        const { step } = this.state;
        const {callinfo} = this.state;
        const values = this.state;
        switch (step) {
            case 1:
                return <AddCall
                    nextStep={this.nextStep}
                    navigate={this.navigate}
                    handleChange={this.handleChange}
                    handleDate={this.handleDate}
                    values={values}
                />
            case 2:
                return <AddPatient
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    navigate={this.navigate}
                    handleChange={this.handleChange}
                    handleDate={this.handleDate}
                    values={values}
                />
            case 3:
                return <AddInterventions
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    navigate={this.navigate}
                    handleChange={this.handleChange}
                    values={values}
                />
            case 4:
                return <Confirm
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    navigate={this.navigate}
                    handleSubmit={this.handleSubmit}
                    values={values}
                />
            case 5:
                return <Redirect to={this.state.redirect}/>
        }
    }
}