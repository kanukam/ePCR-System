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
            contentSpacing: '0 0 0 150px',
            sidebarHide: true,
    	};
        this.toggleCollapse = this.toggleCollapse.bind(this);
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

    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }

    render() {
        return (
        	<React.Fragment>
                <MainNav 
                    username={this.state.username} 
                    dashboard={true} 
                    sidebarHide={this.state.sidebarHide} 
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />

                <Container className="main-content" style={{padding: this.state.contentSpacing}}>
                    <Container className="chart">
                        Note: Something will go here eventually
                    </Container>
                </Container>
            </React.Fragment>
        )
    }
}
