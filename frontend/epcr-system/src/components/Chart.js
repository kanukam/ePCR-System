import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../Sidebar.css'

export default class Chart extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        };

    }

    componentDidMount(){
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
                if(response.ok)
                    return response.json();
                else
                    throw Error("Failed");
            })
            .then((data) => {
                this.setState({username: data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /*
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
                this.setState({ errorMessage: "" });
                this.setState({ authorized: true })
                this.context.setAuth(true);
                console.log("Success");
            }).catch((error) => {
                this.setState({ errorMessage: "Invalid Username or password" });
            })
        }
        else
        {
            this.setState({ errorMessage: "Enter all fields" });
        } 
})*/

    render() {
        console.log(this.state.username);
        return (
            <React.Fragment>
                {/* Navigation Bar */}
                <Navbar bg="light">
                        <Nav className="ml-auto">
                            <Navbar.Brand href="#home"> {/*take them to the edit profile page or have a toggle that shows more options*/}
                                {this.state.username}
                                <img
                                    src="/profile.png"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    style={{marginLeft: 10, marginRight: 0}}
                                    alt="profile"
                                />{' '}
                            </Navbar.Brand>
                        </Nav>
                </Navbar>

                {/* Sidebar */}
                <Nav className="d-none d-md-block bg-light sidebar">
                    <Nav.Item>
                        <Nav.Link href="/Dashboard">
                            Home
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="sidebar-section active">
                        <Nav.Link style={{color:'white'}}>
                            Chart
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            Link
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            Link
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </React.Fragment>
        )
    }
}