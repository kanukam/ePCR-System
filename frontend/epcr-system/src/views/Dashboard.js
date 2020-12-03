import React, { Component } from 'react'
import { MainContext } from '../Auth'
import Button from 'react-bootstrap/Button'
import MainNav from '../components/MainNav'

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
            </React.Fragment>
        )
    }
}
