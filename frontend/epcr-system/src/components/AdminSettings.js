import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import UserDetails from './UserDetails'
import Button from 'react-bootstrap/Button'

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error: "",
            message: "",
            userMessage: "",
            addedUser: "",
            elevatedUser: ""
        };
    }

    componentDidMount() {
        // Getting all user data from database
        const url = 'http://localhost:3000/users';
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
                this.setState({ errorMessage: "Error" });
            })
    }

    // Delete user, must be an admin for it to work.
    deleteUser = (email) => event => {
        event.preventDefault();
        if(window.confirm("Are you sure you would like to delete the user?"))
        {
            // Deleting user
            const url = `http://localhost:3000/users/0/delete`;
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
                this.setState({ message: "Failed" });
            })
        }
    }

    // Adding User, must be an admin for it to work.
    addUser = event => {
        event.preventDefault();
        const email = this.state.addedUser;
        // Deleting user
        const url = `http://localhost:3000/users/0/add`;
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
                this.setState({ users: data["userInfo"], userMessage: "Success" });
            })
            .catch((error) => {
                this.setState({ userMessage: "Failed" });
            })
    }

    // Elevating User, must be an admin for it to work.
    elevateUser = event => {
        event.preventDefault();
        const email = this.state.elevatedUser;
        // Deleting user
        const url = `http://localhost:3000/users/0/elevate`;
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
                this.setState({ users: data["userInfo"], userMessage: "Success" });
            })
            .catch((error) => {
                this.setState({ userMessage: "Failed" });
            })
    }

    render() {
        if(this.state.users) {
            return (
                <React.Fragment>
                    <Card className='mt-5 mb-5'>
                        <Card.Body>
                            <Card.Title>Admin Settings</Card.Title>
                            {this.state.message && <p className="text-info"> {this.state.message} </p>}
                            <Table responsive bordered className="mt-3">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>E-mail</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map(({ name, username, email, phone, privilege }, idx) => {
                                            return (
                                                <UserDetails name={name} username={username} email={email} phone={phone} privilege={privilege} key={idx} idx={idx} delete={this.deleteUser} />
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            <Card.Title className="mt-4">Add/Elevate Users</Card.Title>
                            {this.state.userMessage && <p className="text-info"> {this.state.userMessage} </p>}
                            <Form>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Add User
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control type="email" placeholder="Enter Email..." value={this.state.addedUser} onChange={e => this.setState({ addedUser: e.target.value })}/>
                                    </Col>
                                    <Col sm="4">
                                        <Button variant="primary" onClick={this.addUser}>Add</Button>{' '}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Elevate User To Admin
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control type="email" placeholder="Enter Email..." value={this.state.elevatedUser} onChange={e => this.setState({ elevatedUser: e.target.value })}/>
                                    </Col>
                                    <Col sm="4">
                                        <Button variant="primary" onClick={this.elevateUser}>Elevate</Button>{' '}
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
