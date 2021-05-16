import React, { Component } from 'react'
import '../App.css'

export default class PatientRow extends Component {
    // template for displaying the patient's full name and date of birth on the search popup
    render() {
        return (
            <tr>
                <td>{this.props.lname}</td>
                <td>{this.props.fname}</td>
                <td>{this.props.dob}</td>
                <td><input type="button" value={this.props.selectText} onClick={this.props.select(this.props.id)}/></td>
            </tr>
        )
    }
}