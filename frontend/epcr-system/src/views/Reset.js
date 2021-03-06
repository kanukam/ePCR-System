import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import { MainContext } from '../Auth'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from "react-router-dom";

export default class Reset extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message: "",
        };

    }

    toggleLanguage = (language) => event => {
        this.context.setLanguage(language);
    }

    handleSubmit = (event => {
        event.preventDefault();
        const { email } = this.state;
        if (email) {
            const url = 'http://localhost:3000/api/forgot';
            const options = {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
            fetch(url, options).then((response) => {
                if (!response.ok) {
                    throw Error("Failed");
                }
                this.setState({ message: this.context.translate('email-sent') });
            }).catch((error) => {
                this.setState({ message: this.context.translate('error') });
            })
        }
        else {
            this.setState({ message: this.context.translate('all-fields') });
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
                            {/* Reset Text */}
                            <h1>{this.context.translate('reset-password')}</h1>
                            {/* Message displayed telling results of reset */}
                            {this.state.message && <p className="text-dark mt-1"> {this.state.message} </p>}
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>{this.context.translate('enter-email')}</Form.Label>
                                    <Form.Control type="email" placeholder={this.context.translate('enter-email')} value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                </Form.Group>
                                {/* Button for submitting form */}
                                <input type="submit" value={this.context.translate('reset')} />
                            </Form>
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