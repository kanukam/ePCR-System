import React, { Component } from 'react'
import { MainContext } from '../Auth'
import MainNav from '../components/MainNav'
import Container from 'react-bootstrap/Container'

export default class Dashboard extends Component {
	static contextType = MainContext;
    constructor(props){
    	super(props);
    	this.state = {
            contentSpacing: '0 0 0 150px',
            sidebarHide: true,
    	};
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse (){
        this.setState({contentSpacing : (this.state.sidebarHide ? '0 0 0 0' : '0 0 0 150px')})
        this.setState({sidebarHide : !this.state.sidebarHide});
    }

    render() {
        return (
        	<React.Fragment>
                <MainNav 
                    username={this.context.username} 
                    dashboard={true} 
                    sidebarHide={this.state.sidebarHide} 
                    contentSpacing={this.state.contentSpacing}
                    toggleCollapse={this.toggleCollapse}
                />

                <Container className="main-content" style={{padding: this.state.contentSpacing}}>
                    <Container className="chart">
                        <h2>Messages</h2>
                        <h2>Reports</h2>
                        Testing, something will go here eventually
                    </Container>
                </Container>
            </React.Fragment>
        )
    }
}