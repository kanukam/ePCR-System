import React, { Component } from 'react'
import '../App.css'

export default class ShowUser extends Component {
    // template for displaying users in the call to the display table
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.certification}</td>
                <td>{/* implement signature? */}</td>
            </tr>
        )
    }
}