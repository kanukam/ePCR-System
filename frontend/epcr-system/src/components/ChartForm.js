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
import moment from 'moment'

export default class ChartForm extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        // Creating Assessment checkboxes object
        this.state = {
            message: "",
            assessmentCheckBoxes: {
                /* 261, 318-400 are not used */
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
            agency: [],
            trauma: "",
            fallht: "",
            // this section must be blank by default
            mci: "",
            ptct: "",
            triage: "",
            va: "",
            vatype: "",
            vasafe: "",
            vaimpact: [],
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
            trcareDisplay: "",
            /* patient */
            pid: "",
            fname: "",
            lname: "",
            birth: "",
            birthDisplay: "",
            classify: "",
            gender: "",
            weight: "",
            subdivision: "",
            street: "",
            blvd: "",
            km: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
            braslow: "",
            hpi: "",
            historyGiven: [],
            medAllergy: "",
            envAllergy: "",
            immunization: "",
            pastHistory: [],
            pastHistoryOther: "",
            // physical exam
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
            vital_signs_b_p_d: "",
            vital_signs_b_p_s: "",
            vital_signs_resp: "",
            vital_signs_spo2: "",
            vital_signs_gcs_e: "",
            vital_signs_gcs_v: "",
            vital_signs_gcs_m: "",
            vital_signs_pain: "0",
            vital_signs_temp: "",
            vital_signs_etco2: "",
            extra_findings: "",
            stroke_time: "",
            stroke_facial_droop: "",
            stroke_arm_drift: "",
            stroke_abnormal_speech: "",
            bsa: 0,
            /* interventions */
            procedures: [],
            medications: [],
            ioBleedPT: "",
            ioBleedT: "",
            ioIVPT: "",
            ioIVT: "",
            ioOralPT: "",
            ioOralT: "",
            ioVomitPT: "",
            ioVomitT: "",
            oGravid: "",
            oPara: "",
            oAbortion: "",
            oDuedate: "",
            oDuedateDisplay: "",
            oGestation: "",
            oVaginalBleed: "",
            oContraction: "",
            oFrequency: "",
            oDuration: "",
            oWaterRupture: "",
            oWaterColor: "",
            oBabyMoving: "",
            oDelivery: "",
            oPlacenta: "",
            oBabySex: "",
            oBorn: "",
            oAPGAR1: "",
            oAPGAR5: "",
            oAPGAR10: "",
            none: [],
        };
    }

    handleChange = input => event => {
        this.setState({ [input]: event.target.value });
    }

    handleCheckbox = input => event => {
        const target = event.target;
        var value = target.value;
        if (target.checked) {
            if (input === "agency") { this.state.agency.push(value); }
            else if (input === "vaimpact") { this.state.vaimpact.push(value); }
            else if (input === "historyGiven") { this.state.historyGiven.push(value); }
        } else {
            if (input === "agency") { this.state.agency.splice(value, 1); }
            else if (input === "vaimpact") { this.state.vaimpact.splice(value, 1); }
            else if (input === "historyGiven") { this.state.historyGiven.splice(value, 1); }
        }
    }

    handleAssessmentCheckboxes = boxNumber => event => {
        var bodyPart = event.target.name;
        var vals = this.state[bodyPart];
        var checkBoxValue = event.target.value;
        var assessmentCheckBoxes = this.state.assessmentCheckBoxes;
        var checkbox = assessmentCheckBoxes[boxNumber];
        // Remove word from array
        if (checkbox) {
            vals = vals.filter(word => word !== checkBoxValue);
            // Convert to array if integer
            if (vals === parseInt(vals, 10)) {
                vals = [vals];
            }
            // set state to False
            assessmentCheckBoxes[boxNumber] = false;
            this.setState({ assessmentCheckBoxes });
            // Set to filtered array
            this.setState({ [bodyPart]: [...vals] });
        }
        else {
            // Add value and marked checked as true
            vals.push(checkBoxValue);
            assessmentCheckBoxes[boxNumber] = true;
            this.setState({ assessmentCheckBoxes });
            this.setState({ [bodyPart]: [...vals] });
        }
        //this.calculateBurn(boxNumber);        
    }

    calculateBurn(boxNumber) {
        // handle burn calculations
        var assessmentCheckBoxes = this.state.assessmentCheckBoxes;
        var total = this.state.bsa;
        if (boxNumber === 51) {
            if(assessmentCheckBoxes[boxNumber]) { total += 3.5; }
            else { total -= 3.5; }
        } // head front
        if (boxNumber === 52) {
            if(assessmentCheckBoxes[boxNumber]) { total += 3.5; }
            else { total -= 3.5; }
        } // head back
        if (boxNumber === 62) {
            if(assessmentCheckBoxes[boxNumber]) { total += 1.0; }
            else { total -= 1.0; }
        } // neck front
        if (boxNumber === 63) {
            if(assessmentCheckBoxes[boxNumber]) { total += 1.0; }
            else { total -= 1.0; }
        } // neck back
        if (boxNumber === 80) {
            if(assessmentCheckBoxes[boxNumber]) { total += 13.0; }
            else { total -= 13.0; }
        } // chest
        if (boxNumber === 91) {
            if(assessmentCheckBoxes[boxNumber]) { total += 5.0; }
            else { total -= 5.0; }
        } // abdomen
        if (boxNumber === 102) {
            if(assessmentCheckBoxes[boxNumber]) { total += 5.0; }
            else { total -= 5.0; }
        } // pelvis (using buttocks value)
        if (boxNumber === 114) {
            if(assessmentCheckBoxes[boxNumber]) { total += 13.0; }
            else { total -= 13.0; }
        } // back
        if (boxNumber === 126) {
            if(assessmentCheckBoxes[boxNumber]) { total += (2 * 2.0); }
            else { total -= (2 * 2.0); }
        } // upper arm left (front + back)
        if (boxNumber === 138) {
            if(assessmentCheckBoxes[boxNumber]) { total += (2 * 2.0); }
            else { total -= (2 * 2.0); }
        } // upper arm right (front + back)
        if (boxNumber === 150) {
            if(assessmentCheckBoxes[boxNumber]) { total += (2 * 1.5); }
            else { total -= (2 * 1.5); }
        } // lower arm left (front + back)
        if (boxNumber === 162) {
            if(assessmentCheckBoxes[boxNumber]) { total += (2 * 1.5); }
            else { total -= (2 * 1.5); }
        } // lower arm right (front + back)
        if (boxNumber === 174) {
            if(assessmentCheckBoxes[boxNumber]) { total += (2 * 1.0); }
            else { total -= (2 * 1.0); }
        } // hand wrist left (front + back)
        if (boxNumber === 186) {
            if(assessmentCheckBoxes[boxNumber]) { total += (2 * 1.0); }
            else { total -= (2 * 1.0); }
        } // hand wrist right (front + back)
        if (boxNumber === 198) {
            if(assessmentCheckBoxes[boxNumber]) { total += (2 * 4.5); }
            else { total -= (2 * 4.5); }
        } // upper leg left (front + back)
        if (boxNumber === 210) {
            if(assessmentCheckBoxes[boxNumber]) { total += (2 * 4.5); }
            else { total -= (2 * 4.5); }
        } // upper leg left (front + back)
        if (boxNumber === 222) {
            if(assessmentCheckBoxes[boxNumber]) { total += (2 * 3.0); }
            else { total -= (2 * 3.0); }
        } // lower leg left (front + back)
        if (boxNumber === 234) {
            if(assessmentCheckBoxes[boxNumber]) { total += (2 * 3.0); }
            else { total -= (2 * 3.0); }
        } // lower leg right (front + back)
        if (boxNumber === 246) {
            if(assessmentCheckBoxes[boxNumber]) { total += (2 * 1.5); }
            else { total -= (2 * 1.5); }
        } // ankle foot left (front + back)
        if (boxNumber === 258) {
            if(assessmentCheckBoxes[boxNumber]) { total += (2 * 1.5); }
            else { total -= (2 * 1.5); }
        } // ankle foot right (front + back)
        this.setState({ bsa: total });
    }

    handleDate = input => date => {
        var displayedDate = input + "Display";
        this.setState({ [displayedDate]: date });
        date = moment(date).format("YYYY-MM-DDTHH:mm");
        this.setState({ [input]: date });
    }

    handleDateNoTime = input => date => {
        var displayedDate = input + "Display";
        this.setState({ [displayedDate]: date });
        date = moment(date).format("YYYY-MM-DD");
        this.setState({ [input]: date });
    }

    displayTime(time) {
        var index = time.indexOf("-");
        var lastIndex = time.lastIndexOf("-");
        var year = time.substring(0, index);
        var month = time.substring(index + 1, index + 3);
        var day = time.substring(lastIndex + 1);
        return day + "/" + month + "/" + year;
    }

    testingDate = input => event => {
        var displayedDate = input + "Display";
        var date = this.displayTime(event.target.value);
        alert(date);
        this.setState({ [displayedDate]: date })
    }

    appendVitals = vitals => {
        var vital_signs = this.state.vital_signs;
        vital_signs.push(vitals);
        this.setState({ vital_signs });
        // Clear vitals in case the user wants to add more
        this.setState({
            vital_signs_time: "",
            vital_signs_pulse: "",
            vital_signs_resp: "",
            vital_signs_spo2: "",
            vital_signs_gcs_e: "",
            vital_signs_gcs_v: "",
            vital_signs_gcs_m: "",
            vital_signs_pain: "0",
            vital_signs_temp: "",
            vital_signs_etco2: "",
            vital_signs_b_p_d: "",
            vital_signs_b_p_s: ""
        });
    }

    appendProcedures = procedure => {
        var procedures = this.state.procedures;
        procedures.push(procedure);
        this.setState({ procedures });
    }

    deleteProcedures = index => {
        var procedures = this.state.procedures;
        procedures.splice(index, 1);
        this.setState({ procedures });
    }

    appendMedications = medication => {
        var medications = this.state.medications;
        medications.push(medication);
        this.setState({ medications });
    }

    deleteMedications = index => {
        var medications = this.state.medications;
        medications.splice(index, 1);
        this.setState({ medications });
    }

    setPatient = string => {
        var patient = string.split(",");
        var birthDisplay = null;
        if (patient[3]) {
            birthDisplay = new Date(patient[3]);
            birthDisplay.setDate(birthDisplay.getDate() + 1);
        }
        this.setState({
            pid: patient[0],
            fname: patient[1],
            lname: patient[2],
            birth: patient[3],
            gender: patient[4],
            birthDisplay
        });
    }

    setPain = scale => {
        this.setState( {vital_signs_pain: scale} );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.idate === "" || this.state.lname === "" || this.state.fname === "" || this.state.gender === "" || this.state.birth === "") {
            this.setState({ message: "required-fields" });
        } else {
            /* chart table */
            // chart call
            const incident_number = this.state.ino;
            const incident_date = this.state.idate || null;
            const location = this.state.loctype;
            const incident_address = this.state.loc;
            const disposition = this.state.disp;
            const agencies = this.state.agency.join();
            const dispatch_date_time = this.state.dispatch || null;
            const enroute_date_time = this.state.enroute || null;
            const arrive_date_time = this.state.arrscn || null;
            const patient_contact_date_time = this.state.contact || null;
            const depart_date_time = this.state.dptscn || null;
            const arrive_destination_date_time = this.state.arrdes || null;
            const transfer_date_time = this.state.trcare || null;
            const unit_number = this.state.unit;
            const call_type = this.state.ctype;
            const call_nature = this.state.nature;
            const care_level = this.state.care;
            const destination = this.state.dest;
            let trauma_cause = this.state.trauma;
            if (this.state.trauma === "Fall") { trauma_cause += ", " + this.state.fallht + " m"; }
            let patient_count = null;
            let triage_color = null;
            if (this.state.assessmentCheckBoxes[268]) {
                patient_count = this.state.ptct;
                triage_color = this.state.triage;
            }
            let vehicle_accident_type = null;
            let vehicle_accident_impact = null;
            let vehicle_accident_safety_equipment = null;
            let vehicle_accident_mph = null;
            let vehicle_accident_ejected = null;
            if (this.state.assessmentCheckBoxes[269]) {
                vehicle_accident_type = this.state.vatype;
                vehicle_accident_impact = this.state.vaimpact.join();
                vehicle_accident_safety_equipment = this.state.vasafe;
                vehicle_accident_mph = this.state.vaspd;
                vehicle_accident_ejected = this.state.vaeject;
            }
            // chart patient
            const p_weight = this.state.weight;
            const p_classify = this.state.classify;
            const p_bcolor = this.state.braslow;
            let p_address = "";
            if (this.state.subdivision || this.state.street || this.state.blvd || this.state.km || this.state.city || this.state.state) {
                p_address = this.state.subdivision + ", " + this.state.street + ", " + this.state.blvd + ", " + this.state.km + ", " + this.state.city + ", " + this.state.state;
            }
            const p_phone = this.state.phone;
            const p_hpi = this.state.hpi;
            const p_history_given = this.state.historyGiven.join();
            const p_medical_allergies = this.state.medAllergy;
            const p_environmental_allergies = this.state.envAllergy;
            const p_immunizations = this.state.immunization;
            let p_past_medical_history = this.state.pastHistory.join();
            if (p_past_medical_history || this.state.pastHistoryOther) { p_past_medical_history += ", [O - Otro:" + this.state.pastHistoryOther + "]"; }
            // chart assessment
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
            const burn_calculation = this.state.bsa;
            let stroke_time = "";
            let stroke_facial_droop = "";
            let stroke_arm_drift = "";
            let stroke_abnormal_speech = "";
            if (this.state.assessmentCheckBoxes[259]) {
                stroke_time = this.state.stroke_time;
                stroke_facial_droop = this.state.stroke_facial_droop;
                stroke_arm_drift = this.state.stroke_arm_drift;
                stroke_abnormal_speech = this.state.stroke_abnormal_speech;
            }
            let vital_signs = "";
            if (this.state.assessmentCheckBoxes[260]) { vital_signs = this.state.vital_signs.join(); }
            const extra_findings = this.state.extra_findings;
            // chart interventions        
            const medications = this.state.medications.join();
            const procedures = this.state.procedures.join();
            let intake_bleeding = "";
            let intake_iv_fluids = "";
            let intake_oral_fluids = "";
            let intake_vomit = "";
            if (this.state.assessmentCheckBoxes[316]) {
                if (this.state.ioBleedPT || this.state.ioBleedPT || this.state.ioBleedT) { intake_bleeding = "Pre transporte: " + this.state.ioBleedPT + " | Transporte: " + this.state.ioBleedT + " | Total: " + (parseInt(this.state.ioBleedPT) + parseInt(this.state.ioBleedT)); }
                if (this.state.ioIVPT || this.state.ioIVT) { intake_iv_fluids = "Pre transporte: " + this.state.ioIVPT + " | Transporte: " + this.state.ioIVT + " | Total: " + (parseInt(this.state.ioIVPT) + parseInt(this.state.ioIVT)); }
                if (this.state.ioOralPT || this.state.ioOralT) { intake_oral_fluids = "Pre transporte: " + this.state.ioOralPT + " | Transporte: " + this.state.ioOralT + " | Total: " + (parseInt(this.state.ioOralPT) + parseInt(this.state.ioOralT)); }
                if (this.state.ioVomitPT || this.state.ioVomitT) { intake_vomit = "Pre transporte: " + this.state.ioVomitPT + " | Transporte: " + this.state.ioVomitT + " | Total: " + (parseInt(this.state.ioVomitPT) + parseInt(this.state.ioVomitT)); }
            }
            let obstetrics = "";
            if (this.state.assessmentCheckBoxes[317]) {
                if (this.state.oGravid || this.state.oPara || this.state.oAbortion || this.state.oDuedate || this.state.oGestation || this.state.oVaginalBleed || this.state.oContraction || this.state.oFrequency || this.state.oDuration || this.state.oWaterRupture) { obstetrics = "Grávido: " + this.state.oGravid + " | Para: " + this.state.oPara + " | Aborto: " + this.state.oAbortion + " | Fecha de vencimiento: " + this.state.oDuedate + " | Gestación: " + this.state.oGestation + " | Sangrado vaginal: " + this.state.oVaginalBleed + " | Inicio de la contracción: " + this.state.oContraction + " | Frecuencia: " + this.state.oFrequency + " | Duración: " + this.state.oDuration + " | Bolsa de agua rota: " + this.state.oWaterRupture; }
                if (this.state.oWaterRupture === "Sí") { obstetrics += " | Color del fluido: " + this.state.oWaterColor; }
                if (this.state.oBabyMoving || this.state.oDelivery || this.state.oPlacenta || this.state.oBabySex || this.state.oBorn || this.state.oAPGAR1 || this.state.oAPGAR5 || this.state.oAPGAR10) { obstetrics += " | Siente que el bebé se mueve: " + this.state.oBabyMoving + " | Hora de nacimiento: " + this.state.oDelivery + " | Placenta entregada: " + this.state.oPlacenta + " | Sexo del bebé: " + this.state.oBabySex + " | Nacido: " + this.state.oBorn + " | Puntaje de APGAR: 1 = " + this.state.oAPGAR1 + "; 5 = " + this.state.oAPGAR5 + "; 10 = " + this.state.oAPGAR10; }
            }
            /* patient table */
            const patientID = this.state.pid || null;
            //alert(patientID);
            const fname = this.state.fname;
            const lname = this.state.lname;
            const birth = this.state.birth || null;
            const gender = this.state.gender;
            /* send to backend */
            const url = 'http://localhost:3000/api/charts/add';
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    body: {
                        incident_number, incident_date, location, incident_address, disposition, agencies, patient_count, triage_color, dispatch_date_time, enroute_date_time, arrive_date_time, patient_contact_date_time, depart_date_time, arrive_destination_date_time, transfer_date_time, unit_number, call_type, call_nature, care_level, destination, trauma_cause, vehicle_accident_type, vehicle_accident_impact, vehicle_accident_safety_equipment, vehicle_accident_mph, vehicle_accident_ejected, medications, procedures, skin, mental, neurological, head, neck, chest, pulse_strength, pulse_rate, abdomen, pelvis, back, left_upper_arm, left_lower_arm, left_hand_wrist, left_upper_leg, left_lower_leg, left_ankle_foot, right_upper_arm, right_lower_arm, right_hand_wrist, right_upper_leg, right_lower_leg, right_ankle_foot, burn_calculation, extra_findings, stroke_time, stroke_facial_droop, stroke_arm_drift, stroke_abnormal_speech, vital_signs, p_weight, p_classify, p_bcolor, p_address, p_phone, p_hpi, p_history_given, p_medical_allergies, p_environmental_allergies, p_immunizations, p_past_medical_history, intake_bleeding, intake_iv_fluids, intake_oral_fluids, intake_vomit, obstetrics
                    },
                    pbody: { fname, lname, birth, gender },
                    patientID: patientID
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
            console.log(options);
            fetch(url, options).then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw Error;
                }
                this.setState({ message: "Add Successful" });
                this.nextStep();
            }).catch((error) => {
                this.setState({ message: "Add Failed" });
            })
            this.setState({
                success: true
            })
        }
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
                    handleCheckbox={this.handleCheckbox}
                    handleAssessmentCheckboxes={this.handleAssessmentCheckboxes}
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
                    handleCheckbox={this.handleCheckbox}
                    handleAssessmentCheckboxes={this.handleAssessmentCheckboxes}
                    handleDate={this.handleDate}
                    handleDateNoTime={this.handleDateNoTime}
                    testingDate={this.testingDate}
                    setPatient={this.setPatient}
                    values={values}
                />
            case 3:
                return <PhysicalAssessment
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    navigate={this.navigate}
                    handleChange={this.handleChange}
                    handleAssessmentCheckboxes={this.handleAssessmentCheckboxes}
                    setPain={this.setPain}
                    appendVitals={this.appendVitals}
                    values={values}
                />
            case 4:
                return <AddInterventions
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    navigate={this.navigate}
                    handleChange={this.handleChange}
                    handleAssessmentCheckboxes={this.handleAssessmentCheckboxes}
                    handleDate={this.handleDate}
                    appendProcedures={this.appendProcedures}
                    deleteProcedures={this.deleteProcedures}
                    appendMedications={this.appendMedications}
                    deleteMedications={this.deleteMedications}
                    values={values}
                />
            case 5:
                return <Confirm
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    navigate={this.navigate}
                    handleSubmit={this.handleSubmit}
                    handleAssessmentCheckboxes={this.handleAssessmentCheckboxes}
                    values={values}
                />
            case 6:
                return <Redirect to={this.state.redirect} />
        }
    }
}