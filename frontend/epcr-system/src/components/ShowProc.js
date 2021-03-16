import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default class ShowProc extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.time}</td>
                <td>{this.props.name}</td>
                <td>{this.props.data}</td>
                <td>{this.props.crew}</td>
                <td><input type="button" value="Remove" onClick={this.props.deleteProc(this.props.index)} /></td>
            </tr>
        )
    }
}