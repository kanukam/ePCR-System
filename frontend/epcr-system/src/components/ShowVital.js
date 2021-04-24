import React, { Component } from 'react'
import '../App.css'

export default class ShowVital extends Component {
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
            </tr>
        )
    }
}