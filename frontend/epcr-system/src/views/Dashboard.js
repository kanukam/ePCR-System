import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Navbar from 'react-bootstrap/Navbar'

export class Dashboard extends Component {
	static contextType = MainContext;
    constructor(props){
    	super(props);
    	this.state = {
    		username: ""
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

    render() {
    	console.log(this.state.username);
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
