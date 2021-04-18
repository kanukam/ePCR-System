import React, { Component } from 'react'
import '../App.css'

export default class UserDropdown extends Component {
    render() {
        return (
            <option value={this.props.name}>{this.props.name} ({this.props.certification})</option>
        )
    }
}