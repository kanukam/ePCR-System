import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import '../App.css'
import '../Sidebar.css'

/*
this should probably be renamed to add-call,
another component should deal with the other form sections,
the below component should insert to database table "chart",
other add components should update database table "chart"
*/

export default class AddCall extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
        currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            username: "",
            message: "",
            // only variables for current section of form!
            no: 0,
            type: "Clinic",
            date: currentDate,
            dispatch: ""
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

    render() {
        const {values} = this.props;
        return (
            <div>
            <form>
                <h2>Call Information</h2>
                <h3>Call Specifics</h3>
                <Row>
                    <Col>
                        <label>
                            <span>Call #</span>
                            <input type="text" name="no" value={values.no} onChange={this.props.handleChange('no')} />
                        </label>
                        <label>
                            <span>Call Type</span>
                            <select name="type" value={values.type} onChange={this.props.handleChange('type')}>
                                <option value="Clinic">Clinic</option>
                                <option value="Ambulance">Ambulance</option>
                            </select>
                        </label>
                        <label>
                            <span>Date</span>
                            <input type="date" name="date" value={values.date} onChange={this.props.handleChange('date')} />
                        </label>
                    </Col>
                    <Col>
                        <label>
                            <span>Care Level</span>
                            <select name="carelevel" value={values.carelevel} onChange={this.props.handleChange('carelevel')}>
                                <option value="BLS">BLS</option>
                                <option value="ALS">ALS</option>
                                <option value="Nursing">Nursing</option>
                            </select>
                        </label>
                        <label>
                            <span>Triage Color</span>
                            <select name="triage" value={values.triage} onChange={this.props.handleChange('triage')}>
                                <option value="Green">Green</option>
                                <option value="Yellow">Yellow</option>
                                <option value="Red">Red</option>
                                <option value="Black">Black</option>
                            </select>
                        </label>
                                Above not tested yet (not required for now)
                            </Col>
                </Row>
                <h3>Call Times</h3>
                <Row>
                    <Col>
                        <label>
                            <span>Dispatch</span>
                            <input type="datetime-local" name="dispatch" value={values.dispatch} onChange={this.props.handleChange('dispatch')} />
                        </label>
                    </Col>
                </Row>
                <Button onClick={this.saveAndContinue}>Next</Button>
            </form>
            {/* Message displayed telling results of registration */}
            {this.state.message && <p className="text-dark mt-1"> { this.state.message } </p>}
            </div>
        )
    }
}