import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Redirect } from 'react-router-dom'
import { MainContext } from '../Auth'
import { Link } from "react-router-dom";

export default class Login extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: "",
            authorized: false
        };

    }
    
    handleSubmit = (event => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const url = 'http://localhost:3000/login';
        const options = {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        // Check if login is successful, redirect to dashbaord on success
        fetch(url, options).then((response) => {
            if(!response.ok)
            {
                throw Error("Failed");
            }
            this.setState({ errorMessage: "" });
            this.setState({ authorized: true })
            this.context.setAuth(true);
            console.log("Success");
        }).catch((error) => {
            this.setState({errorMessage: "Invalid Username or password"});
        })
        
})

    render() {
        if(this.state.authorized) {
            return <Redirect to="/Dashboard" />
        }

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
                                        <h1>Login</h1>
                                    </Container>
                                </Jumbotron>

                                <Form onSubmit={this.handleSubmit}>
                                    {/* Username Field */}
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" value ={this.state.username} onChange={e => this.setState({ username: e.target.value }) }/>
                                    </Form.Group>
                                    {/* Password Field */}
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })}/>
                                    </Form.Group>
                                    {/* Button for submitting form */}
                                    <Button variant="primary" type="submit">
                                        Sign In
                                    </Button>
                                </Form>
                                {/* Register */}
                                <div className='mt-1'>
                                    <Link to="/Register">Register</Link>
                                </div>
                                {/* Error Message displayed if invalid login attempt */}
                                {this.state.errorMessage && <p class="text-danger"> { this.state.errorMessage } </p>}
                                <Jumbotron className='mt-3' fluid>
                                    <Container>
                                    </Container>
                                </Jumbotron>
                                
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}