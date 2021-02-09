import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import UserDetails from './UserDetails'

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error: "",
            message: ""
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

    // Delete user, must be an admin fro it to work.
    deleteUser = (username) => event => {
        event.preventDefault();
        if(window.confirm("Are you sure you would like to delete the user?"))
        {
            // Deleting user
            const url = `http://localhost:3000/users/${username}/delete`;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            }
            // Post request to delete user, updated table sent back
            fetch(url, options).then(response => response.json())
                .then(data => {
                    this.setState({ users: data["userInfo"], message:"Success"});
                })
                .catch((error) => {
                    this.setState({ message: "Failed" });
                })
        }
    }


    render() {
        if(this.state.users) {
            return (
                <React.Fragment>
                    <Row>
                        <Col>
                            <Card className='mt-5'>
                                <Card.Body>
                                    <Card.Title>Admin Settings</Card.Title>
                                    {this.state.message && <p className="text-info"> {this.state.message} </p>}
                                    <Table responsive className="mt-3">
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
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <div className="mb-4"></div>
                </React.Fragment>
            );
        }
        else{
            return null;
        }
    }
}
