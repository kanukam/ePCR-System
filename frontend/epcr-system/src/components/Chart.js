import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import ChartForm from './ChartForm'
import '../App.css'
import '../Sidebar.css'

export default class Chart extends Component {
    static contextType = MainContext;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            message: "",
            sidebarSpacing: '0 0 0 10vw',
            sidebarHide: true,
            showAdd: false
        };
        this.handleAdd = this.handleAdd.bind(this);
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

    handleAdd() {
        this.setState({
            showAdd: true
        });
    }

    toggleSidebar = (event=> {
        console.log('toggle');
        this.setState({sidebarSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 10vw')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    });

    render() {
        const {step} = this.state;
        const { no, date, type, patient } = this.state;
        const values = { no, date, type, patient };
        return (
            <React.Fragment>
                {/* Navigation Bar */}
                <Navbar bg="light">
                    <Nav.Item style={{padding: this.state.sidebarSpacing}}>
                        <Button onClick={this.toggleSidebar}>Hamburger</Button>
                    </Nav.Item>
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
                { this.state.sidebarHide ?
            	<Navbar className="col-md-1 d-none d-md-block bg-light sidebar">
		            <Nav.Item>
                        <Nav.Link as={Link} to="/Dashboard">
		                	Home
		                </Nav.Link>
		            </Nav.Item>
		            <Nav.Item className="sidebar-section active">
                        <Nav.Link style={{color:'white'}} as={Link} to="/Chart">
		                	Chart
		                </Nav.Link>
		            </Nav.Item>
		            <Nav.Item>
                    <Nav.Link as={Link} to="/Patient">
		                	Patient
		                </Nav.Link>
		            </Nav.Item>
		            <Nav.Item>
		                <Nav.Link>
		                	Link
		               	</Nav.Link>
		            </Nav.Item>
	            </Navbar>
                : null}

                {/* Form */}                
                <Container className="chart">
                    <ChartForm />
                </Container>
            </React.Fragment>
        )
    }
}
