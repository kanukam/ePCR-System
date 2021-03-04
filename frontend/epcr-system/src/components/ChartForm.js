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
            redirect: "/ViewCharts",
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
            state: "",
            country: "",
            zip: "",
            phone: "",
            history: "", // subject to change
            braslow: "",
            /* interventions */
            procedure: ""
        };
    }

    handleChange = input => event => {
        this.setState({ [input]: event.target.value });
    }

    handleDate = input => date => {
        var displayedDate = input + "Display";
        this.setState({ [displayedDate]: date });
        date = date.toISOString().slice(0, 19).replace('T', " ");
        this.setState({ [input]: date });
    }

    handleDateNoTime = input => date => {
        var displayedDate = input + "Display";
        this.setState({ [displayedDate]: date });
        date = (date.toISOString()).split("T", 1)[0]
        this.setState({ [input]: date });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Chart Table
        const incident_number = this.state.ino;
        const incident_date = this.state.idate || null;
        const location = this.state.dest;
        const incident_address = this.state.loc;
        const disposition = this.state.disp;
        const agencies = this.state.agency;
        const patient_count = this.state.ptct;
        const triage_color = this.state.triage;
        const dispatch_date_time = this.state.dispatch || null;
        const enroute_date_time = this.state.enroute || null;
        const arrive_date_time = this.state.arrscn || null;
        const patient_contact_date_time = this.state.contact || null;
        const transfer_date_time = this.state.trcare || null;
        const depart_date_time = this.state.dptscn || null;
        const unit_number = this.state.unit;
        const call_type = this.state.ctype;
        const call_nature = this.state.nature;
        const care_level = this.state.care;
        const destination = this.state.dest;
        const trauma_cause = this.state.trauma; 
        const vehicle_accident_type = this.state.vatype;
        const vehicle_accident_impact = this.state.vaimpact;
        const vehicle_accident_safety_equipment = this.state.vasafe;
        const vehicle_accident_mph = this.state.vaspd;
        const vehicle_accident_ejected = this.state.eject;
        const medications = this.state.medications;
        const procedures = this.state.procedure;
        const p_weight = this.state.weight;
        const p_classify = this.state.classify;
        const p_bcolor = this.state.braslow;
        let p_address = "";
        if(this.state.address || this.state.city || this.state.st || this.state.country || this.state.zip){
            p_address = this.state.address + " " + this.state.city + ", " + this.state.state + " " + this.state.zip +  " " + this.state.country;
        }
        const p_phone = this.state.address;
        const p_history = this.state.history;
        // Patient Table
        const fname = this.state.fname;
        const lname = this.state.lname;
        const birth = this.state.birth || null;
        const gender = this.state.gender;
        /* send to backend */
        const url = 'http://localhost:3000/charts/add';
        const options = {
            method: 'POST',
            body: JSON.stringify({
                body: { incident_number, incident_date, location, incident_address, disposition, agencies, patient_count, triage_color, dispatch_date_time, enroute_date_time, arrive_date_time, patient_contact_date_time, depart_date_time, transfer_date_time, unit_number, call_type, call_nature, care_level, destination, trauma_cause, vehicle_accident_type, vehicle_accident_impact, vehicle_accident_safety_equipment, vehicle_accident_mph, vehicle_accident_ejected, medications, procedures, p_weight, p_classify, p_bcolor, p_address, p_phone, p_history},
                    pbody: {fname, lname, birth, gender}
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        console.log(options);
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

    render() {
        const { step } = this.state;
        const values = this.state;
        switch (step) {
            case 1:
                return <AddCall
                    nextStep={this.nextStep}
                    navigate={this.navigate}
                    handleChange={this.handleChange}
                    handleDate={this.handleDate}
                    handleDateNoTime={this.handleDateNoTime}
                    values={values}
                />
            case 2:
                return <AddPatient
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    navigate={this.navigate}
                    handleChange={this.handleChange}
                    handleDate={this.handleDate}
                    handleDateNoTime={this.handleDateNoTime}
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