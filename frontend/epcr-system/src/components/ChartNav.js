import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { MainContext } from '../Auth'
import ChartForm from './ChartForm'
import '../App.css'
import '../Sidebar.css'

export default class ChartNav extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            tab: "Call",
        };
    }

    newStep = step => (e) => {
        e.preventDefault();
        this.props.navigate(step);
    }

    render() {
        return(
            <div className="chartnav">
                {this.props.text.includes("Call") ?
                    <div className="tab active" onClick={this.newStep(1)}>
                        <img src="/profile.png"/>
                        <b>Call</b>
                    </div>
                    :
                    <div className="tab" onClick={this.newStep(1)}>
                        <img src="/profile.png"/>
                        <b>Call</b>
                    </div>
                }
                {this.props.text.includes("Patient") ?
                    <div className="tab active" onClick={this.newStep(2)}>
                        <img src="/profile.png"/>
                        <b>Patient</b>
                    </div>
                    :
                    <div className="tab" onClick={this.newStep(2)}>
                        <img src="/profile.png"/>
                        <b>Patient</b>
                    </div>
                }
                {this.props.text.includes("Interventions") ?
                    <div className="tab active" onClick={this.newStep(3)}>
                        <img src="/profile.png"/>
                        <b>Interventions</b>
                    </div>
                    :
                    <div className="tab" onClick={this.newStep(3)}>
                        <img src="/profile.png"/>
                        <b>Interventions</b>
                    </div>
                }
            </div>
        )
    }
}