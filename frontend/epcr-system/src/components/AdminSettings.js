import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error: ""
        };
    }

    componentDidMount() {
        // Getting all user data from database
        const url = 'http://localhost:3000/settings/admin';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        // Get request
        fetch(url, options).then(response => response.json())
            .then(data => {
                this.setState({ users: data["userInfo"] });
            })
            .catch((error) => {
                this.setState({ errorMessage: "Error" });
            })
    }
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Card className='mt-5'>
                            <Card.Body>
                                <Card.Title>Admin Settings</Card.Title>
                                <Table responsive className="mt-5">
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>E-mail</th>
                                            <th>Phone</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.users.map( ( {name, username, email, phone, privilege}, idx) => {
                                                return(
                                                    <tr>
                                                        <td>
                                                            {idx}
                                                        </td>
                                                        <td>
                                                            {name}
                                                        </td>
                                                        <td>
                                                            {username}
                                                        </td>
                                                        <td>
                                                            {email}
                                                        </td>
                                                        <td>
                                                            {phone}
                                                        </td>
                                                        <td>
                                                            {privilege}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <div className="mb-4"></div>
            </React.Fragment>
        )
    }
}
