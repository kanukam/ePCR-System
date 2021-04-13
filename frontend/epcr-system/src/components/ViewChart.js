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
                    <div >
                        <embed src={`http://localhost:3000/charts/${this.props.match.params.id}/pdf?locale=${this.context.language}#scrollbar=1`}  type="application/pdf" width={"100%"} style={{width: "100%", height:"700px"}}>

                        </embed>
                        {this.state.chart['id'] && <Notes chartId={this.state.chart['id']} />}
                    </div>
                </React.Fragment>
            )
        }
        else{
            return null;
        }
    }
}