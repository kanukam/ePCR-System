import React, { Component } from 'react'
import '../App.css'

export default class UserDropdown extends Component {
    // template for displaying the user's full name and certifications to the dropdown list
    render() {
        return (
            <option value={this.props.name + " (" + this.props.certificationES + ")"}>{this.props.name} ({this.props.certification})</option>
        )
    }
}