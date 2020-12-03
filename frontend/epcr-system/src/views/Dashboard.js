import React, { Component } from 'react'
import { MainContext } from '../Auth'
import MainNav from '../components/MainNav'
import Container from 'react-bootstrap/Container'

export default class Dashboard extends Component {
	static contextType = MainContext;

    render() {
        return (
        	<React.Fragment>
				<MainNav username={this.context.username} dashboard={true}/>
                <Container className="main-content">
                    <Container className="chart">
                        Note: Something will go here eventually
                    </Container>
                </Container>
            </React.Fragment>
        )
    }
}
