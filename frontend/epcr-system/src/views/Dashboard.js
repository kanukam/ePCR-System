import React, { Component } from 'react'
import { MainContext } from '../Auth'
import MainNav from '../components/MainNav'
import Container from 'react-bootstrap/Container'

export default class Dashboard extends Component {
	static contextType = MainContext;
    constructor(props){
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

    render() {
        return (
        	<React.Fragment>
                <MainNav username={this.state.username} dashboard={true}/>

                <Container className="main-content">
                    <Container className="chart">
                        Note: Something will go here eventually
                    </Container>
                </Container>
            </React.Fragment>
        )
    }
}
