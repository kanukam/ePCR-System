import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class PatientRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.lname}</td>
                <td>{this.props.fname}</td>
                <td>{this.props.dob}</td>
                <td><input type="button" value={this.props.selectText} onClick={this.props.select(this.props.index)}/></td>
            </tr>
        )
    }
}