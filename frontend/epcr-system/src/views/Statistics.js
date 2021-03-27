import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import MainNav from '../components/MainNav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { MainContext } from '../Auth'

export default class Statistics extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            contentSpacing: '0 0 0 150px',
            sidebarHide: true,
            message: ""
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({ contentSpacing: (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px') })
        this.setState({ sidebarHide: !this.state.sidebarHide });
    }

    remove = event => {
        event.preventDefault();
        if (window.confirm(this.context.translate('delete-self'))){
            const url = 'http://localhost:3000/users/0/remove';
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
            fetch(url, options).then((response) => {
                if (!response.ok) {
                    throw Error("Failed");
                }
                this.context.setAuth(false);
            }).catch((error) => {
                this.setState({ message: this.context.translate('failed') });
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <MainNav
                    username={this.context.username}
                    statistics={true}
                    sidebarHide={this.state.sidebarHide}
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />
                <Container className="mt-5 main-content" style={{ padding: this.state.contentSpacing }}>
                    <Card className="text-center">
                        <Card.Header>{this.context.translate('summary-report')}</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Label column sm={2}>{this.context.translate('from')}</Form.Label>
                                    <Form.Group as={Col}>
                                        <Form.Control type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                                    </Form.Group>

                                    <Form.Label column sm={2}>{this.context.translate('to')}</Form.Label>
                                    <Form.Group as={Col}>
                                        <Form.Control type="email" placeholder={this.context.translate('enter-email')} value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Button className="" onClick={this.addVitals}>Add</Button>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </React.Fragment>
        )
    }
}