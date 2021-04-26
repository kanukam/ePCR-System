import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import UserDetails from './UserDetails'
import { MainContext } from '../Auth'

export default class Settings extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            users: "",
            error: "",
            message: "",
            userMessage: "",
            addedUser: "",
            elevatedUser: ""
        };
    }

    componentDidMount() {
        if (this.context.privilege === "admin"){
            // Getting all user data from database
            const url = 'http://localhost:3000/api/users';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            }
            // Post request
            fetch(url, options).then(response => response.json())
                .then(data => {
                    this.setState({ users: data["userInfo"] });
                })
                .catch((error) => {
                    this.setState({ errorMessage: this.context.translate('error') });
                })
        }
    }

    // Delete user, must be an admin for it to work.
    deleteUser = (email) => event => {
        event.preventDefault();
        if (window.confirm(this.context.translate('delete-user')))
        {
            // Deleting user
            const url = `http://localhost:3000/api/users/0/delete`;
            const options = {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            }
            // Post request to delete user, updated table sent back
            fetch(url, options).then(response => {
                if(!response.ok){
                    throw Error("Failed");
                }
                return response.json()
            })
            .then(data => {
                this.setState({ users: data["userInfo"], message:"Success"});
            })
            .catch((error) => {
                this.setState({ message: this.context.translate('failed') });
            })
        }
    }

    // Update certifications
    updateCertifications = (certifications, email) => {
        // Update user certifications
        const url = `http://localhost:3000/api/charts/certifications`;
        const options = {
            method: 'POST',
            body: JSON.stringify({ certifications, email }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
            // Post request to update certs
            fetch(url, options).then(response => {
                if (!response.ok) {
                    throw Error("Failed");
                }
                return response.json()
            })
            .then(data => {
                this.setState({ users: data["userInfo"] });
            })
            .catch((error) => {

            })
    }

    // Adding User, must be an admin for it to work.
    addUser = event => {
        event.preventDefault();
        const email = this.state.addedUser;
        // Deleting user
        const url = `http://localhost:3000/api/users/0/add`;
        const options = {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        // Post request to delete user, updated table sent back
        fetch(url, options).then(response => {
            if (!response.ok) {
                throw Error("Failed");
            }
            return response.json()
            })
            .then(data => {
                this.setState({ users: data["userInfo"], userMessage: this.context.translate('success') });
            })
            .catch((error) => {
                this.setState({ userMessage: this.context.translate('failed') });
            })
    }

    // Elevating User, must be an admin for it to work.
    elevateUser = event => {
        event.preventDefault();
        const email = this.state.elevatedUser;
        // Deleting user
        const url = `http://localhost:3000/api/users/0/elevate`;
        const options = {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        // Post request to delete user, updated table sent back
        fetch(url, options).then(response => {
            if (!response.ok) {
                throw Error("Failed");
            }
            return response.json()
        })
            .then(data => {
                this.setState({ users: data["userInfo"], userMessage: this.context.translate('success') });
            })
            .catch((error) => {
                this.setState({ userMessage: this.context.translate('failed') });
            })
        }

    render() {
        const { users } = this.state;
        if(users) {
            return (
                <React.Fragment>
                    <Card className='mt-5 mb-5'>
                        <Card.Body>
                            <Card.Title>{this.context.translate('admin-settings')}</Card.Title>
                            {this.state.message && <p className="text-info"> {this.state.message} </p>}
                            <Table responsive bordered className="mt-3">
                                <thead>
                                    <tr>
                                        <th>{this.context.translate('name')}</th>
                                        <th>{this.context.translate('username')}</th>
                                        <th>{this.context.translate('email')}</th>
                                        <th>{this.context.translate('phone')}</th>
                                        <th>{this.context.translate('role')}</th>
                                        <th> </th>
                                        <th>{this.context.translate('cert')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map(({ name, username, email, phone, privilege, certifications }, idx) => {
                                            return (
                                                <UserDetails name={name} username={username} email={email} phone={phone} privilege={privilege} certifications={certifications} key={idx} idx={idx} delete={this.deleteUser} updateCertifications={this.updateCertifications}/>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            <hr/>
                            <Card.Title className="mt-4">{this.context.translate('add-elevate')}</Card.Title>
                            {this.state.userMessage && <p className="text-info"> {this.state.userMessage} </p>}
                            <Form>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        {this.context.translate('add-user')}
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control type="email" placeholder={this.context.translate('enter-email')} value={this.state.addedUser} onChange={e => this.setState({ addedUser: e.target.value })}/>
                                    </Col>
                                    <Col sm="4">
                                        <input type="button" onClick={this.addUser} value={this.context.translate('add')} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        {this.context.translate('elevate-user')}
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control type="email" placeholder={this.context.translate('enter-email')} value={this.state.elevatedUser} onChange={e => this.setState({ elevatedUser: e.target.value })}/>
                                    </Col>
                                    <Col sm="4">
                                        <input type="button" onClick={this.elevateUser} value={this.context.translate('elevate')} />
                                    </Col>
                                </Form.Group>

                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="mb-4"></div>
                </React.Fragment>
            );
        }
        else{
            return null;
        }
    }
}