import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export class UserDetails extends Component {

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>
                        {this.props.idx}
                    </td>
                    <td>
                        {this.props.name}
                    </td>
                    <td>
                        {this.props.username}
                    </td>
                    <td>
                        {this.props.email}
                    </td>
                    <td>
                        {this.props.phone}
                    </td>
                    <td>
                        {this.props.privilege}
                    </td>
                    <td>
                        {this.props.privilege === "standard" && <Button onClick={this.props.delete(this.props.email)}>Delete</Button>}
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}

export default UserDetails
