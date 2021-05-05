import React, { Component } from 'react'
import '../App.css'

export default class ShowMed extends Component {
    // template for displaying appended medications to the display table
    render() {
        return (
            <tr>
                <td>{this.props.time}</td>
                <td>{this.props.name}</td>
                <td>{this.props.dosage}</td>
                <td>{this.props.route}</td>
                <td>{this.props.by}</td>
                <td><input type="button" value={this.props.removeText} onClick={this.props.deleteMed(this.props.index)} /></td>
            </tr>
        )
    }
}