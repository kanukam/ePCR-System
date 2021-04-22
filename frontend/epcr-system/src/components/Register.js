import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import { MainContext } from '../Auth'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default class Register extends Component {
    static contextType = MainContext;
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
    toggleLanguage = (language) => event => {
        this.context.setLanguage(language);
        console.log(language);
        console.log(this.context);
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
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;
        const phone = this.state.phone.replace(/-/g, "");
        const name = this.state.name;
        if (username && password && email) {
            if (this.passwordWordCheck(password)) {
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
                    // Clear form fields + Set Message
                    this.setState({
                        message: this.context.translate('reg-succ'),
                        username: "",
                        password: "",
                        email: "",
                        phone: "",
                        name: ""
                    });
                }).catch((error) => {
                    this.setState({ message: this.context.translate('reg-failed') });
                })
            }
        }
        else {
            this.setState({ message: this.context.translate('reg-fields') });
        }
    })

    render() {

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
                            <h1>{this.context.translate('register')}</h1>
                            {/* Message displayed telling results of registration */}
                            {this.state.message && <p className="text-dark mt-1"> {this.state.message} </p>}
                            <Form onSubmit={this.handleSubmit}>
                                {/* Name Field */}
                                <Form.Group>
                                    <Form.Label>{this.context.translate('enter-name')}</Form.Label>
                                    <Form.Control type="text" placeholder={this.context.translate('enter-name')} value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                                </Form.Group>
                                {/* Name Field */}
                                <Form.Group>
                                    <Form.Label>{this.context.translate('enter-email')}</Form.Label>
                                    <Form.Control type="email" placeholder={this.context.translate('enter-email')} value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                </Form.Group>
                                {/* Username Field */}
                                <Form.Group>
                                    <Form.Label>{this.context.translate('username')}</Form.Label>
                                    <Form.Control type="text" placeholder={this.context.translate('enter-username')} value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
                                </Form.Group>
                                {/* Password Field */}
                                <Form.Group>
                                    <Form.Label>{this.context.translate('enter-password')}</Form.Label>
                                    <Form.Control type="password" pattern="[a-zA-Z0-9!@?]{0,100}" placeholder={this.context.translate('password-requirements')} value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                                </Form.Group>
                                {/* Phone Field */}
                                <Form.Group>
                                    <Form.Label>{this.context.translate('enter-phone')}</Form.Label>
                                    <Form.Control type="tel" placeholder={this.context.translate('enter-phone')} value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                                </Form.Group>
                                {/* Button for submitting form */}
                                <input type="submit" value={this.context.translate('register')} />
                                {/* Login */}
                                <div className='link'>
                                    <Link to="/">{this.context.translate('login')}</Link>
                                </div>
                            </Form>
                        </div>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}