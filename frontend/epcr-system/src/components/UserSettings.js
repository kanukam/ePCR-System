import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { MainContext } from '../Auth'

export default class Settings extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            name: ' ',
            email: ' ',
            phone: ' ',
            oldPassword: "",
            newPassword: "",
            confirmedPassword: "",
            message: "",
        };
    }

    componentDidMount() {
        // Getting User data from database
        const url = `http://localhost:3000/users/${this.context.username}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        // Get request
        fetch(url, options).then(response => response.json())
            .then(data => {
                const temp = data['userInfo'][0];
                const { name, email, phone } = temp;
                this.setState({ name, email, phone });
            })
            .catch((error) => {
                this.setState({ errorMessage: "Error" });
            })
    }

    // Function to update user account information
    handleUpdate = (event => {
        event.preventDefault();
        const email = this.state.email;
        const phone = this.state.phone;
        const name = this.state.name;
        console.log(phone);
        if (name && phone && email) {
            const url = `http://localhost:3000/users/${this.context.username}/update`;
            const options = {
                method: 'POST',
                body: JSON.stringify({ email, phone, name }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
            // Check if update is successful
            fetch(url, options).then((response) => {
                if (!response.ok) {
                    throw Error("Failed");
                }
                this.setState({ message: this.context.translate('success') });
            }).catch((error) => {
                this.setState({ message: this.context.translate('failed') });
            })
        }
        else {
            this.setState({ message: this.context.translate('all-fields') });
        }
    })
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
    // Function to change Password
    handlePassword = (event) => {
        event.preventDefault();
        const { oldPassword, newPassword, confirmedPassword } = this.state
        if (oldPassword && newPassword && confirmedPassword) {
            // Send Request if passwords match
            if (newPassword === confirmedPassword) {
                if (this.passwordWordCheck(newPassword)) {
                    const url = `http://localhost:3000/users/${this.context.username}/password`;
                    const options = {
                        method: 'POST',
                        body: JSON.stringify({ oldPassword, newPassword }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                    }
                    // Check if update is successful
                    fetch(url, options).then((response) => {
                        if (!response.ok) {
                            throw Error("Failed");
                        }
                        this.setState({ message: this.context.translate('passwordChange') });
                    }).catch((error) => {
                        this.setState({ message: this.context.translate('failed') });
                    })
                }
            }
            else {
                this.setState({ message: this.context.translate('passwordMismatch') })
            }
        }
        else {
            this.setState({ message: this.context.translate('all-fields')  })
        }
    }


    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Card className='mt-4'>
                            <Card.Body>
                                <Card.Title>{this.context.translate('account-settings')}</Card.Title>
                                {this.state.message && <p className="text-info"> {this.state.message} </p>}
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>{this.context.translate('name')}</Form.Label>
                                            <Form.Control type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>{this.context.translate('email')}</Form.Label>
                                            <Form.Control type="email" placeholder={this.context.translate('enter-email')} value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Group>
                                        <Form.Label>{this.context.translate('phone-number')}</Form.Label>
                                        <Form.Control type="tel" value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                                    </Form.Group>

                                    <input type="button" onClick={this.handleUpdate} value={this.context.translate('save')}/>
                                </Form>
                                <hr/>
                                <Card.Title className='mt-4'>{this.context.translate('change-pw')}</Card.Title>
                                <Form onSubmit={this.handlePassword}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>{this.context.translate('old-pw')}</Form.Label>
                                            <Form.Control type="password" value={this.state.oldPassword} onChange={e => this.setState({ oldPassword: e.target.value })} />
                                        </Form.Group>

                                        <Form.Group as={Col} sm="12">
                                            <Form.Label>{this.context.translate('new-pw')}</Form.Label>
                                            <Form.Control type="password" pattern="[a-zA-Z0-9!@?]{0,100}" placeholder={this.context.translate('password-requirements')} value={this.state.newPassword} onChange={e => this.setState({ newPassword: e.target.value })} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>{this.context.translate('confirm')}</Form.Label>
                                            <Form.Control type="password" pattern="[a-zA-Z0-9!@?]{0,100}" placeholder={this.context.translate('password-requirements')} value={this.state.confirmedPassword} onChange={e => this.setState({ confirmedPassword: e.target.value })} />
                                        </Form.Group>
                                    </Form.Row>

                                    <input type="button" onClick={this.handlePassword} value={this.context.translate('change')}/>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}