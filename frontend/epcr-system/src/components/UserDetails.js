import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { MainContext } from '../Auth'

export class UserDetails extends Component {
    static contextType = MainContext;
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
                        {this.context.translate(this.props.privilege)}
                    </td>
                    <td>
                        {this.props.privilege === "standard" && <Button onClick={this.props.delete(this.props.email)}>{this.context.translate('delete')}</Button>}
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}

export default UserDetails
