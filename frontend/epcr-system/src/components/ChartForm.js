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
        // Creating Assessment checkboxes object
        this.state = {
            message: "",
            assessmentCheckBoxes: {
                1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false, 19: false, 20: false, 21: false, 22: false, 23: false, 24: false, 25: false, 26: false, 27: false, 28: false, 29: false, 30: false, 31: false, 32: false, 33: false, 34: false, 35: false, 36: false, 37: false, 38: false, 39: false, 40: false, 41: false, 42: false, 43: false, 44: false, 45: false, 46: false, 47: false, 48: false, 49: false, 50: false, 51: false, 52: false, 53: false, 54: false, 55: false, 56: false, 57: false, 58: false, 59: false, 60: false, 61: false, 62: false, 63: false, 64: false, 65: false, 66: false, 67: false, 68: false, 69: false, 70: false, 71: false, 72: false, 73: false, 74: false, 75: false, 76: false, 77: false, 78: false, 79: false, 80: false, 81: false, 82: false, 83: false, 84: false, 85: false, 86: false, 87: false, 88: false, 89: false, 90: false, 91: false, 92: false, 93: false, 94: false, 95: false, 96: false, 97: false, 98: false, 99: false, 100: false, 101: false, 102: false, 103: false, 104: false, 105: false, 106: false, 107: false, 108: false, 109: false, 110: false, 111: false, 112: false, 113: false, 114: false, 115: false, 116: false, 117: false, 118: false, 119: false, 120: false, 121: false, 122: false, 123: false, 124: false, 125: false, 126: false, 127: false, 128: false, 129: false, 130: false, 131: false, 132: false, 133: false, 134: false, 135: false, 136: false, 137: false, 138: false, 139: false, 140: false, 141: false, 142: false, 143: false, 144: false, 145: false, 146: false, 147: false, 148: false, 149: false, 150: false, 151: false, 152: false, 153: false, 154: false, 155: false, 156: false, 157: false, 158: false, 159: false, 160: false, 161: false, 162: false, 163: false, 164: false, 165: false, 166: false, 167: false, 168: false, 169: false, 170: false, 171: false, 172: false, 173: false, 174: false, 175: false, 176: false, 177: false, 178: false, 179: false, 180: false, 181: false, 182: false, 183: false, 184: false, 185: false, 186: false, 187: false, 188: false, 189: false, 190: false, 191: false, 192: false, 193: false, 194: false, 195: false, 196: false, 197: false, 198: false, 199: false, 200: false, 201: false, 202: false, 203: false, 204: false, 205: false, 206: false, 207: false, 208: false, 209: false, 210: false, 211: false, 212: false, 213: false, 214: false, 215: false, 216: false, 217: false, 218: false, 219: false, 220: false, 221: false, 222: false, 223: false, 224: false, 225: false, 226: false, 227: false, 228: false, 229: false, 230: false, 231: false, 232: false, 233: false, 234: false, 235: false, 236: false, 237: false, 238: false, 239: false, 240: false, 241: false, 242: false, 243: false, 244: false, 245: false, 246: false, 247: false, 248: false, 249: false, 250: false, 251: false, 252: false, 253: false, 254: false, 255: false, 256: false, 257: false, 258: false, 259: false, 260: false, 261: false, 262: false, 263: false, 264: false, 265: false, 266: false, 267: false, 268: false, 269: false, 270: false, 271: false, 272: false, 273: false, 274: false, 275: false, 276: false, 277: false, 278: false, 279: false, 280: false, 281: false, 282: false, 283: false, 284: false, 285: false, 286: false, 287: false, 288: false, 289: false, 290: false, 291: false, 292: false, 293: false, 294: false, 295: false, 296: false, 297: false, 298: false, 299: false, 300: false, 301: false, 302: false, 303: false, 304: false, 305: false, 306: false, 307: false, 308: false, 309: false, 310: false, 311: false, 312: false, 313: false, 314: false, 315: false, 316: false, 317: false, 318: false, 319: false, 320: false, 321: false, 322: false, 323: false, 324: false, 325: false, 326: false, 327: false, 328: false, 329: false, 330: false, 331: false, 332: false, 333: false, 334: false, 335: false, 336: false, 337: false, 338: false, 339: false, 340: false, 341: false, 342: false, 343: false, 344: false, 345: false, 346: false, 347: false, 348: false, 349: false, 350: false, 351: false, 352: false, 353: false, 354: false, 355: false, 356: false, 357: false, 358: false, 359: false, 360: false, 361: false, 362: false, 363: false, 364: false, 365: false, 366: false, 367: false, 368: false, 369: false, 370: false, 371: false, 372: false, 373: false, 374: false, 375: false, 376: false, 377: false, 378: false, 379: false, 380: false, 381: false, 382: false, 383: false, 384: false, 385: false, 386: false, 387: false, 388: false, 389: false, 390: false, 391: false, 392: false, 393: false, 394: false, 395: false, 396: false, 397: false, 398: false, 399: false, 400: false
            },
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
            // Physical Assessment
            skin: [],
            mental: [],
            neurological: [],
            head: [],
            neck: [],
            chest: [],
            pulse_strength: "",
            pulse_rate: "",
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
            vital_signs: [],
            vital_signs_time: "",
            vital_signs_pulse: "",
            vital_signs_b_p: "",
            vital_signs_resp: "",
            vital_signs_spo2: "",
            vital_signs_gcs: "",
            vital_signs_pain: "",
            vital_signs_temp: "",
            vital_signs_etco2: "",
            extra_findings: "",
            stroke_time: "",
            stroke_facial_droop: "",
            stroke_arm_drift: "",
            stroke_abnormal_speech: "",
            /* interventions */
            procedure: "",
            none: [],
        };
    }

    handleChange = input => event => {
        this.setState({ [input]: event.target.value });
    }

    handleAssessmentCheckboxes = boxNumber => event => {
        var bodyPart = event.target.name;
        var vals = this.state[bodyPart];
        var checkBoxValue = event.target.value;
        var assessmentCheckBoxes = this.state.assessmentCheckBoxes;
        var checkbox = assessmentCheckBoxes[boxNumber];
        // Remove word from array
        if(checkbox){
            vals = vals.filter(word => word !== checkBoxValue);
            // Convert to array if integer
            if(vals === parseInt(vals, 10)){
                vals = [vals];
            }
            // set state to False
            assessmentCheckBoxes[boxNumber] = false;
            this.setState({ assessmentCheckBoxes });
            // Set to filtered array
            this.setState({ [bodyPart]: [...vals] });
        }
        else{
            // Add value and marked checked as true
            vals.push(checkBoxValue);
            assessmentCheckBoxes[boxNumber] = true;
            this.setState({ assessmentCheckBoxes });
            this.setState({ [bodyPart]: [...vals] });
        }
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

    appendVitals = vitals => {
        var vital_signs = this.state.vital_signs;
        vital_signs.push(vitals);
        this.setState({ vital_signs });
        // Clear vitals in case the user wants to add more
        this.setState({
            vital_signs_time: "",
            vital_signs_pulse: "",
            vital_signs_b_p: "",
            vital_signs_resp: "",
            vital_signs_spo2: "",
            vital_signs_gcs: "",
            vital_signs_pain: "",
            vital_signs_temp: "",
            vital_signs_etco2: ""});
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
        const skin = this.state.skin.join();
        const mental = this.state.mental.join();
        const neurological = this.state.neurological.join();
        const head = this.state.head.join();
        const neck = this.state.neck.join();
        const chest = this.state.chest.join();
        const pulse_strength = this.state.pulse_strength;
        const pulse_rate = this.state.pulse_rate;
        const abdomen = this.state.abdomen.join();
        const pelvis = this.state.pelvis.join();
        const back = this.state.back.join();
        const left_upper_arm = this.state.left_upper_arm.join();
        const left_lower_arm = this.state.left_lower_arm.join();
        const left_hand_wrist = this.state.left_hand_wrist.join();
        const left_upper_leg = this.state.left_upper_leg.join();
        const left_lower_leg = this.state.left_lower_leg.join();
        const left_ankle_foot = this.state.left_ankle_foot.join();
        const right_upper_arm = this.state.right_upper_arm.join();
        const right_lower_arm = this.state.right_lower_arm.join();
        const right_hand_wrist = this.state.right_hand_wrist.join();
        const right_upper_leg = this.state.right_upper_leg.join();
        const right_lower_leg = this.state.right_lower_leg.join();
        const right_ankle_foot = this.state.right_ankle_foot.join();
        const vital_signs = this.state.vital_signs.join();
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
                body: {
                    incident_number, incident_date, location, incident_address, disposition, agencies, patient_count, triage_color, dispatch_date_time, enroute_date_time, arrive_date_time, patient_contact_date_time, depart_date_time, transfer_date_time, unit_number, call_type, call_nature, care_level, destination, trauma_cause, vehicle_accident_type, vehicle_accident_impact, vehicle_accident_safety_equipment, vehicle_accident_mph, vehicle_accident_ejected, medications, procedures, p_weight, p_classify, p_bcolor, p_address, p_phone, p_history, abdomen, pelvis, back, left_upper_arm, left_lower_arm, left_hand_wrist, left_upper_leg, left_lower_leg, left_ankle_foot, right_upper_arm, right_lower_arm, right_hand_wrist, right_upper_leg, right_lower_leg, right_ankle_foot, extra_findings, stroke_time, stroke_facial_droop, stroke_arm_drift, stroke_abnormal_speech, skin, mental, neurological, head, neck, chest, pulse_strength, pulse_rate, vital_signs
                },
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
                    handleAssessmentCheckboxes={this.handleAssessmentCheckboxes}
                    appendVitals={this.appendVitals}
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