import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { MainContext } from '../Auth'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from "react-router-dom";

export default class ChangePassword extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.match.params.token,
            message: "",
            password: "",
            confirmedPassword: "",
        };

    }

    toggleLanguage = (language) => event => {
        this.context.setLanguage(language);
    }

    handleSubmit = (event => {
        event.preventDefault();
        const {password, confirmedPassword, token} = this.state;
        console.log(token);
        if(password !== confirmedPassword){
            this.setState({ message: this.context.translate('passwordMismatch') });
        }
        else if (password) {
            const url = 'http://localhost:3000/change-password';
            const options = {
                method: 'POST',
                body: JSON.stringify({ token, password}),
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
                this.setState({ message: this.context.translate('success') });
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
                <Navbar bg="light">
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
                        <Row>
                            <Col>
                                <Jumbotron fluid>
                                    {/* Login Text */}
                                    <Container>
                                        <h1>{this.context.translate('reset-password')}</h1>
                                    </Container>
                                </Jumbotron>

                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>{this.context.translate('enter-password')}</Form.Label>
                                        <Form.Control type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>{this.context.translate('enter-password')}</Form.Label>
                                        <Form.Control type="password" value={this.state.confirmedPassword} onChange={e => this.setState({ confirmedPassword: e.target.value })} />
                                    </Form.Group>
                                    {/* Button for submitting form */}
                                    <Button variant="primary" type="submit">
                                        {this.context.translate('reset')}
                                    </Button>
                                </Form>

                                {/* Message displayed telling results of registration */}
                                {this.state.message && <p className="text-dark mt-2"> {this.state.message} </p>}

                                {/* Login */}
                                <div className='mt-1 float-left'>
                                    <Link to="/">{this.context.translate('login')}</Link>
                                </div>


                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}
