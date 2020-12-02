import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { throws } from 'assert'
import '../App.css'
import '../Sidebar.css'

export default class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            message: "",

            
        };
    }

    componentDidMount(){
        const url = 'http://localhost:3000/getUsername';
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
                this.setState({username: data});
            })
            .catch((error) => {
                console.log(error);
            });
    }    
    
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const {values: {
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
        }} = this.props;
        return (
            <div>
                <h1>Call Information</h1>
                <span>Call #</span> {no}<br/>
                <span>Date</span> {date}<br/>
                <span>Call Type</span> {type}<br/>
                <span>Dispatch Time</span> {dispatch}<br/>
                <h1>Patient Information</h1>
                <span>Patient</span> {patient}<br/>
                <span>Date of Birth</span> {birth}<br/>
                <span>Weight</span> {weight} kg<br/>
                <span>Address</span> {address}, {city}, {country} {zip}<br/>
                <h1>Interventions</h1>
                <span>Procedure</span> {procedure}<br/>
                <Button onClick={this.back}>Previous</Button>
                <Button onClick={this.props.handleSubmit}>Submit</Button>
            {/* Message displayed telling results of registration */}
            {this.state.message && <p className="text-dark mt-1"> { this.state.message } </p>}
            </div>
        )
    }
}