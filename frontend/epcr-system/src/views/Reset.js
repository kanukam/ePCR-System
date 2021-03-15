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
        const {email} = this.state;
        if (email) {
            const url = 'http://localhost:3000/forgot';
            const options = {
                method: 'POST',
                body: JSON.stringify({ email }),
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
                                        <Form.Label>{this.context.translate('enter-email')}</Form.Label>
                                        <Form.Control type="email" placeholder={this.context.translate('enter-email')} value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                    </Form.Group>
                                    {/* Button for submitting form */}
                                    <Button variant="primary" type="submit">
                                        {this.context.translate('reset')}
                                    </Button>
                                </Form>

                                {/* Message displayed telling results of registration */}
                                {this.state.message && <p className="text-dark mt-1"> {this.state.message} </p>}

                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}
