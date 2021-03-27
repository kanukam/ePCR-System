import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { MainContext } from '../Auth'
import '../App.css'
import '../Sidebar.css'


export default class MainNav extends Component {
	static contextType = MainContext;
	logout = () => {
		const url = 'http://localhost:3000/logout';
		const options = {
			method: 'POST',
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
			console.log("Logout Failed");
		})
	}

	toggleLanguage = (language) => event => {
		this.context.setLanguage(language);
	}

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
		                        style={{marginLeft:0, marginRight: 0}}
		                    />
		                </Button>
		            </Nav.Item>

		            <Nav className="ml-auto">
						<NavDropdown title={this.props.username} id="basic-nav-dropdown">
							<NavDropdown.Item as={Link} to="/Settings">{this.context.translate('settings')}</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={this.logout}>{this.context.translate('logout')}</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={this.toggleLanguage("en")}>English</NavDropdown.Item>
							<NavDropdown.Item onClick={this.toggleLanguage("es")}>Espanol</NavDropdown.Item>
						</NavDropdown>
						<Navbar.Brand as={Link} to="/Settings"> {/*take them to the edit profile page or have a toggle that shows more options*/}
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
			            {this.props.chart ?
				            <Nav.Item className="sidebar-section active">
				                <Nav.Link style={{color:'white'}} as={Link} to="/Chart">
									{this.context.translate('chart')}
				                </Nav.Link>
				            </Nav.Item>
				            :
				            <Nav.Item>
				                <Nav.Link as={Link} to="/Chart">
									{this.context.translate('chart')}
				                </Nav.Link>
				            </Nav.Item>
				        }
			            {this.props.viewcharts ?
				            <Nav.Item className="sidebar-section active">
				                <Nav.Link style={{color:'white'}} as={Link} to="/ViewCharts">
									{this.context.translate('view-charts')}
				                </Nav.Link>
				            </Nav.Item>
			            	:
			            	<Nav.Item>
				                <Nav.Link as={Link} to="/ViewCharts">
									{this.context.translate('view-charts')}
				                </Nav.Link>
				            </Nav.Item>
				        }
						{this.context.privilege === 'admin' && this.props.statistics ?
							<Nav.Item className="sidebar-section active">
								<Nav.Link as={Link} to="/Statistics" style={{ color: 'white' }}>
									{this.context.translate('statistics')}
								</Nav.Link>
							</Nav.Item>
							:
							null
						}
						{this.context.privilege === 'admin' && !this.props.statistics &&
							<Nav.Item>
								<Nav.Link as={Link} to="/Statistics">
									{this.context.translate('statistics')}
								</Nav.Link>
							</Nav.Item>
						}
						{this.props.settings ?
							<Nav.Item className="sidebar-section active">
								<Nav.Link style={{ color: 'white' }} as={Link} to="/Settings">
									{this.context.translate('settings')}
				                </Nav.Link>
							</Nav.Item>
							:
							<Nav.Item>
								<Nav.Link as={Link} to="/Settings">
									{this.context.translate('settings')}
				                </Nav.Link>
							</Nav.Item>
						}
			        </Navbar>
		        : null}
	        </div>
	    );
    }
}