import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import { MainContext } from '../Auth'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'

export default class ChangePassword extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.match.params.token,
            message: "",
            password: "",
            confirmedPassword: "",
            authorized: "",
        };

    }

    toggleLanguage = (language) => event => {
        this.context.setLanguage(language);
    }

    passwordWordCheck = (password) => {
        let regularExp = /[a-zA-Z]/g;
        let capital = new RegExp("[A-Z]");
        let number = /\d/g;
        // Check at least 8 chars
        if (password.length < 8) {
            this.setState({ message: this.context.translate('password-length') });
            return false;
        }
        else if (!regularExp.test(password)) {
            this.setState({ message: this.context.translate('password-letter') });
            return false;
        }
        else if (!capital.test(password)) {
            this.setState({ message: this.context.translate('password-capital') });
            return false;
        }
        else if (!number.test(password)) {
            this.setState({ message: this.context.translate('password-number') });
            return false;
        }
        else {
            return true;
        }
    }

    handleSubmit = (event => {
        event.preventDefault();
        const { password, confirmedPassword, token } = this.state;
        console.log(token);
        if (password !== confirmedPassword) {
            this.setState({ message: this.context.translate('passwordMismatch') });
        }
        else if (password) {
            if (this.passwordWordCheck(password)) {
                const url = 'http://localhost:3000/change-password';
                const options = {
                    method: 'POST',
                    body: JSON.stringify({ token, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
                // Check if password reset is successful
                fetch(url, options).then((response) => {
                    if (!response.ok) {
                        throw Error("Failed");
                    }
                    this.setState({ message: this.context.translate('success'), authorized: "Yes" });
                }).catch((error) => {
                    this.setState({ message: this.context.translate('error') });
                })
            }

        }
        else {
            this.setState({ message: this.context.translate('all-fields') });
        }
    })

    render() {
        if (this.state.authorized) {
            return <Redirect to="/" />
        }

        return (
            <React.Fragment>
                {/* Navigation Bar */}
                <Navbar className="light">
                    <Navbar.Brand>
                        <img alt="" src="/Rescate-Logo.jpg" width="10%" height="10%" className="d-inline-block align-top" />{' '}
                        Rescate de San Carlos
                    </Navbar.Brand>
                    <NavDropdown title="Language/Idioma" id="basic-nav-dropdown" className="ml-auto">
                        <NavDropdown.Item onClick={this.toggleLanguage("en")}>English</NavDropdown.Item>
                        <NavDropdown.Item onClick={this.toggleLanguage("es")}>Espanol</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>

                <div className='mt-5'>
                    <Container>
                        <div className="authentication">
                            {/* Login Text */}
                            <h1>{this.context.translate('reset-password')}</h1>
                            {/* Message displayed telling results of registration */}
                            {this.state.message && <p className="text-dark mt-2"> {this.state.message} </p>}
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>{this.context.translate('enter-password')}</Form.Label>
                                    <Form.Control type="password" pattern="[a-zA-Z0-9!@?]{0,100}" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>{this.context.translate('enter-password')}</Form.Label>
                                    <Form.Control type="password" pattern="[a-zA-Z0-9!@?]{0,100}" value={this.state.confirmedPassword} onChange={e => this.setState({ confirmedPassword: e.target.value })} />
                                </Form.Group>
                                {/* Button for submitting form */}
                                <input type="submit" value={this.context.translate('reset')} />
                            </Form>
                            {/* Login */}
                            <div className='link'>
                                <Link to="/">{this.context.translate('login')}</Link>
                            </div>
                        </div>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}