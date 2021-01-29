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
import MainNav from './MainNav'
import Card from 'react-bootstrap/Card'

export default class Settings extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: ' ',
            email: ' ',
            phone: ' ',
            contentSpacing: '0 0 0 150px',
            sidebarHide: true
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    componentDidMount(){
        // Getting User data from database
    }
    toggleCollapse() {
        this.setState({ contentSpacing: (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px') })
        this.setState({ sidebarHide: !this.state.sidebarHide });
    }

    render() {
        if (this.state.authorized) {
            return <Redirect to="/Dashboard" />
        }


        return (
            <React.Fragment>
                <MainNav
                    username={this.context.username}
                    settings={true}
                    sidebarHide={this.state.sidebarHide}
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />
                <Container>
                    <Row>
                        <Col>
                            <Card className='mt-4'>
                                <Card.Body>
                                    <Card.Title>Account Settings</Card.Title>
                                    <hr></hr>

                                    <Form>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control placeholder="1234 Main St" />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" />
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Group>
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control type ="tel" placeholder="Apartment, studio, or floor" />
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            Save
                                        </Button>
                                    </Form>

                                    <Card.Title className='mt-4'>Change Password</Card.Title>
                                    <hr></hr>
                                    <Form>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Old Password</Form.Label>
                                                <Form.Control type="password"/>
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>New Password</Form.Label>
                                                <Form.Control type="password"/>
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Confirm</Form.Label>
                                                <Form.Control type="password"/>
                                            </Form.Group>
                                        </Form.Row>

                                        <Button variant="primary" type="submit">
                                            Change
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </React.Fragment>
        )
    }
}
