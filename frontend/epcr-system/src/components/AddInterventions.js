import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class AddInterventions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            // only variables for current section of form!
            procedure: ""
        };
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