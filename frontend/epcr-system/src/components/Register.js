import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from "react-router-dom";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            phone: "",
            name: "",
            message: "",
        };

    }
    
    handleSubmit = (event => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;
        const phone = this.state.phone;
        const name = this.state.name;
        if(username && password && email)
        {
            const url = 'http://localhost:3000/register';
            const options = {
                method: 'POST',
                body: JSON.stringify({ username, password, email, phone, name }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
            // Check if registration is successful, redirect to login on success
            fetch(url, options).then((response) => {
                if (!response.ok) {
                    throw Error;
                }
                this.setState({ message: "Registration Successful" });
            }).catch((error) => {
                this.setState({ message: "Registration Failed, Unauthorized" });
            })
        }
        else{
            this.setState({ message: "Enter all required fields [Username, Email, Password]" });
        }
    })

    render() {

        return (
            <React.Fragment>
                {/* Navigation Bar */}
                <Navbar bg="light">
                    <Navbar.Brand>
                        <img alt="" src="/Rescate-Logo.jpg" width="10%" height="10%" className="d-inline-block align-top"/>{' '}
                        Rescate de San Carlos
                    </Navbar.Brand>
                </Navbar>

                <div className='mt-5'>
                    <Container>
                        <Row>
                            <Col>
                                <Jumbotron fluid>
                                    {/* Login Text */}
                                    <Container>
                                        <h1>Register</h1>
                                    </Container>
                                </Jumbotron>

                                <Form onSubmit={this.handleSubmit}>
                                    {/* Name Field */}
                                    <Form.Group>
                                        <Form.Label>Enter Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                                    </Form.Group>
                                    {/* Name Field */}
                                    <Form.Group>
                                        <Form.Label>Enter Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter E-mail" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                    </Form.Group>
                                    {/* Username Field */}
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" value ={this.state.username} onChange={e => this.setState({ username: e.target.value }) }/>
                                    </Form.Group>
                                    {/* Password Field */}
                                    <Form.Group>
                                        <Form.Label>Enter Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })}/>
                                    </Form.Group>
                                    {/* Phone Field */}
                                    <Form.Group>
                                        <Form.Label>Enter Phone Number</Form.Label>
                                        <Form.Control type="tel" placeholder="Enter phone number" value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                                    </Form.Group>
                                    {/* Login */}
                                    <div className='my-2'>
                                        <Link to="/">Log In</Link>
                                    </div>
                                    {/* Button for submitting form */}
                                    <Button variant="primary" type="submit">
                                        Register
                                    </Button>
                                </Form>

                                {/* Message displayed telling results of registration */}
                                {this.state.message && <p className="text-dark mt-1"> { this.state.message } </p>}
                                
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}