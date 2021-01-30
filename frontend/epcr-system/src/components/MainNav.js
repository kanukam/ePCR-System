import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import '../App.css'
import '../Sidebar.css'

export default class MainNav extends Component {
    render(){
    	return(
    		<div>
		    	{/* Navigation Bar */}
		        <Navbar bg="light">
		            <Nav.Item style={{padding: this.props.contentSpacing}} className="hamburger-shift">
		                <Button onClick={this.props.toggleCollapse}>
		                    <img 
		                        src="/hamburger.svg" 
		                        alt="hamburger" 
		                        width="30" 
		                        height="30" 
		                        style={{marginLef:0, marginRight: 0}}
		                    />
		                </Button>
		            </Nav.Item>
		            <Nav className="ml-auto">
						<Navbar.Brand as={Link} to="/Settings"> {/*take them to the edit profile page or have a toggle that shows more options*/}
		                    {this.props.username}
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
		        { this.props.sidebarHide ?
			        <Navbar className="col-md-1 d-none d-md-block bg-light sidebar">
			        	{this.props.dashboard ?
				            <Nav.Item className="sidebar-section active">
				                <Nav.Link style={{color:'white'}} as={Link} to="/Dashboard">
				                    Home
				                </Nav.Link>
				            </Nav.Item>
				            :
				            <Nav.Item>
				                <Nav.Link as={Link} to="/Dashboard">
				                    Home
				                </Nav.Link>
				            </Nav.Item>
				        }
			            {this.props.chart ?
				            <Nav.Item className="sidebar-section active">
				                <Nav.Link style={{color:'white'}} as={Link} to="/Chart">
				                    Chart
				                </Nav.Link>
				            </Nav.Item>
				            :
				            <Nav.Item>
				                <Nav.Link as={Link} to="/Chart">
				                    Chart
				                </Nav.Link>
				            </Nav.Item>
				        }
			            {this.props.patient ?
				            <Nav.Item className="sidebar-section active">
				                <Nav.Link style={{color:'white'}} as={Link} to="/PatientList">
				                    Patient
				                </Nav.Link>
				            </Nav.Item>
			            	:
			            	<Nav.Item>
				                <Nav.Link as={Link} to="/PatientList">
				                    Patient
				                </Nav.Link>
				            </Nav.Item>
				        }
						{this.props.settings ?
							<Nav.Item className="sidebar-section active">
								<Nav.Link style={{ color: 'white' }} as={Link} to="/Settings">
									Settings
				                </Nav.Link>
							</Nav.Item>
							:
							<Nav.Item>
								<Nav.Link as={Link} to="/Settings">
									Settings
				                </Nav.Link>
							</Nav.Item>
						}
			        </Navbar>
		        : null}
	        </div>
	    );
    }
}