import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css'
import '../Sidebar.css'

/*
this should probably be renamed to add-call,
another component should deal with the other form sections,
the below component should insert to database table "chart",
other add components should update database table "chart"
*/

export default class AddCall extends React.Component {
    constructor(props) {
        super(props);
        var today = new Date(),
        currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            message: "",
            no: 0,
            type: "Clinic",
            date: currentDate,
            patient: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
    })
    handleSubmit = (event => {
        alert(this.state.no + " " + this.state.date);
        event.preventDefault();
        const no = this.state.no;
        const type = this.state.type;
        const date = this.state.date;
        const patient = this.state.patient;
        // still in progress
        if(no && patient) {
            const url = 'http://localhost:3000/charts/add';
            const options = {
                method: 'POST',
                body: JSON.stringify({ no, type, date, patient }),
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
        }
    })

    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <small>Note: a link to "add chart" before displaying this page</small>
                <h2>Call Information</h2>
                <h3>Call Specifics</h3>
                <Row>
                    <Col>
                        <label>
                            <span>Call #</span>
                            <input type="text" name="no" value={this.state.no} onChange={this.handleChange} />
                        </label>
                        <label>
                            <span>Call Type</span>
                            <select name="type" value={this.state.type} onChange={this.handleChange}>
                                <option value="clinic">Clinic</option>
                                <option value="ambulance">Ambulance</option>
                            </select>
                        </label>
                        <label>
                            <span>Date</span>
                            <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
                        </label>
                        <label>
                            <span>Patient Name</span>
                            <input type="text" name="patient" value={this.state.patient} onChange={this.handleChange} />
                        </label>
                    </Col>
                    <Col>
                        <label>
                            <span>Care Level</span>
                            <select name="carelevel" value={this.state.carelevel} onChange={this.handleChange}>
                                <option value="bls">BLS</option>
                                <option value="als">ALS</option>
                                <option value="nursing">Nursing</option>
                            </select>
                        </label>
                        <label>
                            <span>Triage Color</span>
                            <select name="triage" value={this.state.triage} onChange={this.handleChange}>
                                <option value="green">Green</option>
                                <option value="yellow">Yellow</option>
                                <option value="red">Red</option>
                                <option value="black">Black</option>
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
                            <input type="datetime-local" name="dispatch" value={this.state.dispatch} onChange={this.handleChange} />
                        </label>
                    </Col>
                </Row>
                <input type="submit" value="Submit" />
            </form>
            {/* Message displayed telling results of registration */}
            {this.state.message && <p className="text-dark mt-1"> { this.state.message } </p>}
            </div>
        )
    }
}