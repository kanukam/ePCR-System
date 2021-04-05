import React, { Component } from 'react';
import { MainContext } from '../Auth';
import Container from 'react-bootstrap/Container';
import MainNav from './MainNav';
import Notes from './Notes';
import ShowVital from './ShowVital';
import '../App.css'
import moment from 'moment'

export default class ViewChart extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            sidebarHide: true,
            contentSpacing: '0 0 0 150px',
            chart: []
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:3000/charts/patient/' + this.props.match.params.id;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(url, options)
            .then((response) => {
                if(response.ok)
                    return response.json();
                else
                    throw Error("Failed");
            })
            .then((data) => {
                this.setState({chart: data['chart'][0]});
            })
            .catch((error) => {
                console.log(error);
            }); 
    }


    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }

    dateOnly(year) {
        return moment(year).utc().format('DD/MM/YYYY');
    }

    dateAndTime(year) {
        return moment(year).utc().format('DD/MM/YYYY hh:mm A');
    }


    render() {
        // Will error if object destructuring happens and chart isn't sent yet, if statement prevents the error
        if (this.state.chart){
            const {
                fname, lname, birth, gender, p_weight, p_classify, p_bcolor, p_address, p_phone, p_hpi, p_history_given, p_medical_allergies, p_environmental_allergies, p_past_medical_history,
                incident_date, incident_number, unit_number, location, incident_address, disposition, agencies, call_type, call_nature, care_level, destination, trauma_cause,
                patient_count, triage_color, vehicle_accident_type, vehicle_accident_impact, vehicle_accident_safety_equipment, vehicle_accident_mph, vehicle_accident_ejected,
                dispatch_date_time, enroute_date_time, arrive_date_time, patient_contact_date_time, depart_date_time, arrive_destination_date_time, transfer_date_time,
                medications, procedures, skin, mental, neurological, head, neck, chest, pulse_strength, pulse_rate, abdomen, pelvis, back, left_upper_arm, left_lower_arm, left_hand_wrist, left_upper_leg, left_lower_leg, left_ankle_foot, right_upper_arm, right_lower_arm, right_hand_wrist, right_upper_leg, right_lower_leg, right_ankle_foot,
                extra_findings, stroke_time, stroke_facial_droop, stroke_arm_drift, stroke_abnormal_speech, vital_signs,
                intake_bleeding, intake_iv_fluids, intake_oral_fluids, intake_vomit, obstetrics
            } = this.state.chart;
            var vitalList = [];
            return (
                <React.Fragment>
                    <MainNav
                        username={this.context.username}
                        viewcharts={true}
                        sidebarHide={this.state.sidebarHide}
                        contentSpacing={this.state.contentSpacing}
                        toggleCollapse={this.toggleCollapse}
                    />
                    <Container className="main-content" style={{ padding: this.state.contentSpacing }}>

                        <h2 style={{textAlign:'center'}}>Rescate Ambulance Service Patient Care Report</h2>
                        <div className="box">
                            <div className="preview">
                                <div><span>{this.context.translate('view-chart-message')}</span></div>
                            </div>
                            <table className="simpleview">
                                <tr>
                                    <td colspan="2"><b>{this.context.translate('idate')}</b>{incident_date && this.dateOnly(incident_date)}</td>
                                    <td colspan="2"><b>{this.context.translate('ino')}</b>{incident_number}</td>
                                    <td colspan="3"><b>{this.context.translate('unit')}</b>{unit_number}</td>
                                </tr>
                                <tr>
                                    <th colspan="7">Incident Information</th>
                                </tr>
                                <tr>
                                    <td colspan="4"><b>{this.context.translate('iaddress')}</b>{incident_address}</td>
                                    <td><b>{this.context.translate('ilocation')}</b>{location}</td>
                                    <td colspan="2"><b>{this.context.translate('other-agencies')}</b>{agencies}</td>
                                </tr>
                                <tr>
                                    <td><b>{this.context.translate('call-type')}</b>{call_type}</td>
                                    <td><b>{this.context.translate('call-nature')}</b>{call_nature}</td>
                                    <td><b>{this.context.translate('disposition')}</b>{disposition}</td>
                                    <td colspan="2"><b>{this.context.translate('destination')}</b>{destination}</td>
                                    <td colspan="2"><b>{this.context.translate('trauma-cause')}</b>{trauma_cause}</td>
                                </tr>
                                {patient_count !== null ?
                                    <tr>
                                        <td colspan="2"><em>{this.context.translate('mci')}</em>{this.context.translate('yes')}</td>
                                        <td colspan="2"><em>{this.context.translate('num-patients')}</em>{patient_count}</td>
                                        <td colspan="3"><em>{this.context.translate('triage')}</em>{triage_color}</td>
                                    </tr>
                                : null}
                                {vehicle_accident_type !== null ?
                                    <tr>
                                        <td colspan="2"><em>{this.context.translate('vehicle-accident')}</em>{this.context.translate('yes')}</td>
                                        <td><em>{this.context.translate('type')}</em>{vehicle_accident_type}</td>
                                        <td><em>{this.context.translate('impact')}</em>{vehicle_accident_impact}</td>
                                        <td><em>{this.context.translate('safety-equip')}</em>{vehicle_accident_safety_equipment}</td>
                                        <td><em>{this.context.translate('est-spd')}</em>{vehicle_accident_mph} {this.context.translate('mph')}</td>
                                        <td><em>{this.context.translate('eject-vehicle')}</em>{vehicle_accident_ejected}</td>
                                    </tr>
                                : null}
                                <tr>
                                    <th colspan="7">{this.context.translate('response-times')}</th>
                                </tr>
                                <tr>
                                    <td width="14%"><b>{this.context.translate('dispatch')}</b>{dispatch_date_time && this.dateAndTime(dispatch_date_time)}</td>
                                    <td width="14%"><b>{this.context.translate('enroute')}</b>{enroute_date_time && this.dateAndTime(dispatch_date_time)}</td>
                                    <td width="14%"><b>{this.context.translate('arrscn')}</b>{arrive_date_time && this.dateAndTime(dispatch_date_time)}</td>
                                    <td width="14%"><b>{this.context.translate('pcontact')}</b>{patient_contact_date_time && this.dateAndTime(dispatch_date_time)}</td>
                                    <td width="14%"><b>{this.context.translate('dptscn')}</b>{depart_date_time && this.dateAndTime(dispatch_date_time)}</td>
                                    <td width="14%"><b>{this.context.translate('arrdes')}</b>{arrive_destination_date_time && this.dateAndTime(dispatch_date_time)}</td>
                                    <td width="14%"><b>{this.context.translate('trcare')}</b>{transfer_date_time && this.dateAndTime(dispatch_date_time)}</td>
                                </tr>
                                <tr>
                                    <th colspan="7">{this.context.translate('patient-info')}</th>
                                </tr>
                                <tr>
                                    <td colspan="2"><b>{this.context.translate('lname')}</b>{lname}</td>
                                    <td colspan="2"><b>{this.context.translate('fname')}</b>{fname}</td>
                                    <td><b>{this.context.translate('dob')}</b>{birth && this.dateOnly(birth)}</td>
                                    <td><b>{this.context.translate('classify')}</b>{p_classify}</td>
                                    <td><b>{this.context.translate('psex')}</b>{gender}</td>
                                </tr>
                                <tr>
                                    <td colspan="5"><b>{this.context.translate('address')}</b>{p_address}</td>
                                    <td colspan="2"><b>{this.context.translate('phone')}</b>{p_phone}</td>
                                </tr>
                                <tr>
                                    <td><b>{this.context.translate('pweight')}</b>{p_weight} kg</td>
                                    <td><b>{this.context.translate('braslow')}</b>{p_bcolor}</td>
                                </tr>
                            </table>
                        </div>
                        {this.state.chart['id'] && <Notes chartId={this.state.chart['id']} />}
                    </Container>
                </React.Fragment>
            )
        }
        else{
            return null;
        }
    }
}