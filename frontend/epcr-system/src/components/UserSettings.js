import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { MainContext } from '../Auth'

export default class Settings extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            name: ' ',
            email: ' ',
            phone: ' ',
            oldPassword: "",
            newPassword: "",
            confirmedPassword: "",
            message: "",
        };
    }

    componentDidMount() {
        // Getting User data from database
        const url = 'http://localhost:3000/settings/' + this.context.username;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        // Get request
        fetch(url, options).then(response => response.json())
            .then(data => {
                const temp = data['userInfo'][0];
                const { name, email, phone } = temp;
                this.setState({ name: name, email: email, phone: phone });
            })
            .catch((error) => {
                this.setState({ errorMessage: "Error" });
            })
    }

    // Function to update user account information
    handleUpdate = (event => {
        event.preventDefault();
        const email = this.state.email;
        const phone = this.state.phone;
        const name = this.state.name;

        if (name && phone && email) {
            const url = 'http://localhost:3000/settings/update';
            const options = {
                method: 'POST',
                body: JSON.stringify({ email, phone, name }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
            // Check if update is successful
            fetch(url, options).then((response) => {
                if (!response.ok) {
                    throw Error("Failed");
                }
                this.setState({ message: "Success" });
            }).catch((error) => {
                this.setState({ message: "Failed" });
            })
        }
        else {
            this.setState({ message: "Enter all fields" });
        }
    })
    // Function to change Password
    handlePassword = () => {
        const { oldPassword, newPassword, confirmedPassword } = this.state
        if (oldPassword && newPassword && confirmedPassword) {
            // Send Request if passwords match
            if (newPassword === confirmedPassword) {
                const url = 'http://localhost:3000/settings/password';
                const options = {
                    method: 'POST',
                    body: JSON.stringify({ oldPassword, newPassword }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
                // Check if update is successful
                fetch(url, options).then((response) => {
                    if (!response.ok) {
                        throw Error("Failed");
                    }
                    this.setState({ message: "Password Successfully Changed" });
                }).catch((error) => {
                    this.setState({ message: "Failed" });
                })
            }
            else {
                this.setState({ message: "Passwords don't match" })
            }
        }
        else {
            this.setState({ message: "Enter all fields" })
        }
    }


    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Card className='mt-4'>
                            <Card.Body>
                                <Card.Title>Account Settings</Card.Title>
                                <hr></hr>
                                {this.state.message && <p className="text-info"> {this.state.message} </p>}
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Group>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="tel" value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                                    </Form.Group>

                                    <Button variant="primary" onClick={this.handleUpdate}>
                                        Save
                                    </Button>
                                </Form>

                                <Card.Title className='mt-4'>Change Password</Card.Title>
                                <hr></hr>
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Old Password</Form.Label>
                                            <Form.Control type="password" value={this.state.oldPassword} onChange={e => this.setState({ oldPassword: e.target.value })} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control type="password" value={this.state.newPassword} onChange={e => this.setState({ newPassword: e.target.value })} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Confirm</Form.Label>
                                            <Form.Control type="password" value={this.state.confirmedPassword} onChange={e => this.setState({ confirmedPassword: e.target.value })} />
                                        </Form.Group>
                                    </Form.Row>

                                    <Button variant="primary" onClick={this.handlePassword}>
                                        Change
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}
