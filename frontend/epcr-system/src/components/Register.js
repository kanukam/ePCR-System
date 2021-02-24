import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
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
                this.setState({ message: this.context.translate('reg-succ') });
            }).catch((error) => {
                this.setState({ message: this.context.translate('reg-failed') });
            })
        }
        else{
            this.setState({ message: this.context.translate('reg-fields') });
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
                                        <h1>{this.context.translate('register')}</h1>
                                    </Container>
                                </Jumbotron>

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
                                        <Form.Control type="text" placeholder={this.context.translate('enter-username')} value ={this.state.username} onChange={e => this.setState({ username: e.target.value }) }/>
                                    </Form.Group>
                                    {/* Password Field */}
                                    <Form.Group>
                                        <Form.Label>{this.context.translate('enter-password')}</Form.Label>
                                        <Form.Control type="password" placeholder={this.context.translate('password')} value={this.state.password} onChange={e => this.setState({ password: e.target.value })}/>
                                    </Form.Group>
                                    {/* Phone Field */}
                                    <Form.Group>
                                        <Form.Label>{this.context.translate('enter-phone')}</Form.Label>
                                        <Form.Control type="tel" placeholder={this.context.translate('enter-phone')} value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                                    </Form.Group>
                                    {/* Login */}
                                    <div className='my-2'>
                                        <Link to="/">{this.context.translate('login')}</Link>
                                    </div>
                                    {/* Button for submitting form */}
                                    <Button variant="primary" type="submit">
                                        {this.context.translate('register')}
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