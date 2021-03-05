import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { MainContext } from '../Auth'
import '../App.css'
import '../Sidebar.css'
import AddCall from './AddCall'
import AddPatient from './AddPatient'
import AddInterventions from './AddInterventions'
import PhysicalAssessment from './PhysicalAssessment'
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
            // Physical Assessment
            abdomen: [],
            pelvis: [],
            back: [],
            left_upper_arm: [],
            left_lower_arm: [],
            left_hand_wrist: [],
            left_upper_leg: [],
            left_lower_leg: [],
            left_ankle_foot: [],
            right_upper_arm: [],
            right_lower_arm: [],
            right_hand_wrist: [],
            right_upper_leg: [],
            right_lower_leg: [],
            right_ankle_foot: [],
            extra_findings: [],
            stroke_time: [],
            stroke_facial_droop: [],
            stroke_arm_drift: [],
            stroke_abnormal_speech: [],
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
        const vehicle_accident_ejected = this.state.vaeject;
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
        // Physical Assessment
        const abdomen = this.state.abdomen;
        const pelvis = this.state.pelvis;
        const back = this.state.back;
        const left_upper_arm = this.state.left_upper_arm;
        const left_lower_arm = this.state.left_lower_arm;
        const left_hand_wrist = this.state.left_hand_wrist;
        const left_upper_leg = this.state.left_upper_leg;
        const left_lower_leg = this.state.left_lower_leg;
        const left_ankle_foot = this.state.left_ankle_foot;
        const right_upper_arm = this.state.right_upper_arm;
        const right_lower_arm = this.state.right_lower_arm;
        const right_hand_wrist = this.state.right_hand_wrist;
        const right_upper_leg = this.state.right_upper_leg;
        const right_lower_leg = this.state.right_lower_leg;
        const right_ankle_foot = this.state.right_ankle_foot;
        const extra_findings = this.state.extra_findings;
        const stroke_time = this.state.stroke_time;
        const stroke_facial_droop = this.state.stroke_facial_droop;
        const stroke_arm_drift = this.state.stroke_arm_drift;
        const stroke_abnormal_speech = this.state.stroke_abnormal_speech;
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
                body: { incident_number, incident_date, location, incident_address, disposition, agencies, patient_count, triage_color, dispatch_date_time, enroute_date_time, arrive_date_time, patient_contact_date_time, depart_date_time, transfer_date_time, unit_number, call_type, call_nature, care_level, destination, trauma_cause, vehicle_accident_type, vehicle_accident_impact, vehicle_accident_safety_equipment, vehicle_accident_mph, vehicle_accident_ejected, medications, procedures, p_weight, p_classify, p_bcolor, p_address, p_phone, p_history, abdomen, pelvis, back, left_upper_arm, left_lower_arm, left_hand_wrist, left_upper_leg, left_lower_leg, left_ankle_foot, right_upper_arm, right_lower_arm, right_hand_wrist, right_upper_leg, right_lower_leg, right_ankle_foot, extra_findings, stroke_time, stroke_facial_droop, stroke_arm_drift, stroke_abnormal_speech},
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
                return <PhysicalAssessment
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    navigate={this.navigate}
                    handleChange={this.handleChange}
                    values={values}
                />
            case 5:
                return <Confirm
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    navigate={this.navigate}
                    handleSubmit={this.handleSubmit}
                    values={values}
                />
            case 6:
                return <Redirect to={this.state.redirect}/>
        }
    }
}