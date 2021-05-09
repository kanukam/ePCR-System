import React, { Component } from 'react'
import '../App.css'

export default class ShowVital extends Component {
    // template for displaying appended vital signs to the display table
    render() {
        return (
            <tr>
                <td>{this.props.time}</td>
                <td>{this.props.pulse} bpm</td>
                <td>{this.props.bp}</td>
                <td>{this.props.resp}</td>
                <td>{this.props.sp02}</td>
                <td>{this.props.temp} °C</td>
                <td>{this.props.etco2}</td>
                <td>{this.props.pain}</td>
                <td>{this.props.gcs}</td>
                <td><input type="button" value={this.props.removeText} onClick={this.props.deleteVitals(this.props.index)} /></td>
            </tr>
        )
    }
}