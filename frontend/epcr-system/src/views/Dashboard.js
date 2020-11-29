import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'

export class Dashboard extends Component {
    render() {
        return (
        	<React.Fragment>
                {/* Navigation Bar */}
                <Navbar bg="light">
                    <Navbar.Brand>
                        <img alt="" src="/Rescate-Logo.jpg" width="10%" height="10%" className="d-inline-block align-top"/>{' '}
                        Rescate de San Carlos
                    </Navbar.Brand>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default Dashboard
