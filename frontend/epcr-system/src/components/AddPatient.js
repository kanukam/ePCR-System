import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css'
import '../Sidebar.css'

//THIS FILE IS TEMPORARY

export default class AddPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            message: "",
            no: 0,
            type: "Clinic",
            patient: ""
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

    handleChange = (event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
    })

    handleSubmit = (event => {
        alert('info:');
    })

    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <h2>Patient Information</h2>
                <Row>
                    <Col>
                        <label>
                            <span>Name</span>
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        </label>
                        <label>
                            <span>D.O.B.</span>
                            <select name="type" value={this.state.type} onChange={this.handleChange}>
                                <option value="clinic">Clinic</option>
                                <option value="ambulance">Ambulance</option>
                            </select>
                        </label>
                        <label>
                            <span>Age</span>
                            <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
                        </label>
                        <label>
                            <span>Gender</span>
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
                <Row>
                    <Col>
                        <label>
                            <span>Patient Address</span>
                            <input type="text" name="patient" value={this.state.patient} onChange={this.handleChange} />
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