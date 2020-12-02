import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { throws } from 'assert'
import '../App.css'
import '../Sidebar.css'

export default class AddPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            message: "",
            // only variables for current section of form!
            patient: "",
            birth: "", // datetime, age is calculated based on this
            gender: "Male",
            weight: "", // in kg
            address: "",
            city: "",
            country: "",
            zip: "",
            phone: "",
            history: "", // subject to change
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
        const {values} = this.props;
        return (
            <div>
            <form>
                <h2>Patient Information</h2>
                <Row>
                    <Col>
                        <label>
                            <span>Full Name</span>
                            <input type="text" name="patient" value={values.patient} onChange={this.props.handleChange('patient')} />
                        </label>
                        <label>
                            <span>Date of Birth</span>
                            <input type="date" name="birth" value={values.birth} onChange={this.props.handleChange('birth')} />
                        </label>
                        <label>
                            Note: gender is not yet handled<br/>
                            <span>Gender</span>
                            <input type="radio" name="gender" value="Male" checked={values.gender === "Male"} onChange={this.props.handleGender('gender')} defaultChecked/> Male
                            <input type="radio" name="gender" value="Female" checked={values.gender === "Female"}/> Female
                        </label>
                        <label>
                            <span>Weight</span>
                            <input type="number" name="weight" value={values.weight} onChange={this.props.handleChange('weight')} /> kg
                        </label>
                        <label>
                            <span>Address</span>
                            <input type="text" name="address" value={values.address} onChange={this.props.handleChange('address')} />
                        </label>
                        <label>
                            <span>City</span>
                            <input type="text" name="city" value={values.city} onChange={this.props.handleChange('city')} />
                        </label>
                        <label>
                            <span>Country</span>
                            <input type="text" name="country" value={values.country} onChange={this.props.handleChange('country')} />
                        </label>
                        <label>
                            <span>Zip</span>
                            <input type="number" name="zip" value={values.zip} onChange={this.props.handleChange('zip')} />
                        </label>
                    </Col>
                </Row>
                <Button onClick={this.back}>Previous</Button>
                <Button onClick={this.saveAndContinue}>Next</Button>
            </form>
            {/* Message displayed telling results of registration */}
            {this.state.message && <p className="text-dark mt-1"> { this.state.message } </p>}
            </div>
        )
    }
}