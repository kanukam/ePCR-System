import React, { Component } from 'react'
import '../App.css'

export default class ShowProc extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.time}</td>
                <td>{this.props.name}</td>
                <td>{this.props.data}</td>
                <td>{this.props.by}</td>
                <td><input type="button" value={this.props.removeText} onClick={this.props.deleteProc(this.props.index)} /></td>
            </tr>
        )
    }
}