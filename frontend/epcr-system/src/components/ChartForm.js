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
            unit: "M-01",
            ctype: "Clinic",
            nature: "B/P check",
            care: "BLS",
            loc: "",
            loctype: "Rescate clinic",
            disp: "Treat and release",
            dest: "Rescate clinic",
            agency: "",
            trauma: "Animal",
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
            classify: "Adult",
            gender: "Male",
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
        /*const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
        /*const target = event.target;
        if(target.name === "birth") {
            let date = event.target.value;
            let newDate = date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
            this.setState({ birth: newDate })
            alert(this.state.birth);
        } else {*/
            console.log(event.toISOString());
            this.setState({ [input]: event.target.value })
        //}
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
        const olddate = this.state.callinfo.idate;
        const date =  olddate.substring(8, 10) + "/" + olddate.substring(5, 7) + "/" + olddate.substring(0, 4);
        const nature = this.state.callinfo.nature;
        const loctype = this.state.callinfo.loctype;
        const disp = this.state.callinfo.disp;
        const dest = this.state.callinfo.dest;
        const trauma = this.state.callinfo.trauma;
        // patient variables
        const fname = this.state.fname;
        const lname = this.state.lname;
        const classify = this.state.classify;
        const gender = this.state.gender;

        /* variables used to reduce fields */
        // call variables
        let incident = this.state.callinfo.ino + " | " + this.state.callinfo.unit + " | " + this.state.callinfo.ctype + " | " + this.state.callinfo.care + " | " + this.state.callinfo.loc;
        if(this.state.callinfo.fallht) { incident += " | " + this.state.callinfo.fallht; }
        let agency = this.state.agency;
        let mci = "";
        let va = "";
        if(this.state.callinfo.triage) {
            mci = this.state.callinfo.ptct + " | " + this.state.callinfo.triage;
        }
        if(this.state.callinfo.vatype) {
            va = this.state.callinfo.vatype + " | " + this.state.callinfo.vaimpact + " | " + this.state.callinfo.vasafe + " | " + this.state.callinfo.vaspd + " mph | " + this.state.callinfo.vaeject;
        }
        const times = this.state.callinfo.dispatch + " | " + this.state.callinfo.enroute + " | " + this.state.callinfo.arrscn + " | " + this.state.callinfo.contact + " | " + this.state.callinfo.dptscn + " | " + this.state.callinfo.arrdes + " | " + this.state.callinfo.trcare;
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
        const { ino, idate, unit, ctype, nature, care, loctype, loc,
            disp, dest, agency, trauma, fallht, enrouteDisplay, arcscnDisplay, contactDisplay,
            dptscnDisplay, arrdesDisplay, trcareDisplay, dispatchDisplay, idateDisplay,
            mci, ptct, triage, va, vatype, vasafe, vaimpact, vaspd, vaeject,
            dispatch, enroute, arrscn, contact, dptscn, arrdes, trcare,
            fname, lname, birth, classify, gender, weight, address, city, country, zip,
            procedure,
            callinfo
        } = this.state;
        const values = {
            ino, idate, idateDisplay, unit, ctype, nature, care, loctype, loc,
            disp, dest, agency, trauma, fallht,
            mci, ptct, triage, va, vatype, vasafe, vaimpact, vaspd, vaeject,
            dispatch, enrouteDisplay, arcscnDisplay, contactDisplay,
            dptscnDisplay, arrdesDisplay, trcareDisplay, dispatchDisplay,
            fname, lname, birth, classify, gender, weight, address, city, country, zip,
            procedure
        };
        switch (step) {
            case 1:
                return <AddCall
                    nextStep={this.nextStep}
                    navigate={this.navigate}
                    handleChange={this.handleChange}
                    handleDate={this.handleDate}
                    fetchNewInput={this.fetchNewInput}
                    values={values}
                    callinfo={callinfo}
                />
            case 2:
                return <AddPatient
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    navigate={this.navigate}
                    handleChange={this.handleChange}
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
                    callinfo={callinfo}
                />
            case 5:
                return <Redirect to={this.state.redirect}/>
        }
    }
}