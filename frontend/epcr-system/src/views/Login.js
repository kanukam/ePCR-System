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
import NavDropdown from 'react-bootstrap/NavDropdown'

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
    
    toggleLanguage = (language) => event => {
        this.context.setLanguage(language);
    }

    setId() {
        const url = 'http://localhost:3000/getUsername';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(url, options)
            .then((response) => {
                if (response.ok)
                    return response.json();
                else
                    throw Error("Failed");
            })
            .then((data) => {
                const { id } = data
                this.context.setId(id);
                console.log(this.context);
            })
            .catch((error) => {

            });
    }

    handleSubmit = (event => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        if(username && password)
        {
            const url = 'http://localhost:3000/login';
            const options = {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
            // Check if login is successful, redirect to dashbaord on success
            fetch(url, options).then((response) => {
                if (!response.ok) {
                    throw Error("Failed");
                }
                console.log(response);
                this.setState({ errorMessage: "" });
                this.setState({ authorized: true })
                this.context.setAuth(true);
                this.context.setUsername(this.state.username);
                this.setId();
            }).catch((error) => {
                this.setState({ errorMessage: this.context.translate('invalid-user') });
            })
        }
        else
        {
            this.setState({ errorMessage: this.context.translate('all-fields') });
        } 
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
                    <NavDropdown title="Language/Idioma" id="basic-nav-dropdown" className="ml-auto">
                        <NavDropdown.Item onClick={this.toggleLanguage("en")}>English</NavDropdown.Item>
                        <NavDropdown.Item onClick={this.toggleLanguage("es")}>Espanol</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>

                <div className='mt-5'>
                    <Container>
                        <Row>
                            <Col>
                                <Jumbotron fluid>
                                    {/* Login Text */}
                                    <Container>
                                        <h1>{this.context.translate('login')}</h1>
                                    </Container>
                                </Jumbotron>

                                <Form onSubmit={this.handleSubmit}>
                                    {/* Username Field */}
                                    <Form.Group>
                                        <Form.Label>{this.context.translate('username')}</Form.Label>
                                        <Form.Control type="text" placeholder={this.context.translate('username')} value ={this.state.username} onChange={e => this.setState({ username: e.target.value }) }/>
                                    </Form.Group>
                                    {/* Password Field */}
                                    <Form.Group>
                                        <Form.Label>{this.context.translate('password')}</Form.Label>
                                        <Form.Control type="password" placeholder={this.context.translate('password')} value={this.state.password} onChange={e => this.setState({ password: e.target.value })}/>
                                    </Form.Group>
                                    {/* Button for submitting form */}
                                    <Button variant="primary" type="submit">
                                        {this.context.translate('sign-in')}
                                    </Button>
                                </Form>
                                {/* Register */}
                                <div className='mt-1'>
                                    <Link to="/Register">{this.context.translate('register')}</Link>
                                </div>
                                {/* Error Message displayed if invalid login attempt */}
                                {this.state.errorMessage && <p className="text-danger"> { this.state.errorMessage } </p>}
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
