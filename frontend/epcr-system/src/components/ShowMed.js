import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class ShowMed extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.time}</td>
                <td>{this.props.name}</td>
                <td>{this.props.dosage}</td>
                <td>{this.props.route}</td>
                <td>{this.props.crew}</td>
                <td><input type="button" value="Remove" onClick={this.props.deleteMed(this.props.index)} /></td>
            </tr>
        )
    }
}