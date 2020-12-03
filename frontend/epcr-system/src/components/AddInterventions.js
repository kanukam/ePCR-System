import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { throws } from 'assert'
import '../App.css'

export default class AddInterventions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            message: "",
            // only variables for current section of form!
            procedure: ""
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
                <h2>Interventions / Treatment</h2>
                //{this.showTable}<label>
                            <span>Procedure</span>
                            <input type="text" name="procedure" value={values.procedure} onChange={this.props.handleChange('procedure')} />
                        </label>
                <Button onClick={this.back}>Previous</Button>
                <Button onClick={this.saveAndContinue}>Next</Button>
            </form>
            {/* Message displayed telling results of registration */}
            {this.state.message && <p className="text-dark mt-1"> { this.state.message } </p>}
            </div>
        )
    }
}